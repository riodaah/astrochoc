import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const VideoModal = ({ isOpen, onClose }) => {
  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] cursor-pointer"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute -top-12 right-0 md:-right-12 w-10 h-10 rounded-full bg-cosmic-gold/20 border border-cosmic-gold/50 flex items-center justify-center text-cosmic-gold hover:bg-cosmic-gold/30 transition-colors z-10"
              >
                ✕
              </motion.button>

              {/* Video Container */}
              <div className="relative w-full aspect-video bg-cosmic-dark rounded-2xl overflow-hidden border-2 border-cosmic-gold/30 shadow-2xl shadow-cosmic-gold/20">
                {/* Video Real - Soporta múltiples formatos */}
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                  poster="/poster-video.jpg"
                >
                  {/* Intenta cargar el video desde public/ */}
                  <source src="/video-unboxing.mp4" type="video/mp4" />
                  <source src="/video-unboxing.webm" type="video/webm" />
                  
                  {/* Mensaje de fallback - Solo se muestra si el navegador no soporta video */}
                  Tu navegador no soporta la reproducción de video.
                </video>

                {/* Partículas decorativas */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-cosmic-gold/20 text-2xl pointer-events-none"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.1, 0.3, 0.1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>

              {/* Texto debajo */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-white/60 text-sm mt-4"
              >
                Presiona ESC o haz click fuera para cerrar
              </motion.p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VideoModal

