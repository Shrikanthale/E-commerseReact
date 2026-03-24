import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import GlassSurface from './GlassSurface';

const MotionStack = motion.create(Stack);

export default function EmptyState({
  title,
  description,
  illustration = 'bag',
  action,
}) {
  return (
    <MotionStack
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      alignItems="center"
      spacing={3}
      sx={{ py: { xs: 6, md: 10 }, px: 2 }}
    >
      <GlassSurface
        sx={{
          p: 4,
          borderRadius: 4,
          maxWidth: 360,
          width: '100%',
          textAlign: 'center',
        }}
      >
        {illustration === 'bag' && <BagSvg />}
        {illustration === 'heart' && <HeartSvg />}
        {illustration === 'search' && <SearchSvg />}
        <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
        {action && <Stack sx={{ mt: 3 }}>{action}</Stack>}
      </GlassSurface>
    </MotionStack>
  );
}

function BagSvg() {
  return (
    <svg
      width="120"
      height="100"
      viewBox="0 0 120 100"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7c3aed" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect
        x="28"
        y="38"
        width="64"
        height="48"
        rx="12"
        stroke="url(#g1)"
        strokeWidth="3"
        fill="rgba(124,58,237,0.08)"
      />
      <path
        d="M42 38V30C42 22 48 16 60 16s18 6 18 14v8"
        stroke="url(#g1)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="58" r="6" fill="url(#g1)" opacity="0.5" />
    </svg>
  );
}

function HeartSvg() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden>
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ec4899" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <path
        d="M60 78s-28-16-36-34c-4-10 2-22 14-22 7 0 14 4 18 10 4-6 11-10 18-10 12 0 18 12 14 22-8 18-36 34-36 34z"
        stroke="url(#g2)"
        strokeWidth="3"
        fill="rgba(236,72,153,0.1)"
      />
    </svg>
  );
}

function SearchSvg() {
  return (
    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" aria-hidden>
      <defs>
        <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#06b6d4" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle
        cx="52"
        cy="48"
        r="22"
        stroke="url(#g3)"
        strokeWidth="3"
        fill="rgba(6,182,212,0.06)"
      />
      <path
        d="M68 64l18 18"
        stroke="url(#g3)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
