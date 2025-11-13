import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import CTAButton from './CTAButton'

const CTAFinal = () => {
  const scrollToProduct = () => {
    const element = document.querySelector('#producto')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="section-container relative overflow-hidden">
      {/* Fondo oscuro con estrellas */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-dark via-cosmic-purple/20 to-cosmic-dark">
        {/* Estrellas animadas */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cosmic-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ScrollReveal>
          {/* Icono central */}
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="text-8xl mb-8"
          >
            🌙
          </motion.div>

          {/* Título */}
          <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-gradient mb-6 leading-tight">
            ¿Listo para ver qué mensaje tiene el universo para ti?
          </h2>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Pide tu caja Astrochoc y deja que el tarot y el chocolate hagan su magia.
          </p>

          {/* Características rápidas */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              '✨ Sin azúcar ni gluten',
              '🔮 Carta de tarot al azar',
              '🎁 Regalo perfecto',
              '🚚 Envío rápido',
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-6 py-3 bg-cosmic-blue/40 border border-cosmic-gold/30 rounded-full text-cosmic-gold backdrop-blur-sm"
              >
                {feature}
              </motion.div>
            ))}
          </div>

          {/* Botón CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <CTAButton
              onClick={scrollToProduct}
              size="lg"
              icon="🌟"
              className="text-xl px-12 py-5"
            >
              Quiero mi Astrochoc
            </CTAButton>
          </motion.div>

          {/* Texto adicional */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="text-cosmic-gold/70 italic mt-6 text-sm"
          >
            Regálate un momento mágico o sorprende a alguien especial
          </motion.p>
        </ScrollReveal>

        {/* Decoración adicional */}
        <div className="mt-16 flex justify-center gap-8">
          {['🌟', '✨', '💫'].map((emoji, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.5,
              }}
              className="text-4xl"
            >
              {emoji}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CTAFinal

