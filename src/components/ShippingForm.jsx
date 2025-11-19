import { useState } from 'react'
import { motion } from 'framer-motion'
import config from '../config.json'

const ShippingForm = ({ onSubmit, total, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comuna: '',
    region: 'RM',
  })

  const [errors, setErrors] = useState({})

  const regiones = [
    { value: 'RM', label: 'Región Metropolitana', cost: config.shipping.costs.RM },
    { value: 'regiones', label: 'Otras Regiones', cost: config.shipping.costs.regiones },
  ]

  const shippingCost = formData.region === 'RM' 
    ? config.shipping.costs.RM 
    : config.shipping.costs.regiones

  const totalWithShipping = total + shippingCost

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio'
    } else if (!/^[0-9+\s()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Teléfono no válido'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es obligatoria'
    }

    if (!formData.comuna.trim()) {
      newErrors.comuna = 'La comuna es obligatoria'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        shippingCost,
        total: totalWithShipping,
      })
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h3 className="font-cinzel text-xl text-cosmic-gold mb-2">
          📦 Datos de envío
        </h3>
        <p className="text-white/60 text-sm">
          Completa tus datos para continuar con el pago
        </p>
      </div>

      {/* Nombre completo */}
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: María González"
          className={`
            w-full px-4 py-3 rounded-lg
            bg-cosmic-blue/20 border-2
            ${errors.name ? 'border-red-500' : 'border-cosmic-gold/30'}
            text-white placeholder-white/40
            focus:outline-none focus:border-cosmic-gold
            transition-colors
          `}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className={`
            w-full px-4 py-3 rounded-lg
            bg-cosmic-blue/20 border-2
            ${errors.email ? 'border-red-500' : 'border-cosmic-gold/30'}
            text-white placeholder-white/40
            focus:outline-none focus:border-cosmic-gold
            transition-colors
          `}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Teléfono *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+56 9 1234 5678"
          className={`
            w-full px-4 py-3 rounded-lg
            bg-cosmic-blue/20 border-2
            ${errors.phone ? 'border-red-500' : 'border-cosmic-gold/30'}
            text-white placeholder-white/40
            focus:outline-none focus:border-cosmic-gold
            transition-colors
          `}
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {/* Dirección */}
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Dirección *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Calle, número, depto/casa"
          className={`
            w-full px-4 py-3 rounded-lg
            bg-cosmic-blue/20 border-2
            ${errors.address ? 'border-red-500' : 'border-cosmic-gold/30'}
            text-white placeholder-white/40
            focus:outline-none focus:border-cosmic-gold
            transition-colors
          `}
        />
        {errors.address && (
          <p className="text-red-400 text-xs mt-1">{errors.address}</p>
        )}
      </div>

      {/* Comuna */}
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Comuna *
        </label>
        <input
          type="text"
          name="comuna"
          value={formData.comuna}
          onChange={handleChange}
          placeholder="Ej: Providencia"
          className={`
            w-full px-4 py-3 rounded-lg
            bg-cosmic-blue/20 border-2
            ${errors.comuna ? 'border-red-500' : 'border-cosmic-gold/30'}
            text-white placeholder-white/40
            focus:outline-none focus:border-cosmic-gold
            transition-colors
          `}
        />
        {errors.comuna && (
          <p className="text-red-400 text-xs mt-1">{errors.comuna}</p>
        )}
      </div>

      {/* Región */}
      <div>
        <label className="block text-white/80 text-sm font-medium mb-2">
          Región *
        </label>
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="
            w-full px-4 py-3 rounded-lg
            bg-cosmic-blue/20 border-2 border-cosmic-gold/30
            text-white
            focus:outline-none focus:border-cosmic-gold
            transition-colors
            cursor-pointer
          "
        >
          {regiones.map(region => (
            <option key={region.value} value={region.value} className="bg-cosmic-dark">
              {region.label} - {formatPrice(region.cost)}
            </option>
          ))}
        </select>
      </div>

      {/* Resumen de costos */}
      <div className="bg-cosmic-blue/10 rounded-lg p-4 border border-cosmic-gold/20 space-y-2">
        <div className="flex justify-between text-white/80">
          <span>Subtotal productos:</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-white/80">
          <span>Envío:</span>
          <span className="text-cosmic-gold font-semibold">
            {formatPrice(shippingCost)}
          </span>
        </div>
        <div className="border-t border-cosmic-gold/30 pt-2 flex justify-between text-lg font-bold">
          <span className="text-white">Total:</span>
          <span className="text-gradient font-cinzel">
            {formatPrice(totalWithShipping)}
          </span>
        </div>
      </div>

      {/* Botón submit */}
      <motion.button
        type="submit"
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
            🌙 Pagar con Mercado Pago
          </>
        )}
      </motion.button>

      <p className="text-center text-xs text-white/50">
        🔒 Pago seguro procesado por Mercado Pago
      </p>
    </motion.form>
  )
}

export default ShippingForm

