import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlbumEngagement } from "@/components/AlbumEngagement";

interface AlbumPhoto {
  name: string;
  url: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  loaded?: boolean;
}

interface InlineAlbumViewerProps {
  albumSlug: string;
  albumName: string;
  albumDescription: string;
  onClose: () => void;
}

export function InlineAlbumViewer({ 
  albumSlug, 
  albumName, 
  albumDescription, 
  onClose 
}: InlineAlbumViewerProps) {
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        
        // First try to fetch from manifest.json
        const manifestResponse = await fetch(
          `https://cdn.jsdelivr.net/gh/JuniorRaja/static/images/generated/${albumSlug}/manifest.json`,
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        
        if (manifestResponse.ok) {
          const manifest = await manifestResponse.json();
          const photoList = manifest.images.map((_: any, index: number) => {
            const seq = String(index + 1).padStart(3, '0');
            return {
              name: `${seq}.webp`,
              url: `https://cdn.jsdelivr.net/gh/JuniorRaja/static/images/generated/${albumSlug}/${seq}/medium.webp`,
              loaded: false
            };
          });
          
          setPhotos(photoList);
          setLoading(false);
          return;
        }
        
        // Fallback to GitHub API
        const response = await fetch(
          `https://api.github.com/repos/JuniorRaja/static/contents/assets/${albumSlug}`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'Portfolio-Gallery'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        
        const data = await response.json();
        const photoList = data
          .filter((item: any) => item.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name))
          .map((item: any) => ({
            name: item.name,
            url: `https://cdn.jsdelivr.net/gh/JuniorRaja/static/assets/${albumSlug}/${item.name}`,
            loaded: false
          }));
        
        setPhotos(photoList);
      } catch (err) {
        setError('Failed to load photos');
        console.error('Error fetching photos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [albumSlug]);

  useEffect(() => {
    // Scroll to album when it opens
    if (albumRef.current) {
      albumRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const detectAspectRatio = (img: HTMLImageElement): 'landscape' | 'portrait' | 'square' => {
    const ratio = img.naturalWidth / img.naturalHeight;
    if (ratio > 1.2) return 'landscape';
    if (ratio < 0.8) return 'portrait';
    return 'square';
  };

  const handleImageLoad = (index: number, img: HTMLImageElement) => {
    const aspectRatio = detectAspectRatio(img);
    setPhotos(prev => prev.map((photo, i) => 
      i === index ? { ...photo, aspectRatio, loaded: true } : photo
    ));
    setLoadedImages(prev => new Set(prev).add(index));
    
    // Mark initial load complete after first image loads
    if (index === 0 && isInitialLoad) {
      setIsInitialLoad(false);
    }
  };

  const scrollToPhoto = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const photoWidth = container.offsetWidth;
      container.scrollTo({
        left: index * photoWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    scrollToPhoto(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    scrollToPhoto(newIndex);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const photoWidth = container.offsetWidth;
      const newIndex = Math.round(container.scrollLeft / photoWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  if (loading) {
    return (
      <div 
        ref={albumRef} 
        className="w-full bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-xl border-t border-border/50 py-16 scroll-mt-20 animate-in fade-in duration-500"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {albumName}
              </h2>
              <p className="text-muted-foreground text-lg">{albumDescription}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center h-96 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <div className="text-muted-foreground">Loading photos...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        ref={albumRef} 
        className="w-full bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-xl border-t border-border/50 py-16 scroll-mt-20 animate-in fade-in duration-500"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {albumName}
              </h2>
              <p className="text-muted-foreground text-lg">{albumDescription}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center h-96 rounded-2xl border border-destructive/50 bg-destructive/5 backdrop-blur-sm">
            <div className="text-destructive text-lg font-medium">{error}</div>
            <Button 
              variant="outline" 
              onClick={onClose}
              className="mt-4"
            >
              Close Album
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={albumRef} 
      className="w-full bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-xl border-t border-border/50 py-16 scroll-mt-20 animate-in fade-in slide-in-from-bottom-4 duration-700 relative overflow-hidden"
    >
      {/* Animated Glowing Orb Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float-slow" 
             style={{ 
               top: '20%', 
               left: '10%',
               animation: 'float-slow 12s ease-in-out infinite'
             }} 
        />
        <div className="absolute w-48 h-48 bg-purple-500/15 rounded-full blur-3xl animate-float-slow" 
             style={{ 
               bottom: '30%', 
               right: '15%',
               animation: 'float-slow 15s ease-in-out infinite reverse',
               animationDelay: '3s'
             }} 
        />
      </div>

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 md:mb-12 animate-in fade-in slide-in-from-top-2 duration-500">
          <div className="flex-1 max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {albumName}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">{albumDescription}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="shrink-0 h-10 w-10 rounded-full hover:bg-destructive/10 hover:text-destructive transition-all duration-300 hover:rotate-90"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Photo Carousel - Narrower and More Modern */}
        <div className="relative mb-8 animate-in fade-in zoom-in-95 duration-700 delay-150">
          {/* Navigation Buttons - More Prominent */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-20 bg-background/90 backdrop-blur-md hover:bg-primary/20 hover:scale-110 border border-border/50 rounded-full h-10 w-10 md:h-14 md:w-14 shadow-xl transition-all duration-300"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-20 bg-background/90 backdrop-blur-md hover:bg-primary/20 hover:scale-110 border border-border/50 rounded-full h-10 w-10 md:h-14 md:w-14 shadow-xl transition-all duration-300"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5 md:h-7 md:w-7" />
          </Button>

          {/* Photo Container with Glassmorphism */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 bg-gradient-to-br from-card/40 via-card/30 to-card/20 backdrop-blur-xl">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none"></div>
            
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide relative z-10"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full snap-center"
                >
                  <div
                    className="relative overflow-hidden cursor-pointer group"
                    onClick={() => {
                      // Open full size image in new tab
                      const fullImageUrl = photo.url.replace('/medium.webp', '/full.webp');
                      window.open(fullImageUrl, '_blank');
                    }}
                    style={{ height: 'clamp(400px, 60vh, 600px)' }}
                  >
                    {!loadedImages.has(index) && (
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className={`w-full h-full object-contain transition-all duration-700 ${
                        loadedImages.has(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      } group-hover:scale-105`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      onLoad={(e) => handleImageLoad(index, e.target as HTMLImageElement)}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                      <span className="text-xs md:text-sm text-foreground/90 font-medium px-3 md:px-4 py-1.5 md:py-2 bg-background/50 backdrop-blur-sm rounded-full border border-border/50">
                        Click to open full size
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Dot Indicators - Sleeker Design */}
          <div className="flex justify-center gap-2 mt-4">
            {photos.slice(0, 10).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToPhoto(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-10 bg-primary shadow-lg shadow-primary/50' 
                    : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:w-6'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
            {photos.length > 10 && (
              <span className="text-xs text-muted-foreground self-center ml-2">
                +{photos.length - 10} more
              </span>
            )}
          </div>
        </div>

        {/* Engagement Section - Below Album (Reddit Style) */}
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
          <AlbumEngagement albumSlug={albumSlug} variant="reddit" />
        </div>
      </div>
    </div>
  );
}
