import { Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { accentGradient } from '../../theme/surfaces';

const MotionBtn = motion.create(Button);

export default function GlowButton({
  children,
  variant = 'contained',
  component,
  sx,
  ...props
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const glowSx = {
    ...(variant === 'contained' && {
      background: accentGradient,
      color: '#fff',
      boxShadow: `0 0 24px ${alpha('#7c3aed', isDark ? 0.55 : 0.35)}, 0 8px 24px ${alpha('#06b6d4', 0.25)}`,
      '&:hover': {
        background: accentGradient,
        boxShadow: `0 0 32px ${alpha('#7c3aed', 0.65)}, 0 12px 28px ${alpha('#06b6d4', 0.35)}`,
      },
    }),
    ...sx,
  };

  if (component) {
    return (
      <Button variant={variant} component={component} sx={glowSx} {...props}>
        {children}
      </Button>
    );
  }

  return (
    <MotionBtn
      variant={variant}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      sx={glowSx}
      {...props}
    >
      {children}
    </MotionBtn>
  );
}
