import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const Pending = () => {
  const navigate = useNavigate()

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
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="text-9xl mb-6"
          >
            ⏳
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-cinzel text-5xl md:text-6xl text-gradient mb-6"
        >
          Pago Pendiente
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-white/80 mb-8"
        >
          Tu pago está siendo procesado
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="cosmic-card p-8 mb-8"
        >
          <h2 className="font-cinzel text-2xl text-cosmic-gold mb-4">
            ¿Qué significa esto?
          </h2>
          <div className="space-y-4 text-white/80 max-w-md mx-auto">
            <p>
              Tu pago está en proceso de verificación. Esto puede ocurrir cuando:
            </p>
            <div className="text-left space-y-2 text-white/70">
              <p>• Elegiste pagar en efectivo o transferencia</p>
              <p>• El banco está validando la transacción</p>
              <p>• Se requiere confirmación adicional</p>
            </div>
            <div className="mt-6 p-4 bg-cosmic-blue/20 rounded-lg">
              <p className="text-cosmic-gold font-semibold mb-2">
                📧 Te mantendremos informado
              </p>
              <p className="text-sm">
                Recibirás un email cuando se confirme tu pago
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
            className="px-8 py-4 rounded-full bg-cosmic-blue/40 border-2 border-cosmic-gold text-cosmic-gold font-bold text-lg hover:bg-cosmic-blue/60 transition-all inline-block"
          >
            📱 Síguenos en Instagram
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 cosmic-card p-6"
        >
          <p className="text-white/80 mb-2">
            ¿Tienes dudas sobre tu pedido?
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
          className="text-cosmic-gold/70 italic mt-8 text-sm"
        >
          ✨ El universo trabaja a su propio ritmo ✨
        </motion.p>
      </div>
    </div>
  )
}

export default Pending



