import {
  FavoriteBorderRoundedIcon,
  FavoriteRoundedIcon,
  ShoppingBagRoundedIcon,
} from '../icons';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/useShop';
import { formatPrice } from '../../utils/formatPrice';
import GlassSurface from '../common/GlassSurface';
import GlowButton from '../common/GlowButton';
import LazyImage from '../common/LazyImage';
import StarRating from '../common/StarRating';
import { neoSurface } from '../../theme/surfaces';

const MotionBox = motion.create(Box);

export default function ProductCard({ product, variant = 'grid', index = 0 }) {
  const theme = useTheme();
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wished = isInWishlist(product.id);
  const isList = variant === 'list';

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.4) }}
      component={Link}
      to={`/product/${product.id}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
        height: isList ? 'auto' : '100%',
      }}
    >
      <GlassSurface
        sx={{
          p: 0,
          height: '100%',
          overflow: 'hidden',
          borderRadius: 3,
          display: 'flex',
          flexDirection: isList ? 'row' : 'column',
          transition: 'transform 0.35s ease, box-shadow 0.35s ease',
          '&:hover': {
            transform: isList ? 'none' : 'translateY(-8px)',
            boxShadow: `0 24px 48px ${alpha(theme.palette.primary.main, 0.2)}`,
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: isList ? { xs: '42%', sm: 300 } : '100%',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <MotionBox
            whileHover={{ scale: isList ? 1.02 : 1.06 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            sx={{ height: '100%' }}
          >
            <LazyImage
              src={product.images[0]}
              alt={product.name}
              aspectRatio={isList ? '4 / 3' : '4 / 5'}
              sx={{ height: isList ? { xs: 200, sm: '100%' } : 'auto', minHeight: isList ? 200 : 0 }}
            />
          </MotionBox>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              ...neoSurface(theme),
              '&:hover': { ...neoSurface(theme), opacity: 0.95 },
            }}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wished ? (
              <FavoriteRoundedIcon color="secondary" />
            ) : (
              <FavoriteBorderRoundedIcon />
            )}
          </IconButton>
        </Box>

        <Stack
          spacing={1.5}
          sx={{
            p: 2.5,
            flex: 1,
            justifyContent: 'space-between',
            alignItems: isList ? 'flex-start' : 'stretch',
          }}
        >
          <Box>
            <Typography
              variant="overline"
              color="secondary"
              sx={{ letterSpacing: '0.2em', fontSize: 10 }}
            >
              {product.category}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, lineHeight: 1.25 }}>
              {product.name}
            </Typography>
            <StarRating value={product.rating} count={product.reviewCount} />
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                fontWeight: 800,
                background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {formatPrice(product.price)}
            </Typography>
          </Box>
          <GlowButton
            size="medium"
            fullWidth={!isList}
            startIcon={<ShoppingBagRoundedIcon />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1, e);
            }}
            sx={isList ? { alignSelf: { xs: 'stretch', sm: 'flex-start' }, px: 4 } : {}}
          >
            Add to bag
          </GlowButton>
        </Stack>
      </GlassSurface>
    </MotionBox>
  );
}
