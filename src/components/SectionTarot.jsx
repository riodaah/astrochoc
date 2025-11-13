import { motion } from 'framer-motion'
import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import MagicDivider from './MagicDivider'
import CTAButton from './CTAButton'

const SectionTarot = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  // Cartas con imágenes reales
  const tarotCards = [
    { id: 1, image: '/tarjeta-1.png', reverso: '/tarjeta-1-reverso.png' },
    { id: 2, image: '/tarjeta-2.png', reverso: '/tarjeta-2-reverso.png' },
    { id: 3, image: '/tarjeta-3.png', reverso: '/tarjeta-3-reverso.png' },
    { id: 4, image: '/tarjeta-4.png', reverso: '/tarjeta-4-reverso.png' },
    { id: 5, image: '/tarjeta-5.png', reverso: '/tarjeta-5-reverso.png' },
  ]

  const scrollToProduct = () => {
    const element = document.querySelector('#producto')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="tarot" className="section-container relative bg-gradient-to-b from-cosmic-dark via-cosmic-purple/10 to-cosmic-dark">
      <MagicDivider />

      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="mystic-title">
            Una carta, un mensaje del universo
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mt-4">
            Cada caja trae una carta distinta. No puedes elegirla, 
            <span className="text-cosmic-gold font-semibold"> ella te elige a ti.</span>
          </p>
        </div>
      </ScrollReveal>

      {/* Carrusel de cartas */}
      <div className="relative py-12">
        <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap px-4">
          {tarotCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -20,
                scale: 1.05,
              }}
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative cursor-pointer group"
              style={{ perspective: '1000px' }}
            >
              {/* Contenedor de la carta con efecto flip 3D */}
              <motion.div
                className="relative w-32 h-48 md:w-40 md:h-60"
                animate={{
                  rotateY: hoveredCard === card.id ? 180 : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut',
                }}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Frente de la carta */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={card.image}
                    alt={`Carta de Tarot ${card.id}`}
                    className="w-full h-full object-cover rounded-2xl"
                    style={{
                      border: '2px solid rgba(244, 200, 103, 0.3)',
                    }}
                  />
                  
                  {/* Brillo dorado al hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/0 via-cosmic-gold/20 to-cosmic-gold/0"
                    animate={hoveredCard === card.id ? {
                      opacity: [0, 0.5, 0],
                    } : {
                      opacity: 0,
                    }}
                    transition={{ duration: 0.8 }}
                  />
                </div>

                {/* Reverso de la carta */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <img
                    src={card.reverso}
                    alt={`Reverso Carta ${card.id}`}
                    className="w-full h-full object-cover rounded-2xl"
                    style={{
                      border: '2px solid rgba(244, 200, 103, 0.5)',
                    }}
                  />
                  
                  {/* Efecto de brillo en el reverso */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/20 via-transparent to-cosmic-gold/20"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </div>
              </motion.div>

              {/* Sombra animada */}
              <motion.div
                animate={hoveredCard === card.id ? {
                  scale: [1, 1.3],
                  opacity: [0.3, 0.6],
                } : {
                  scale: 1,
                  opacity: 0.3,
                }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-cosmic-gold/30 rounded-full blur-xl"
              />
            </motion.div>
          ))}
        </div>

        {/* Estrellas decorativas */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cosmic-gold/30 text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Texto adicional */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto mt-12 space-y-6">
          <div className="cosmic-card p-8">
            <p className="text-white/80 leading-relaxed mb-4">
              Cada carta del tarot lleva un mensaje simbólico y lúdico. 
              No es una lectura profesional, sino una invitación a reflexionar 
              mientras disfrutas de tu chocolate.
            </p>
            <p className="text-cosmic-gold italic text-sm">
              "El universo tiene un mensaje para ti. ¿Estás listo para recibirlo?"
            </p>
          </div>

          <CTAButton
            onClick={scrollToProduct}
            variant="ghost"
            size="lg"
            icon="🎁"
          >
            Regálale uno a alguien especial
          </CTAButton>
        </div>
      </ScrollReveal>

      <MagicDivider className="mt-16" />
    </section>
  )
}

export default SectionTarot

