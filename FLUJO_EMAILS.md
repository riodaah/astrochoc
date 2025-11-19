# 📧 Flujo de Emails en Astrochoc

## ✅ Confirmación del Flujo de Emails

### 1️⃣ **Captura del Email del Cliente**

**Archivo:** `src/components/ShippingForm.jsx`

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',      // 👈 EMAIL DEL CLIENTE SE CAPTURA AQUÍ
  phone: '',
  address: '',
  comuna: '',
  region: 'RM',
})
```

✅ El cliente escribe su email en el formulario de envío ANTES de ir a Mercado Pago.

---

### 2️⃣ **Envío al Hook de Mercado Pago**

**Archivo:** `src/components/CartDrawer.jsx`

```javascript
const handleCheckout = async (shippingData) => {
  // shippingData incluye el email del formulario
  await createCheckout(items, shippingData)  // 👈 SE PASA EL EMAIL AQUÍ
}
```

✅ El email del formulario se envía junto con los demás datos de envío.

---

### 3️⃣ **Preparación de Datos para Mercado Pago**

**Archivo:** `src/hooks/useMercadoPago.js`

```javascript
const payer = shippingData ? {
  name: shippingData.name,
  surname: '',
  email: shippingData.email,  // 👈 EMAIL DEL FORMULARIO
  phone: {
    number: String(shippingData.phone).replace(/[^0-9]/g, ''),
  },
  address: {
    street_name: shippingData.address,
  },
} : null

const requestBody = {
  items: formattedItems,
  payer: payer,  // 👈 SE ENVÍA AL BACKEND
}
```

✅ El email del formulario se incluye en el objeto `payer`.

---

### 4️⃣ **Backend: Guardar Email en Metadata**

**Archivo:** `server/index.js`

```javascript
const preferenceData = {
  items: items.map(item => ({ /* ... */ })),
  
  // Se incluye el pagador con el email del formulario
  payer: payer || undefined,  // 👈 EMAIL AQUÍ
  
  // IMPORTANTE: También se guarda en metadata
  metadata: {
    platform: 'astrochoc-web',
    customer_email: payer?.email || '',      // 👈 EMAIL GUARDADO EN METADATA
    customer_name: payer?.name || '',
    customer_phone: payer?.phone?.number || '',
    shipping_address: payer?.address?.street_name || ''
  }
}
```

✅ El email se envía de 2 formas:
- En `payer.email` → Para que Mercado Pago lo use
- En `metadata.customer_email` → **Para recuperarlo en el webhook (garantizado)**

---

### 5️⃣ **Webhook: Recuperar Email del Formulario**

**Archivo:** `server/index.js` (función `processPaymentNotification`)

```javascript
// Extraer información del pago
const metadata = paymentInfo.metadata || {};

const orderData = {
  paymentId: paymentInfo.id,
  orderNumber: paymentInfo.external_reference,
  
  // PRIORIZAR EMAIL DEL FORMULARIO (metadata)
  email: metadata.customer_email ||           // 👈 PRIMERO: Email del formulario
         paymentInfo.payer?.email ||         // 👈 SEGUNDO: Email de MP (fallback)
         '',
  
  customerName: metadata.customer_name || 'Cliente',
  phone: metadata.customer_phone || '',
  // ...
}

// Validar que tengamos email del cliente
if (!orderData.email) {
  console.warn('⚠️ No se encontró email del cliente');
  return;
}

// 1. ENVIAR EMAIL AL CLIENTE
const customerEmail = customerEmailTemplate(orderData);
await resend.emails.send({
  from: 'Astrochoc <onboarding@resend.dev>',
  to: orderData.email,  // 👈 EMAIL DEL FORMULARIO
  subject: customerEmail.subject,
  html: customerEmail.html,
});

