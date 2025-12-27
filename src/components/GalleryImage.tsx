import { getImageVariants } from "@/utils/imageUrl";

interface GalleryImageProps {
  album: string;
  sequence: number | string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Responsive gallery image component with progressive loading
 * Uses <picture> element for optimal image delivery
 */
export function GalleryImage({
  album,
  sequence,
  alt = "",
  className = "",
  onClick,
}: GalleryImageProps) {
  const img = getImageVariants(album, sequence);

  return (
    <picture className={className} onClick={onClick}>
      <source srcSet={img.full} media="(min-width: 1200px)" />
      <source srcSet={img.medium} media="(min-width: 600px)" />
      <img
        src={img.thumb}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />
    </picture>
  );
}
