/**
 * Template de email para el administrador
 * Notificación de nueva venta
 */

export const adminEmailTemplate = (orderData) => {
  const { 
    customerName, 
    orderNumber, 
    items, 
    total, 
    shippingAddress,
    email,
    phone,
    paymentId 
  } = orderData;

  return {
    subject: `🎉 Nueva Venta en Astrochoc - Orden #${orderNumber}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva Venta - Astrochoc</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <tr>
      <td style="padding: 30px; text-align: center; background: linear-gradient(135deg, #0b1b3b, #2b174f); color: #ffffff;">
        <h1 style="margin: 0; font-size: 28px; color: #f4c867;">
          🎉 ¡Nueva Venta!
        </h1>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: rgba(255, 255, 255, 0.8);">
          Tienes un nuevo pedido en Astrochoc
        </p>
      </td>
    </tr>

    <!-- Alert banner -->
    <tr>
      <td style="padding: 0;">
        <div style="background-color: #4CAF50; padding: 15px 30px; text-align: center;">
          <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: bold;">
            💰 Total: $${total.toLocaleString('es-CL')} CLP
          </p>
        </div>
      </td>
    </tr>

    <!-- Información del pedido -->
    <tr>
      <td style="padding: 30px;">
        <h2 style="margin: 0 0 20px 0; font-size: 22px; color: #0b1b3b; border-bottom: 2px solid #f4c867; padding-bottom: 10px;">
          📦 Información del Pedido
        </h2>
        
        <table width="100%" cellpadding="8" cellspacing="0" style="margin-bottom: 20px;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; font-weight: bold; color: #555; width: 40%; border-bottom: 1px solid #e0e0e0;">
              Número de orden:
            </td>
            <td style="padding: 12px; color: #333; border-bottom: 1px solid #e0e0e0;">
              #${orderNumber}
            </td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; color: #555; border-bottom: 1px solid #e0e0e0;">
              Payment ID (MP):
            </td>
            <td style="padding: 12px; color: #333; border-bottom: 1px solid #e0e0e0; font-family: monospace;">
              ${paymentId || 'N/A'}
            </td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; font-weight: bold; color: #555;">
              Fecha y hora:
            </td>
            <td style="padding: 12px; color: #333;">
              ${new Date().toLocaleString('es-CL', { 
                timeZone: 'America/Santiago',
                dateStyle: 'full',
                timeStyle: 'short'
              })}
            </td>
          </tr>
        </table>

        <!-- Productos -->
        <h3 style="margin: 30px 0 15px 0; font-size: 18px; color: #0b1b3b;">
          🛍️ Productos
        </h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background-color: #0b1b3b; color: #ffffff;">
              <th style="padding: 12px; text-align: left; font-size: 14px;">Producto</th>
              <th style="padding: 12px; text-align: center; font-size: 14px;">Cant.</th>
              <th style="padding: 12px; text-align: right; font-size: 14px;">Precio Unit.</th>
              <th style="padding: 12px; text-align: right; font-size: 14px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${items.map((item, index) => `
              <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9f9f9'}; border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px; color: #333;">
                  <strong>${item.title}</strong>
                  ${item.description ? `<br><span style="font-size: 12px; color: #777;">${item.description}</span>` : ''}
                </td>
                <td style="padding: 12px; text-align: center; color: #333;">
                  ${item.quantity}
                </td>
                <td style="padding: 12px; text-align: right; color: #333;">
                  $${item.unit_price.toLocaleString('es-CL')}
                </td>
                <td style="padding: 12px; text-align: right; color: #333; font-weight: bold;">
                  $${(item.unit_price * item.quantity).toLocaleString('es-CL')}
                </td>
              </tr>
            `).join('')}
            <tr style="background-color: #f4c867;">
              <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold; font-size: 16px; color: #0b1b3b;">
                TOTAL:
              </td>
              <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; color: #0b1b3b;">
                $${total.toLocaleString('es-CL')}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Información del cliente -->
        <h3 style="margin: 30px 0 15px 0; font-size: 18px; color: #0b1b3b;">
          👤 Información del Cliente
        </h3>
        <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; border-left: 4px solid #f4c867;">
          <table width="100%" cellpadding="8" cellspacing="0">
            <tr>
              <td style="font-weight: bold; color: #555; width: 30%;">Nombre:</td>
              <td style="color: #333;">${customerName}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #555;">Email:</td>
              <td style="color: #333;">
                <a href="mailto:${email}" style="color: #0b1b3b; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #555;">Teléfono:</td>
              <td style="color: #333;">
                <a href="tel:${phone}" style="color: #0b1b3b; text-decoration: none;">${phone}</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Dirección de envío -->
        <h3 style="margin: 30px 0 15px 0; font-size: 18px; color: #0b1b3b;">
          🚚 Dirección de Envío
        </h3>
        <div style="background-color: #fff3cd; border-radius: 8px; padding: 20px; border-left: 4px solid #ffc107;">
          <p style="margin: 0; font-size: 15px; color: #333; line-height: 1.8;">
            <strong>${customerName}</strong><br>
            ${shippingAddress.street}<br>
            ${shippingAddress.city}, ${shippingAddress.state}
          </p>
        </div>

        <!-- Acciones rápidas -->
        <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #e3f2fd, #f3e5f5); border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 15px 0; font-size: 16px; color: #333; font-weight: bold;">
            ⚡ Acciones Rápidas
          </p>
          <a href="https://www.mercadopago.cl/movements" target="_blank" style="display: inline-block; margin: 5px; padding: 12px 24px; background-color: #0b1b3b; color: #f4c867; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
            Ver en Mercado Pago
          </a>
          <a href="mailto:${email}" style="display: inline-block; margin: 5px; padding: 12px 24px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">
            Contactar Cliente
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #f5f5f5; border-top: 2px solid #e0e0e0;">
        <p style="margin: 0; font-size: 12px; color: #999;">
          Este es un email automático generado por Astrochoc<br>
          <a href="https://astrochoc.cl" style="color: #0b1b3b; text-decoration: none;">astrochoc.cl</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
};

