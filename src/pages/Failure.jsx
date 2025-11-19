import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Failure = () => {
  const navigate = useNavigate()

  const tryAgain = () => {
    navigate('/')
    setTimeout(() => {
      const element = document.querySelector('#producto')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Fondo estrellado */}
      <div className="stars-background" />

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
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-9xl mb-6"
          >
            😔
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-cinzel text-5xl md:text-6xl text-gradient mb-6"
        >
          Pago no completado
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-white/80 mb-8"
        >
          Parece que algo salió mal con tu pago
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="cosmic-card p-8 mb-8"
        >
          <h2 className="font-cinzel text-xl text-cosmic-gold mb-4">
            ¿Qué pudo haber pasado?
          </h2>
          <div className="space-y-2 text-white/70 text-left max-w-md mx-auto">
            <p>• El pago fue rechazado por tu banco o tarjeta</p>
            <p>• Cancelaste el proceso de pago</p>
            <p>• Hubo un error de conexión</p>
            <p>• Los datos ingresados no son correctos</p>
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
            onClick={tryAgain}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cosmic-gold to-yellow-500 text-cosmic-dark font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            🔄 Intentar nuevamente
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-8 py-4 rounded-full bg-cosmic-blue/40 border-2 border-cosmic-gold text-cosmic-gold font-bold text-lg hover:bg-cosmic-blue/60 transition-all"
          >
            🏠 Volver al inicio
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 cosmic-card p-6"
        >
          <p className="text-white/80 mb-2">
            ¿Necesitas ayuda?
          </p>
          <a
            href="mailto:hola@astrochoc.cl"
            className="text-cosmic-gold hover:text-yellow-400 transition-colors font-semibold"
          >
            hola@astrochoc.cl
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-cosmic-gold/50 italic mt-8 text-sm"
        >
          No te preocupes, el universo tiene otro plan para ti 🌙
        </motion.p>
      </div>
    </div>
  )
}

export default Failure



