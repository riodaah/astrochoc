import { motion } from 'framer-motion'

/**
 * Componente wrapper para animaciones de scroll reveal
 * Hace aparecer elementos con fade + movimiento cuando entran en el viewport
 */
const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 0.7,
  className = '' 
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  const initial = {
    opacity: 0,
    ...directions[direction]
  }

  const whileInView = {
    opacity: 1,
    x: 0,
    y: 0
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal



