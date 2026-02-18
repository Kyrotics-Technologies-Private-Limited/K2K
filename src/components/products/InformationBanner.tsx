import React from "react";
import { Product } from "../../types";
import { useBannerUrls } from "../../hooks/useBannerUrls";

interface BenefitsBannerProps {
  product: Product;
}

const BANNER_KEY_FALLBACKS: Record<string, string> = {
  ghee_banner: "/assets/bannerimg/GheeBanner.png",
  honey_banner: "/assets/bannerimg/HoneyBanner.png",
};

function resolveBannerSrc(value: string | undefined, getUrl: (k: string) => string | undefined): string | undefined {
  if (!value) return undefined;
  const v = value.replace(/^url\(["']?|["']?\)$/g, "").trim();
  if (!v) return undefined;
  if (/^https?:\/\//i.test(v)) return v;
  if (v.startsWith("/")) return v;
  return getUrl(v) ?? BANNER_KEY_FALLBACKS[v];
}

export const BenefitsBanner: React.FC<BenefitsBannerProps> = ({ product }) => {
  const { getUrl } = useBannerUrls();
  const src = resolveBannerSrc(product.images.banner, getUrl) ?? product.images.banner;
  if (!src) return null;
  return (
    <div className="relative shadow-lg bg-contain bg-center mb-10">
      <img src={src} alt="banner" className="w-full h-full object-contain rounded-xl" />
    </div>
  );
};
