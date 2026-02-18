import { useState, useEffect } from "react";
import { getBannerUrls } from "../services/bannerConfig";

export function useBannerUrls() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getBannerUrls()
      .then((res) => {
        if (!cancelled) {
          setUrls(res);
          const count = Object.keys(res).length;
          if (import.meta.env.DEV && count > 0) {
            const sample = Object.entries(res)[0];
            const fromFirebase = sample?.[1]?.includes("firebasestorage.googleapis.com");
            console.log(
              `[Banners] ${fromFirebase ? "Loaded from Firebase Storage" : "Using fallback (no Firebase config)"}: ${count} URLs`,
              sample ? { key: sample[0], url: sample[1]?.slice(0, 60) + "..." } : ""
            );
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message ?? "Failed to load banners");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const getUrl = (key: string) => urls[key];

  return { urls, loading, error, getUrl };
}
