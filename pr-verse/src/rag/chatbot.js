// Main RAG chatbot orchestration

import { generateEmbedding } from './embeddings.js';
import { hybridRetrieval, addContextualInfo, deduplicateChunks } from './retrieval.js';
import { 
  buildSystemPrompt, 
  buildUserMessage, 
  validateUserInput, 
  isPortfolioRelated,
  generateFallbackResponse,
  postProcessResponse 
} from './prompts.js';
import { generateResponseWithRetry, MODEL_CONFIGS } from './llm.js';

/**
 * Main RAG chatbot handler
 * @param {Object} env - Cloudflare environment bindings
 * @param {string} userMessage - User's message
 * @param {Object} options - Chatbot options
 * @returns {Promise<Object>} Response object
 */
export async function handleChatbotQuery(env, userMessage, options = {}) {
  const {
    topK = 5,
    useHybridSearch = true,
    includeContext = true,
    modelConfig = 'BALANCED',
    conversationHistory = []
  } = options;
  
  try {
    // 1. Input validation
    const validation = validateUserInput(userMessage, {
      minLength: 1,
      maxLength: 500
    });
    
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
        suggestion: validation.suggestion
      };
    }
    
    // 2. Check if query is portfolio-related
    if (!isPortfolioRelated(userMessage)) {
      return {
        success: false,
        error: 'I can only answer questions about Prasanna Rajendran\'s portfolio, skills, and experience. Please ask me something about my background!',
        isFiltered: true
      };
    }
    
    // 3. Generate embedding for user message
    const userEmbedding = await generateEmbedding(env.AI, userMessage);
    
    // 4. Retrieve relevant context
    let matches;
    if (useHybridSearch) {
      matches = await hybridRetrieval(
        env.VECTORIZE,
        userEmbedding,
        userMessage,
        { topK, keywordBoost: 0.3 }
      );
    } else {
      const results = await env.VECTORIZE.query(userEmbedding, {
        topK,
        returnMetadata: true
      });
      matches = results.matches || [];
    }
    
    // 5. Handle no results
    if (!matches || matches.length === 0) {
      return {
        success: true,
        answer: generateFallbackResponse(userMessage),
        metadata: {
          matchCount: 0,
          retrievalMethod: useHybridSearch ? 'hybrid' : 'semantic'
        }
      };
    }
    
    // 6. Enhance and deduplicate context
    const enhancedMatches = addContextualInfo(matches, {
      includeSource: true,
      includeCategory: true
    });
    
    const deduplicatedMatches = deduplicateChunks(enhancedMatches, 0.85);
    
    // 7. Build context text
    const contextText = deduplicatedMatches
      .map(match => match.metadata?.enhancedText || match.metadata?.text || '')
      .filter(text => text.length > 0)
      .join('\n\n---\n\n');
    
    // 8. Build prompts
    const systemPrompt = buildSystemPrompt(contextText, {
      personaName: 'PR (Prasanna Rajendran)',
      personaDescription: 'a versatile CS enthusiast and full-stack developer based in Chennai, India',
      responseStyle: 'friendly and professional',
      useMarkdown: true
    });
    
    const enhancedUserMessage = buildUserMessage(userMessage, {
      addContext: conversationHistory.length > 0,
      conversationHistory
    });
    
    // 9. Generate LLM response
    const config = MODEL_CONFIGS[modelConfig] || MODEL_CONFIGS.BALANCED;
    const rawResponse = await generateResponseWithRetry(
      env.AI,
      systemPrompt,
      enhancedUserMessage,
      {
        ...config,
        maxRetries: 2
      }
    );
    
    // 10. Post-process response
    const finalResponse = postProcessResponse(rawResponse, {
      removeExtraWhitespace: true,
      ensureMarkdown: true,
      maxLength: 1000
    });
    
    // 11. Return response with metadata
    return {
      success: true,
      answer: finalResponse,
      metadata: {
        matchCount: deduplicatedMatches.length,
        retrievalMethod: useHybridSearch ? 'hybrid' : 'semantic',
        topScore: deduplicatedMatches[0]?.combinedScore || deduplicatedMatches[0]?.score || 0,
        modelConfig,
        timestamp: new Date().toISOString()
      }
    };
    
  } catch (error) {
    console.error('Chatbot query error:', error);
    return {
      success: false,
      error: 'An internal error occurred while processing your request.',
      details: error.message
    };
  }
}

/**
 * Simplified chatbot handler for backward compatibility
 * @param {Object} env - Cloudflare environment bindings
 * @param {string} userMessage - User's message
 * @returns {Promise<string>} Response text
 */
export async function getChatbotResponse(env, userMessage) {
  const result = await handleChatbotQuery(env, userMessage);
  
  if (!result.success) {
    throw new Error(result.error || 'Failed to generate response');
  }
  
  return result.answer;
}
