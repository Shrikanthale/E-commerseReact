import { Box, Stack } from '@mui/material';
import CartDrawer from '../cart/CartDrawer';
import FlyingAddAnimation from './FlyingAddAnimation';
import Footer from './Footer';
import Navbar from './Navbar';
import PageTransition from './PageTransition';

export default function Layout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: (t) =>
          t.palette.mode === 'dark'
            ? 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.25), transparent), #07070d'
            : 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.12), transparent), #f4f2fb',
      }}
    >
      <Stack sx={{ px: { xs: 0, sm: 0 }, pt: 0, flex: 1 }}>
        <Navbar />
        <PageTransition />
      </Stack>
      <Footer />
      <CartDrawer />
      <FlyingAddAnimation />
    </Box>
  );
}
