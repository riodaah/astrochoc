import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import useMercadoPago from '../hooks/useMercadoPago'

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, cartCount, updateQuantity, removeFromCart, getTotal } = useCart()
  const { createCheckout, isLoading } = useMercadoPago()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = async () => {
    if (cartItems.length === 0) return
    
    // Preparar items para Mercado Pago
    const items = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      title: item.name,
      quantity: item.quantity,
      price: item.price,
    }))

    await createCheckout(items)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-cosmic-dark border-l border-cosmic-gold/30 z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-cosmic-gold/30 backdrop-blur-glass">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-cinzel text-2xl text-gradient">
                    Tu Carrito Cósmico
                  </h2>
                  <p className="text-white/60 text-sm mt-1">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-cosmic-blue/40 border border-cosmic-gold/30 flex items-center justify-center text-cosmic-gold hover:border-cosmic-gold/60 transition-colors"
                >
                  ✕
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🌌</div>
                  <p className="text-xl text-cosmic-gold font-cinzel mb-2">
                    Tu universo está vacío aún
                  </p>
                  <p className="text-white/60">
                    ✨ Agrega una caja mágica
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="cosmic-card p-4"
                    >
                      <div className="flex gap-4">
                        {/* Imagen */}
                        <div className="w-20 h-20 bg-gradient-to-br from-cosmic-blue/40 to-cosmic-purple/40 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                          🎁
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="text-cosmic-gold font-bold mb-2">
                            {formatPrice(item.price)}
                          </p>

                          {/* Cantidad */}
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-cosmic-blue/40 border border-cosmic-gold/30 flex items-center justify-center text-cosmic-gold text-sm"
                            >
                              -
                            </motion.button>
                            <span className="w-8 text-center text-cosmic-gold font-bold">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-cosmic-blue/40 border border-cosmic-gold/30 flex items-center justify-center text-cosmic-gold text-sm"
                            >
                              +
                            </motion.button>
                          </div>
                        </div>

                        {/* Eliminar */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 self-start"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </motion.button>
                      </div>

                      {/* Subtotal */}
                      {item.quantity > 1 && (
                        <div className="mt-3 pt-3 border-t border-cosmic-gold/20 flex justify-between text-sm">
                          <span className="text-white/60">Subtotal:</span>
                          <span className="text-cosmic-gold font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-cosmic-gold/30 backdrop-blur-glass space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between text-xl">
                  <span className="text-white/80 font-semibold">Total:</span>
                  <span className="font-cinzel text-2xl text-gradient">
                    {formatPrice(getTotal())}
                  </span>
                </div>

                {/* Botón Checkout */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-4 rounded-full font-bold text-lg
                    bg-gradient-to-r from-cosmic-gold to-yellow-500
                    text-cosmic-dark
                    shadow-lg hover:shadow-2xl
                    transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2
                  `}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        ⭐
                      </motion.div>
                      Procesando...
                    </>
                  ) : (
                    <>
                      🌙 Finalizar compra con Mercado Pago
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-white/50">
                  Pago seguro procesado por Mercado Pago
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer

