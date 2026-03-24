import { ArrowForwardRoundedIcon } from '../components/icons';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../services/products';
import GlassSurface from '../components/common/GlassSurface';
import GlowButton from '../components/common/GlowButton';
import ProductCard from '../components/product/ProductCard';
import { accentGradient } from '../theme/surfaces';

const MotionBox = motion.create(Box);
const MotionDiv = motion.div;

export default function Home() {
  const theme = useTheme();
  const featured = products.slice(0, 4);

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '72vh', md: '78vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          borderRadius: { xs: 0, md: 4 },
          mx: { xs: 0, md: 3 },
          mt: { xs: 2, md: 3 },
        }}
      >
        <Box
          component="img"
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85"
          alt="Boutique interior"
          loading="lazy"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              theme.palette.mode === 'dark'
                ? 'linear-gradient(105deg, rgba(7,7,13,0.92) 0%, rgba(7,7,13,0.55) 45%, transparent 100%)'
                : 'linear-gradient(105deg, rgba(244,242,251,0.94) 0%, rgba(244,242,251,0.5) 50%, transparent 100%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            sx={{ maxWidth: 640 }}
          >
            <Typography
              variant="overline"
              sx={{
                letterSpacing: '0.35em',
                color: 'secondary.main',
                fontWeight: 700,
              }}
            >
              New season
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 2,
                fontSize: { xs: '2.25rem', md: '3.75rem' },
                fontWeight: 800,
                lineHeight: 1.05,
              }}
            >
              Crafted for those who notice the details.
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2, fontWeight: 400 }}>
              Elevated essentials across fashion, tech, footwear, and objects — with glass, glow, and motion at every touchpoint.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              <GlowButton
                component={Link}
                to="/products"
                size="large"
                endIcon={<ArrowForwardRoundedIcon />}
              >
                Explore collection
              </GlowButton>
              <GlowButton
                component={Link}
                to="/products?q=sneaker"
                variant="outlined"
                size="large"
                sx={{
                  borderWidth: 2,
                  borderColor: alpha(theme.palette.primary.main, 0.4),
                  color: 'text.primary',
                  background: 'transparent',
                  boxShadow: 'none',
                  '&:hover': {
                    borderWidth: 2,
                    borderColor: 'primary.main',
                    background: alpha(theme.palette.primary.main, 0.06),
                    boxShadow: 'none',
                  },
                }}
              >
                Shop runners
              </GlowButton>
            </Stack>
          </MotionBox>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 } }}>
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.25em' }}>
                Curated
              </Typography>
              <Typography variant="h4" fontWeight={800}>
                Featured now
              </Typography>
            </Box>
            <Typography
              component={Link}
              to="/products"
              variant="body2"
              sx={{
                fontWeight: 700,
                textDecoration: 'none',
                color: 'secondary.main',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              View all →
            </Typography>
          </Stack>
        </MotionDiv>

        <Grid container spacing={3}>
          {featured.map((p, i) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <ProductCard product={p} index={i} />
            </Grid>
          ))}
        </Grid>

        <GlassSurface
          sx={{
            mt: 8,
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            textAlign: 'center',
            background: accentGradient,
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              background: 'radial-gradient(circle at 30% 30%, #fff, transparent 55%)',
            }}
          />
          <Box sx={{ position: 'relative' }}>
            <Typography variant="h5" fontWeight={800}>
              Join the inner circle
            </Typography>
            <Typography sx={{ mt: 1, opacity: 0.9 }}>
              Early access drops, private styling sessions, and members-only palettes.
            </Typography>
            <GlowButton
              component={Link}
              to="/products"
              variant="outlined"
              sx={{
                mt: 3,
                color: '#fff',
                borderColor: alpha('#fff', 0.6),
                background: 'transparent',
                boxShadow: 'none',
                '&:hover': {
                  borderColor: '#fff',
                  background: alpha('#fff', 0.12),
                  boxShadow: 'none',
                },
              }}
            >
              Start browsing
            </GlowButton>
          </Box>
        </GlassSurface>
      </Container>
    </Box>
  );
}
