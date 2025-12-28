// Main chatbot worker for Prasanna Rajendran's portfolio RAG system
import { handleGalleryRequest } from './gallery-api.js';
import { handleChatbotQuery } from './rag/chatbot.js';
import { getCorsHeaders, handleCorsPreFlight } from './config.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Get CORS headers from centralized config
    const corsHeaders = getCorsHeaders(request, env);
    
    // Route gallery API requests
    if (url.pathname.startsWith('/api/gallery')) {
      return handleGalleryRequest(request, env);
    }

    // CORS preflight handling
    if (request.method === 'OPTIONS') {
      return handleCorsPreFlight(request, env);
    }

    // Only allow POST requests for chatbot
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: corsHeaders,
      });
    }

    try {
      // Parse request body
      let requestBody;
      try {
        requestBody = await request.json();
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      const { message, conversationHistory } = requestBody;

      if (!message || typeof message !== 'string') {
        return new Response(JSON.stringify({ error: 'Message field is required and must be a string' }), {
          status: 400,
          headers: corsHeaders,
        });
      }

      // Use the new modular RAG system
      const result = await handleChatbotQuery(env, message, {
        topK: 5,
        useHybridSearch: true,
        includeContext: true,
        modelConfig: 'BALANCED',
        conversationHistory: conversationHistory || []
      });

      // Handle filtered queries
      if (!result.success && result.isFiltered) {
        return new Response(JSON.stringify({
          error: result.error
        }), {
          status: 200,
          headers: corsHeaders,
        });
      }

      // Handle errors
      if (!result.success) {
        return new Response(JSON.stringify({
          error: result.error || 'An internal error occurred. Please try again later.',
          timestamp: new Date().toISOString()
        }), {
          status: 500,
          headers: corsHeaders,
        });
      }

      // Return successful response
      return new Response(JSON.stringify({
        answer: result.answer,
        timestamp: result.metadata?.timestamp || new Date().toISOString(),
        metadata: result.metadata
      }), {
        headers: corsHeaders,
      });

    } catch (error) {
      console.error('Chatbot error:', error);

      return new Response(JSON.stringify({
        error: 'An internal error occurred. Please try again later.',
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: corsHeaders,
      });
    }
  }
};
