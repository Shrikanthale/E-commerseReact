import { Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import GlassSurface from '../common/GlassSurface';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 6,
        px: 2,
        background: (t) =>
          `linear-gradient(180deg, transparent 0%, ${alpha(t.palette.primary.main, 0.06)} 100%)`,
      }}
    >
      <Container maxWidth="xl">
        <GlassSurface sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Box>
              <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.03em' }}>
                SHRI
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 360 }}>
                A portfolio storefront concept — premium motion, glass, and craft-inspired commerce UI.
              </Typography>
            </Box>
            <Stack direction="row" spacing={3} flexWrap="wrap">
              <MuiLink component={Link} to="/products" color="inherit" underline="hover">
                Shop
              </MuiLink>
              <MuiLink component={Link} to="/cart" color="inherit" underline="hover">
                Bag
              </MuiLink>
              <MuiLink component={Link} to="/wishlist" color="inherit" underline="hover">
                Wishlist
              </MuiLink>
            </Stack>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3 }}>
            © {new Date().getFullYear()} SHRI demo. Images via Unsplash.
          </Typography>
        </GlassSurface>
      </Container>
    </Box>
  );
}
