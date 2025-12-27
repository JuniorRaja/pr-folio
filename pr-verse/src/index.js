// Main chatbot worker for Prasanna Rajendran's portfolio RAG system
import { handleGalleryRequest } from './gallery-api.js';
import { handleChatbotQuery } from './rag/chatbot.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS helper - allow localhost for development
    const getAllowedOrigin = (requestOrigin) => {
      const allowedOrigins = [
        'https://prasannar.vercel.app',
        'http://localhost:8080',
        'http://localhost:5173',
        'http://127.0.0.1:8080',
        'http://127.0.0.1:5173'
      ];
      return allowedOrigins.includes(requestOrigin) ? requestOrigin : 'https://prasannar.vercel.app';
    };
    
    const origin = request.headers.get('Origin');
    const allowedOrigin = getAllowedOrigin(origin);
    
    // Route gallery API requests
    if (url.pathname.startsWith('/api/gallery')) {
      return handleGalleryRequest(request, env);
    }

    // CORS preflight handling
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400', // 24 hours
        },
      });
    }

    // Only allow POST requests for chatbot
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': allowedOrigin,
        },
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
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': allowedOrigin,
          },
        });
      }

      const { message, conversationHistory } = requestBody;

      if (!message || typeof message !== 'string') {
        return new Response(JSON.stringify({ error: 'Message field is required and must be a string' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': allowedOrigin,
          },
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
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': allowedOrigin,
          },
        });
      }

      // Handle errors
      if (!result.success) {
        return new Response(JSON.stringify({
          error: result.error || 'An internal error occurred. Please try again later.',
          timestamp: new Date().toISOString()
        }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': allowedOrigin,
          },
        });
      }

      // Return successful response
      return new Response(JSON.stringify({
        answer: result.answer,
        timestamp: result.metadata?.timestamp || new Date().toISOString(),
        metadata: result.metadata
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': allowedOrigin,
        },
      });

    } catch (error) {
      console.error('Chatbot error:', error);

      return new Response(JSON.stringify({
        error: 'An internal error occurred. Please try again later.',
        timestamp: new Date().toISOString()
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': allowedOrigin,
        },
      });
    }
  }
};
