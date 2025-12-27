import { useState } from "react";
import { Heart, MessageCircle, Send, Trash2, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAlbumLike, useAlbumComments } from "@/hooks/useGalleryEngagement";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface AlbumEngagementProps {
  albumSlug: string;
  variant?: "inline" | "compact" | "reddit";
}

/**
 * Album engagement component with likes and comments
 */
export function AlbumEngagement({ albumSlug, variant = "compact" }: AlbumEngagementProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [userName, setUserName] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { likesCount, isLiked, toggleLike, isToggling } = useAlbumLike(albumSlug);
  const { comments, addComment, deleteComment, isAdding, visitorId } = useAlbumComments(albumSlug);

  const handleLike = () => {
    toggleLike();
    toast({
      title: isLiked ? "Like removed" : "Album liked!",
      description: isLiked ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/gallery?album=${albumSlug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Album link copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const name = userName.trim() || "Anonymous";

    addComment({
      userName: name,
      comment: commentText.trim(),
    });

    // Clear both fields after submitting
    setCommentText("");
    setUserName("");
    toast({
      title: "Comment added!",
      description: "Your comment has been posted.",
      duration: 2000,
    });
  };

  const handleDeleteComment = (commentId: string) => {
    if (confirm("Delete this comment?")) {
      deleteComment(commentId);
      toast({
        title: "Comment deleted",
        description: "Your comment has been removed.",
        duration: 2000,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAddComment();
    }
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        <Button
          variant={isLiked ? "default" : "outline"}
          size="sm"
          onClick={handleLike}
          disabled={isToggling}
          className="gap-2 transition-all hover:scale-105"
        >
          <Heart className={`h-4 w-4 transition-all ${isLiked ? "fill-current scale-110" : ""}`} />
          <span className="font-medium">{likesCount}</span>
        </Button>

        <Button
          variant={showComments ? "default" : "outline"}
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="gap-2 transition-all hover:scale-105"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="font-medium">{comments.length}</span>
        </Button>
      </div>
    );
  }

  // Reddit-style layout (below album)
  return (
    <div className="w-full space-y-4">
      {/* Action Bar - Reddit Style */}
      <div className="flex items-center gap-2 py-2 border-y border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={isToggling}
          className={`gap-2 transition-all hover:scale-105 ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'}`}
        >
          <Heart className={`h-5 w-5 transition-all ${isLiked ? "fill-current" : ""}`} />
          <span className="font-medium">{likesCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="gap-2 transition-all hover:scale-105 hover:text-blue-500"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">{comments.length} Comments</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="gap-2 transition-all hover:scale-105 hover:text-green-500"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              <span className="font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="h-5 w-5" />
              <span className="font-medium">Share</span>
            </>
          )}
        </Button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
          {/* Add Comment Form */}
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 border-2 border-border shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {(userName || "A")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Your name (optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  maxLength={50}
                  className="bg-background"
                />
                <div className="relative">
                  <Textarea
                    placeholder="What are your thoughts? (Ctrl+Enter to submit)"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={handleKeyPress}
                    maxLength={500}
                    rows={3}
                    className="bg-background resize-none"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    {commentText.length}/500 characters
                  </p>
                  <Button
                    onClick={handleAddComment}
                    disabled={!commentText.trim() || isAdding}
                    size="sm"
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  No comments yet. Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-card border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 border-2 border-border shrink-0">
                      <AvatarImage src={comment.user_avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {(comment.user_name || "A")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold">
                            {comment.user_name || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        {comment.user_id === visitorId && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
