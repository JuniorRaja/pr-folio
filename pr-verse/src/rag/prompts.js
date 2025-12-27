// Prompt engineering utilities for RAG system

/**
 * Build system prompt with context for the LLM
 * @param {string} contextText - Retrieved context from vector DB
 * @param {Object} options - Prompt options
 * @returns {string} Complete system prompt
 */
export function buildSystemPrompt(contextText, options = {}) {
  const {
    personaName = 'PR (Prasanna Rajendran)',
    personaDescription = 'a versatile CS enthusiast and full-stack developer based in Chennai, India',
    responseStyle = 'friendly and professional',
    maxResponseLength = 'concise but detailed',
    useMarkdown = true
  } = options;
  
  return `You are ${personaName}, ${personaDescription}. You are responding to questions about your portfolio, skills, projects, and professional experience.

CRITICAL INSTRUCTIONS:
- Only use the provided context to answer questions. Never make up information.
- If the answer isn't in the context, politely say you don't have that information and suggest related topics you can discuss.
- Speak in first person ("I am", "My skills include", "I developed", etc.)
- For general conversations/greetings, keep responses very short (1-2 sentences).
- For specific queries about skills, projects, or experience, provide detailed but concise points.
${useMarkdown ? '- Format all responses using Markdown for better readability (use **bold**, *italics*, bullet points, numbered lists, etc.).' : ''}
- Always be ${responseStyle}.
- Keep responses ${maxResponseLength}.
- Answer questions about your portfolio content including skills, projects, experience, education, contact information, and personal background.
- If asked about things outside your portfolio and personal background (like weather, news, general knowledge), politely redirect to portfolio topics.
- When discussing projects, highlight your specific contributions and technologies used.
- When discussing skills, provide context about your proficiency and experience.

CONTEXT INFORMATION:
${contextText}

Remember: Stay in character as ${personaName} and only discuss information from the context provided above.`;
}

/**
 * Build user message with query enhancement
 * @param {string} userMessage - Original user message
 * @param {Object} options - Message options
 * @returns {string} Enhanced user message
 */
export function buildUserMessage(userMessage, options = {}) {
  const { addContext = false, conversationHistory = [] } = options;
  
  let message = userMessage;
  
  // Add conversation context if available
  if (addContext && conversationHistory.length > 0) {
    const recentHistory = conversationHistory.slice(-3); // Last 3 exchanges
    const historyText = recentHistory
      .map(h => `${h.role}: ${h.content}`)
      .join('\n');
    
    message = `Previous conversation:\n${historyText}\n\nCurrent question: ${userMessage}`;
  }
  
  return message;
}

/**
 * Validate and filter user input
 * @param {string} message - User message
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export function validateUserInput(message, options = {}) {
  const {
    minLength = 1,
    maxLength = 500,
    requiredKeywords = [],
    blockedPatterns = []
  } = options;
  
  // Length validation
  if (message.length < minLength) {
    return {
      valid: false,
      error: `Message must be at least ${minLength} characters`
    };
  }
  
  if (message.length > maxLength) {
    return {
      valid: false,
      error: `Message must be no more than ${maxLength} characters`
    };
  }
  
  // Keyword validation (if required)
  if (requiredKeywords.length > 0) {
    const messageLower = message.toLowerCase();
    const hasKeyword = requiredKeywords.some(keyword =>
      messageLower.includes(keyword.toLowerCase())
    );
    
    if (!hasKeyword) {
      return {
        valid: false,
        error: 'Please ask a question related to the portfolio',
        suggestion: 'Try asking about skills, projects, experience, or background'
      };
    }
  }
  
  // Blocked patterns check
  for (const pattern of blockedPatterns) {
    if (new RegExp(pattern, 'i').test(message)) {
      return {
        valid: false,
        error: 'This type of question is not supported'
      };
    }
  }
  
  return { valid: true };
}

/**
 * Check if query is portfolio-related
 * @param {string} message - User message
 * @returns {boolean} True if portfolio-related
 */
export function isPortfolioRelated(message) {
  const portfolioKeywords = [
    // Personal pronouns
    'you', 'your', 'yourself',
    // Portfolio terms
    'portfolio', 'skills', 'experience', 'projects', 'work',
    'background', 'about', 'bio', 'resume', 'cv',
    // Question words
    'what', 'who', 'how', 'where', 'when', 'why',
    'tell me', 'describe', 'explain', 'show',
    // Professional terms
    'developed', 'created', 'built', 'worked', 'designed',
    'role', 'position', 'company', 'job', 'career',
    'education', 'qualifications', 'degree', 'university',
    // Technical terms
    'technologies', 'tools', 'programming', 'coding',
    'development', 'web', 'app', 'software', 'engineer',
    'frontend', 'backend', 'fullstack', 'database',
    // Specific skills
    'react', 'javascript', 'typescript', 'python', 'node',
    'aws', 'cloudflare', 'docker', 'api', 'database',
    // Personal
    'travel', 'hobby', 'interest', 'passion', 'contact',
    'email', 'linkedin', 'github', 'location'
  ];
  
  const messageLower = message.toLowerCase();
  return portfolioKeywords.some(keyword =>
    messageLower.includes(keyword)
  );
}

/**
 * Generate fallback response when no context is found
 * @param {string} query - User query
 * @returns {string} Fallback response
 */
export function generateFallbackResponse(query) {
  const suggestions = [
    'my technical skills and expertise',
    'projects I\'ve worked on',
    'my professional experience',
    'my educational background',
    'technologies I work with',
    'how to contact me'
  ];
  
  const randomSuggestions = suggestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  return `I don't have enough information in my portfolio to answer that specific question. However, I'd be happy to tell you about:\n\n${randomSuggestions.map(s => `- ${s}`).join('\n')}\n\nWhat would you like to know?`;
}

/**
 * Post-process LLM response
 * @param {string} response - Raw LLM response
 * @param {Object} options - Processing options
 * @returns {string} Processed response
 */
export function postProcessResponse(response, options = {}) {
  const {
    removeExtraWhitespace = true,
    ensureMarkdown = true,
    maxLength = 1000
  } = options;
  
  let processed = response;
  
  // Remove extra whitespace
  if (removeExtraWhitespace) {
    processed = processed.replace(/\n{3,}/g, '\n\n').trim();
  }
  
  // Ensure proper markdown formatting
  if (ensureMarkdown) {
    // Add space after list markers if missing
    processed = processed.replace(/^(-|\*|\d+\.)\s*/gm, '$1 ');
  }
  
  // Truncate if too long
  if (processed.length > maxLength) {
    processed = processed.substring(0, maxLength - 3) + '...';
  }
  
  return processed;
}
