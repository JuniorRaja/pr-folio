import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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

const Carousel: React.FC<{ albums: AlbumItem[]; onViewAlbum?: (album: AlbumItem) => void }> = ({ albums, onViewAlbum }) => {
  const slideRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState<AlbumItem>(albums[0]);

  const updateCurrentAlbum = () => {
    if (slideRef.current) {
      const items = slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      // The second item (index 1) is the active one displayed in full
      const activeItemId = items[1]?.getAttribute('data-album-id');
      const album = albums.find(a => a.id.toString() === activeItemId);
      if (album) {
        setCurrentAlbum(album);
      }
    }
  };

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
    const timer = setTimeout(() => {
      restoreCarouselState();
      updateCurrentAlbum();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleNextClick = () => {
    if (slideRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const items = slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      if (items.length > 0) {
        slideRef.current.appendChild(items[0]);
        saveCarouselState();
        setTimeout(() => {
          updateCurrentAlbum();
          setIsTransitioning(false);
        }, 600);
      }
    }
  };

  const handlePrevClick = () => {
    if (slideRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const items = slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      if (items.length > 0) {
        slideRef.current.prepend(items[items.length - 1]);
        saveCarouselState();
        setTimeout(() => {
          updateCurrentAlbum();
          setIsTransitioning(false);
        }, 600);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextClick();
    }
    if (isRightSwipe) {
      handlePrevClick();
    }
  };

  return (
    <div className={styles.container}>
      <div 
        className={styles.slide} 
        ref={slideRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {albums.map((item) => (
          <div
            className={styles.item}
            key={item.id}
            style={{ backgroundImage: `url(${item.img})` }}
            id={`CarouselItem`}
            data-album-id={item.id.toString()}
          />
        ))}
      </div>

      {/* Persistent blur overlay on top of images */}
      <div className={styles.blurOverlay} />

      {/* Content displayed on top of blur */}
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <div className={styles.name}>{currentAlbum.name}</div>
          <div className={styles.des}>{currentAlbum.des}</div>
          <button
            className={styles.link}
            onClick={() => {
              if (onViewAlbum) {
                onViewAlbum(currentAlbum);
              } else {
                navigate(`/gallery/${currentAlbum.route}`);
              }
            }}
          >
            <span>View Album</span>
            <ArrowRight className={styles.linkIcon} size={18} />
          </button>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={handlePrevClick}
          disabled={isTransitioning}
          aria-label="Previous album"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={handleNextClick}
          disabled={isTransitioning}
          aria-label="Next album"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Swipe indicator for mobile */}
      <div className={styles.swipeIndicator}>
        <div className={styles.swipeText}>
          <ChevronLeft size={16} className={styles.swipeIcon} />
          <span>Swipe</span>
          <ChevronRight size={16} className={styles.swipeIcon} />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
