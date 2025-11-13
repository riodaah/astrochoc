import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import MagicDivider from './MagicDivider'
import config from '../config.json'

const SectionFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: '¿Los chocolates son sin gluten?',
      answer: 'Sí, todos nuestros chocolates son 100% sin gluten. Son aptos para personas celíacas o con sensibilidad al gluten.',
    },
    {
      question: '¿Tienen azúcar?',
      answer: 'No contienen azúcar refinada. Están endulzados de forma natural para que puedas disfrutarlos sin culpa mientras cuidas tu bienestar.',
    },
    {
      question: '¿Puedo elegir mi carta de tarot?',
      answer: 'No, y esa es la magia de Astrochoc. Cada carta es elegida al azar por el universo, especialmente para ti. No puedes elegirla, ella te elige a ti 🌙',
    },
    {
      question: '¿Cuánto se demora el envío?',
      answer: 'Los despachos se realizan entre 2 y 5 días hábiles. Actualmente entregamos en la Región Metropolitana. Te enviaremos el tracking para que sigas tu pedido.',
    },
    {
      question: '¿Es apto para veganos?',
      answer: 'Actualmente nuestros chocolates contienen productos lácteos y frutos secos (avellanas y almendras). No son veganos, pero estamos trabajando en una versión plant-based 🌱',
    },
    {
      question: '¿Puedo enviarlo como regalo?',
      answer: '¡Por supuesto! Astrochoc es el regalo perfecto con sentido. Puedes agregar una nota personalizada en el checkout y enviaremos la caja directamente a quien quieras sorprender 🎁',
    },
    {
      question: '¿Qué significan las cartas del tarot?',
      answer: 'Cada caja incluye una descripción breve del significado de tu carta. No es una lectura profesional, sino un mensaje lúdico y simbólico para reflexionar mientras disfrutas tu chocolate ✨',
    },
    {
      question: '¿Puedo comprar varias cajas?',
      answer: 'Sí, puedes comprar las cajas que desees. Cada una tendrá una carta diferente elegida al azar, haciendo cada experiencia única.',
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="section-container relative">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="mystic-title">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-4">
            Resolvemos tus dudas cósmicas
          </p>
        </div>
      </ScrollReveal>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <ScrollReveal key={index} delay={index * 0.05}>
            <motion.div
              className="cosmic-card overflow-hidden"
              whileHover={{ scale: 1.01 }}
            >
              {/* Pregunta */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 group"
              >
                <span className="font-semibold text-white group-hover:text-cosmic-gold transition-colors flex-1">
                  {faq.question}
                </span>
                
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-cosmic-gold text-2xl flex-shrink-0"
                >
                  {openIndex === index ? '−' : '+'}
                </motion.div>
              </button>

              {/* Respuesta */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-cosmic-gold/20 pt-4">
                        <p className="text-white/80 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      {/* Contacto adicional */}
      <ScrollReveal>
        <div className="text-center mt-12 cosmic-card p-8 max-w-2xl mx-auto">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="font-cinzel text-xl text-cosmic-gold mb-3">
            ¿Tienes otra pregunta?
          </h3>
          <p className="text-white/80 mb-4 mb-6">
            Escríbenos y con gusto te ayudaremos
          </p>
          
          {/* Botón de Instagram */}
          <motion.a
            href={config.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            {/* Icono de Instagram */}
            <svg
              className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            
            {/* Texto del botón */}
            <span className="group-hover:tracking-wider transition-all">
              Síguenos en Instagram
            </span>
            
            {/* Flecha animada */}
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                x: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </motion.a>
          
          {/* Username de Instagram */}
          <p className="text-white/60 text-sm mt-4">
            @astro_choc
          </p>
        </div>
      </ScrollReveal>

      <MagicDivider className="mt-16" />
    </section>
  )
}

export default SectionFAQ

