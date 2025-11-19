import { motion } from 'framer-motion'

/**
 * Botón Call-to-Action con efectos mágicos
 */
const CTAButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  disabled = false,
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cosmic-gold to-yellow-500 text-cosmic-dark hover:from-yellow-500 hover:to-cosmic-gold',
    secondary: 'bg-transparent border-2 border-cosmic-gold text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-dark',
    ghost: 'bg-cosmic-blue/30 text-cosmic-gold border border-cosmic-gold/50 hover:bg-cosmic-blue/50',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        magic-button
        ${variants[variant]}
        ${sizes[size]}
        font-semibold rounded-full
        transition-all duration-300
        flex items-center gap-2 justify-center
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
        ${className}
      `}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        boxShadow: disabled ? undefined : '0 0 30px rgba(244, 200, 103, 0.6)'
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </motion.button>
  )
}

export default CTAButton



