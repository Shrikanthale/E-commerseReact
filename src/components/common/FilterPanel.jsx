import {
  Box,
  Chip,
  FormLabel,
  Rating,
  Slider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { CATEGORIES } from '../../services/products';
import GlassSurface from './GlassSurface';

export default function FilterPanel({
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  priceBounds,
  minRating,
  onMinRatingChange,
}) {
  return (
    <GlassSurface sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Categories
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={category}
        onChange={(_, v) => v && onCategoryChange(v)}
        orientation="vertical"
        fullWidth
        sx={{ gap: 1, flexWrap: 'wrap', flexDirection: 'row' }}
      >
        {CATEGORIES.map((c) => (
          <ToggleButton
            key={c.id}
            value={c.id}
            sx={{
              borderRadius: '999px !important',
              px: 2,
              textTransform: 'none',
              border: '1px solid',
              borderColor: 'divider',
              '&.Mui-selected': {
                background: (t) =>
                  t.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.25))'
                    : 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.12))',
                borderColor: 'primary.main',
              },
            }}
          >
            {c.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box sx={{ mt: 4 }}>
        <FormLabel>
          <Typography variant="subtitle2" color="text.secondary">
            Price range
          </Typography>
        </FormLabel>
        <Slider
          value={priceRange}
          onChange={(_, v) => onPriceRangeChange(v)}
          valueLabelDisplay="auto"
          min={priceBounds.min}
          max={priceBounds.max}
          sx={{ mt: 2, color: 'secondary.main' }}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" color="text.secondary">
            ${priceRange[0]}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ${priceRange[1]}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Minimum rating
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
          {[0, 3, 4, 4.5].map((r) => (
            <Chip
              key={r}
              label={r === 0 ? 'Any' : `${r}+ stars`}
              onClick={() => onMinRatingChange(r)}
              color={minRating === r ? 'secondary' : 'default'}
              variant={minRating === r ? 'filled' : 'outlined'}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Preview
          </Typography>
          <Rating
            value={minRating || 0}
            readOnly
            precision={0.5}
            size="small"
            sx={{
              '& .MuiRating-iconFilled': {
                color: 'secondary.main',
                filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.5))',
              },
            }}
          />
        </Box>
      </Box>
    </GlassSurface>
  );
}
