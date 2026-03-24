import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionDiv = motion.div;
import GlassSurface from '../components/common/GlassSurface';
import GlowButton from '../components/common/GlowButton';
import LazyImage from '../components/common/LazyImage';
import EmptyState from '../components/common/EmptyState';
import { useShop } from '../context/useShop';
import { formatPrice } from '../utils/formatPrice';

export default function CartPage() {
  const { cart, cartTotal, updateCartQuantity, removeFromCart } = useShop();

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 6, flex: 1 }}>
        <EmptyState
          title="Your bag is empty"
          description="Discover pieces with glass-finished cards and cinematic hover states — then drop them in your bag."
          illustration="bag"
          action={
            <GlowButton component={Link} to="/products">
              Browse collection
            </GlowButton>
          }
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 }, flex: 1 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
        Shopping bag
      </Typography>
      <Stack spacing={2}>
        {cart.map((line, i) => (
          <MotionDiv
            key={line.product.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <GlassSurface sx={{ p: 2, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  component={Link}
                  to={`/product/${line.product.id}`}
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 2,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <LazyImage
                    src={line.product.images[0]}
                    alt={line.product.name}
                    aspectRatio="1"
                  />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    component={Link}
                    to={`/product/${line.product.id}`}
                    variant="subtitle1"
                    fontWeight={700}
                    sx={{ color: 'inherit', textDecoration: 'none' }}
                  >
                    {line.product.name}
                  </Typography>
                  <Typography color="secondary">{formatPrice(line.product.price)}</Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() =>
                        updateCartQuantity(line.product.id, line.quantity - 1)
                      }
                      sx={{ border: 1, borderColor: 'divider' }}
                    >
                      −
                    </IconButton>
                    <Typography sx={{ minWidth: 28, textAlign: 'center' }}>
                      {line.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        updateCartQuantity(line.product.id, line.quantity + 1)
                      }
                      sx={{ border: 1, borderColor: 'divider' }}
                    >
                      +
                    </IconButton>
                  </Stack>
                </Box>
                <Stack alignItems="flex-end" spacing={1}>
                  <Typography fontWeight={800}>
                    {formatPrice(line.product.price * line.quantity)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => removeFromCart(line.product.id)}
                  >
                    Remove
                  </Typography>
                </Stack>
              </Stack>
            </GlassSurface>
          </MotionDiv>
        ))}
      </Stack>

      <GlassSurface sx={{ p: 3, borderRadius: 3, mt: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Subtotal</Typography>
          <Typography variant="h5" fontWeight={800}>
            {formatPrice(cartTotal)}
          </Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <GlowButton fullWidth component={Link} to="/checkout" size="large">
          Continue to checkout
        </GlowButton>
      </GlassSurface>
    </Container>
  );
}
