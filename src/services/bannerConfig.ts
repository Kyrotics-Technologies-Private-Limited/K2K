/**
 * Banner config: loads storage paths from Firestore (config/appConfig.banners)
 * and resolves them to download URLs via Firebase Storage.
 * Used so banners are served from Firebase Storage instead of the frontend bundle.
 */

import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase/firebase";

const CONFIG_COLLECTION = "config";
const CONFIG_DOC = "appConfig";
const BANNERS_FIELD = "banners";

let cachedUrls: Record<string, string> | null = null;
let loadPromise: Promise<Record<string, string>> | null = null;

export type BannerKey =
  | "hero_atta"
  | "hero_ghee"
  | "hero_mustard_oil"
  | "hero_sesar_oil"
  | "hero_dal"
  | "hero_k2k_products"
  | "farmer_slider_mission"
  | "farmer_slider_adulteration"
  | "all_products_banner"
  | "all_products_banner_img"
  | "traceability_banner"
  | "footer_banner"
  | "footer_logo"
  | "try_our_sample"
  | "ghee_banner"
  | "honey_banner";

async function loadBannerUrls(): Promise<Record<string, string>> {
  if (cachedUrls) return cachedUrls;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const configSnap = await getDoc(doc(db, CONFIG_COLLECTION, CONFIG_DOC));
    const paths = configSnap.exists() ? configSnap.get(BANNERS_FIELD) : undefined;

    if (!paths || typeof paths !== "object") {
      return {};
    }

    const urls: Record<string, string> = {};
    await Promise.all(
      Object.entries(paths).map(async ([key, storagePath]) => {
        if (typeof storagePath !== "string") return;
        try {
          const url = await getDownloadURL(ref(storage, storagePath));
          urls[key] = url;
        } catch {
          // skip failed resolution
        }
      })
    );

    cachedUrls = urls;
    return urls;
  })();

  return loadPromise;
}

/**
 * Returns all banner URLs (key -> url). Resolves from Firestore + Storage once and caches.
 */
export async function getBannerUrls(): Promise<Record<string, string>> {
  return loadBannerUrls();
}

/**
 * Returns a single banner URL by key. Returns undefined if not loaded or key missing.
 */
export function getBannerUrl(key: BannerKey | string): string | undefined {
  return cachedUrls?.[key];
}

/**
 * Resolve a value that may be a banner key or a full URL.
 * Use for product.images.banner which can be either.
 */
export function resolveBannerSrc(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.replace(/^url\(["']?|["']?\)$/g, "").trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("/")) return trimmed;
  return getBannerUrl(trimmed);
}
