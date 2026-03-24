import {
  DarkModeRoundedIcon,
  FavoriteBorderRoundedIcon,
  LightModeRoundedIcon,
  LocalMallOutlinedIcon,
  MenuRoundedIcon,
  SearchRoundedIcon,
} from '../icons';
import {
  AppBar,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/useShop';
import { glassSurface } from '../../theme/surfaces';

const nav = [
  { label: 'Shop', to: '/products' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Bag', to: '/cart' },
];

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 24 });
  const { cartCount, setCartOpen, toggleColorMode, colorMode } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState('');

  const glass = glassSurface(theme);
  const elevated = trigger ? 12 : 6;

  const submitSearch = (e) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : '/products');
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          top: 12,
          left: { xs: 12, sm: 24 },
          right: { xs: 12, sm: 24 },
          width: 'auto',
          borderRadius: 4,
          ...glass,
          boxShadow: `0 ${elevated}px 40px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.35 : 0.08)}`,
          transition: 'box-shadow 0.35s ease, transform 0.35s ease',
          transform: trigger ? 'translateY(0)' : 'translateY(0)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1, gap: 2, minHeight: { xs: 56, sm: 64 } }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.04em',
                textDecoration: 'none',
                color: 'inherit',
                background: 'linear-gradient(90deg, #a78bfa, #22d3ee)',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                flexShrink: 0,
              }}
            >
              SHRI
            </Typography>

            <Box
              component="form"
              onSubmit={submitSearch}
              sx={{ flex: 1, maxWidth: { xs: 1, md: 420 }, display: { xs: 'none', md: 'block' } }}
            >
              <TextField
                size="small"
                fullWidth
                placeholder="Search products…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 999,
                    bgcolor: alpha(theme.palette.background.default, 0.5),
                  },
                }}
              />
            </Box>

            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{ ml: 'auto' }}
            >
              <IconButton
                sx={{ display: { xs: 'inline-flex', md: 'none' } }}
                onClick={() => navigate('/products')}
                aria-label="Search"
              >
                <SearchRoundedIcon />
              </IconButton>

              <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {nav.map((item) => (
                  <Typography
                    key={item.to}
                    component={Link}
                    to={item.to}
                    variant="body2"
                    sx={{
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 999,
                      textDecoration: 'none',
                      color: 'text.secondary',
                      fontWeight: 600,
                      '&:hover': { color: 'primary.main', bgcolor: alpha(theme.palette.primary.main, 0.08) },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))}
              </Stack>

              <IconButton component={Link} to="/wishlist" aria-label="Wishlist">
                <FavoriteBorderRoundedIcon />
              </IconButton>

              <IconButton onClick={toggleColorMode} aria-label="Toggle theme">
                {colorMode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>

              <IconButton
                id="cart-anchor"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <Badge badgeContent={cartCount} color="secondary">
                  <LocalMallOutlinedIcon />
                </Badge>
              </IconButton>

              <IconButton
                sx={{ display: { md: 'none' } }}
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
              >
                <MenuRoundedIcon />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <List>
            <ListItemButton component={Link} to="/" onClick={() => setMobileOpen(false)}>
              <ListItemText primary="Home" />
            </ListItemButton>
            {nav.map((item) => (
              <ListItemButton key={item.to} component={Link} to={item.to} onClick={() => setMobileOpen(false)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
