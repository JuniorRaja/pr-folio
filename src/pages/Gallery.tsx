import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MyCarousel from "@/components/ui/MyCarousel";
import { InlineAlbumViewer } from "@/components/InlineAlbumViewer";
import { useAlbums } from "@/hooks/useGalleryEngagement";

interface AlbumItem {
  id: number;
  name: string;
  likes: number;
  views: number;
  img: string;
  route: string;
  des: string;
}

const Gallery = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [openAlbum, setOpenAlbum] = useState<AlbumItem | null>(null);
  const { data: albumsData, isLoading: albumsLoading } = useAlbums();

  // Build albums from API data
  const albums: AlbumItem[] = albumsData?.albums?.map((album: any, index: number) => ({
    id: index + 1,
    name: album.title,
    likes: album.likes_count || 0,
    views: album.comments_count || 0,
    img: album.thumbnail_url || '/placeholder.svg',
    route: album.slug,
    des: album.description,
  })) || [];

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    setLoading(albumsLoading);
  }, [albumsLoading]);

  const handleViewAlbum = (album: AlbumItem) => {
    setOpenAlbum(album);
  };

  const handleCloseAlbum = () => {
    setOpenAlbum(null);
  };



  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden ">
      <Navigation />

      <main className="pt-20 ">
        <div className="container mx-auto px-4 py-16 ">
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
          <div className="relative w-full flex items-center justify-center">
            <div className="w-full max-w-7xl">
              {loading ? (
                <div className="flex items-center justify-center h-[70vh]">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : albums.length > 0 ? (
                <MyCarousel albums={albums} onViewAlbum={handleViewAlbum} />
              ) : (
                <div className="flex items-center justify-center h-[70vh]">
                  <p className="text-muted-foreground">No albums found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Inline Album Viewer */}
        {openAlbum && (
          <InlineAlbumViewer
            albumSlug={openAlbum.route}
            albumName={openAlbum.name}
            albumDescription={openAlbum.des}
            onClose={handleCloseAlbum}
          />
        )}
      </main>

      <Footer />



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
