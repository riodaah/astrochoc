import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const PolicyModal = ({ isOpen, onClose, type }) => {
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

  const content = {
    privacy: {
      title: 'Política de Privacidad',
      sections: [
        {
          subtitle: 'Recopilación de Información',
          text: 'En Astrochoc, recopilamos información personal necesaria para procesar tus pedidos, incluyendo nombre, dirección de envío, correo electrónico y datos de pago (procesados de forma segura por Mercado Pago).',
        },
        {
          subtitle: 'Uso de la Información',
          text: 'Utilizamos tu información exclusivamente para procesar pedidos, enviar actualizaciones sobre tu compra y, si así lo deseas, enviarte novedades sobre nuevos productos. Nunca compartimos tu información con terceros sin tu consentimiento.',
        },
        {
          subtitle: 'Protección de Datos',
          text: 'Implementamos medidas de seguridad para proteger tu información personal. Todos los pagos son procesados de forma segura a través de Mercado Pago.',
        },
        {
          subtitle: 'Cookies',
          text: 'Utilizamos cookies esenciales para mejorar tu experiencia de navegación y recordar tu carrito de compras.',
        },
        {
          subtitle: 'Tus Derechos',
          text: 'Tienes derecho a acceder, modificar o eliminar tu información personal. Contáctanos a hola@astrochoc.cl para ejercer estos derechos.',
        },
      ],
    },
    returns: {
      title: 'Política de Devoluciones',
      sections: [
        {
          subtitle: 'Productos Elegibles',
          text: 'Debido a la naturaleza alimentaria de nuestros productos, solo aceptamos devoluciones en caso de productos defectuosos, dañados durante el envío o errores en el pedido.',
        },
        {
          subtitle: 'Plazo para Reclamos',
          text: 'Tienes 24 horas desde la recepción del pedido para reportar cualquier problema. Envíanos fotos del producto y tu número de orden a hola@astrochoc.cl.',
        },
        {
          subtitle: 'Proceso de Devolución',
          text: 'Si tu reclamo es válido, te ofreceremos un reemplazo del producto o reembolso completo. El reembolso se procesará a través del mismo método de pago utilizado en la compra.',
        },
        {
          subtitle: 'Carta de Tarot',
          text: 'Dado que cada carta es elegida al azar por el universo, no aceptamos cambios de carta. ¡Es parte de la magia! 🌙',
        },
        {
          subtitle: 'Cambios de Dirección',
          text: 'Si necesitas cambiar la dirección de envío, contáctanos lo antes posible. Una vez que el pedido ha sido despachado, no podemos modificar la dirección.',
        },
      ],
    },
    terms: {
      title: 'Términos y Condiciones',
      sections: [
        {
          subtitle: 'Aceptación de Términos',
          text: 'Al realizar una compra en Astrochoc.cl, aceptas estos términos y condiciones en su totalidad.',
        },
        {
          subtitle: 'Productos',
          text: 'Todos nuestros chocolates son elaborados sin azúcar refinada y sin gluten. Contienen avellanas y almendras. Las cartas de tarot son seleccionadas al azar y tienen un propósito lúdico, no constituyen una lectura profesional.',
        },
        {
          subtitle: 'Precios y Pagos',
          text: 'Todos los precios están expresados en pesos chilenos (CLP) e incluyen IVA. Los pagos se procesan de forma segura a través de Mercado Pago.',
        },
        {
          subtitle: 'Envíos',
          text: 'Realizamos envíos a la Región Metropolitana de Santiago. Los tiempos de entrega son de 2 a 5 días hábiles. No nos hacemos responsables por retrasos causados por el servicio de courier.',
        },
        {
          subtitle: 'Alergias',
          text: 'Nuestros productos contienen frutos secos (avellanas y almendras) y pueden contener trazas de otros alérgenos. Si tienes alergias, consulta con nosotros antes de comprar.',
        },
        {
          subtitle: 'Responsabilidad',
          text: 'Las cartas de tarot incluidas son de carácter simbólico y recreativo. Astrochoc no se responsabiliza por interpretaciones o decisiones tomadas basándose en las cartas.',
        },
        {
          subtitle: 'Modificaciones',
          text: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente después de su publicación en el sitio web.',
        },
      ],
    },
  }

  const currentContent = content[type] || content.terms

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card del modal */}
              <div className="cosmic-card bg-cosmic-dark/95 backdrop-blur-xl border-2 border-cosmic-gold/40 max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-cosmic-gold/30 flex items-center justify-between sticky top-0 bg-cosmic-dark/95 backdrop-blur-xl z-10">
                  <div>
                    <motion.h2
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="font-cinzel text-2xl md:text-3xl text-gradient"
                    >
                      {currentContent.title}
                    </motion.h2>
                    <motion.p
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-cosmic-gold/70 text-sm mt-1"
                    >
                      Actualizado: Noviembre 2025
                    </motion.p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-cosmic-blue/40 border border-cosmic-gold/30 flex items-center justify-center text-cosmic-gold hover:border-cosmic-gold/60 transition-colors flex-shrink-0"
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {currentContent.sections.map((section, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="space-y-2"
                      >
                        <h3 className="font-cinzel text-lg text-cosmic-gold">
                          {section.subtitle}
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          {section.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Contacto */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 p-6 bg-cosmic-blue/20 rounded-xl border border-cosmic-gold/20"
                  >
                    <h3 className="font-cinzel text-cosmic-gold mb-2">
                      ¿Tienes dudas?
                    </h3>
                    <p className="text-white/80 text-sm">
                      Contáctanos en{' '}
                      <a
                        href="mailto:hola@astrochoc.cl"
                        className="text-cosmic-gold hover:text-yellow-400 transition-colors font-semibold"
                      >
                        hola@astrochoc.cl
                      </a>
                    </p>
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-cosmic-gold/30 sticky bottom-0 bg-cosmic-dark/95 backdrop-blur-xl">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-cosmic-gold to-yellow-500 text-cosmic-dark font-bold hover:shadow-lg hover:shadow-cosmic-gold/30 transition-all"
                  >
                    Entendido ✨
                  </motion.button>
                </div>
              </div>

              {/* Partículas decorativas */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-cosmic-gold/30 text-2xl pointer-events-none"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default PolicyModal

