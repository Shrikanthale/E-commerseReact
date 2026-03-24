import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { glassSurface } from '../../theme/surfaces';

export default function GlassSurface({ children, sx, component = 'div', ...rest }) {
  const theme = useTheme();
  return (
    <Box
      component={component}
      sx={{ ...glassSurface(theme), ...sx }}
      {...rest}
    >
      {children}
    </Box>
  );
}
