// Main chatbot worker for Prasanna Rajendran's portfolio RAG system
export default {
  async fetch(request, env, ctx) {
    // CORS preflight handling
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400', // 24 hours
        },
      });
    }

    // Only allow POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
        },
      });
    }

    try {
      // Note: Rate limiting disabled for local testing

      // Input validation
      let requestBody;
      try {
        requestBody = await request.json();
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
          },
        });
      }

      const { message } = requestBody;

      if (!message || typeof message !== 'string') {
        return new Response(JSON.stringify({ error: 'Message field is required and must be a string' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
          },
        });
      }

      if (message.length < 1 || message.length > 500) {
        return new Response(JSON.stringify({ error: 'Message must be between 1 and 500 characters' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
          },
        });
      }

      // Prompt filtering - check if message is about portfolio/user
      const portfolioKeywords = [
        'you', 'your', 'portfolio', 'skills', 'experience', 'projects', 'work',
        'background', 'about', 'what', 'who', 'how', 'tell me', 'describe',
        'developed', 'created', 'built', 'worked', 'role', 'position',
        'company', 'job', 'career', 'education', 'qualifications', 'technologies',
        'tools', 'programming', 'coding', 'development', 'web', 'app'
      ];

      const messageLower = message.toLowerCase();
      const hasPortfolioKeyword = portfolioKeywords.some(keyword =>
        messageLower.includes(keyword)
      );

      if (!hasPortfolioKeyword) {
        return new Response(JSON.stringify({
          error: 'I can only answer questions about Prasanna Rajendran\'s portfolio, skills, and experience. Please ask me something about my background!'
        }), {
          status: 200, // Not an error, just filtering
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
          },
        });
      }

      // RAG Pipeline

      // 1. Generate embedding for user message
      let userEmbedding;
      try {
        const embeddingResponse = await env.AI.run('@cf/baai/bge-base-en-v1.5', {
          text: [message]
        });
        userEmbedding = embeddingResponse.data[0];
      } catch (embedError) {
        console.error('Embedding error:', embedError.message);
        throw new Error('Failed to generate embedding for user message');
      }

      if (!userEmbedding || userEmbedding.length !== 768) {
        console.error('Embedding check failed: length =', userEmbedding?.length);
        throw new Error('Failed to generate embedding for user message');
      }

      // 2. Query Vectorize for top 3 most similar chunks
      let queryResponse;
      try {
        queryResponse = await env.VECTORIZE.query(userEmbedding, {
          topK: 3,
          returnValues: false,
          returnMetadata: true
        });
      } catch (queryError) {
        console.error('Vectorize query error:', queryError.message);
        throw new Error('Failed to query vector database');
      }

      if (!queryResponse.matches || queryResponse.matches.length === 0) {
        return new Response(JSON.stringify({
          answer: "I don't have enough information in my portfolio to answer that question. Could you ask me about my skills, projects, or experience?",
          timestamp: new Date().toISOString()
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
          },
        });
      }

      // 3. Extract and concatenate text from top chunks
      const relevantChunks = queryResponse.matches.map(match => match.metadata.text);
      const contextText = relevantChunks.join('\n\n');

      // 4. Generate LLM response using Llama 3.1 8B Instruct
      const systemPrompt = `You are Prasanna Rajendran, a versatile CS enthusiast and full-stack developer based in Chennai, India. You are responding to questions about your portfolio, skills, projects, and professional experience.

CRITICAL INSTRUCTIONS:
- Only use the provided context to answer questions. Never make up information.
- If the answer isn't in the context, politely say you don't have that information.
- Speak in first person ("I am", "My skills include", "I developed", etc.)
- Keep responses concise but informative (2-4 sentences when possible).
- Always be friendly and professional.
- Answer questions about your portfolio content including skills, projects, experience, education, contact information, and personal background such as your travels.
- If asked about things outside your portfolio and personal background (like weather, news, general knowledge), politely redirect to portfolio topics.

CONTEXT INFORMATION:
${contextText}`;

      let llmResponse;
      try {
        llmResponse = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          prompt: systemPrompt + '\n\nUser: ' + message,
          max_tokens: 512,
          temperature: 0.3, // Lower temperature for more consistent/factual responses
        });
      } catch (llmError) {
        console.error('LLM error:', llmError.message);
        throw new Error('Failed to generate response from AI model');
      }

      const answer = llmResponse.response || llmResponse.result?.response || llmResponse.result || 'I apologize, but I couldn\'t generate a response at this time.';

      // Note: Rate limiting disabled for local testing

      // Return response
      return new Response(JSON.stringify({
        answer: answer.trim(),
        timestamp: new Date().toISOString()
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
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
          'Access-Control-Allow-Origin': 'https://prasannar.vercel.app',
        },
      });
    }
  }
};
