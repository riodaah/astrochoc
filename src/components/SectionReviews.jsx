import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import MagicDivider from './MagicDivider'

const SectionReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'María G.',
      stars: 5,
      text: 'La experiencia completa es preciosa, la carta que me tocó fue muy precisa 💫 Los chocolates deliciosos y sin culpa.',
      avatar: '🌸',
    },
    {
      id: 2,
      name: 'Carlos R.',
      stars: 5,
      text: 'Se lo regalé a mi pareja y quedó encantada. La presentación es hermosa y el detalle de la carta le dio un toque especial 🌙',
      avatar: '⭐',
    },
    {
      id: 3,
      name: 'Sofía P.',
      stars: 5,
      text: 'Perfectos para cuando quieres darte un gusto sin azúcar. La carta es un plus encantador que hace todo más mágico ✨',
      avatar: '🦋',
    },
    {
      id: 4,
      name: 'Diego M.',
      stars: 5,
      text: 'Como regalo es genial, muy original. La combinación de chocolate + tarot es única. ¡Volveré a comprar! 🎁',
      avatar: '🌟',
    },
  ]

  const renderStars = (count) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={i < count ? 'text-cosmic-gold' : 'text-cosmic-gold/30'}
          >
            ⭐
          </motion.span>
        ))}
      </div>
    )
  }

  return (
    <section className="section-container relative">
      <MagicDivider />

      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="mystic-title">
            Lo que dicen quienes ya recibieron su mensaje
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4">
            Opiniones estelares de nuestra comunidad cósmica
          </p>
        </div>
      </ScrollReveal>

      {/* Grid de reseñas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <ScrollReveal key={review.id} delay={index * 0.1}>
            <motion.div
              whileHover={{ 
                y: -10,
                rotate: index % 2 === 0 ? -2 : 2,
              }}
              className="cosmic-card p-6 h-full flex flex-col"
            >
              {/* Avatar y nombre */}
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  className="w-12 h-12 bg-cosmic-blue/40 rounded-full flex items-center justify-center text-2xl"
                >
                  {review.avatar}
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">{review.name}</h3>
                  {renderStars(review.stars)}
                </div>
              </div>

              {/* Texto de la reseña */}
              <p className="text-white/80 leading-relaxed flex-1 text-sm">
                "{review.text}"
              </p>

              {/* Badge "Verificado" */}
              <div className="mt-4 pt-4 border-t border-cosmic-gold/20">
                <span className="text-xs text-cosmic-gold/70 flex items-center gap-1">
                  ✓ Compra verificada
                </span>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Estadísticas */}
      <ScrollReveal>
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-8 cosmic-card p-8">
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-4xl font-bold text-gradient font-cinzel mb-2"
            >
              4.9
            </motion.div>
            <div className="text-cosmic-gold mb-1">⭐⭐⭐⭐⭐</div>
            <p className="text-white/60 text-sm">Calificación promedio</p>
          </div>

          <div className="text-center border-x border-cosmic-gold/20">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.3,
              }}
              className="text-4xl font-bold text-gradient font-cinzel mb-2"
            >
              500+
            </motion.div>
            <div className="text-cosmic-gold mb-1">🎁</div>
            <p className="text-white/60 text-sm">Cajas entregadas</p>
          </div>

          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.6,
              }}
              className="text-4xl font-bold text-gradient font-cinzel mb-2"
            >
              98%
            </motion.div>
            <div className="text-cosmic-gold mb-1">💫</div>
            <p className="text-white/60 text-sm">Clientes satisfechos</p>
          </div>
        </div>
      </ScrollReveal>

      <MagicDivider className="mt-16" />
    </section>
  )
}

export default SectionReviews



