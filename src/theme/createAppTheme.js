import { alpha, createTheme } from '@mui/material/styles';

export function createAppTheme(mode) {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#a78bfa' : '#6d28d9',
        light: '#c4b5fd',
        dark: '#5b21b6',
        contrastText: '#fff',
      },
      secondary: {
        main: isDark ? '#22d3ee' : '#0891b2',
        contrastText: '#0a0a0f',
      },
      background: {
        default: isDark ? '#07070d' : '#f4f2fb',
        paper: isDark ? alpha('#12121a', 0.72) : alpha('#ffffff', 0.85),
      },
      text: {
        primary: isDark ? '#f4f4f8' : '#0f0f14',
        secondary: isDark ? alpha('#f4f4f8', 0.62) : alpha('#0f0f14', 0.58),
      },
      divider: isDark ? alpha('#fff', 0.08) : alpha('#000', 0.08),
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: '"DM Sans", "Outfit", system-ui, sans-serif',
      h1: { fontWeight: 700, letterSpacing: '-0.03em' },
      h2: { fontWeight: 700, letterSpacing: '-0.02em' },
      h3: { fontWeight: 600, letterSpacing: '-0.02em' },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.02em' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDark ? '#3f3f55 #0c0c12' : '#c4bfd4 #f0eef8',
            '&::-webkit-scrollbar': { width: 10, height: 10 },
            '&::-webkit-scrollbar-thumb': {
              background: isDark ? alpha('#a78bfa', 0.45) : alpha('#6d28d9', 0.35),
              borderRadius: 8,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999 },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
}
