import { alpha } from '@mui/material/styles';

export const accentGradient =
  'linear-gradient(135deg, #7c3aed 0%, #06b6d4 50%, #8b5cf6 100%)';

/** @param {import('@mui/material/styles').Theme} theme */
export function glassSurface(theme) {
  const isDark = theme.palette.mode === 'dark';
  return {
    background: alpha(
      isDark ? theme.palette.background.paper : '#ffffff',
      isDark ? 0.45 : 0.55
    ),
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${alpha(isDark ? '#fff' : '#000', isDark ? 0.1 : 0.06)}`,
    boxShadow: isDark
      ? `0 8px 32px ${alpha('#000', 0.45)}, inset 0 1px 0 ${alpha('#fff', 0.06)}`
      : `0 12px 40px ${alpha('#6d28d9', 0.08)}, inset 0 1px 0 ${alpha('#fff', 0.9)}`,
  };
}

/** @param {import('@mui/material/styles').Theme} theme */
export function neoSurface(theme) {
  const isDark = theme.palette.mode === 'dark';
  return {
    background: isDark ? '#14141c' : '#ece8f7',
    boxShadow: isDark
      ? '8px 8px 20px #050508, -6px -6px 18px #1c1c28'
      : '10px 10px 24px #d8d2e8, -8px -8px 22px #ffffff',
  };
}
