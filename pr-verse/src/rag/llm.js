// LLM interaction utilities for RAG system

/**
 * Generate response using Cloudflare AI LLM
 * @param {AI} ai - Cloudflare AI binding
 * @param {string} systemPrompt - System prompt with context
 * @param {string} userMessage - User message
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Generated response
 */
export async function generateResponse(ai, systemPrompt, userMessage, options = {}) {
  const {
    model = '@cf/meta/llama-3-8b-instruct',
    maxTokens = 512,
    temperature = 0.3,
    topP = 0.9,
    stream = false
  } = options;
  
  try {
    const prompt = `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`;
    
    const response = await ai.run(model, {
      prompt,
      max_tokens: maxTokens,
      temperature,
      top_p: topP,
      stream
    });
    
    // Extract response text from various possible response formats
    const responseText = 
      response.response || 
      response.result?.response || 
      response.result || 
      '';
    
    if (!responseText) {
      throw new Error('Empty response from LLM');
    }
    
    return responseText.trim();
  } catch (error) {
    console.error('LLM generation error:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

/**
 * Generate response with retry logic
 * @param {AI} ai - Cloudflare AI binding
 * @param {string} systemPrompt - System prompt with context
 * @param {string} userMessage - User message
 * @param {Object} options - Generation options
 * @returns {Promise<string>} Generated response
 */
export async function generateResponseWithRetry(ai, systemPrompt, userMessage, options = {}) {
  const { maxRetries = 2, retryDelay = 1000, ...genOptions } = options;
  
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await generateResponse(ai, systemPrompt, userMessage, genOptions);
    } catch (error) {
      lastError = error;
      console.error(`LLM attempt ${attempt + 1} failed:`, error.message);
      
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  throw lastError;
}

/**
 * Available LLM models on Cloudflare Workers AI
 */
export const AVAILABLE_MODELS = {
  LLAMA_3_8B: '@cf/meta/llama-3-8b-instruct',
  LLAMA_3_1_8B: '@cf/meta/llama-3.1-8b-instruct',
  MISTRAL_7B: '@cf/mistral/mistral-7b-instruct-v0.1',
  GEMMA_7B: '@hf/google/gemma-7b-it'
};

/**
 * Model configurations for different use cases
 */
export const MODEL_CONFIGS = {
  FACTUAL: {
    temperature: 0.2,
    topP: 0.85,
    maxTokens: 512
  },
  BALANCED: {
    temperature: 0.3,
    topP: 0.9,
    maxTokens: 512
  },
  CREATIVE: {
    temperature: 0.7,
    topP: 0.95,
    maxTokens: 768
  },
  CONCISE: {
    temperature: 0.2,
    topP: 0.85,
    maxTokens: 256
  }
};
