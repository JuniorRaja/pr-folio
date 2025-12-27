// Embedding generation utilities for RAG system

/**
 * Generate embeddings for text using Cloudflare AI
 * @param {AI} ai - Cloudflare AI binding
 * @param {string|string[]} text - Text or array of texts to embed
 * @returns {Promise<number[]|number[][]>} Embedding vector(s)
 */
export async function generateEmbedding(ai, text) {
  try {
    const response = await ai.run('@cf/baai/bge-base-en-v1.5', {
      text: Array.isArray(text) ? text : [text]
    });
    
    const embeddings = response.data;
    
    // Validate embeddings
    if (!embeddings || embeddings.length === 0) {
      throw new Error('No embeddings generated');
    }
    
    // Check dimension (BGE-base-en-v1.5 produces 768-dimensional vectors)
    const expectedDim = 768;
    for (const embedding of embeddings) {
      if (embedding.length !== expectedDim) {
        throw new Error(`Invalid embedding dimension: ${embedding.length}, expected ${expectedDim}`);
      }
    }
    
    return Array.isArray(text) ? embeddings : embeddings[0];
  } catch (error) {
    console.error('Embedding generation error:', error);
    throw new Error(`Failed to generate embeddings: ${error.message}`);
  }
}

/**
 * Generate embeddings in batches for large datasets
 * @param {AI} ai - Cloudflare AI binding
 * @param {string[]} texts - Array of texts to embed
 * @param {number} batchSize - Number of texts per batch (default: 10)
 * @returns {Promise<number[][]>} Array of embedding vectors
 */
export async function generateEmbeddingsBatch(ai, texts, batchSize = 10) {
  const embeddings = [];
  
  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchEmbeddings = await generateEmbedding(ai, batch);
    embeddings.push(...batchEmbeddings);
    
    // Small delay to avoid rate limiting
    if (i + batchSize < texts.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  return embeddings;
}
