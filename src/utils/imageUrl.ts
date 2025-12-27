import { IMAGE_CDN_BASE } from "@/config/imageCdn";

/**
 * Image variant types for responsive loading
 */
export type ImageVariant = "thumb" | "medium" | "full";

/**
 * Options for building image URLs
 */
export interface ImageUrlOptions {
  album: string;
  sequence: string | number;
  variant?: ImageVariant;
}

/**
 * Builds a CDN image URL for gallery images
 */
export function getImageUrl({
  album,
  sequence,
  variant = "medium",
}: ImageUrlOptions): string {
  const seq =
    typeof sequence === "number"
      ? String(sequence).padStart(3, "0")
      : sequence;

  return `${IMAGE_CDN_BASE}/${album}/${seq}/${variant}.webp`;
}

/**
 * Get all image variants for a specific image
 * Useful for responsive images and progressive loading
 */
export function getImageVariants(
  album: string,
  sequence: number | string
) {
  const seq =
    typeof sequence === "number"
      ? String(sequence).padStart(3, "0")
      : sequence;

  return {
    thumb: getImageUrl({ album, sequence: seq, variant: "thumb" }),
    medium: getImageUrl({ album, sequence: seq, variant: "medium" }),
    full: getImageUrl({ album, sequence: seq, variant: "full" }),
  };
}

/**
 * Fetch image metadata from meta.json
 * Returns null if metadata doesn't exist
 */
export async function getImageMeta(
  album: string,
  sequence: number | string
): Promise<any | null> {
  const seq =
    typeof sequence === "number"
      ? String(sequence).padStart(3, "0")
      : sequence;

  const url = `${IMAGE_CDN_BASE}/${album}/${seq}/meta.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch metadata for ${album}/${seq}:`, error);
    return null;
  }
}
