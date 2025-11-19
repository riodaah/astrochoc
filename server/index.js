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
      
      // Metadata
      metadata: {
        platform: 'astrochoc-web',
        items_count: items.reduce((sum, item) => sum + item.quantity, 0)
      }
    };

    console.log('📦 Creando preferencia de pago:', {
      items: items.length,
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      payer: payer ? 'Datos incluidos' : 'Sin datos'
    });

    // Log de datos del pagador para debug
    if (payer) {
      console.log('👤 Datos del pagador:', {
        name: payer.name,
        email: payer.email,
        phone: payer.phone?.number,
        address: payer.address?.street_name
      });
    }

    const response = await preference.create({ body: preferenceData });

    console.log('✅ Preferencia creada:', {
      id: response.id,
      init_point: response.init_point ? 'OK' : 'MISSING',
      sandbox_init_point: response.sandbox_init_point ? 'OK' : 'MISSING',
      status: response.status || 'N/A',
      collector_id: response.collector_id || 'N/A'
    });

    // Log de la respuesta completa (para debug)
    console.log('📊 Respuesta completa de MP:', JSON.stringify(response, null, 2));

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

    // Responder rápidamente a Mercado Pago (importante para no perder notificaciones)
    res.status(200).send('OK');

    // Procesar la notificación de forma asíncrona
    if (type === 'payment') {
      const paymentId = data.id;
      console.log('💳 Pago recibido:', paymentId);
      
      // Procesar el pago de forma asíncrona (sin bloquear la respuesta)
      processPaymentNotification(paymentId).catch(err => {
        console.error('❌ Error al procesar pago:', err);
      });
    }

  } catch (error) {
    console.error('❌ Error en webhook:', error);
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

    console.log('📊 Información del pago:', {
      id: paymentInfo.id,
      status: paymentInfo.status,
      amount: paymentInfo.transaction_amount
    });

    // Solo enviar emails si el pago fue aprobado
    if (paymentInfo.status === 'approved') {
      console.log('✅ Pago aprobado, preparando emails...');

      // Extraer información del pago
      const orderData = {
        paymentId: paymentInfo.id,
        orderNumber: paymentInfo.external_reference || `MP-${paymentInfo.id}`,
        customerName: paymentInfo.payer?.first_name 
          ? `${paymentInfo.payer.first_name} ${paymentInfo.payer.last_name || ''}`
          : paymentInfo.payer?.email || 'Cliente',
        email: paymentInfo.payer?.email || '',
        phone: paymentInfo.payer?.phone?.number || '',
        items: paymentInfo.additional_info?.items || [],
        total: paymentInfo.transaction_amount,
        shippingAddress: {
          street: paymentInfo.payer?.address?.street_name || 'Dirección no especificada',
          city: paymentInfo.payer?.address?.city_name || '',
          state: paymentInfo.payer?.address?.state_name || '',
        },
      };

      // Validar que tengamos email del cliente
      if (!orderData.email) {
        console.warn('⚠️ No se encontró email del cliente, no se pueden enviar emails');
        return;
      }

      // Email del administrador desde variable de entorno
      const adminEmail = process.env.ADMIN_EMAIL;

      // 1. Enviar email al cliente
      try {
        const customerEmail = customerEmailTemplate(orderData);
        await resend.emails.send({
          from: 'Astrochoc <onboarding@resend.dev>', // Cambiar cuando tengas dominio verificado
          to: orderData.email,
          subject: customerEmail.subject,
          html: customerEmail.html,
        });
        console.log('✅ Email enviado al cliente:', orderData.email);
      } catch (emailError) {
        console.error('❌ Error al enviar email al cliente:', emailError);
      }

      // 2. Enviar email al administrador
      if (adminEmail) {
        try {
          const adminEmailData = adminEmailTemplate(orderData);
          await resend.emails.send({
            from: 'Astrochoc Notificaciones <onboarding@resend.dev>', // Cambiar cuando tengas dominio verificado
            to: adminEmail,
            subject: adminEmailData.subject,
            html: adminEmailData.html,
          });
          console.log('✅ Email enviado al administrador:', adminEmail);
        } catch (emailError) {
          console.error('❌ Error al enviar email al administrador:', emailError);
        }
      } else {
        console.warn('⚠️ No se configuró ADMIN_EMAIL, no se envió email al administrador');
      }

    } else {
      console.log(`⏳ Pago con estado "${paymentInfo.status}", no se envían emails`);
    }

  } catch (error) {
    console.error('❌ Error al procesar notificación de pago:', error);
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



