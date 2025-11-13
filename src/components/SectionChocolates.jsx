import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import MagicDivider from './MagicDivider'

const SectionChocolates = () => {
  const features = [
    {
      icon: '🍫',
      title: '39% cacao',
      description: 'Cuidadosamente seleccionado de las mejores cosechas',
    },
    {
      icon: '🍯',
      title: 'Sin azúcar refinada',
      description: 'Endulzado naturalmente para cuidar tu bienestar',
    },
    {
      icon: '🌾',
      title: 'Sin gluten',
      description: 'Apto para celíacos y sensibles al gluten',
    },
    {
      icon: '🌰',
      title: 'Avellanas y almendras',
      description: 'Relleno con frutos secos tostados y crujientes',
    },
  ]

  const nutritionalInfo = [
    { label: 'Calorías', value: '~180 kcal', sublabel: 'por porción' },
    { label: 'Proteínas', value: '4g', sublabel: 'por bombón' },
    { label: 'Grasas', value: '12g', sublabel: 'saludables' },
    { label: 'Azúcar', value: '0g', sublabel: 'añadida' },
  ]

  return (
    <section id="chocolates" className="section-container relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-purple/5 to-transparent" />
      
      <div className="relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="mystic-title">
              Chocolate sin culpa, con mucha magia
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mt-4">
              Tres bombones perfectos que combinan sabor, calidad y bienestar
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen Izquierda */}
          <ScrollReveal direction="left">
            <div className="relative flex items-center justify-center">
              <motion.div
                whileHover={{ rotate: [0, -2, 2, -2, 0] }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="w-full max-w-md aspect-square rounded-3xl cosmic-card overflow-hidden">
                  <img
                    src="/chocolates-closeup.jpeg"
                    alt="Chocolates Astrochoc - 39% cacao sin azúcar ni gluten con avellanas y almendras"
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

              {/* Partículas de cacao */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 360],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  ☕
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Features Derecha */}
          <ScrollReveal direction="right">
            <div className="space-y-8">
              {/* Grid de características */}
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="cosmic-card p-6 text-center"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="text-5xl mb-3"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="font-cinzel text-cosmic-gold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Info nutricional */}
              <div className="cosmic-card p-6">
                <h3 className="font-cinzel text-cosmic-gold text-xl mb-4 text-center">
                  Información Nutricional
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {nutritionalInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold text-cosmic-gold mb-1">
                        {item.value}
                      </div>
                      <div className="text-white/90 text-sm font-medium">
                        {item.label}
                      </div>
                      <div className="text-white/50 text-xs mt-1">
                        {item.sublabel}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* La nube esponjosa */}
              <div className="cosmic-card p-6 bg-gradient-to-br from-cosmic-blue/30 to-cosmic-purple/30">
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="text-5xl"
                  >
                    ☁️
                  </motion.div>
                  <div>
                    <h3 className="font-cinzel text-cosmic-gold text-lg mb-2">
                      La Nube Protectora
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Cada caja incluye una suave nube esponjosa que protege 
                      tanto la carta como los chocolates, manteniendo la textura 
                      perfecta y añadiendo un toque extra de magia a tu experiencia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <MagicDivider className="mt-16" />
    </section>
  )
}

export default SectionChocolates

