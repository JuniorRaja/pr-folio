-- Portfolio Gallery Database Schema
-- Albums table: stores album metadata
CREATE TABLE IF NOT EXISTS albums (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

-- Album likes table: tracks visitor likes per album
CREATE TABLE IF NOT EXISTS album_likes (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  album_slug TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (album_slug) REFERENCES albums(slug) ON DELETE CASCADE,
  UNIQUE (album_slug, visitor_id)
);

-- Album comments table: stores visitor comments per album
CREATE TABLE IF NOT EXISTS album_comments (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  album_slug TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT,
  user_avatar TEXT,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  FOREIGN KEY (album_slug) REFERENCES albums(slug) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_album_likes_album ON album_likes(album_slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_album_likes_visitor ON album_likes(visitor_id) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_album_comments_album ON album_comments(album_slug) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_album_comments_created ON album_comments(created_at DESC);

-- Seed initial albums
INSERT OR IGNORE INTO albums (slug, title, description) VALUES
  ('doors', 'Doors & Windows', 'Unique doors and windows from around the world.'),
  ('macro', 'Macro', 'Get closer to the world around you.'),
  ('minimal', 'Minimal', 'Less is the new more'),
  ('nature', 'Nature', 'Indeed the most beautiful mother nature'),
  ('patterns', 'Patterns', 'They are everywhere, just look around');
