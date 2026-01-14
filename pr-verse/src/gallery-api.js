// Gallery API endpoints for album likes and comments
import { getCorsHeaders, handleCorsPreFlight } from './config.js';

/**
 * Handle gallery-related API requests
 */
export async function handleGalleryRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Get CORS headers from centralized config
  const corsHeaders = getCorsHeaders(request, env);

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return handleCorsPreFlight(request, env);
  }

  try {
    // Route handlers
    if (path === '/api/gallery/albums' && request.method === 'GET') {
      return await getAlbums(env, corsHeaders);
    }
    
    if (path.match(/^\/api\/gallery\/albums\/[^/]+$/) && request.method === 'GET') {
      const slug = path.split('/').pop();
      return await getAlbumStats(env, slug, corsHeaders, request);
    }

    if (path.match(/^\/api\/gallery\/albums\/[^/]+\/like$/) && request.method === 'POST') {
      const slug = path.split('/')[4];
      return await toggleLike(request, env, slug, corsHeaders);
    }

    if (path.match(/^\/api\/gallery\/albums\/[^/]+\/comments$/) && request.method === 'GET') {
      const slug = path.split('/')[4];
      return await getComments(env, slug, corsHeaders);
    }

    if (path.match(/^\/api\/gallery\/albums\/[^/]+\/comments$/) && request.method === 'POST') {
      const slug = path.split('/')[4];
      return await addComment(request, env, slug, corsHeaders);
    }

    if (path.match(/^\/api\/gallery\/comments\/[^/]+$/) && request.method === 'DELETE') {
      const commentId = path.split('/').pop();
      return await deleteComment(request, env, commentId, corsHeaders);
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Gallery API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

/**
 * Get all albums with engagement stats and photo count from CDN
 */
async function getAlbums(env, corsHeaders) {
  try {
    const { results } = await env.DB.prepare(`
      SELECT 
        a.slug,
        a.title,
        a.description,
        COUNT(DISTINCT al.id) as likes_count,
        COUNT(DISTINCT ac.id) as comments_count
      FROM albums a
      LEFT JOIN album_likes al ON a.slug = al.album_slug AND al.deleted_at IS NULL
      LEFT JOIN album_comments ac ON a.slug = ac.album_slug AND ac.deleted_at IS NULL
      WHERE a.is_active = TRUE AND a.deleted_at IS NULL
      GROUP BY a.slug, a.title, a.description
      ORDER BY a.slug
    `).all();

    // Fetch photo counts and random thumbnail from manifest.json for each album
    const albumsWithPhotos = await Promise.all(
      results.map(async (album) => {
        try {
          // First try to fetch manifest.json
          const manifestUrl = `https://cdn.jsdelivr.net/gh/JuniorRaja/static/images/generated/${album.slug}/_manifest.json`;
          
          const manifestResponse = await fetch(
            manifestUrl,
            {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'Portfolio-Gallery'
              }
            }
          );
          
          if (manifestResponse.ok) {
            let manifestText = await manifestResponse.text();
            
            // remove trailing commas
            manifestText = manifestText.replace(/,(\s*[}\]])/g, '$1');
            
            let manifest;
            try {
              manifest = JSON.parse(manifestText);
            } catch (parseError) {
              console.error(`[Gallery API] Failed to parse manifest for ${album.slug}:`, parseError);
              // Continue to fallback
              throw parseError;
            }
            
            // Handle different manifest structures
            let photoCount = 0;
            let sequences = [];
            
            if (manifest.images && Array.isArray(manifest.images)) {
              photoCount = manifest.images.length;
              sequences = manifest.images.map((_, i) => String(i + 1).padStart(3, '0'));
            } else if (typeof manifest === 'object' && !Array.isArray(manifest)) {
              // Object format: { "original_name.jpg": "001", ... }
              sequences = Object.values(manifest);
              photoCount = sequences.length;
            } else if (manifest.image_count) {
              photoCount = manifest.image_count;
              sequences = Array.from({ length: photoCount }, (_, i) => String(i + 1).padStart(3, '0'));
            } else if (manifest.count) {
              photoCount = manifest.count;
              sequences = Array.from({ length: photoCount }, (_, i) => String(i + 1).padStart(3, '0'));
            } else if (typeof manifest === 'number') {
              photoCount = manifest;
              sequences = Array.from({ length: photoCount }, (_, i) => String(i + 1).padStart(3, '0'));
            }
            
            // Select random image from manifest
            let thumbnailUrl = null;
            if (sequences.length > 0) {
              const randomIndex = Math.floor(Math.random() * sequences.length);
              const randomImageNumber = sequences[randomIndex];
              thumbnailUrl = `https://cdn.jsdelivr.net/gh/JuniorRaja/static/images/generated/${album.slug}/${randomImageNumber}/medium.webp`;
            } else {
              console.warn(`[Gallery API] No sequences found for ${album.slug}`);
            }
            
            return {
              ...album,
              photo_count: photoCount,
              thumbnail_url: thumbnailUrl
            };
          }
          
          // Fallback to GitHub API if manifest doesn't exist
          const githubUrl = `https://api.github.com/repos/JuniorRaja/static/contents/images/generated/${album.slug}`;
          
          const response = await fetch(
            githubUrl,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Gallery'
              }
            }
          );
          
          if (response.ok) {
            const files = await response.json();
            
            // Filter for directories (numbered folders like 001, 002, etc.)
            const photoFolders = files.filter((file) => 
              file.type === 'dir' && /^\d{3}$/.test(file.name)
            );
            
            // Select random photo folder as thumbnail
            let thumbnailUrl = null;
            if (photoFolders.length > 0) {
              const randomIndex = Math.floor(Math.random() * photoFolders.length);
              const randomFolder = photoFolders[randomIndex].name;
              thumbnailUrl = `https://cdn.jsdelivr.net/gh/JuniorRaja/static/images/generated/${album.slug}/${randomFolder}/medium.webp`;
            } else {
              console.warn(`[Gallery API] No photo folders found for ${album.slug}`);
            }
            
            return {
              ...album,
              photo_count: photoFolders.length,
              thumbnail_url: thumbnailUrl
            };
          }
          
          console.warn(`[Gallery API] Both manifest and GitHub API failed for ${album.slug}`);
          return { ...album, photo_count: 0, thumbnail_url: null };
        } catch (error) {
          console.error(`[Gallery API] Error fetching photos for ${album.slug}:`, error);
          return { ...album, photo_count: 0, thumbnail_url: null };
        }
      })
    );

    return new Response(JSON.stringify({ albums: albumsWithPhotos }), {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error in getAlbums:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch albums', albums: [] }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

/**
 * Get album stats including user's like status
 */
async function getAlbumStats(env, slug, corsHeaders, request) {
  try {
    const visitorId = request.headers.get('X-Visitor-Id') || 'anonymous';

    const stats = await env.DB.prepare(`
      SELECT 
        COUNT(DISTINCT al.id) as likes_count,
        COUNT(DISTINCT ac.id) as comments_count,
        EXISTS(
          SELECT 1 FROM album_likes 
          WHERE album_slug = ? AND visitor_id = ? AND deleted_at IS NULL
        ) as user_liked
      FROM albums a
      LEFT JOIN album_likes al ON a.slug = al.album_slug AND al.deleted_at IS NULL
      LEFT JOIN album_comments ac ON a.slug = ac.album_slug AND ac.deleted_at IS NULL
      WHERE a.slug = ? AND a.is_active = TRUE AND a.deleted_at IS NULL
    `).bind(slug, visitorId, slug).first();

    if (!stats) {
      return new Response(JSON.stringify({ error: 'Album not found' }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify(stats), {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error in getAlbumStats:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch album stats' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

/**
 * Toggle like for an album
 */
async function toggleLike(request, env, slug, corsHeaders) {
  try {
    const body = await request.json();
    const { visitorId } = body;

    if (!visitorId) {
      return new Response(JSON.stringify({ error: 'Visitor ID required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Check if album exists
    const album = await env.DB.prepare(
      'SELECT slug FROM albums WHERE slug = ? AND is_active = TRUE AND deleted_at IS NULL'
    ).bind(slug).first();

    if (!album) {
      return new Response(JSON.stringify({ error: 'Album not found' }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    // Check if like exists (including soft-deleted ones)
    const existingLike = await env.DB.prepare(
      'SELECT id, deleted_at FROM album_likes WHERE album_slug = ? AND visitor_id = ?'
    ).bind(slug, visitorId).first();

    if (existingLike) {
      if (existingLike.deleted_at) {
        // Re-like: restore the soft-deleted like
        await env.DB.prepare(
          'UPDATE album_likes SET deleted_at = NULL WHERE id = ?'
        ).bind(existingLike.id).run();

        return new Response(JSON.stringify({ liked: true, message: 'Like added' }), {
          headers: corsHeaders,
        });
      } else {
        // Unlike: soft delete
        await env.DB.prepare(
          'UPDATE album_likes SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?'
        ).bind(existingLike.id).run();

        return new Response(JSON.stringify({ liked: false, message: 'Like removed' }), {
          headers: corsHeaders,
        });
      }
    } else {
      // First time like: insert new record
      await env.DB.prepare(
        'INSERT INTO album_likes (album_slug, visitor_id) VALUES (?, ?)'
      ).bind(slug, visitorId).run();

      return new Response(JSON.stringify({ liked: true, message: 'Like added' }), {
        headers: corsHeaders,
      });
    }
  } catch (error) {
    console.error('Error in toggleLike:', error);
    return new Response(JSON.stringify({ error: 'Failed to toggle like' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

/**
 * Get comments for an album
 */
async function getComments(env, slug, corsHeaders) {
  try {
    const { results } = await env.DB.prepare(`
      SELECT 
        id,
        user_id,
        user_name,
        user_avatar,
        comment,
        created_at
      FROM album_comments
      WHERE album_slug = ? AND deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT 100
    `).bind(slug).all();

    return new Response(JSON.stringify({ comments: results }), {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error in getComments:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch comments', comments: [] }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

/**
 * Add a comment to an album
 */
async function addComment(request, env, slug, corsHeaders) {
  try {
    const body = await request.json();
    const { userId, userName, userAvatar, comment } = body;

    if (!userId || !comment || comment.trim().length === 0) {
      return new Response(JSON.stringify({ error: 'User ID and comment required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (comment.length > 500) {
      return new Response(JSON.stringify({ error: 'Comment too long (max 500 characters)' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Check if album exists
    const album = await env.DB.prepare(
      'SELECT slug FROM albums WHERE slug = ? AND is_active = TRUE AND deleted_at IS NULL'
    ).bind(slug).first();

    if (!album) {
      return new Response(JSON.stringify({ error: 'Album not found' }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    // Get current timestamp as ISO string
    const currentTimestamp = new Date().toISOString();

    // Insert comment with explicit timestamp
    const result = await env.DB.prepare(
      'INSERT INTO album_comments (album_slug, user_id, user_name, user_avatar, comment, created_at) VALUES (?, ?, ?, ?, ?, ?) RETURNING id, created_at'
    ).bind(slug, userId, userName || null, userAvatar || null, comment.trim(), currentTimestamp).first();

    return new Response(JSON.stringify({
      message: 'Comment added',
      comment: {
        id: result.id,
        user_id: userId,
        user_name: userName,
        user_avatar: userAvatar,
        comment: comment.trim(),
        created_at: result.created_at,
      }
    }), {
      status: 201,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error in addComment:', error);
    return new Response(JSON.stringify({ error: 'Failed to add comment' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

/**
 * Delete a comment (soft delete)
 */
async function deleteComment(request, env, commentId, corsHeaders) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // Check if comment exists and belongs to user
    const comment = await env.DB.prepare(
      'SELECT id FROM album_comments WHERE id = ? AND user_id = ? AND deleted_at IS NULL'
    ).bind(commentId, userId).first();

    if (!comment) {
      return new Response(JSON.stringify({ error: 'Comment not found or unauthorized' }), {
        status: 404,
        headers: corsHeaders,
      });
    }

    // Soft delete with current timestamp
    const currentTimestamp = new Date().toISOString();
    await env.DB.prepare(
      'UPDATE album_comments SET deleted_at = ? WHERE id = ?'
    ).bind(currentTimestamp, commentId).run();

    return new Response(JSON.stringify({ message: 'Comment deleted' }), {
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Error in deleteComment:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete comment' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
