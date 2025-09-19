import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import PhotoViewer from "@/components/PhotoViewer";

interface AlbumPhoto {
  name: string;
  url: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  loaded?: boolean;
}

const AlbumPage = () => {
  const { album } = useParams<{ album: string }>();
  const [searchParams] = useSearchParams();
  const [photos, setPhotos] = useState<AlbumPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const albumData: Record<string, { name: string; des: string }> = {
    doors: { name: "Doors & Windows", des: "Unique doors and windows from around the world." },
    macro: { name: "Macro", des: "Get closer to the world around you." },
    minimal: { name: "Minimal", des: "Less is the new more" },
    nature: { name: "Nature", des: "Indeed the most beautiful mother nature" },
    patterns: { name: "Patterns", des: "They are everywhere, just look around" },
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!album) return;
      
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/repos/JuniorRaja/static/contents/assets/${album}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        
        const data = await response.json();
        const photoList = data
          .filter((item: any) => item.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(item.name))
          .map((item: any) => ({
            name: item.name,
            url: `https://cdn.jsdelivr.net/gh/JuniorRaja/static/assets/${album}/${item.name}`,
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
  }, [album]);

  useEffect(() => {
    const photoParam = searchParams.get('photo');
    if (photoParam && photos.length > 0) {
      const photoIndex = parseInt(photoParam);
      if (photoIndex >= 0 && photoIndex < photos.length) {
        setSelectedPhotoIndex(photoIndex);
      }
    }
  }, [searchParams, photos]);

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
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="text-lg">Loading photos...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
              Beautiful world in
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {albumData[album || '']?.name || album} <span className="gradient-text">Collection</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              {albumData[album || '']?.des || ''}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => {
              const getGridClass = () => {
                if (photo.aspectRatio === 'landscape') return 'md:col-span-2';
                if (photo.aspectRatio === 'portrait') return 'md:row-span-2';
                return '';
              };
              
              return (
                <div
                  key={index}
                  className={`relative overflow-hidden rounded-lg bg-muted hover:scale-102 transition-transform duration-300 cursor-pointer ${getGridClass()}`}
                  onClick={() => setSelectedPhotoIndex(index)}
                >
                  {!loadedImages.has(index) && (
                    <Skeleton className="absolute inset-0 w-full h-full" />
                  )}
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      photo.aspectRatio === 'landscape' ? 'aspect-video' : 
                      photo.aspectRatio === 'portrait' ? 'aspect-[9/16]' : 'aspect-square'
                    } ${loadedImages.has(index) ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={(e) => handleImageLoad(index, e.target as HTMLImageElement)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      
      {selectedPhotoIndex !== null && (
        <PhotoViewer
          photos={photos}
          albumTitle={albumData[album || '']?.name || album || ''}
          albumRoute={album || ''}
          initialPhotoIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
        />
      )}
    </div>
  );
};

export default AlbumPage;