import { Rating, Stack, Typography } from '@mui/material';

export default function StarRating({ value, count, size = 'small' }) {
  const iconSize = size === 'small' ? 'small' : 'medium';
  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Rating
        value={value}
        readOnly
        precision={0.1}
        size={iconSize}
        sx={{
          '& .MuiRating-iconFilled': {
            color: 'secondary.main',
            filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.45))',
          },
        }}
      />
      {count != null && (
        <Typography variant="caption" color="text.secondary">
          ({count})
        </Typography>
      )}
    </Stack>
  );
}
