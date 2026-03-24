import { useMemo, useState } from 'react';
import { filterProducts } from '../utils/filterProducts';
import { PRICE_BOUNDS, products } from '../services/products';

export function useFilteredProducts() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([
    PRICE_BOUNDS.min,
    PRICE_BOUNDS.max,
  ]);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(
    () =>
      filterProducts(products, {
        search,
        category,
        priceRange,
        minRating,
      }),
    [search, category, priceRange, minRating]
  );

  return {
    search,
    setSearch,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    filtered,
    priceBounds: PRICE_BOUNDS,
  };
}
