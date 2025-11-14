import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import CTAButton from './CTAButton'

const Hero = ({ onVideoClick }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const scrollToProduct = () => {
    const element = document.querySelector('#producto')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Fondo con parallax */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-purple/30 via-cosmic-blue/20 to-cosmic-dark" />
        
        {/* Partículas flotantes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cosmic-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido Izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Título principal */}
            <motion.h1
              className="font-cinzel text-5xl md:text-6xl lg:text-7xl text-gradient leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Astrochoc
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl text-white font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Chocolates, Tarot y Magia en una sola caja
            </motion.h2>

            <motion.p
              className="text-lg text-white/80 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Dentro de cada pirámide hay 3 chocolates sin culpa y una carta del tarot 
              que el universo eligió solo para ti.
            </motion.p>

            {/* Badges */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {['Sin azúcar', 'Sin gluten', '39% cacao'].map((badge, index) => (
                <motion.span
                  key={badge}
                  className="px-4 py-2 bg-cosmic-blue/40 border border-cosmic-gold/30 rounded-full text-cosmic-gold text-sm font-medium backdrop-blur-sm"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(244, 200, 103, 0.6)' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  ✨ {badge}
                </motion.span>
              ))}
            </motion.div>

            {/* Subtítulo sobre regalo */}
            <motion.p
              className="text-cosmic-gold text-lg italic pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              🎁 El regalo perfecto con sentido: chocolates deliciosos + un mensaje del universo
            </motion.p>

            {/* Botones CTA */}
            <motion.div
              className="flex flex-wrap gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <CTAButton
                onClick={scrollToProduct}
                size="lg"
                icon="🌙"
              >
                Quiero mi caja mágica
              </CTAButton>

              <CTAButton
                onClick={onVideoClick}
                variant="secondary"
                size="lg"
                icon="▶"
              >
                Ver unboxing
              </CTAButton>
            </motion.div>
          </motion.div>

          {/* Imagen Derecha - Caja */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center"
          >
            {/* Video de la caja */}
            <motion.div
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Video de la caja piramidal */}
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl golden-glow overflow-hidden relative">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-3xl"
                >
                  <source src="/hero-box.mp4" type="video/mp4" />
                  <source src="/hero-box.webm" type="video/webm" />
                  
                  {/* Fallback si no carga el video */}
                  <div className="w-full h-full bg-gradient-to-br from-cosmic-blue via-cosmic-purple to-cosmic-blue flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">📦</div>
                      <p className="text-cosmic-gold font-cinzel text-xl">
                        Caja Astrochoc
                      </p>
                    </div>
                  </div>
                </video>
              </div>

              {/* Partículas alrededor de la caja */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cosmic-gold rounded-full"
                  style={{
                    left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 60}%`,
                    top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 60}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Círculo de luz detrás */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-cosmic-gold/20 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-cosmic-gold text-center"
        >
          <div className="text-sm mb-2">Descubre la magia</div>
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero

