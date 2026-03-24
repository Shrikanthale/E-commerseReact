import { Box, Skeleton } from '@mui/material';
import { useState } from 'react';

export default function LazyImage({
  src,
  alt,
  sx,
  aspectRatio = '4 / 5',
  ...imgProps
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        bgcolor: 'action.hover',
        ...sx,
      }}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            borderRadius: 0,
          }}
        />
      )}
      <Box
        component="img"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
        {...imgProps}
      />
    </Box>
  );
}
