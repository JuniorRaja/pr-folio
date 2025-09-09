import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import PhotoViewer from "@/components/PhotoViewer";

interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: Photo[];
  category: string;
}

interface Photo {
  id: string;
  url: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const Gallery = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  // Sample albums data
  const albums: Album[] = [
    {
      id: "1",
      title: "Urban Landscapes",
      description: "Capturing the beauty of cityscapes and urban architecture",
      coverImage:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=800&h=600&fit=crop",
      category: "Architecture",
      photos: [
        {
          id: "1",
          url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=1200&h=800&fit=crop",
          caption: "Downtown skyline at golden hour",
          timestamp: "2024-01-15T18:30:00Z",
          likes: 124,
          comments: [
            {
              id: "1",
              author: "Sarah",
              content: "Amazing perspective!",
              timestamp: "2024-01-16T09:00:00Z",
            },
            {
              id: "2",
              author: "Mike",
              content: "Love the lighting",
              timestamp: "2024-01-16T10:15:00Z",
            },
          ],
        },
        {
          id: "2",
          url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=800&fit=crop",
          caption: "Architectural details and shadows",
          timestamp: "2024-01-14T14:20:00Z",
          likes: 89,
          comments: [],
        },
      ],
    },
    {
      id: "2",
      title: "Nature's Canvas",
      description: "Exploring the raw beauty of natural landscapes",
      coverImage:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "Nature",
      photos: [
        {
          id: "3",
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
          caption: "Mountain peaks at sunrise",
          timestamp: "2024-01-10T06:45:00Z",
          likes: 203,
          comments: [
            {
              id: "3",
              author: "Alex",
              content: "Breathtaking view!",
              timestamp: "2024-01-11T08:00:00Z",
            },
          ],
        },
      ],
    },
    {
      id: "3",
      title: "Street Photography",
      description: "Life in motion - candid moments from the streets",
      coverImage:
        "https://images.unsplash.com/photo-1519564069-a98c1d0b5b7b?w=800&h=600&fit=crop",
      category: "Street",
      photos: [
        {
          id: "4",
          url: "https://images.unsplash.com/photo-1519564069-a98c1d0b5b7b?w=1200&h=800&fit=crop",
          caption: "Rush hour reflections",
          timestamp: "2024-01-08T17:30:00Z",
          likes: 156,
          comments: [],
        },
      ],
    },
    {
      id: "4",
      title: "Macro World",
      description: "Discovering beauty in the smallest details",
      coverImage:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
      category: "Macro",
      photos: [
        {
          id: "5",
          url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&h=800&fit=crop",
          caption: "Morning dew on petals",
          timestamp: "2024-01-05T07:20:00Z",
          likes: 278,
          comments: [
            {
              id: "4",
              author: "Emma",
              content: "Such delicate beauty",
              timestamp: "2024-01-05T12:00:00Z",
            },
            {
              id: "5",
              author: "David",
              content: "Perfect macro shot!",
              timestamp: "2024-01-05T15:30:00Z",
            },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  const handleAlbumClick = (album: Album) => {
    setSelectedAlbum(album);
    setSelectedPhotoIndex(0);
  };

  const handleCloseViewer = () => {
    setSelectedAlbum(null);
    setSelectedPhotoIndex(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
              Beautiful world in
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Different <span className="gradient-text">Perspectives</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              One of the five senses, sight. Photography is an art that gives a
              good feeling to through the eyes. I still learn and to me, art is
              something that you can never master.
            </p>
          </div>

          {/* Albums Carousel */}
          <div className="relative">
            <Carousel className="w-full max-w-6xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {albums.map((album) => (
                  <CarouselItem
                    key={album.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card
                      className="group glass-card hover-lift cursor-pointer overflow-hidden border-primary/10 hover:border-primary/30 transition-all duration-300"
                      onClick={() => handleAlbumClick(album)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={album.coverImage}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <Badge
                          variant="secondary"
                          className="absolute top-4 right-4 bg-black/50 text-white border-white/20"
                        >
                          {album.category}
                        </Badge>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {album.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {album.description}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{album.photos.length} photos</span>
                          <span className="text-primary">View Album →</span>
                        </div>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-black/50 border-white/20 hover:bg-black/70" />
              <CarouselNext className="hidden md:flex -right-12 bg-black/50 border-white/20 hover:bg-black/70" />
            </Carousel>
          </div>

          {/* Album Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {albums.length}
              </div>
              <div className="text-muted-foreground">Albums</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {albums.reduce(
                  (total, album) => total + album.photos.length,
                  0
                )}
              </div>
              <div className="text-muted-foreground">Photos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {albums.reduce(
                  (total, album) =>
                    total +
                    album.photos.reduce(
                      (albumTotal, photo) => albumTotal + photo.likes,
                      0
                    ),
                  0
                )}
              </div>
              <div className="text-muted-foreground">Total Likes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {new Set(albums.map((album) => album.category)).size}
              </div>
              <div className="text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Photo Viewer Modal */}
      {selectedAlbum && selectedPhotoIndex !== null && (
        <PhotoViewer
          album={selectedAlbum}
          initialPhotoIndex={selectedPhotoIndex}
          onClose={handleCloseViewer}
        />
      )}

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl floating-animation" />
        <div
          className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  );
};

export default Gallery;
