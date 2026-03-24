import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/useShop';

const MotionImg = motion.img;

export default function FlyingAddAnimation() {
  const { flyingItem, clearFlyingItem } = useShop();

  useEffect(() => {
    if (!flyingItem) return undefined;
    const t = setTimeout(clearFlyingItem, 700);
    return () => clearTimeout(t);
  }, [flyingItem, clearFlyingItem]);

  return (
    <AnimatePresence>
      {flyingItem && (
        <MotionImg
          key={flyingItem.id}
          src={flyingItem.src}
          alt=""
          initial={{
            position: 'fixed',
            left: flyingItem.from.x,
            top: flyingItem.from.y,
            width: 56,
            height: 56,
            borderRadius: 12,
            objectFit: 'cover',
            zIndex: 9999,
            x: '-50%',
            y: '-50%',
            boxShadow: '0 12px 40px rgba(124,58,237,0.45)',
            opacity: 1,
            scale: 1,
          }}
          animate={{
            left: flyingItem.to.x,
            top: flyingItem.to.y,
            scale: 0.2,
            opacity: 0.3,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </AnimatePresence>
  );
}
