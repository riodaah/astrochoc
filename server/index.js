/**
 * Backend para Astrochoc - Integración con Mercado Pago
 * Este servidor maneja la creación de preferencias de pago y envío de emails
 */

import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { customerEmailTemplate } from './emails/customerEmail.js';
import { adminEmailTemplate } from './emails/adminEmail.js';

dotenv.config();

// Configurar Resend para envío de emails
const resend = new Resend(process.env.RESEND_API_KEY);

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
      
      // Información del pagador (opcional pero recomendado)
      payer: payer || undefined,
      
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
      
      // Metadata (incluir email del formulario para el webhook)
      metadata: {
        platform: 'astrochoc-web',
        items_count: items.reduce((sum, item) => sum + item.quantity, 0),
        customer_email: payer?.email || '', // Email del formulario
        customer_name: payer?.name || '',
        customer_phone: payer?.phone?.number || '',
        shipping_address: payer?.address?.street_name || ''
      }
    };

    console.log('📦 Creando preferencia de pago...');

    const response = await preference.create({ body: preferenceData });

    console.log('✅ Preferencia creada exitosamente');

    res.json({
      id: response.id,
      init_point: response.init_point,
      sandbox_init_point: response.sandbox_init_point
    });

  } catch (error) {
    console.error('❌ Error al crear preferencia');
    res.status(500).json({
      error: 'Error al crear la preferencia de pago'
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

    console.log('🔔 Webhook recibido:', type);

    // Responder rápidamente a Mercado Pago (importante para no perder notificaciones)
    res.status(200).send('OK');

    // Procesar la notificación de forma asíncrona
    if (type === 'payment') {
      const paymentId = data.id;
      console.log('💳 Procesando pago...');
      
      // Procesar el pago de forma asíncrona (sin bloquear la respuesta)
      processPaymentNotification(paymentId).catch(err => {
        console.error('❌ Error al procesar pago');
      });
    }

  } catch (error) {
    console.error('❌ Error en webhook');
    res.status(500).send('Error');
  }
});

/**
 * Procesar notificación de pago y enviar emails
 */
async function processPaymentNotification(paymentId) {
  try {
    // Consultar información del pago en Mercado Pago
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });

    // Solo enviar emails si el pago fue aprobado
    if (paymentInfo.status === 'approved') {
      console.log('✅ Pago aprobado, preparando emails...');

      // Extraer información del pago
      // IMPORTANTE: Usar metadata para obtener los datos del formulario (no del payer de MP)
      const metadata = paymentInfo.metadata || {};
      
      const orderData = {
        paymentId: paymentInfo.id,
        orderNumber: paymentInfo.external_reference || `MP-${paymentInfo.id}`,
        
        // Priorizar datos del formulario (metadata) sobre datos de Mercado Pago
        customerName: metadata.customer_name || 
          (paymentInfo.payer?.first_name 
            ? `${paymentInfo.payer.first_name} ${paymentInfo.payer.last_name || ''}`
            : 'Cliente'),
        
        email: metadata.customer_email || paymentInfo.payer?.email || '',
        phone: metadata.customer_phone || paymentInfo.payer?.phone?.number || '',
        
        items: paymentInfo.additional_info?.items || [],
        total: paymentInfo.transaction_amount,
        
        shippingAddress: {
          street: metadata.shipping_address || 
            paymentInfo.payer?.address?.street_name || 
            'Dirección no especificada',
          city: paymentInfo.payer?.address?.city_name || '',
          state: paymentInfo.payer?.address?.state_name || '',
        },
      };

      // Validar que tengamos email del cliente
      if (!orderData.email) {
        console.warn('⚠️ No se encontró email del cliente');
        return;
      }

      // Email del administrador desde variable de entorno
      const adminEmail = process.env.ADMIN_EMAIL;

      // 1. Enviar email al cliente
      try {
        const customerEmail = customerEmailTemplate(orderData);
        await resend.emails.send({
          from: 'Astrochoc <onboarding@resend.dev>',
          to: orderData.email,
          subject: customerEmail.subject,
          html: customerEmail.html,
        });
        console.log('✅ Email enviado al cliente');
      } catch (emailError) {
        console.error('❌ Error al enviar email al cliente');
      }

      // 2. Enviar email al administrador
      if (adminEmail) {
        try {
          const adminEmailData = adminEmailTemplate(orderData);
          await resend.emails.send({
            from: 'Astrochoc Notificaciones <onboarding@resend.dev>',
            to: adminEmail,
            subject: adminEmailData.subject,
            html: adminEmailData.html,
          });
          console.log('✅ Email enviado al administrador');
        } catch (emailError) {
          console.error('❌ Error al enviar email al administrador');
        }
      } else {
        console.warn('⚠️ ADMIN_EMAIL no configurado');
      }

    } else {
      console.log(`⏳ Pago con estado "${paymentInfo.status}"`);
    }

  } catch (error) {
    console.error('❌ Error al procesar notificación');
    throw error;
  }
}

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



