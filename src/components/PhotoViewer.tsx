import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SimplePhoto {
  name: string;
  url: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  loaded?: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface PhotoViewerProps {
  photos: SimplePhoto[];
  albumTitle: string;
  albumRoute: string;
  initialPhotoIndex: number;
  onClose: () => void;
}

const PhotoViewer = ({ photos, albumTitle, albumRoute, initialPhotoIndex, onClose }: PhotoViewerProps) => {
  const location = useLocation();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(initialPhotoIndex);
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const { toast } = useToast();

  const currentPhoto = photos[currentPhotoIndex];

  useEffect(() => {
    setComments([]);
    setIsLiked(false);
  }, [currentPhotoIndex]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") previousPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev < photos.length - 1 ? prev + 1 : 0
    );
  };

  const previousPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev > 0 ? prev - 1 : photos.length - 1
    );
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Like removed" : "Photo liked!",
      description: isLiked ? "Removed from favorites" : "Added to favorites",
    });
  };

  const handleShare = () => {
    const photoId = currentPhoto.name.split('.')[0];
    const shareUrl = `${window.location.origin}/gallery/${albumRoute}?photo=${currentPhotoIndex}`;
    const shareText = `Check out this photo "${photoId}" from ${albumTitle} album: ${shareUrl}`;
    
    navigator.clipboard.writeText(shareText);
    toast({
      title: "Link copied!",
      description: "Photo link with details copied to clipboard",
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "You",
        content: newComment,
        timestamp: new Date().toISOString(),
      };
      setComments([...comments, comment]);
      setNewComment("");
      toast({
        title: "Comment added!",
        description: "Your comment has been posted",
      });
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-full max-h-[90vh] grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Main Image Section */}
        <div className="lg:col-span-2 relative bg-black rounded-lg overflow-hidden">

          {/* Navigation Buttons */}
          {photos.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={previousPhoto}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={nextPhoto}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Photo Counter */}
          <div className="absolute top-4 right-4 z-10 bg-black/50 px-3 py-1 rounded-full text-white text-sm">
            {currentPhotoIndex + 1} / {photos.length}
          </div>

          <img
            src={currentPhoto.url}
            alt={currentPhoto.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Sidebar - Photo Details */}
        <Card className="glass-card p-6 flex flex-col h-full overflow-hidden relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 hover:bg-muted"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
          
          {/* Header */}
          <div className="mb-6 pr-12">
            <h2 className="text-xl font-bold mb-2">{albumTitle}</h2>
            <Badge variant="outline" className="border-primary/20">
              Photo {currentPhotoIndex + 1}
            </Badge>
          </div>

          {/* Photo Info */}
          <div className="mb-6">
            <p className="text-foreground">{currentPhoto.name}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`${isLiked ? "text-red-500" : "text-muted-foreground"} hover:text-red-500`}
            >
              <Heart className={`w-5 h-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
              {isLiked ? 1 : 0}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageCircle className="w-5 h-5 mr-2" />
              {comments.length}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-muted-foreground"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Comments Section */}
          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="font-semibold mb-4">Comments</h3>
            
            {/* Comments List */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-primary">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>

            {/* Add Comment */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                className="flex-1 bg-muted/50 border-border/20"
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Post
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PhotoViewer;