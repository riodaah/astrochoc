/**
 * Backend para Astrochoc - Integración con Mercado Pago
 * Este servidor maneja la creación de preferencias de pago
 */

import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Configurar Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc',
  }
});

const preference = new Preference(client);

/**
 * Endpoint para crear preferencia de pago
 * POST /api/create-preference
 */
app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, payer, shipments } = req.body;

    // Validar items
    if (!items || items.length === 0) {
      return res.status(400).json({
        error: 'No se proporcionaron items para el pago'
      });
    }

    // Crear preferencia de Mercado Pago
    const preferenceData = {
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || 'Caja Astrochoc con chocolates y carta de tarot',
        picture_url: item.picture_url || `${process.env.FRONTEND_URL}/box-closed.png`,
        category_id: 'food',
        quantity: item.quantity,
        currency_id: 'CLP',
        unit_price: parseFloat(item.price)
      })),
      
      // URLs de retorno
      back_urls: {
        success: `${process.env.FRONTEND_URL}/success`,
        failure: `${process.env.FRONTEND_URL}/failure`,
        pending: `${process.env.FRONTEND_URL}/pending`
      },
      
      auto_return: 'approved',
      
      // Información del pagador (opcional)
      payer: payer || {},
      
      // Datos de envío
      shipments: shipments || {
        cost: 0,
        mode: 'not_specified'
      },
      
      // Configuraciones adicionales
      statement_descriptor: 'ASTROCHOC',
      external_reference: `order-${Date.now()}`,
      
      // Métodos de pago
      payment_methods: {
        excluded_payment_types: [],
        installments: 12,
        default_installments: 1
      },
      
      // Notificación
      notification_url: `${process.env.BACKEND_URL}/api/webhook`,
      
      // Metadata
      metadata: {
        platform: 'astrochoc-web',
        items_count: items.reduce((sum, item) => sum + item.quantity, 0)
      }
    };

    console.log('📦 Creando preferencia de pago:', {
      items: items.length,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    });

    const response = await preference.create({ body: preferenceData });

    console.log('✅ Preferencia creada:', response.id);

    res.json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point
    });

  } catch (error) {
    console.error('❌ Error al crear preferencia:', error);
    res.status(500).json({
      error: 'Error al crear la preferencia de pago',
      details: error.message
    });
  }
});

/**
 * Webhook para recibir notificaciones de Mercado Pago
 * POST /api/webhook
 */
app.post('/api/webhook', async (req, res) => {
  try {
    const { type, data } = req.body;

    console.log('🔔 Webhook recibido:', { type, data });

    // Responder rápidamente a Mercado Pago
    res.status(200).send('OK');

    // Procesar la notificación de forma asíncrona
    if (type === 'payment') {
      const paymentId = data.id;
      console.log('💳 Pago recibido:', paymentId);
      
      // Aquí puedes:
      // 1. Consultar el estado del pago
      // 2. Actualizar tu base de datos
      // 3. Enviar emails de confirmación
      // 4. Preparar el pedido para envío
    }

  } catch (error) {
    console.error('❌ Error en webhook:', error);
    res.status(500).send('Error');
  }
});

/**
 * Endpoint para consultar estado de pago
 * GET /api/payment/:id
 */
app.get('/api/payment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Aquí consultas el estado del pago en Mercado Pago
    // const payment = await mercadopago.payment.get(id);
    
    res.json({
      id,
      status: 'pending',
      message: 'Implementar consulta de pago'
    });

  } catch (error) {
    console.error('❌ Error al consultar pago:', error);
    res.status(500).json({
      error: 'Error al consultar el estado del pago'
    });
  }
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'astrochoc-backend',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
  ✨ Astrochoc Backend Server
  🚀 Servidor corriendo en puerto ${PORT}
  🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}
  💳 Mercado Pago configurado
  `);
});

export default app;