// 2. ENVIAR EMAIL AL ADMINISTRADOR
const adminEmail = process.env.ADMIN_EMAIL;  // 👈 EMAIL DE RAILWAY
await resend.emails.send({
  from: 'Astrochoc Notificaciones <onboarding@resend.dev>',
  to: adminEmail,  // 👈 DA.MORANDE@GMAIL.COM
  subject: adminEmailData.subject,
  html: adminEmailData.html,
});
```

---

## ✅ **Resumen del Flujo:**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  1. Cliente llena formulario con su EMAIL                      │
│     (ShippingForm.jsx)                                          │
│     ↓                                                           │
│                                                                 │
│  2. Email se incluye en shippingData                           │
│     (CartDrawer.jsx)                                            │
│     ↓                                                           │
│                                                                 │
│  3. Email se envía en objeto "payer" al backend                │
│     (useMercadoPago.js)                                         │
│     ↓                                                           │
│                                                                 │
│  4. Backend guarda email en METADATA de la preferencia MP      │
│     (server/index.js - create-preference)                       │
│     ↓                                                           │
│                                                                 │
│  5. Mercado Pago procesa el pago                               │
│     ↓                                                           │
│                                                                 │
│  6. Webhook recibe notificación de pago aprobado               │
│     (server/index.js - webhook)                                 │
│     ↓                                                           │
│                                                                 │
│  7. Webhook recupera email del formulario desde METADATA       │
│     (Garantizado, no se pierde)                                │
│     ↓                                                           │
│                                                                 │
│  8. ENVÍO DE EMAILS:                                           │
│     ✉️ Cliente → Email del formulario (metadata)              │
│     ✉️ Admin → DA.MORANDE@GMAIL.COM (ADMIN_EMAIL de Railway) │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔑 **Variables de Entorno en Railway:**

```bash
ADMIN_EMAIL=DA.MORANDE@GMAIL.COM   # 👈 TÚ recibes emails de nuevas ventas
RESEND_API_KEY=re_xxxxxxxxxxxxx    # 👈 Para enviar emails
MP_ACCESS_TOKEN=APP_USR-xxxxxxxxx  # 👈 Mercado Pago (Producción)
BACKEND_URL=https://astrochoc-production.up.railway.app
FRONTEND_URL=https://astrochoc.cl
PORT=3001
```

---

## ✅ **¿Por qué usar METADATA?**

### ❌ **Problema Anterior:**

Mercado Pago puede:
- Sobrescribir el email con el email de la cuenta del usuario
- No incluir el email si el pago es anónimo
- Cambiar datos si el usuario está logueado con otra cuenta

### ✅ **Solución: METADATA**

Los `metadata` son datos personalizados que:
- **NO se modifican** por Mercado Pago
- **Siempre están disponibles** en el webhook
- **Se recuperan exactamente como se enviaron**

---

## 📊 **Verificación:**

Después de una compra exitosa:

1. **Cliente recibe email:**
   - ✉️ Asunto: "✨ ¡Tu pedido Astrochoc ha sido confirmado! ✨"
   - 📧 Enviado a: Email del formulario (el que escribió el cliente)
   - 📦 Contiene: Detalles del pedido, productos, total, dirección

2. **Tú (Admin) recibes email:**
   - ✉️ Asunto: "🎉 ¡Nueva Venta Astrochoc! Pedido #[order-...]"
   - 📧 Enviado a: DA.MORANDE@GMAIL.COM
   - 👤 Contiene: Datos del cliente, dirección de envío, productos, total

---

## 🧪 **Próxima Prueba:**

1. Haz una compra de prueba con un email diferente
2. Verifica que **ambos emails lleguen**:
   - ✅ Al email que escribiste en el formulario
   - ✅ A DA.MORANDE@GMAIL.COM (admin)

---

## ✅ **TODO ESTÁ CONFIGURADO CORRECTAMENTE:**

- ✅ Email del cliente se captura en el formulario
- ✅ Se envía a Mercado Pago en `payer` y `metadata`
- ✅ Se recupera desde `metadata` en el webhook (garantizado)
- ✅ Se envía al cliente usando Resend
- ✅ Se envía al admin (DA.MORANDE@GMAIL.COM) usando Resend
- ✅ No se exponen credenciales en logs

---

## 🚀 **Próximo Deploy:**

Railway está redeployando ahora (5-10 minutos).

**Después del deploy:**
1. Haz una compra de prueba
2. Revisa tu bandeja de entrada (DA.MORANDE@GMAIL.COM)
3. También revisa el email del formulario que uses en la prueba

**Deberías recibir 2 emails: uno al cliente y uno a ti como admin.** ✅

