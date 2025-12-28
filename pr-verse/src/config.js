/**
 * Cloudflare Worker Configuration
 * Centralized configuration for CORS and other settings
 */

export function getAllowedOrigins(env) {
  if (env.CORS_ALLOWED_ORIGINS) {
    return env.CORS_ALLOWED_ORIGINS.split(',').map(origin => origin.trim());
  }
  
  // Default allowed origins
  return [
    'https://prasannar.com',
    'https://www.prasannar.com',
    'http://localhost:8080',
  ];
}

export function getAllowedOrigin(requestOrigin, env) {
  const allowedOrigins = getAllowedOrigins(env);
  const defaultOrigin = env.DEFAULT_ORIGIN || 'https://prasannar.com';
  
  return allowedOrigins.includes(requestOrigin) ? requestOrigin : defaultOrigin;
}

export function getCorsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const allowedOrigin = getAllowedOrigin(origin, env);
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Visitor-Id',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  };
}

export function handleCorsPreFlight(request, env) {
  const corsHeaders = getCorsHeaders(request, env);
  return new Response(null, { 
    status: 200, 
    headers: corsHeaders 
  });
}
