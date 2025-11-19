import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import ScrollReveal from './ScrollReveal'
import CTAButton from './CTAButton'
import AddToCartButton from './AddToCartButton'
import config from '../config.json'

const ProductCard = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  // Galería de imágenes del producto
  const productImages = [
    '/Foto-producto-1.jpeg',
    '/Foto-producto-2.jpeg',
    '/Foto-producto-3.jpeg',
    '/Foto-producto-5.jpeg',
    '/Foto-producto-6.jpeg',
  ]

  const product = {
    id: 'astrochoc-box',
    name: config.product.name,
    price: config.product.price,
    originalPrice: config.product.originalPrice,
    currency: config.product.currency,
    description: config.product.description,
    includes: config.product.includes,
  }

  // Calcular descuento
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    if (onAddToCart) onAddToCart()
  }

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, 99))
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1))

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <ScrollReveal>
      <div className="max-w-5xl mx-auto">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="mystic-title">
            Pide tu Caja Mágica
          </h2>
          <p className="text-lg text-white/80 mt-4">
            Cada caja es una experiencia única preparada con cariño cósmico
          </p>
        </div>

        {/* Card del producto */}
        <motion.div
          whileHover={{ y: -5 }}
          className="cosmic-card p-8 md:p-12 relative overflow-hidden"
        >
          {/* Efecto de brillo de fondo */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cosmic-gold/10 rounded-full blur-3xl"
          />

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start">
            {/* Galería de imágenes del producto */}
            <div className="relative">
              {/* Imagen principal */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-cosmic-gold/30 shadow-2xl mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={productImages[selectedImage]}
                    alt={`${product.name} - Vista ${selectedImage + 1}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => {
                      // Opcional: expandir imagen al hacer click
                      setSelectedImage((selectedImage + 1) % productImages.length)
                    }}
                  />
                </AnimatePresence>

                {/* Badge "OFERTA LIMITADA" */}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute top-4 right-4 z-10"
                >
                  <div className="relative">
                    {/* Brillo pulsante detrás */}
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-red-500 rounded-full blur-md"
                    />
                    {/* Badge principal */}
                    <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full font-black text-sm shadow-2xl border-2 border-white/50">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-300">🔥</span>
                        <span>OFERTA LIMITADA</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Badge de descuento */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="absolute top-4 left-4 z-10"
                >
                  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white px-4 py-2 rounded-lg font-black text-lg shadow-2xl border-2 border-white">
                    <div className="text-center">
                      <div className="text-2xl leading-none">{discountPercentage}%</div>
                      <div className="text-xs leading-none mt-0.5">DCTO</div>
                    </div>
                  </div>
                </motion.div>

                {/* Indicador de imagen */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm z-10">
                  {selectedImage + 1} / {productImages.length}
                </div>

                {/* Efecto de brillo al hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cosmic-gold/0 via-cosmic-gold/10 to-cosmic-gold/0 pointer-events-none"
                  whileHover={{
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </div>

              {/* Thumbnails - Galería pequeña */}
              <div className="flex gap-2 justify-center flex-wrap">
                {productImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300
                      ${
                        selectedImage === index
                          ? 'border-cosmic-gold shadow-lg shadow-cosmic-gold/50 scale-110'
                          : 'border-cosmic-gold/30 hover:border-cosmic-gold/60 opacity-70 hover:opacity-100'
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`Vista ${index + 1} del producto`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay cuando está seleccionada */}
                    {selectedImage === index && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-cosmic-gold/20 border-2 border-cosmic-gold"
                      />
                    )}

                    {/* Indicador de selección */}
                    {selectedImage === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-1 right-1 w-4 h-4 bg-cosmic-gold rounded-full flex items-center justify-center"
                      >
                        <svg
                          className="w-3 h-3 text-cosmic-dark"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Partículas decorativas alrededor */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-cosmic-gold text-xl pointer-events-none"
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${15 + Math.random() * 70}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.2, 0.6, 0.2],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-3xl text-cosmic-gold mb-3">
                  {product.name}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Incluye */}
              <div className="space-y-2">
                <h4 className="font-semibold text-cosmic-gold">Incluye:</h4>
                <ul className="space-y-2">
                  {product.includes.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-white/80"
                    >
                      <span className="text-cosmic-gold">✦</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Precio y cantidad */}
              <div className="border-t border-cosmic-gold/30 pt-6">
                {/* Precio con oferta */}
                <div className="mb-6 p-4 bg-gradient-to-r from-red-600/20 to-red-500/20 rounded-xl border-2 border-red-500/50 relative overflow-hidden">
                  {/* Efecto de brillo animado */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                          }}
                          className="text-2xl"
                        >
                          🔥
                        </motion.span>
                        <span className="text-white/90 font-bold">Precio de oferta:</span>
                      </div>
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black">
                        -{discountPercentage}%
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Precio original tachado */}
                      <span className="text-xl text-white/50 line-through font-cinzel">
                        {formatPrice(product.originalPrice)}
                      </span>
                      
                      {/* Precio de oferta */}
                      <span className="text-4xl font-bold text-gradient font-cinzel">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-red-300 mt-2 font-semibold">
                      ⏰ ¡Solo por tiempo limitado!
                    </p>
                  </div>
                </div>

                {/* Selector de cantidad */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-white/70">Cantidad:</span>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={decrementQuantity}
                      className="w-10 h-10 rounded-full bg-cosmic-blue/40 border border-cosmic-gold/30 hover:border-cosmic-gold/60 flex items-center justify-center text-cosmic-gold font-bold text-xl transition-colors"
                    >
                      -
                    </motion.button>
                    <div className="w-16 text-center text-2xl font-bold text-cosmic-gold">
                      {quantity}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={incrementQuantity}
                      className="w-10 h-10 rounded-full bg-cosmic-blue/40 border border-cosmic-gold/30 hover:border-cosmic-gold/60 flex items-center justify-center text-cosmic-gold font-bold text-xl transition-colors"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Total */}
                {quantity > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-4 p-4 bg-cosmic-blue/20 rounded-lg"
                  >
                    <span className="text-white/70">Total:</span>
                    <span className="text-2xl font-bold text-cosmic-gold">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </motion.div>
                )}

                {/* Botón agregar al carrito */}
                <AddToCartButton onClick={handleAddToCart} />

                {/* Mensaje de éxito */}
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 bg-cosmic-gold/20 border border-cosmic-gold/50 rounded-lg text-cosmic-gold text-center font-medium"
                    >
                      ✨ ¡Agregado al carrito! El universo te sonríe
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Info adicional */}
              <div className="text-center text-sm text-white/60 pt-4 border-t border-cosmic-gold/20">
                <p>🚚 Envío entre 2-5 días hábiles</p>
                <p className="mt-1">🌟 Pago seguro con Mercado Pago</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mensaje sobre regalo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 p-6 cosmic-card"
        >
          <p className="text-lg text-cosmic-gold mb-2">
            🎁 <span className="font-cinzel font-bold">Regalo perfecto con sentido</span>
          </p>
          <p className="text-white/80">
            Regala una experiencia única que combina el placer del chocolate 
            con un mensaje personal del universo. Ideal para cumpleaños, aniversarios 
            o simplemente para decir "pienso en ti".
          </p>
        </motion.div>
      </div>
    </ScrollReveal>
  )
}

export default ProductCard

