// Advanced retrieval strategies for RAG system

/**
 * Query vector database with configurable parameters
 * @param {Vectorize} vectorize - Cloudflare Vectorize binding
 * @param {number[]} queryEmbedding - Query embedding vector
 * @param {Object} options - Query options
 * @returns {Promise<Object>} Query results with matches
 */
export async function queryVectorDB(vectorize, queryEmbedding, options = {}) {
  const {
    topK = 5,
    returnValues = false,
    returnMetadata = true,
    filter = null,
    namespace = null
  } = options;
  
  try {
    const queryParams = {
      topK,
      returnValues,
      returnMetadata
    };
    
    if (filter) queryParams.filter = filter;
    if (namespace) queryParams.namespace = namespace;
    
    const results = await vectorize.query(queryEmbedding, queryParams);
    
    return results;
  } catch (error) {
    console.error('Vector DB query error:', error);
    throw new Error(`Failed to query vector database: ${error.message}`);
  }
}

/**
 * Hybrid retrieval: Combine semantic search with keyword matching
 * @param {Vectorize} vectorize - Cloudflare Vectorize binding
 * @param {number[]} queryEmbedding - Query embedding vector
 * @param {string} queryText - Original query text for keyword matching
 * @param {Object} options - Retrieval options
 * @returns {Promise<Array>} Ranked and deduplicated results
 */
export async function hybridRetrieval(vectorize, queryEmbedding, queryText, options = {}) {
  const { topK = 5, keywordBoost = 0.3 } = options;
  
  // Get more results than needed for reranking
  const semanticResults = await queryVectorDB(vectorize, queryEmbedding, {
    topK: topK * 2,
    returnMetadata: true
  });
  
  if (!semanticResults.matches || semanticResults.matches.length === 0) {
    return [];
  }
  
  // Extract keywords from query (simple approach)
  const keywords = extractKeywords(queryText);
  
  // Rerank results based on semantic similarity + keyword matching
  const rankedResults = semanticResults.matches.map(match => {
    const text = match.metadata?.text || '';
    const keywordScore = calculateKeywordScore(text, keywords);
    
    // Combine scores: semantic (0.7) + keyword (0.3)
    const combinedScore = (match.score * (1 - keywordBoost)) + (keywordScore * keywordBoost);
    
    return {
      ...match,
      originalScore: match.score,
      keywordScore,
      combinedScore
    };
  });
  
  // Sort by combined score and return top K
  rankedResults.sort((a, b) => b.combinedScore - a.combinedScore);
  
  return rankedResults.slice(0, topK);
}

/**
 * Extract important keywords from query text
 * @param {string} text - Query text
 * @returns {string[]} Array of keywords
 */
function extractKeywords(text) {
  // Remove common stop words
  const stopWords = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'about', 'what', 'who', 'where',
    'when', 'why', 'how', 'tell', 'me', 'your', 'you'
  ]);
  
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

/**
 * Calculate keyword matching score
 * @param {string} text - Document text
 * @param {string[]} keywords - Query keywords
 * @returns {number} Score between 0 and 1
 */
function calculateKeywordScore(text, keywords) {
  if (keywords.length === 0) return 0;
  
  const textLower = text.toLowerCase();
  let matchCount = 0;
  
  for (const keyword of keywords) {
    if (textLower.includes(keyword)) {
      matchCount++;
    }
  }
  
  return matchCount / keywords.length;
}

/**
 * Contextual retrieval: Add surrounding context to chunks
 * @param {Array} matches - Vector search matches
 * @param {Object} options - Context options
 * @returns {Array} Matches with enhanced context
 */
export function addContextualInfo(matches, options = {}) {
  const { includeSource = true, includeCategory = true } = options;
  
  return matches.map(match => {
    const metadata = match.metadata || {};
    let enhancedText = metadata.text || '';
    
    // Add source context if available
    if (includeSource && metadata.source) {
      enhancedText = `[Source: ${metadata.source}]\n${enhancedText}`;
    }
    
    // Add category context if available
    if (includeCategory && metadata.category) {
      enhancedText = `[Category: ${metadata.category}]\n${enhancedText}`;
    }
    
    return {
      ...match,
      metadata: {
        ...metadata,
        enhancedText
      }
    };
  });
}

/**
 * Deduplicate similar chunks based on text similarity
 * @param {Array} matches - Vector search matches
 * @param {number} threshold - Similarity threshold (0-1)
 * @returns {Array} Deduplicated matches
 */
export function deduplicateChunks(matches, threshold = 0.85) {
  const deduplicated = [];
  
  for (const match of matches) {
    const text = match.metadata?.text || '';
    
    // Check if similar chunk already exists
    const isDuplicate = deduplicated.some(existing => {
      const existingText = existing.metadata?.text || '';
      return calculateTextSimilarity(text, existingText) > threshold;
    });
    
    if (!isDuplicate) {
      deduplicated.push(match);
    }
  }
  
  return deduplicated;
}

/**
 * Calculate simple text similarity (Jaccard similarity)
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {number} Similarity score (0-1)
 */
function calculateTextSimilarity(text1, text2) {
  const words1 = new Set(text1.toLowerCase().split(/\s+/));
  const words2 = new Set(text2.toLowerCase().split(/\s+/));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size;
}
