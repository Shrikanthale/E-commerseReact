const norm = (s) => (s || '').toLowerCase().trim();

/**
 * @param {object[]} products
 * @param {{ search: string; category: string; priceRange: [number, number]; minRating: number }} filters
 */
export function filterProducts(products, filters) {
  const { search, category, priceRange, minRating } = filters;
  const [minP, maxP] = priceRange;
  const q = norm(search);

  return products.filter((p) => {
    if (category && category !== 'all' && p.category !== category) return false;
    if (p.price < minP || p.price > maxP) return false;
    if (p.rating < minRating) return false;
    if (q) {
      const hay = `${p.name} ${p.description}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}
