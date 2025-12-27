import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GALLERY_API } from "@/config/api";

/**
 * Generate or retrieve visitor ID from localStorage
 */
function getVisitorId(): string {
  const key = "gallery_visitor_id";
  let visitorId = localStorage.getItem(key);
  
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    localStorage.setItem(key, visitorId);
  }
  
  return visitorId;
}

/**
 * Album stats interface
 */
export interface AlbumStats {
  likes_count: number;
  comments_count: number;
  user_liked: boolean;
}

/**
 * Comment interface
 */
export interface AlbumComment {
  id: string;
  user_id: string;
  user_name?: string;
  user_avatar?: string;
  comment: string;
  created_at: string;
}

/**
 * Hook to manage album likes
 */
export function useAlbumLike(albumSlug: string) {
  const queryClient = useQueryClient();
  const visitorId = getVisitorId();

  // Fetch album stats
  const { data: stats, isLoading } = useQuery<AlbumStats>({
    queryKey: ["albumStats", albumSlug],
    queryFn: async () => {
      const response = await fetch(GALLERY_API.albumStats(albumSlug), {
        headers: {
          "X-Visitor-Id": visitorId,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch album stats");
      return response.json();
    },
  });

  // Toggle like mutation
  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(GALLERY_API.toggleLike(albumSlug), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitorId }),
      });
      if (!response.ok) throw new Error("Failed to toggle like");
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch album stats
      queryClient.invalidateQueries({ queryKey: ["albumStats", albumSlug] });
    },
  });

  return {
    likesCount: stats?.likes_count || 0,
    isLiked: stats?.user_liked || false,
    isLoading,
    toggleLike: toggleLikeMutation.mutate,
    isToggling: toggleLikeMutation.isPending,
  };
}

/**
 * Hook to manage album comments
 */
export function useAlbumComments(albumSlug: string) {
  const queryClient = useQueryClient();
  const visitorId = getVisitorId();

  // Fetch comments
  const { data, isLoading } = useQuery<{ comments: AlbumComment[] }>({
    queryKey: ["albumComments", albumSlug],
    queryFn: async () => {
      const response = await fetch(GALLERY_API.comments(albumSlug));
      if (!response.ok) throw new Error("Failed to fetch comments");
      return response.json();
    },
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: async (comment: {
      userName?: string;
      userAvatar?: string;
      comment: string;
    }) => {
      const response = await fetch(GALLERY_API.comments(albumSlug), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: visitorId,
          ...comment,
        }),
      });
      if (!response.ok) throw new Error("Failed to add comment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albumComments", albumSlug] });
      queryClient.invalidateQueries({ queryKey: ["albumStats", albumSlug] });
    },
  });

  // Delete comment mutation
  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await fetch(GALLERY_API.deleteComment(commentId), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: visitorId }),
      });
      if (!response.ok) throw new Error("Failed to delete comment");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albumComments", albumSlug] });
      queryClient.invalidateQueries({ queryKey: ["albumStats", albumSlug] });
    },
  });

  return {
    comments: data?.comments || [],
    isLoading,
    addComment: addCommentMutation.mutate,
    isAdding: addCommentMutation.isPending,
    deleteComment: deleteCommentMutation.mutate,
    isDeleting: deleteCommentMutation.isPending,
    visitorId,
  };
}

/**
 * Hook to fetch all albums with engagement stats
 */
export function useAlbums() {
  return useQuery({
    queryKey: ["albums"],
    queryFn: async () => {
      try {
        const response = await fetch(GALLERY_API.albums);
        if (!response.ok) {
          throw new Error(`Failed to fetch albums: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching albums:', error);
        throw error;
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
