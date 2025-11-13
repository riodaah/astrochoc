import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import MagicDivider from './MagicDivider'

const SectionExperience = () => {
  const steps = [
    {
      icon: '🔓',
      text: 'Abre la pirámide y rompe el sello del universo.',
    },
    {
      icon: '🔮',
      text: 'Descubre tu carta de tarot, elegida al azar solo para ti.',
    },
    {
      icon: '🍫',
      text: 'Disfruta los 3 chocolates sin culpa mientras reflexionas en tu mensaje.',
    },
  ]

  return (
    <section id="experiencia" className="section-container relative">
      <MagicDivider />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Texto Izquierdo */}
        <ScrollReveal direction="left">
          <div className="space-y-6">
            <h2 className="mystic-title">
              Más que chocolate, un pequeño ritual cósmico
            </h2>

            <p className="text-lg text-white/80 leading-relaxed">
              Al abrir la pirámide, descubres un mundo de sensaciones: 
              la suave nube esponjosa, la misteriosa carta oculta y los 
              tres chocolates perfectamente seleccionados para ti.
            </p>

            {/* Steps */}
            <div className="space-y-4 pt-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-start gap-4 group"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 w-12 h-12 bg-cosmic-blue/40 border border-cosmic-gold/30 rounded-full flex items-center justify-center text-2xl group-hover:border-cosmic-gold/60 transition-colors"
                  >
                    {step.icon}
                  </motion.div>
                  <div className="flex-1 pt-2">
                    <p className="text-white/90 leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Texto adicional */}
            <div className="mt-8 p-6 cosmic-card">
              <p className="text-cosmic-gold italic">
                "Cada Astrochoc es una experiencia única. No hay dos cajas iguales, 
                porque cada carta lleva un mensaje diferente del universo."
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Visual Derecho */}
        <ScrollReveal direction="right">
          <div className="relative flex items-center justify-center">
            {/* Imagen de caja abierta */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="w-full max-w-md aspect-square rounded-3xl cosmic-card overflow-hidden">
                <img
                  src="/box-open.png"
                  alt="Caja Astrochoc abierta mostrando carta de tarot, chocolates y nube protectora"
                  className="w-full h-full object-cover rounded-3xl"
                />
                
                {/* Efecto de brillo al hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/0 via-cosmic-gold/20 to-cosmic-gold/0 pointer-events-none"
                  whileHover={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>

            {/* Partículas flotantes alrededor */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 text-cosmic-gold text-2xl"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                ✨
              </motion.div>
            ))}

            {/* Glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-cosmic-gold/10 rounded-full blur-3xl"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default SectionExperience

