import {
  FilterListRoundedIcon,
  ViewListRoundedIcon,
  ViewModuleRoundedIcon,
} from '../components/icons';
import {
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { SearchRoundedIcon } from '../components/icons';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../components/common/FilterPanel';
import EmptyState from '../components/common/EmptyState';
import GlowButton from '../components/common/GlowButton';
import ProductCard from '../components/product/ProductCard';
import ProductSkeleton from '../components/product/ProductSkeleton';
import { useFilteredProducts } from '../hooks/useFilteredProducts';

const MotionDiv = motion.div;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    search,
    setSearch,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    filtered,
    priceBounds,
  } = useFilteredProducts();

  const qFromUrl = searchParams.get('q')?.trim() ?? '';

  useEffect(() => {
    setSearch((prev) => (prev === qFromUrl ? prev : qFromUrl));
  }, [qFromUrl, setSearch]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);

  const onSearchChange = (value) => {
    setSearch(value);
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set('q', value.trim());
    else next.delete('q');
    setSearchParams(next, { replace: true });
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, flex: 1 }}>
      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography variant="overline" color="secondary" sx={{ letterSpacing: '0.25em' }}>
              Catalog
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              The collection
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <IconButton
              sx={{ display: { md: 'none' } }}
              onClick={() => setFilterOpen(true)}
              aria-label="Filters"
            >
              <FilterListRoundedIcon />
            </IconButton>
            <ToggleButtonGroup
              exclusive
              value={view}
              onChange={(_, v) => v && setView(v)}
              size="small"
            >
              <ToggleButton value="grid" aria-label="Grid view">
                <ViewModuleRoundedIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="List view">
                <ViewListRoundedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Stack>

        <TextField
          fullWidth
          placeholder="Search by name or description…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3, maxWidth: { md: 480 } }}
        />
      </MotionDiv>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ position: 'sticky', top: 100 }}>
            <FilterPanel
              category={category}
              onCategoryChange={setCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              priceBounds={priceBounds}
              minRating={minRating}
              onMinRatingChange={setMinRating}
            />
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          {loading ? (
            <Grid container spacing={3}>
              <ProductSkeleton count={8} variant={view} />
            </Grid>
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No matches"
              description="Try widening your price range, clearing filters, or searching another keyword."
              illustration="search"
              action={
                <GlowButton
                  onClick={() => {
                    setCategory('all');
                    setMinRating(0);
                    setPriceRange([priceBounds.min, priceBounds.max]);
                    onSearchChange('');
                  }}
                >
                  Reset filters
                </GlowButton>
              }
            />
          ) : (
            <Grid container spacing={3}>
              {filtered.map((p, i) => (
                <Grid
                  key={p.id}
                  size={{
                    xs: 12,
                    sm: view === 'list' ? 12 : 6,
                    lg: view === 'list' ? 12 : 4,
                  }}
                >
                  <ProductCard product={p} variant={view} index={i} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      <Drawer
        anchor="left"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{ sx: { width: 320, p: 2 } }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Filters
        </Typography>
        <FilterPanel
          category={category}
          onCategoryChange={setCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          priceBounds={priceBounds}
          minRating={minRating}
          onMinRatingChange={setMinRating}
        />
      </Drawer>
    </Container>
  );
}
