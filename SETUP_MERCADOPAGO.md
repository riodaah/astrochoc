# 🚀 Guía Completa de Configuración - Mercado Pago

Esta guía te llevará paso a paso para configurar el sistema de pagos completo de Astrochoc.cl

## 📋 Requisitos Previos

- Node.js 16+ instalado
- Cuenta de Mercado Pago (crear en [mercadopago.cl](https://www.mercadopago.cl))
- Git instalado

---

## 🎯 Paso 1: Configurar Cuenta de Mercado Pago

### 1.1 Crear Aplicación

1. Ve a [Mercado Pago Developers](https://www.mercadopago.cl/developers/panel/app)
2. Inicia sesión con tu cuenta
3. Click en "Crear aplicación"
4. Selecciona:
   - **Nombre**: Astrochoc
   - **Tipo**: E-commerce / Marketplace
   - **Modelo de negocio**: Recibo pagos online y offline
5. Haz click en "Crear aplicación"

### 1.2 Obtener Credenciales

Una vez creada la aplicación, ve a la sección "Credenciales":

**Para Desarrollo (Modo Test):**
- Access Token: `TEST-123456789-...`
- Public Key: `TEST-abcdef123-...`

**Para Producción:**
- Access Token: `APP_USR-123456789-...`
- Public Key: `APP_USR-abcdef123-...`

⚠️ **IMPORTANTE**: Nunca compartas tu Access Token públicamente

---

## 🏗️ Paso 2: Configurar el Frontend

### 2.1 Instalar Dependencias

```bash
# En la raíz del proyecto
npm install
```

### 2.2 Configurar Variables de Entorno

Crea un archivo `.env` en la raíz:

```bash
# Frontend .env
VITE_MP_PUBLIC_KEY=TEST-tu-public-key-aqui
VITE_BACKEND_URL=http://localhost:3001
```

### 2.3 Iniciar Frontend

```bash
npm run dev
```

El frontend estará en `http://localhost:3000`

---

## 🔧 Paso 3: Configurar el Backend

### 3.1 Instalar Dependencias del Backend

```bash
cd server
npm install
```

### 3.2 Configurar Variables de Entorno del Backend

Crea un archivo `.env` en la carpeta `server/`:

```bash
# server/.env
MP_ACCESS_TOKEN=TEST-tu-access-token-aqui
MP_PUBLIC_KEY=TEST-tu-public-key-aqui

FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:3001

PORT=3001
```

### 3.3 Iniciar Backend

```bash
# Desde server/
npm run dev
```

El backend estará en `http://localhost:3001`

### 3.4 Verificar que el Backend Funcione

Abre en tu navegador:
```
http://localhost:3001/health
```

Deberías ver:
```json
{
  "status": "ok",
  "service": "astrochoc-backend",
  "timestamp": "2024-..."
}
```

---

## 📹 Paso 4: Agregar tu Video

### 4.1 Preparar el Video

Coloca tu video de unboxing en la carpeta `/public/` con el nombre:
- `video-unboxing.mp4` (formato MP4 recomendado)
- Opcional: `video-unboxing.webm` (formato alternativo)

### 4.2 Optimizar Video (Opcional)

Para mejor rendimiento, optimiza tu video:

```bash
# Usando FFmpeg (instalar primero)
ffmpeg -i video-original.mp4 -c:v libx264 -crf 23 -c:a aac -b:a 128k video-unboxing.mp4
```

### 4.3 Usar Video de YouTube/Vimeo (Alternativa)

Si prefieres alojar el video externamente, edita `src/components/VideoModal.jsx`:

```jsx
// Reemplaza el <video> con:
<iframe 
  src="https://www.youtube.com/embed/TU_VIDEO_ID" 
  className="w-full h-full"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

---

## 🧪 Paso 5: Probar el Flujo de Pago

### 5.1 Probar en Modo Test

1. Abre el sitio web: `http://localhost:3000`
2. Agrega un producto al carrito
3. Haz click en "Finalizar compra con Mercado Pago"
4. Usa una tarjeta de prueba:

**Tarjetas de Prueba de Mercado Pago:**

| Marca | Número | CVV | Fecha | Resultado |
|-------|--------|-----|-------|-----------|
| Mastercard | 5031 7557 3453 0604 | 123 | 11/25 | ✅ Aprobado |
| Visa | 4509 9535 6623 3704 | 123 | 11/25 | ❌ Rechazado |
| Visa | 4168 8188 4444 7115 | 123 | 11/25 | ⏳ Pendiente |

Más tarjetas de prueba: [Mercado Pago Test Cards](https://www.mercadopago.cl/developers/es/docs/checkout-pro/additional-content/test-cards)

### 5.2 Verificar el Flujo

1. **Checkout**: Deberías ser redirigido a Mercado Pago
2. **Pago exitoso**: Regresa a `/success`
3. **Pago fallido**: Regresa a `/failure`
4. **Pago pendiente**: Regresa a `/pending`

---

## 🌐 Paso 6: Configurar Webhooks (Opcional pero Recomendado)

Los webhooks te permiten recibir notificaciones cuando cambia el estado de un pago.

### 6.1 Exponer tu servidor localmente con ngrok

```bash
# Instalar ngrok
npm install -g ngrok

# Exponer puerto 3001
ngrok http 3001
```

Copia la URL que te da ngrok (ej: `https://abc123.ngrok.io`)

### 6.2 Configurar Webhook en Mercado Pago

1. Ve a tu [Panel de Aplicaciones](https://www.mercadopago.cl/developers/panel/app)
2. Selecciona tu aplicación "Astrochoc"
3. Ve a "Webhooks" en el menú lateral
4. Agrega la URL: `https://abc123.ngrok.io/api/webhook`
5. Selecciona los eventos:
   - ✅ Pagos
   - ✅ Merchant Orders
6. Guarda cambios

### 6.3 Probar el Webhook

Realiza un pago de prueba y verifica en los logs del backend:

```bash
🔔 Webhook recibido: { type: 'payment', data: { id: '123456' } }
💳 Pago recibido: 123456
```

---

## 🚀 Paso 7: Preparar para Producción

### 7.1 Cambiar a Credenciales de Producción

1. Solicita activación de cuenta en Mercado Pago
2. Completa los requisitos (datos fiscales, etc.)
3. Una vez aprobado, obtén tus credenciales de producción
4. Actualiza los archivos `.env`:

**Frontend `.env`:**
```env
VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key-produccion
VITE_BACKEND_URL=https://api.astrochoc.cl
```

**Backend `server/.env`:**
```env
MP_ACCESS_TOKEN=APP_USR-tu-access-token-produccion
MP_PUBLIC_KEY=APP_USR-tu-public-key-produccion

FRONTEND_URL=https://astrochoc.cl
BACKEND_URL=https://api.astrochoc.cl

PORT=3001
```

### 7.2 Deploy del Frontend

**Opción A: Vercel (Recomendado)**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

En Vercel, configura las variables de entorno:
- `VITE_MP_PUBLIC_KEY`
- `VITE_BACKEND_URL`

**Opción B: Netlify**

```bash
# Build
npm run build

# Subir carpeta dist/ a Netlify
```

### 7.3 Deploy del Backend

**Opción A: Railway**

1. Conecta tu repo de GitHub
2. Selecciona la carpeta `server/`
3. Configura las variables de entorno
4. Deploy automático

**Opción B: Heroku**

```bash
cd server
heroku create astrochoc-backend
git push heroku main
```

**Opción C: VPS (DigitalOcean, AWS, etc.)**

```bash
# En tu servidor
git clone tu-repo
cd server
npm install
npm start

# Usar PM2 para mantener corriendo
npm install -g pm2
pm2 start index.js --name astrochoc-backend
pm2 save
pm2 startup
```

### 7.4 Configurar Webhook de Producción

1. Ve al [Panel de Mercado Pago](https://www.mercadopago.cl/developers/panel/app)
2. Actualiza la URL del webhook a: `https://api.astrochoc.cl/api/webhook`

---

## ✅ Checklist Final

Antes de lanzar a producción, verifica:

### Frontend
- [ ] Credenciales de producción configuradas
- [ ] Video de unboxing cargado
- [ ] Imágenes del producto cargadas
- [ ] Datos en `config.json` actualizados
- [ ] Build de producción probado (`npm run build`)
- [ ] Deploy exitoso

### Backend
- [ ] Credenciales de producción configuradas
- [ ] Variables de entorno correctas
- [ ] Webhook configurado y funcionando
- [ ] Servidor accesible públicamente
- [ ] HTTPS configurado
- [ ] Logs configurados

### Mercado Pago
- [ ] Cuenta activada para producción
- [ ] Aplicación verificada
- [ ] Webhooks configurados
- [ ] URLs de retorno correctas
- [ ] Pagos de prueba exitosos

### Legal y Seguridad
- [ ] Políticas de privacidad actualizadas
- [ ] Términos y condiciones actualizados
- [ ] SSL/HTTPS configurado
- [ ] Datos sensibles en variables de entorno

---

## 🐛 Troubleshooting

### Error: "Failed to fetch"
**Problema**: El frontend no se puede conectar al backend
**Solución**: 
- Verifica que el backend esté corriendo
- Verifica `VITE_BACKEND_URL` en `.env`
- Verifica CORS en el backend

### Error: "Invalid access token"
**Problema**: Token de Mercado Pago inválido
**Solución**:
- Verifica que copiaste el token completo
- Verifica que estés usando el token correcto (test/producción)
- Regenera el token en el panel de Mercado Pago

### Webhook no recibe notificaciones
**Problema**: El webhook no está recibiendo eventos
**Solución**:
- Verifica que la URL sea accesible públicamente
- Revisa que el webhook esté configurado en Mercado Pago
- Revisa los logs del servidor
- Usa ngrok para desarrollo local

### Video no se reproduce
**Problema**: El video no aparece o no se reproduce
**Solución**:
- Verifica que el archivo esté en `/public/video-unboxing.mp4`
- Verifica que el formato sea compatible (MP4 H.264)
- Comprueba la consola del navegador para errores
- Prueba con un video más pequeño

---

## 📞 Soporte

### Documentación Oficial
- [Mercado Pago Docs](https://www.mercadopago.cl/developers/)
- [Checkout Pro](https://www.mercadopago.cl/developers/es/docs/checkout-pro/landing)
- [Webhooks](https://www.mercadopago.cl/developers/es/docs/your-integrations/notifications/webhooks)

### Contacto Astrochoc
- 📧 Email: hola@astrochoc.cl
- 📱 Instagram: [@astro_choc](https://www.instagram.com/astro_choc/)

---

## 🎉 ¡Listo!

Tu sitio de Astrochoc ahora está completamente configurado con:
- ✅ Pagos con Mercado Pago
- ✅ Video de unboxing
- ✅ Carrito de compras funcional
- ✅ Páginas de éxito/error
- ✅ Sistema de webhooks

¡El universo te sonríe! ✨🌙

