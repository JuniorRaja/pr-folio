import React, { useRef } from "react";
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

  const handleNextClick = () => {
    if (slideRef.current) {
      const items =
        slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      if (items.length > 0) {
        slideRef.current.appendChild(items[0]);
      }
    }
  };

  const handlePrevClick = () => {
    if (slideRef.current) {
      const items =
        slideRef.current.querySelectorAll<HTMLDivElement>("#CarouselItem");
      if (items.length > 0) {
        slideRef.current.prepend(items[items.length - 1]);
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
          >
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
