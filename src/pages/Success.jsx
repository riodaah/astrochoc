import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Limpiar carrito después de compra exitosa
    localStorage.removeItem('astrochoc-cart')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo estrellado */}
      <div className="stars-background" />
      
      {/* Confetti effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-10%',
            }}
            animate={{
              y: ['0vh', '110vh'],
              rotate: [0, 360],
              opacity: [1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              ease: 'linear',
            }}
          >
            {['✨', '🌟', '💫', '⭐', '🌙'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-9xl mb-6"
          >
            🎉
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-cinzel text-5xl md:text-6xl text-gradient mb-6"
        >
          ¡Pago Exitoso!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-white/80 mb-4"
        >
          Tu pedido ha sido confirmado exitosamente
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="cosmic-card p-8 mb-8"
        >
          <div className="text-6xl mb-4">📦</div>
          <h2 className="font-cinzel text-2xl text-cosmic-gold mb-4">
            ¿Qué sigue ahora?
          </h2>
          <div className="space-y-3 text-left max-w-md mx-auto">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <p className="text-white/80">
                Recibirás un email de confirmación con los detalles de tu pedido
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎴</span>
              <p className="text-white/80">
                Seleccionaremos tu carta de tarot al azar, elegida por el universo
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📦</span>
              <p className="text-white/80">
                Prepararemos tu caja con mucho cariño y magia
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚚</span>
              <p className="text-white/80">
                Tu pedido llegará en 2-5 días hábiles
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cosmic-gold to-yellow-500 text-cosmic-dark font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            🏠 Volver al inicio
          </motion.button>

          <motion.a
            href="https://www.instagram.com/astro_choc/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-cosmic-blue/40 border-2 border-cosmic-gold text-cosmic-gold font-bold text-lg hover:bg-cosmic-blue/60 transition-all"
          >
            📱 Síguenos en Instagram
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-cosmic-gold/70 italic mt-8 text-sm"
        >
          ✨ Gracias por confiar en Astrochoc. El universo te sonríe ✨
        </motion.p>
      </div>
    </div>
  )
}

export default Success



