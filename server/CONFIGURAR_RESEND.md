# 📧 Configurar Resend para Emails Automáticos

Este documento explica cómo configurar **Resend** para enviar emails automáticos a los clientes y al administrador cuando hay una venta.

---

## 🚀 Paso 1: Crear Cuenta en Resend

1. Ve a [https://resend.com/signup](https://resend.com/signup)
2. Regístrate con tu email
3. Verifica tu cuenta

**✅ Plan Gratuito:**
- 3,000 emails al mes
- 100 emails por día
- Perfecto para empezar

---

## 🔑 Paso 2: Obtener la API Key

1. Una vez dentro de Resend, ve a **[API Keys](https://resend.com/api-keys)**
2. Haz clic en **"Create API Key"**
3. Dale un nombre (ejemplo: `Astrochoc Production`)
4. Selecciona los permisos: **"Sending access"**
5. Haz clic en **"Add"**
6. **COPIA LA API KEY** (solo la verás una vez)
   - Se ve así: `re_xxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## ⚙️ Paso 3: Configurar Variables de Entorno

### En Railway (Backend):

1. Ve a [Railway Dashboard](https://railway.app/)
2. Selecciona tu proyecto **astrochoc**
3. Ve a **"Variables"**
4. Agrega estas 2 nuevas variables:

```bash
RESEND_API_KEY = re_xxxxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_EMAIL = tu-email@gmail.com
```

**Importante:**
- `RESEND_API_KEY`: La API key que copiaste de Resend
- `ADMIN_EMAIL`: El email donde quieres recibir notificaciones de ventas (tu email personal)

5. Haz clic en **"Deploy"** o espera el redeploy automático

---

## 📨 Paso 4: Verificar que Funciona

### Prueba Rápida:

1. Ve a tu sitio: **https://astrochoc.cl**
2. Agrega un producto al carrito
3. Completa el formulario de envío con un **email real tuyo** (para recibir el email de prueba)
4. Completa el pago en Mercado Pago (puedes usar credenciales de prueba)
5. **Revisa tu bandeja de entrada**:
   - Deberías recibir un email hermoso con los detalles del pedido
   - En el email del administrador (`ADMIN_EMAIL`) recibirás la notificación de venta

---

## 🎨 Paso 5 (Opcional): Configurar Dominio Personalizado

Por defecto, los emails se envían desde `onboarding@resend.dev`. Para usar tu propio dominio:

### Si tienes un dominio (ej: `astrochoc.cl`):

1. En Resend, ve a **[Domains](https://resend.com/domains)**
2. Haz clic en **"Add Domain"**
3. Ingresa tu dominio: `astrochoc.cl`
4. Sigue las instrucciones para agregar los registros DNS:
   - Agrega los registros MX, TXT, y CNAME que te indica Resend
   - Esto se hace en tu proveedor de dominio (donde compraste `astrochoc.cl`)
5. Espera la verificación (puede tomar 24-48 horas)
6. Una vez verificado, actualiza el código en `server/index.js`:

```javascript
// Cambiar esto:
from: 'Astrochoc <onboarding@resend.dev>'

// Por esto:
from: 'Astrochoc <hola@astrochoc.cl>'
```

---

## 📊 Paso 6: Monitorear Emails

### Ver emails enviados:

1. Ve a [Resend Emails](https://resend.com/emails)
2. Verás un listado de todos los emails enviados
3. Puedes ver:
   - ✅ Emails entregados
   - ❌ Emails con error
   - 📊 Estadísticas de apertura

---

## 🔧 Solución de Problemas

### ❌ "No se envían los emails"

**1. Verifica las variables de entorno en Railway:**
```bash
# Debe estar configurado:
RESEND_API_KEY = re_xxx...
ADMIN_EMAIL = tu@email.com
```

**2. Revisa los logs de Railway:**
- Ve a Railway → Tu proyecto → "Logs"
- Busca mensajes como:
  - `✅ Email enviado al cliente`
  - `❌ Error al enviar email`

**3. Verifica que el pago esté aprobado:**
- Los emails solo se envían cuando el pago tiene estado `approved`
- Revisa en Mercado Pago si el pago fue aprobado

### ⚠️ "El email del cliente no llega"

1. **Revisa spam/correo no deseado**
2. **Verifica que el cliente haya ingresado bien su email**
3. **Revisa en Resend Dashboard** si el email fue enviado:
   - [https://resend.com/emails](https://resend.com/emails)
   - Busca el email del cliente
   - Ve si dice "Delivered" o "Bounced"

### 📧 "El email del admin no llega"

1. **Verifica que `ADMIN_EMAIL` esté configurado en Railway**
2. **Revisa spam/correo no deseado**
3. **Prueba con otro email** (a veces Gmail bloquea ciertos emails)

---

## 📝 Resumen de Variables

| Variable | Dónde se usa | Ejemplo |
|----------|-------------|---------|
| `RESEND_API_KEY` | Railway (Backend) | `re_xxxxxxxxxx...` |
| `ADMIN_EMAIL` | Railway (Backend) | `tu@gmail.com` |
| `MP_ACCESS_TOKEN` | Railway (Backend) | `APP_USR-xxx...` |
| `FRONTEND_URL` | Railway (Backend) | `https://astrochoc.cl` |
| `BACKEND_URL` | Railway (Backend) | `https://astrochoc-production.up.railway.app` |
| `PORT` | Railway (Backend) | `3001` |

---

## ✅ Checklist Final

- [ ] Cuenta de Resend creada
- [ ] API Key obtenida y copiada
- [ ] `RESEND_API_KEY` configurada en Railway
- [ ] `ADMIN_EMAIL` configurada en Railway
- [ ] Backend redeployado en Railway
- [ ] Prueba realizada (email recibido)
- [ ] Emails verificados en Resend Dashboard

---

## 🎉 ¡Listo!

Ahora cada vez que alguien compre en Astrochoc:
- ✅ El **cliente** recibirá un email hermoso con los detalles de su pedido
- ✅ **Tú** recibirás un email con todos los datos para procesar el pedido
- ✅ Todo es automático, no tienes que hacer nada

**¿Dudas? Revisa los logs en Railway o en Resend Dashboard.** 🚀✨

