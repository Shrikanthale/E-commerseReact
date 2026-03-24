import { Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MotionDiv = motion.div;
import EmptyState from '../components/common/EmptyState';
import GlowButton from '../components/common/GlowButton';
import ProductCard from '../components/product/ProductCard';
import { useShop } from '../context/useShop';
import { products } from '../services/products';

export default function WishlistPage() {
  const { wishlistIds } = useShop();
  const saved = products.filter((p) => wishlistIds.includes(p.id));

  if (saved.length === 0) {
    return (
      <Container sx={{ py: 6, flex: 1 }}>
        <EmptyState
          title="Wishlist is waiting"
          description="Tap the heart on any product card to curate your personal shortlist."
          illustration="heart"
          action={
            <GlowButton component={Link} to="/products">
              Explore shop
            </GlowButton>
          }
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, flex: 1 }}>
      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Typography variant="h4" fontWeight={800} sx={{ mb: 1 }}>
          Wishlist
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          {saved.length} saved {saved.length === 1 ? 'piece' : 'pieces'}
        </Typography>
      </MotionDiv>
      <Grid container spacing={3}>
        {saved.map((p, i) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard product={p} index={i} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
