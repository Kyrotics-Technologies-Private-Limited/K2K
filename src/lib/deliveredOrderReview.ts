import type { Order, OrderItem } from "../types/order";

export interface ProductToReview {
  productId: string;
  name?: string;
  image?: string;
}

/**
 * From delivered orders, collect product IDs that the user has not yet reviewed.
 * Dedupes by product_id and attaches first OrderItem's name/image for display.
 */
export function getUnreviewedDeliveredProducts(
  orders: Order[],
  reviewedProductIds: string[]
): ProductToReview[] {
  const reviewedSet = new Set(reviewedProductIds.map((id) => id));
  const seen = new Set<string>();
  const result: ProductToReview[] = [];

  const delivered = (orders || []).filter(
    (o) => o.status?.toLowerCase() === "delivered" && o.items?.length
  );

  for (const order of delivered) {
    for (const item of order.items as OrderItem[]) {
      const pid = item.product_id;
      if (!pid || reviewedSet.has(pid) || seen.has(pid)) continue;
      seen.add(pid);
      result.push({
        productId: pid,
        name: item.name,
        image: item.image,
      });
    }
  }

  return result;
}

const REVIEW_PROMPT_DISMISSED_KEY = "reviewPromptDismissed";
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export function wasReviewPromptDismissedRecently(): boolean {
  try {
    const raw = sessionStorage.getItem(REVIEW_PROMPT_DISMISSED_KEY);
    if (!raw) return false;
    const ts = parseInt(raw, 10);
    if (Number.isNaN(ts)) return false;
    return Date.now() - ts < DISMISS_DURATION_MS;
  } catch {
    return false;
  }
}

export function setReviewPromptDismissed(): void {
  try {
    sessionStorage.setItem(REVIEW_PROMPT_DISMISSED_KEY, String(Date.now()));
  } catch {
    // ignore
  }
}
