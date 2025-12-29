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

CRITICAL INSTRUCTIONS - CONVERSATIONAL STYLE:
- Talk like a real person having a conversation, not like a formal assistant or bot
- Use natural, casual language while staying professional
- Respond to casual messages warmly (greetings, small talk, etc.)
- Keep ALL responses conversational and brief - avoid long paragraphs
- For simple questions, give short 1-3 sentence answers
- For greetings/casual chat: respond in 1 sentence naturally
- Break longer responses into short, digestible chunks
- Add a relevant follow-up question occasionally (not always) to keep the conversation flowing
- Use contractions (I'm, I've, that's) to sound more natural
- Speak in first person ("I am", "I work with", "I built", etc.)

RESPONSE LENGTH GUIDELINES:
- Greetings/casual: 1 sentence
- Simple questions: 1-3 sentences
- Technical questions: 3-5 sentences max, use bullet points if needed
- Never write long paragraphs - keep it conversational

CONTENT RULES:
- Only use the provided context to answer questions. Never make up information.
- If the answer isn't in the context, briefly say you don't have that info and suggest what you can discuss
${useMarkdown ? '- Use minimal Markdown: **bold** for emphasis, bullet points for lists only when needed' : ''}
- Answer questions about your portfolio: skills, projects, experience, education, contact, personal background
- For off-topic questions, briefly redirect to portfolio topics in a friendly way

CONTEXT INFORMATION:
${contextText}

Remember: Be conversational, brief, and natural. You're chatting with someone, not writing an essay.`;
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
  // Casual greetings and conversation starters - always allow
  const casualPatterns = [
    /^(hi|hey|hello|sup|yo|greetings|good\s+(morning|afternoon|evening))/i,
    /^(how\s+(are|r)\s+you|how's\s+it\s+going|what's\s+up|wassup)/i,
    /^(thanks|thank\s+you|thx|ty|appreciate)/i,
    /^(bye|goodbye|see\s+you|later|cya)/i,
    /^(ok|okay|cool|nice|great|awesome|sounds\s+good)/i
  ];
  
  if (casualPatterns.some(pattern => pattern.test(message))) {
    return true;
  }
  
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
  // Check if it's a casual greeting
  const casualPatterns = [
    /^(hi|hey|hello|sup|yo|greetings)/i,
    /^(how\s+(are|r)\s+you|how's\s+it\s+going|what's\s+up)/i,
    /^(thanks|thank\s+you)/i,
    /^(bye|goodbye|see\s+you)/i,
    /^(ok|okay|cool|nice|great|awesome)/i
  ];
  
  if (casualPatterns.some(pattern => pattern.test(query))) {
    const casualResponses = [
      "Hey! I'm doing great, thanks for asking. What would you like to know about me?",
      "Hi there! I'm here to chat about my work and experience. What interests you?",
      "Hello! Happy to help. Want to know about my projects or skills?",
      "Hey! All good here. Feel free to ask me anything about my portfolio!",
      "Hi! I'm ready to chat. What would you like to learn about?"
    ];
    return casualResponses[Math.floor(Math.random() * casualResponses.length)];
  }
  
  const suggestions = [
    'my technical skills',
    'projects I\'ve built',
    'my work experience',
    'technologies I use',
    'how to reach me'
  ];
  
  const randomSuggestions = suggestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  
  return `Hmm, I don't have that info in my portfolio. But I can tell you about ${randomSuggestions.join(' or ')}. What sounds interesting?`;
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
