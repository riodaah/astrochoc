/**
 * Template de email para el cliente
 * Diseño cósmico con branding de Astrochoc
 */

export const customerEmailTemplate = (orderData) => {
  const { 
    customerName, 
    orderNumber, 
    items, 
    total, 
    shippingAddress,
    email,
    phone 
  } = orderData;

  return {
    subject: `✨ ¡Gracias por tu compra, ${customerName}! - Orden #${orderNumber}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tu pedido de Astrochoc</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #0b1b3b, #020317); color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0b1b3b;">
    <!-- Header -->
    <tr>
      <td style="padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #0b1b3b, #2b174f);">
        <h1 style="margin: 0; font-size: 32px; color: #f4c867; font-weight: bold; text-shadow: 0 0 20px rgba(244, 200, 103, 0.5);">
          ✨ ASTROCHOC ✨
        </h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; color: #ffffff; opacity: 0.9;">
          Chocolate, Tarot y Magia
        </p>
      </td>
    </tr>

    <!-- Mensaje de agradecimiento -->
    <tr>
      <td style="padding: 40px 30px; text-align: center; background-color: rgba(244, 200, 103, 0.1);">
        <div style="font-size: 48px; margin-bottom: 20px;">🎉</div>
        <h2 style="margin: 0 0 15px 0; font-size: 28px; color: #f4c867;">
          ¡Gracias por tu compra!
        </h2>
        <p style="margin: 0; font-size: 16px; color: #ffffff; opacity: 0.8; line-height: 1.6;">
          Hola <strong>${customerName}</strong>, hemos recibido tu pedido y estamos preparando tu caja mágica con mucho cariño. 🌟
        </p>
      </td>
    </tr>

    <!-- Detalles del pedido -->
    <tr>
      <td style="padding: 30px;">
        <div style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 25px; border: 2px solid rgba(244, 200, 103, 0.3);">
          <h3 style="margin: 0 0 20px 0; font-size: 20px; color: #f4c867; border-bottom: 2px solid rgba(244, 200, 103, 0.3); padding-bottom: 10px;">
            📦 Detalles del Pedido
          </h3>
          
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 15px;">
            <tr>
              <td style="padding: 8px 0; color: rgba(255, 255, 255, 0.7); font-size: 14px;">
                Número de orden:
              </td>
              <td style="padding: 8px 0; color: #f4c867; font-weight: bold; text-align: right; font-size: 14px;">
                #${orderNumber}
              </td>
            </tr>
          </table>

          <div style="border-top: 1px solid rgba(244, 200, 103, 0.2); padding-top: 15px; margin-top: 10px;">
            ${items.map(item => `
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <div>
                  <div style="font-size: 16px; color: #ffffff; margin-bottom: 4px;">
                    ${item.title}
                  </div>
                  <div style="font-size: 13px; color: rgba(255, 255, 255, 0.6);">
                    Cantidad: ${item.quantity}
                  </div>
                </div>
                <div style="font-size: 16px; color: #f4c867; font-weight: bold;">
                  $${item.unit_price.toLocaleString('es-CL')}
                </div>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid rgba(244, 200, 103, 0.3);">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding: 10px 0; font-size: 18px; color: #ffffff; font-weight: bold;">
                  Total:
                </td>
                <td style="padding: 10px 0; font-size: 22px; color: #f4c867; font-weight: bold; text-align: right;">
                  $${total.toLocaleString('es-CL')}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </td>
    </tr>

    <!-- Dirección de envío -->
    <tr>
      <td style="padding: 0 30px 30px 30px;">
        <div style="background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 25px; border: 2px solid rgba(244, 200, 103, 0.3);">
          <h3 style="margin: 0 0 15px 0; font-size: 20px; color: #f4c867;">
            🚚 Dirección de Envío
          </h3>
          <p style="margin: 8px 0; font-size: 15px; color: #ffffff; line-height: 1.6;">
            <strong>${customerName}</strong><br>
            ${shippingAddress.street}<br>
            ${shippingAddress.city}, ${shippingAddress.state}<br>
            <br>
            📧 ${email}<br>
            📱 ${phone}
          </p>
        </div>
      </td>
    </tr>

    <!-- Próximos pasos -->
    <tr>
      <td style="padding: 0 30px 30px 30px;">
        <div style="background: linear-gradient(135deg, rgba(244, 200, 103, 0.1), rgba(244, 200, 103, 0.05)); border-radius: 12px; padding: 25px; border: 2px solid rgba(244, 200, 103, 0.3);">
          <h3 style="margin: 0 0 15px 0; font-size: 20px; color: #f4c867;">
            ✨ ¿Qué sigue ahora?
          </h3>
          <div style="margin: 15px 0;">
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="font-size: 24px; margin-right: 12px;">🎴</span>
              <p style="margin: 0; font-size: 15px; color: rgba(255, 255, 255, 0.9); line-height: 1.6;">
                El universo está eligiendo tu carta de tarot especial
              </p>
            </div>
            <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
              <span style="font-size: 24px; margin-right: 12px;">📦</span>
              <p style="margin: 0; font-size: 15px; color: rgba(255, 255, 255, 0.9); line-height: 1.6;">
                Prepararemos tu caja con mucho cariño y magia
              </p>
            </div>
            <div style="display: flex; align-items: flex-start;">
              <span style="font-size: 24px; margin-right: 12px;">🚚</span>
              <p style="margin: 0; font-size: 15px; color: rgba(255, 255, 255, 0.9); line-height: 1.6;">
                Tu pedido llegará en 2-5 días hábiles
              </p>
            </div>
          </div>
        </div>
      </td>
    </tr>

    <!-- Redes sociales -->
    <tr>
      <td style="padding: 30px; text-align: center; background-color: rgba(255, 255, 255, 0.03);">
        <p style="margin: 0 0 15px 0; font-size: 16px; color: #f4c867; font-weight: bold;">
          Síguenos en Instagram
        </p>
        <p style="margin: 0 0 20px 0;">
          <a href="https://www.instagram.com/astro_choc/" style="color: #f4c867; text-decoration: none; font-size: 18px; font-weight: bold;">
            @astro_choc
          </a>
        </p>
        <p style="margin: 20px 0 0 0; font-size: 13px; color: rgba(255, 255, 255, 0.5); font-style: italic;">
          ✨ Gracias por confiar en Astrochoc. El universo te sonríe ✨
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px; text-align: center; background-color: #020317; border-top: 2px solid rgba(244, 200, 103, 0.2);">
        <p style="margin: 0; font-size: 12px; color: rgba(255, 255, 255, 0.4);">
          © ${new Date().getFullYear()} Astrochoc - Chocolate, Tarot y Magia<br>
          <a href="https://astrochoc.cl" style="color: #f4c867; text-decoration: none;">astrochoc.cl</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };
};

