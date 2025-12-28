// Gallery API endpoints for album likes and comments

/**
 * Handle gallery-related API requests
 */
export async function handleGalleryRequest(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;

  // CORS helper - allow localhost for development
  const getAllowedOrigin = (requestOrigin) => {
    const allowedOrigins = [
      'https://prasannar.com',
      'https://www.prasannar.com',
      'http://localhost:8080',
      'http://localhost:5173',
      'http://127.0.0.1:8080',
      'http://127.0.0.1:5173'
    ];
    return allowedOrigins.includes(requestOrigin) ? requestOrigin : 'https://prasannar.com';
  };

  const origin = request.headers.get('Origin');
  const allowedOrigin = getAllowedOrigin(origin);

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Visitor-Id',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
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
          const manifestResponse = await fetch(
            `https://cdn.jsdelivr.net/gh/JuniorRaja/static/images/generated/${album.slug}/manifest.json`,
            {
              headers: {
                'Accept': 'application/json',
                'User-Agent': 'Portfolio-Gallery'
              }
            }
          );
          
          if (manifestResponse.ok) {
            const manifest = await manifestResponse.json();
            const photoCount = manifest.images ? manifest.images.length : 0;
            
            // Select random image from manifest
            let thumbnailUrl = null;
            if (photoCount > 0) {
              const randomIndex = Math.floor(Math.random() * photoCount);
              const randomImageNumber = String(randomIndex + 1).padStart(3, '0');
              thumbnailUrl = `https://cdn.jsdelivr.net/gh/JuniorRaja/static/images/generated/${album.slug}/${randomImageNumber}/medium.webp`;
            }
            
            return {
              ...album,
              photo_count: photoCount,
              thumbnail_url: thumbnailUrl
            };
          }
          
          // Fallback to GitHub API if manifest doesn't exist
          const response = await fetch(
            `https://api.github.com/repos/JuniorRaja/static/contents/assets/${album.slug}`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Gallery'
              }
            }
          );
          
          if (response.ok) {
            const files = await response.json();
            const photoFiles = files.filter((file) => 
              file.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
            );
            
            // Select random photo as thumbnail
            let thumbnailFile = null;
            if (photoFiles.length > 0) {
              const randomIndex = Math.floor(Math.random() * photoFiles.length);
              thumbnailFile = photoFiles[randomIndex].name;
            }
            
            return {
              ...album,
              photo_count: photoFiles.length,
              thumbnail_url: thumbnailFile 
                ? `https://cdn.jsdelivr.net/gh/JuniorRaja/static/assets/${album.slug}/${thumbnailFile}`
                : null
            };
          }
          
          return { ...album, photo_count: 0, thumbnail_url: null };
        } catch (error) {
          console.error(`Error fetching photos for ${album.slug}:`, error);
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
