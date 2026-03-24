import { CloseRoundedIcon } from '../icons';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/useShop';
import { formatPrice } from '../../utils/formatPrice';
import GlowButton from '../common/GlowButton';
import LazyImage from '../common/LazyImage';
import GlassSurface from '../common/GlassSurface';

const MotionDiv = motion.div;

export default function CartDrawer() {
  const theme = useTheme();
  const {
    cartOpen,
    setCartOpen,
    cart,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
  } = useShop();

  return (
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 420 },
          background:
            theme.palette.mode === 'dark'
              ? alpha('#0a0a12', 0.92)
              : alpha('#faf8ff', 0.95),
          backdropFilter: 'blur(24px)',
          borderLeft: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ p: 2 }}
        >
          <Typography variant="h6" fontWeight={800}>
            Your bag
          </Typography>
          <IconButton onClick={() => setCartOpen(false)} aria-label="Close cart">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider />

        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          <AnimatePresence initial={false}>
            {cart.length === 0 ? (
              <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                Your bag is empty — add something luminous.
              </Typography>
            ) : (
              cart.map((line) => (
                <MotionDiv
                  key={line.product.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <GlassSurface
                    sx={{ p: 2, mb: 2, borderRadius: 2, display: 'flex', gap: 2 }}
                  >
                    <Box sx={{ width: 88, flexShrink: 0, borderRadius: 2, overflow: 'hidden' }}>
                      <LazyImage
                        src={line.product.images[0]}
                        alt={line.product.name}
                        aspectRatio="1"
                      />
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" fontWeight={700} noWrap>
                        {line.product.name}
                      </Typography>
                      <Typography variant="body2" color="secondary">
                        {formatPrice(line.product.price)}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateCartQuantity(line.product.id, line.quantity - 1)
                          }
                          sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
                        >
                          −
                        </IconButton>
                        <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
                          {line.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateCartQuantity(line.product.id, line.quantity + 1)
                          }
                          sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}
                        >
                          +
                        </IconButton>
                      </Stack>
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ cursor: 'pointer', mt: 0.5, display: 'inline-block' }}
                        onClick={() => removeFromCart(line.product.id)}
                      >
                        Remove
                      </Typography>
                    </Box>
                  </GlassSurface>
                </MotionDiv>
              ))
            )}
          </AnimatePresence>
        </Box>

        <GlassSurface sx={{ p: 2, borderRadius: 0, borderTop: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography color="text.secondary">Subtotal</Typography>
            <Typography fontWeight={800}>{formatPrice(cartTotal)}</Typography>
          </Stack>
          <GlowButton
            fullWidth
            component={Link}
            to="/checkout"
            onClick={() => setCartOpen(false)}
            disabled={cart.length === 0}
          >
            Checkout
          </GlowButton>
          <GlowButton
            fullWidth
            variant="outlined"
            component={Link}
            to="/cart"
            onClick={() => setCartOpen(false)}
            sx={{ mt: 1, borderWidth: 2 }}
          >
            View full bag
          </GlowButton>
        </GlassSurface>
      </Stack>
    </Drawer>
  );
}
