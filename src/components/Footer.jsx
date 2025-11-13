import { motion } from 'framer-motion'
import config from '../config.json'

const Footer = ({ onPolicyClick }) => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'Instagram',
      url: config.contact.instagram,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'TikTok',
      url: config.contact.tiktok,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
    },
  ]

  const policyLinks = [
    { name: 'Política de Privacidad', type: 'privacy' },
    { name: 'Política de Devoluciones', type: 'returns' },
    { name: 'Términos y Condiciones', type: 'terms' },
  ]

  return (
    <footer className="relative bg-black border-t border-cosmic-gold/30 mt-20">
      {/* Líneas doradas decorativas */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cosmic-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Columna 1: Logo y tagline */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 mb-4"
            >
              <img 
                src="/Logo.jpeg" 
                alt="Astrochoc Logo" 
                className="w-12 h-12 object-contain rounded-full"
              />
              <span className="font-cinzel text-2xl text-gradient font-bold">
                ASTROCHOC
              </span>
            </motion.div>
            <p className="text-cosmic-gold text-sm mb-2">
              Chocolate & Cosmic
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Regálate un mensaje del universo envuelto en chocolate.
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h3 className="font-cinzel text-cosmic-gold text-lg mb-4">
              Contacto
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${config.contact.email}`}
                className="text-white/70 hover:text-cosmic-gold transition-colors flex items-center gap-2"
              >
                <span>✉️</span>
                {config.contact.email}
              </a>
              <p className="text-white/70">
                <span>📍</span> Región Metropolitana, Chile
              </p>
            </div>
          </div>

          {/* Columna 3: Redes Sociales */}
          <div>
            <h3 className="font-cinzel text-cosmic-gold text-lg mb-4">
              Síguenos
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-cosmic-blue/40 border border-cosmic-gold/30 rounded-full flex items-center justify-center text-cosmic-gold hover:border-cosmic-gold/60 hover:bg-cosmic-blue/60 transition-all"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-white/60 text-xs mt-4">
              Comparte tu experiencia con #Astrochoc
            </p>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-cosmic-gold/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Links de políticas */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {policyLinks.map((link) => (
                <button
                  key={link.type}
                  onClick={() => onPolicyClick(link.type)}
                  className="text-white/60 hover:text-cosmic-gold transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-white/50 text-sm text-center md:text-right">
              © {currentYear} Astrochoc. Todos los derechos reservados.
            </p>
          </div>
        </div>

        {/* Mensaje final */}
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="text-center mt-8 text-cosmic-gold/50 text-xs"
        >
          ✨ Hecho con magia y amor cósmico ✨
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

