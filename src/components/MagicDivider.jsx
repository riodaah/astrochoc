import { motion } from 'framer-motion'

/**
 * Divisor decorativo animado con temática mística
 */
const MagicDivider = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center my-12 ${className}`}>
      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Línea izquierda */}
        <motion.div
          className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-cosmic-gold to-cosmic-gold"
          initial={{ width: 0 }}
          whileInView={{ width: 'auto' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        {/* Símbolo central */}
        <div className="relative">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-3 h-3 border-2 border-cosmic-gold rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 w-3 h-3 bg-cosmic-gold rounded-full blur-sm"
          />
        </div>

        {/* Estrella central */}
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="text-cosmic-gold"
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <path
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            fill="currentColor"
          />
        </motion.svg>

        {/* Luna central */}
        <motion.div
          animate={{
              rotate: -360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-3 h-3 border-2 border-cosmic-gold rounded-full relative"
        >
          <div className="absolute inset-0 w-2 h-3 bg-cosmic-dark rounded-full translate-x-0.5" />
        </motion.div>

        {/* Línea derecha */}
        <motion.div
          className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent via-cosmic-gold to-cosmic-gold"
          initial={{ width: 0 }}
          whileInView={{ width: 'auto' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </motion.div>
    </div>
  )
}

export default MagicDivider

