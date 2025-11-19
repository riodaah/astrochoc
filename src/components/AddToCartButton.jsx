import { motion } from 'framer-motion'

const AddToCartButton = ({ onClick, disabled = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 rounded-full font-bold text-lg
        bg-gradient-to-r from-cosmic-gold via-yellow-500 to-cosmic-gold
        bg-size-200 bg-pos-0 hover:bg-pos-100
        text-cosmic-dark
        transition-all duration-500
        shadow-lg hover:shadow-2xl
        disabled:opacity-50 disabled:cursor-not-allowed
        relative overflow-hidden
        group
      `}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      style={{
        backgroundSize: '200% auto',
        backgroundPosition: '0% center',
      }}
    >
      {/* Efecto shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        <svg
          className="w-6 h-6 group-hover:animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        Agregar al Carrito
      </span>
    </motion.button>
  )
}

export default AddToCartButton



