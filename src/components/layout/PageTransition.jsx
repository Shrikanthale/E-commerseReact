import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';

const MotionMain = motion.create(Box);

export default function PageTransition() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <MotionMain
        key={location.pathname}
        component="main"
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.99 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Outlet />
      </MotionMain>
    </AnimatePresence>
  );
}
