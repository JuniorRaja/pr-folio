import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import MyCarousel from "@/components/ui/MyCarousel";

import doorsImg from "/gallery/thumbnails/tnail_doors.jpeg";
import macroImg from "/gallery/thumbnails/tnail_macro.jpeg";
import minimalImg from "/gallery/thumbnails/tnail_minimal.jpg";
import natureImg from "/gallery/thumbnails/tnail_nature.jpg";
import patternsImg from "/gallery/thumbnails/tnail_patterns.jpg";


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
  const [loading, setLoading] = useState<boolean>(false);


  const albums: AlbumItem[] = [
    {
      id: 1,
      name: "Doors & Windows",
      likes: 0,
      views: 0,
      img: doorsImg,
      route: "doors",
      des: "Unique doors and windows from around the world.",
    },
    {
      id: 2,
      name: "Macro",
      likes: 0,
      views: 0,
      img: macroImg,
      route: "macro",
      des: "Get closer to the world around you.",
    },
    {
      id: 3,
      name: "Minimal",
      likes: 0,
      views: 0,
      img: minimalImg,
      route: "minimal",
      des: "Less is the new more",
    },
    {
      id: 4,
      name: "Nature",
      likes: 0,
      views: 0,
      img: natureImg,
      route: "nature",
      des: "Indeed the most beautiful mother nature",
    },
    {
      id: 5,
      name: "Patterns",
      likes: 0,
      views: 0,
      img: patternsImg,
      route: "patterns",
      des: "They are everywhere, just look around",
    },
  ];

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);



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
          <div className="relative">
            <div className="h-auto min-h-[45rem] md:max-w-[90%] m-auto text-center">
              {loading ? <p>Loading...</p> : <MyCarousel albums={albums} />}
            </div>
          </div>

          {/* Album Stats 
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
          </div>*/}
        </div>
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
