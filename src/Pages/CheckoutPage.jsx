import { CheckRoundedIcon } from '../components/icons';
import {
  Box,
  Container,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';

const MotionDiv = motion.div;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlassSurface from '../components/common/GlassSurface';
import GlowButton from '../components/common/GlowButton';
import { useShop } from '../context/useShop';
import { formatPrice } from '../utils/formatPrice';
import EmptyState from '../components/common/EmptyState';

const steps = ['Details', 'Shipping', 'Review'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { cart, cartTotal, clearCart } = useShop();
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zip: '',
  });

  if (cart.length === 0) {
    return (
      <Container sx={{ py: 6, flex: 1 }}>
        <EmptyState
          title="Nothing to checkout"
          description="Add items to your bag before completing this premium checkout flow."
          illustration="bag"
          action={
            <GlowButton component={Link} to="/products">
              Continue shopping
            </GlowButton>
          }
        />
      </Container>
    );
  }

  const next = () => setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setActiveStep((s) => Math.max(s - 1, 0));

  const placeOrder = () => {
    clearCart();
    enqueueSnackbar('Order placed — thank you (demo flow)', { variant: 'success' });
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 }, flex: 1 }}>
      <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <MotionDiv
            key={activeStep}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            <GlassSurface sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
              {activeStep === 0 && (
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={700}>
                    Contact
                  </Typography>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                  <TextField
                    label="Full name"
                    fullWidth
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  />
                </Stack>
              )}
              {activeStep === 1 && (
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={700}>
                    Shipping
                  </Typography>
                  <TextField
                    label="Address"
                    fullWidth
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  />
                  <TextField
                    label="City"
                    fullWidth
                    value={form.city}
                    onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  />
                  <TextField
                    label="Postal code"
                    fullWidth
                    value={form.zip}
                    onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
                  />
                </Stack>
              )}
              {activeStep === 2 && (
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={700}>
                    Review order
                  </Typography>
                  <Typography color="text.secondary">
                    Payment integration is intentionally omitted — this step confirms your details before a real gateway would authorize the charge.
                  </Typography>
                  <Stack spacing={1}>
                    {cart.map((line) => (
                      <Stack
                        key={line.product.id}
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Typography>
                          {line.product.name} × {line.quantity}
                        </Typography>
                        <Typography fontWeight={600}>
                          {formatPrice(line.product.price * line.quantity)}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              )}

              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <GlowButton variant="outlined" onClick={back} disabled={activeStep === 0} sx={{ borderWidth: 2 }}>
                  Back
                </GlowButton>
                {activeStep < steps.length - 1 ? (
                  <GlowButton onClick={next}>Continue</GlowButton>
                ) : (
                  <GlowButton
                    startIcon={<CheckRoundedIcon />}
                    onClick={placeOrder}
                  >
                    Place order (demo)
                  </GlowButton>
                )}
              </Stack>
            </GlassSurface>
          </MotionDiv>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <GlassSurface sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Order summary
              </Typography>
              <Typography variant="h4" fontWeight={800} sx={{ my: 2 }}>
                {formatPrice(cartTotal)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estimated tax and shipping would appear here in a production storefront.
              </Typography>
            </GlassSurface>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
