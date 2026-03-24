import { Grid, Skeleton, Stack } from '@mui/material';
import GlassSurface from '../common/GlassSurface';

export default function ProductSkeleton({ count = 8, variant = 'grid' }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Grid key={i} size={{ xs: 12, sm: variant === 'list' ? 12 : 6, md: variant === 'list' ? 12 : 4, lg: variant === 'list' ? 12 : 3 }}>
          <GlassSurface
            sx={{
              p: 0,
              overflow: 'hidden',
              borderRadius: 3,
              display: 'flex',
              flexDirection: variant === 'list' ? 'row' : 'column',
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                width: variant === 'list' ? { xs: '40%', md: 280 } : '100%',
                minHeight: variant === 'list' ? 160 : 280,
                flexShrink: 0,
              }}
            />
            <Stack spacing={1} sx={{ p: 2, flex: 1 }}>
              <Skeleton width="70%" height={28} />
              <Skeleton width="40%" />
              <Skeleton width="50%" height={36} />
            </Stack>
          </GlassSurface>
        </Grid>
      ))}
    </>
  );
}
