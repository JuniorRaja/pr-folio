import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyCarousel.module.css";

export interface AlbumItem {
  id: number;
  name: string;
  likes: number;
  views: number;
  img: string;
  route: string;
  des: string;
}

const Carousel: React.FC<{ albums: AlbumItem[] }> = ({ albums }) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const saveCarouselState = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      const firstItemId = items[0]?.getAttribute('data-album-id');
      if (firstItemId) {
        sessionStorage.setItem('currentAlbumId', firstItemId);
      }
    }
  };

  const restoreCarouselState = () => {
    const savedAlbumId = sessionStorage.getItem('currentAlbumId');
    if (savedAlbumId && slideRef.current) {
      const items = slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      const targetIndex = Array.from(items).findIndex(item => 
        item.getAttribute('data-album-id') === savedAlbumId
      );
      
      if (targetIndex > 0) {
        for (let i = 0; i < targetIndex; i++) {
          const currentItems = slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
          slideRef.current.appendChild(currentItems[0]);
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(restoreCarouselState, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNextClick = () => {
    if (slideRef.current) {
      const items =
        slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      if (items.length > 0) {
        slideRef.current.appendChild(items[0]);
        saveCarouselState();
      }
    }
  };

  const handlePrevClick = () => {
    if (slideRef.current) {
      const items =
        slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      if (items.length > 0) {
        slideRef.current.prepend(items[items.length - 1]);
        saveCarouselState();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.slide} ref={slideRef}>
        {albums.map((item) => (
          <div
            className={styles.item}
            key={item.id}
            style={{ backgroundImage: `url(${item.img})` }}
            id={`CarouselItem`}
            data-album-id={item.id.toString()}
          >
            {/* The album name, description and see more button div */}
            <div className={styles.content}>
              <div className={styles.name}>{item.name}</div>
              <div>{item.des}</div>
              <button
                className={styles.link}
                onClick={() => navigate(`/gallery/${item.route}`)}
              >
                See More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* The album navigation buttons div */}
      <div className={styles.button}>
        <button
          className={`${styles.prev} prev navButton`}
          onClick={handlePrevClick}
        >
          Prev.
        </button>
        <button
          className={`${styles.next} next navButton`}
          onClick={handleNextClick}
        >
          Next.
        </button>
      </div>
    </div>
  );
};

export default Carousel;
