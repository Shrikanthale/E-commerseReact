import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { ShopContext } from './shopContext';

const STORAGE_CART = 'luxe-cart-v1';
const STORAGE_WISH = 'luxe-wish-v1';
const STORAGE_MODE = 'luxe-mode-v1';

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const [colorMode, setColorModeState] = useState(() => {
    const m = loadJson(STORAGE_MODE, 'dark');
    return m === 'light' || m === 'dark' ? m : 'dark';
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => loadJson(STORAGE_CART, []));
  const [wishlistIds, setWishlistIds] = useState(() =>
    loadJson(STORAGE_WISH, [])
  );
  const [flyingItem, setFlyingItem] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_WISH, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_MODE, JSON.stringify(colorMode));
  }, [colorMode]);

  const setColorMode = useCallback((mode) => {
    setColorModeState(mode);
  }, []);

  const toggleColorMode = useCallback(() => {
    setColorModeState((m) => (m === 'dark' ? 'light' : 'dark'));
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((n, line) => n + line.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    [cart]
  );

  const addToCart = useCallback(
    (product, quantity = 1, anchorEvent = null) => {
      setCart((prev) => {
        const i = prev.findIndex((l) => l.product.id === product.id);
        if (i >= 0) {
          const next = [...prev];
          next[i] = {
            ...next[i],
            quantity: next[i].quantity + quantity,
          };
          return next;
        }
        return [...prev, { product, quantity }];
      });
      enqueueSnackbar(`${product.name} added to bag`, { variant: 'success' });

      if (anchorEvent?.currentTarget && product.images?.[0]) {
        const from = anchorEvent.currentTarget.getBoundingClientRect();
        const cartEl = document.getElementById('cart-anchor');
        const to = cartEl?.getBoundingClientRect();
        if (to) {
          setFlyingItem({
            id: `${product.id}-${Date.now()}`,
            src: product.images[0],
            from: { x: from.left + from.width / 2, y: from.top + from.height / 2 },
            to: { x: to.left + to.width / 2, y: to.top + to.height / 2 },
          });
        }
      }
    },
    [enqueueSnackbar]
  );

  const clearFlyingItem = useCallback(() => setFlyingItem(null), []);

  const removeFromCart = useCallback(
    (productId) => {
      let removedName = null;
      setCart((prev) => {
        const line = prev.find((l) => l.product.id === productId);
        if (line) removedName = line.product.name;
        return prev.filter((l) => l.product.id !== productId);
      });
      if (removedName) {
        enqueueSnackbar(`Removed ${removedName}`, { variant: 'info' });
      }
    },
    [enqueueSnackbar]
  );

  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      setCart((prev) => prev.filter((l) => l.product.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((l) =>
        l.product.id === productId ? { ...l, quantity } : l
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback(
    (productId) => {
      let snack = null;
      setWishlistIds((prev) => {
        const has = prev.includes(productId);
        if (has) {
          snack = { message: 'Removed from wishlist', variant: 'default' };
          return prev.filter((id) => id !== productId);
        }
        snack = { message: 'Saved to wishlist', variant: 'success' };
        return [...prev, productId];
      });
      if (snack) {
        enqueueSnackbar(snack.message, { variant: snack.variant });
      }
    },
    [enqueueSnackbar]
  );

  const isInWishlist = useCallback(
    (productId) => wishlistIds.includes(productId),
    [wishlistIds]
  );

  const value = useMemo(
    () => ({
      colorMode,
      setColorMode,
      toggleColorMode,
      cartOpen,
      setCartOpen,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      wishlistIds,
      toggleWishlist,
      isInWishlist,
      flyingItem,
      clearFlyingItem,
    }),
    [
      colorMode,
      setColorMode,
      toggleColorMode,
      cartOpen,
      cart,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      wishlistIds,
      toggleWishlist,
      isInWishlist,
      flyingItem,
      clearFlyingItem,
    ]
  );

  return (
    <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
  );
}
