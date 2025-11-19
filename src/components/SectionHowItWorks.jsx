import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import MagicDivider from './MagicDivider'
import config from '../config.json'

const SectionHowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: '🛒',
      title: 'Haces tu pedido',
      description: 'Elige tu cantidad y completa tu compra de forma segura en Astrochoc.cl',
    },
    {
      number: '02',
      icon: '✨',
      title: 'Preparamos tu caja',
      description: 'Seleccionamos tu carta de tarot al azar y armamos tu caja con mucho cariño cósmico',
    },
    {
      number: '03',
      icon: '🚀',
      title: 'La recibes en casa',
      description: 'Tu caja mágica llega a tu puerta lista para comenzar tu ritual',
    },
  ]

  return (
    <section id="como-funciona" className="section-container relative">
      <MagicDivider />

      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="mystic-title">
            ¿Y cómo llega la magia a tu puerta?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4">
            Un proceso simple pero lleno de intención
          </p>
        </div>
      </ScrollReveal>

      {/* Timeline */}
      <div className="max-w-5xl mx-auto relative">
        {/* Línea conectora - Desktop */}
        <div className="hidden md:block absolute top-24 left-1/2 -translate-x-1/2 w-full h-1">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="w-full h-full bg-gradient-to-r from-cosmic-gold/30 via-cosmic-gold to-cosmic-gold/30 origin-left"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative z-10">
          {steps.map((step, index) => (
            <ScrollReveal key={index} delay={index * 0.2}>
              <motion.div
                whileHover={{ y: -10 }}
                className="cosmic-card p-8 text-center relative"
              >
                {/* Número */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-cosmic-gold text-cosmic-dark rounded-full flex items-center justify-center font-cinzel font-bold text-lg shadow-lg"
                >
                  {step.number}
                </motion.div>

                {/* Icono */}
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="text-7xl mb-6 mt-4"
                >
                  {step.icon}
                </motion.div>

                {/* Contenido */}
                <h3 className="font-cinzel text-xl text-cosmic-gold mb-3">
                  {step.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {step.description}
                </p>

                {/* Flecha conectora - Mobile */}
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="md:hidden text-cosmic-gold text-3xl mt-6"
                  >
                    ↓
                  </motion.div>
                )}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Información de envío */}
      <ScrollReveal>
        <div className="max-w-3xl mx-auto mt-16 grid md:grid-cols-2 gap-6">
          <div className="cosmic-card p-6 text-center">
            <div className="text-4xl mb-3">⏱️</div>
            <h3 className="font-cinzel text-cosmic-gold mb-2">Tiempos de Entrega</h3>
            <p className="text-white/80 text-sm">
              {config.shipping.estimate}
            </p>
          </div>

          <div className="cosmic-card p-6 text-center">
            <div className="text-4xl mb-3">📍</div>
            <h3 className="font-cinzel text-cosmic-gold mb-2">Zonas de Despacho</h3>
            <p className="text-white/80 text-sm">
              {config.shipping.regions}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <MagicDivider className="mt-16" />
    </section>
  )
}

export default SectionHowItWorks



