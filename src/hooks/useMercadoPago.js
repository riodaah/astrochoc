import { useState, useEffect } from 'react'
import config from '../config.json'

/**
 * Hook para integración con Mercado Pago Checkout Pro
 * 
 * IMPORTANTE:
 * - MP_PUBLIC_KEY debe venir de variables de entorno (import.meta.env.VITE_MP_PUBLIC_KEY)
 * - checkoutUrl debe apuntar a tu backend que crea la preferencia de pago
 * - El backend debe devolver la URL de checkout de Mercado Pago
 */

export const useMercadoPago = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [mpLoaded, setMpLoaded] = useState(false)

  // Obtener configuración desde variables de entorno
  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY || config.mercadoPago.publicKey
  const backendUrl = import.meta.env.VITE_BACKEND_URL || config.mercadoPago.checkoutUrl

  // Credenciales cargadas (sin exponer en consola por seguridad)

  useEffect(() => {
    // Cargar el SDK de Mercado Pago
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    script.onload = () => setMpLoaded(true)
    script.onerror = () => setError('Error al cargar Mercado Pago SDK')
    
    document.body.appendChild(script)

    return () => {
      // Limpiar el script al desmontar
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  /**
   * Crea una preferencia de pago y redirige al checkout
   * @param {Array} items - Array de items del carrito con { id, title, quantity, unit_price }
   * @param {Object} shippingData - Datos de envío del cliente
   * @returns {Promise<void>}
   */
  const createCheckout = async (items, shippingData = null) => {
    setIsLoading(true)
    setError(null)

    try {
      // Validar que haya items
      if (!items || items.length === 0) {
        throw new Error('El carrito está vacío')
      }

      // Formatear items para el backend
      const formattedItems = items.map(item => ({
        id: item.id || 'astrochoc-box',
        title: item.name || item.title,
        description: 'Caja Astrochoc con chocolates sin azúcar ni gluten + carta de tarot',
        quantity: item.quantity,
        price: item.price,
        currency_id: 'CLP',
      }))

      // Preparar datos del pagador si existen
      const payer = shippingData ? {
        name: shippingData.name || 'Cliente',
        surname: '', // Mercado Pago acepta surname vacío
        email: shippingData.email,
        phone: {
          area_code: '',
          number: String(shippingData.phone).replace(/[^0-9]/g, ''), // Solo números
        },
        address: {
          street_name: shippingData.address,
          street_number: null,
          zip_code: '',
        },
      } : null

      // Enviando pedido al backend
      console.log('🛒 Procesando pedido...')

      // Llamar al backend para crear la preferencia
      const requestBody = {
        items: formattedItems,
      }

      if (payer) {
        requestBody.payer = payer
      }

      const response = await fetch(`${backendUrl}/api/create-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear la preferencia de pago')
      }

      const data = await response.json()
      console.log('✅ Redirigiendo a Mercado Pago...')

      // Redirigir al checkout de Mercado Pago
      // Usar sandbox_init_point en desarrollo, init_point en producción
      const checkoutUrl = data.init_point || data.sandbox_init_point
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        throw new Error('No se recibió la URL de checkout')
      }
    } catch (err) {
      setError(err.message || 'Error al procesar el pago')
      alert(`❌ Error al procesar el pago:\n\n${err.message}\n\nPor favor, intenta nuevamente.`)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createCheckout,
    isLoading,
    error,
    mpLoaded,
  }
}

export default useMercadoPago

