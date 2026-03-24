import {
  ArrowBackRoundedIcon,
  FavoriteBorderRoundedIcon,
  FavoriteRoundedIcon,
  ShoppingBagRoundedIcon,
} from '../components/icons';
import {
  Avatar,
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GlassSurface from '../components/common/GlassSurface';
import GlowButton from '../components/common/GlowButton';
import LazyImage from '../components/common/LazyImage';
import StarRating from '../components/common/StarRating';
import EmptyState from '../components/common/EmptyState';
import { useShop } from '../context/useShop';
import { getProductById } from '../services/products';
import { formatPrice } from '../utils/formatPrice';
import { neoSurface } from '../theme/surfaces';

const MotionBox = motion.create(Box);
const MotionDiv = motion.div;

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const product = id ? getProductById(id) : null;
  const [imgIndex, setImgIndex] = useState(0);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wished = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <Container sx={{ py: 6 }}>
        <EmptyState
          title="Product not found"
          description="This piece may have moved. Return to the shop to keep exploring."
          illustration="search"
          action={
            <GlowButton component={Link} to="/products">
              Back to shop
            </GlowButton>
          }
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, flex: 1 }}>
      <GlowButton
        startIcon={<ArrowBackRoundedIcon />}
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 3, borderWidth: 2 }}
      >
        Back
      </GlowButton>

      <Breadcrumbs sx={{ mb: 2 }}>
        <Typography component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
          Home
        </Typography>
        <Typography component={Link} to="/products" color="inherit" sx={{ textDecoration: 'none' }}>
          Shop
        </Typography>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <GlassSurface sx={{ p: 2, borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <MotionBox
                  key={imgIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LazyImage
                    src={product.images[imgIndex]}
                    alt={`${product.name} view ${imgIndex + 1}`}
                    aspectRatio="4 / 5"
                  />
                </MotionBox>
              </AnimatePresence>
            </Box>
            <Stack direction="row" spacing={1.5} sx={{ mt: 2 }} flexWrap="wrap">
              {product.images.map((src, i) => (
                <Box
                  key={src}
                  onClick={() => setImgIndex(i)}
                  sx={{
                    width: 72,
                    height: 72,
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: 2,
                    borderColor: i === imgIndex ? 'secondary.main' : 'transparent',
                    boxShadow:
                      i === imgIndex
                        ? `0 0 16px ${alpha(theme.palette.secondary.main, 0.45)}`
                        : 'none',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt=""
                    loading="lazy"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Stack>
          </GlassSurface>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <MotionDiv
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.25em' }}>
              {product.category}
            </Typography>
            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
              <Typography variant="h4" fontWeight={800} sx={{ mt: 1 }}>
                {product.name}
              </Typography>
              <IconButton
                onClick={() => toggleWishlist(product.id)}
                sx={{ ...neoSurface(theme), flexShrink: 0 }}
                aria-label="Wishlist"
              >
                {wished ? <FavoriteRoundedIcon color="secondary" /> : <FavoriteBorderRoundedIcon />}
              </IconButton>
            </Stack>
            <StarRating value={product.rating} count={product.reviewCount} size="medium" />
            <Typography
              variant="h4"
              sx={{
                mt: 2,
                fontWeight: 800,
                background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {formatPrice(product.price)}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 3, lineHeight: 1.8 }}>
              {product.description}
            </Typography>
            <GlowButton
              fullWidth
              size="large"
              sx={{ mt: 4 }}
              startIcon={<ShoppingBagRoundedIcon />}
              onClick={(e) => addToCart(product, 1, e)}
            >
              Add to bag
            </GlowButton>
          </MotionDiv>

          <GlassSurface sx={{ p: 3, borderRadius: 3, mt: 4 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Reviews
            </Typography>
            <Stack divider={<Divider flexItem />} spacing={2}>
              {product.reviews.map((r) => (
                <Stack key={r.id} direction="row" spacing={2} alignItems="flex-start">
                  <Avatar sx={{ bgcolor: 'secondary.main', color: '#07070d' }}>
                    {r.author[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={700}>
                      {r.author}
                    </Typography>
                    <StarRating value={r.rating} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {r.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {r.date}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </GlassSurface>
        </Grid>
      </Grid>
    </Container>
  );
}
