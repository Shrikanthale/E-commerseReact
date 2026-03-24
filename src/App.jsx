import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { useShop } from './context/useShop';
import { createAppTheme } from './theme/createAppTheme';
import CartPage from './Pages/CartPage';
import CheckoutPage from './Pages/CheckoutPage';
import Home from './Pages/Home';
import ProductDetail from './Pages/ProductDetail';
import Products from './Pages/Products';
import WishlistPage from './Pages/WishlistPage';

function ThemedRoutes() {
  const { colorMode } = useShop();
  const theme = useMemo(() => createAppTheme(colorMode), [colorMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default function App() {
  return <ThemedRoutes />;
}
