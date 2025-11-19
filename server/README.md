# 🌙 Astrochoc Backend - Mercado Pago Integration

Backend server para manejar pagos de Astrochoc.cl con Mercado Pago.

## 🚀 Instalación

```bash
cd server
npm install
```

## ⚙️ Configuración

1. **Crea tu cuenta de Mercado Pago**
   - Ve a [Mercado Pago Developers](https://www.mercadopago.cl/developers/)
   - Crea una aplicación

2. **Obtén tus credenciales**
   - Access Token (para el backend)
   - Public Key (para el frontend)

3. **Configura el archivo .env**
   ```bash
   cp .env.example .env
   ```
   
   Luego edita `.env` con tus credenciales:
   ```env
   MP_ACCESS_TOKEN=APP_USR-tu-access-token
   MP_PUBLIC_KEY=APP_USR-tu-public-key
   FRONTEND_URL=http://localhost:3000
   BACKEND_URL=http://localhost:3001
   PORT=3001
   ```

## 🏃‍♂️ Ejecutar

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor estará disponible en `http://localhost:3001`

## 📡 Endpoints

### POST /api/create-preference
Crea una preferencia de pago en Mercado Pago.

**Request:**
```json
{
  "items": [
    {
      "id": "astrochoc-box",
      "title": "Caja Astrochoc",
      "description": "Chocolates + Tarot",
      "quantity": 1,
      "price": 14990
    }
  ]
}
```

**Response:**
```json
{
  "id": "123456789-abcd-1234-5678-123456789abc",
  "init_point": "https://www.mercadopago.cl/checkout/v1/redirect?pref_id=...",
  "sandbox_init_point": "https://sandbox.mercadopago.cl/checkout/v1/redirect?pref_id=..."
}
```

### POST /api/webhook
Recibe notificaciones de Mercado Pago sobre cambios en pagos.

### GET /api/payment/:id
Consulta el estado de un pago específico.

### GET /health
Health check del servidor.

## 🔐 Webhook Configuration

Para recibir notificaciones de Mercado Pago en producción:

1. Tu servidor debe estar en una URL pública (usa ngrok para desarrollo)
2. Configura el webhook en tu aplicación de Mercado Pago
3. La URL del webhook será: `https://tu-dominio.com/api/webhook`

### Usar ngrok en desarrollo:
```bash
ngrok http 3001
```

Luego actualiza `BACKEND_URL` en tu `.env` con la URL de ngrok.

## 🧪 Testing

### Modo Sandbox
Mercado Pago provee un ambiente de pruebas:

1. Usa credenciales de test (comienzan con `TEST-`)
2. Usa tarjetas de prueba: [Tarjetas de prueba](https://www.mercadopago.cl/developers/es/docs/checkout-pro/additional-content/test-cards)

**Tarjetas de prueba comunes:**
- **APRO**: Mastercard 5031 7557 3453 0604
- **OTHE**: Visa 4509 9535 6623 3704

## 📦 Deploy

### Vercel
```bash
vercel --prod
```

### Heroku
```bash
heroku create astrochoc-backend
git push heroku main
```

### Railway
1. Conecta tu repositorio
2. Configura las variables de entorno
3. Deploy automático

## 🔒 Seguridad

- ✅ Nunca expongas tu `ACCESS_TOKEN` en el frontend
- ✅ Valida todos los webhooks
- ✅ Usa HTTPS en producción
- ✅ Implementa rate limiting
- ✅ Valida los montos en el backend

## 📝 Logs

El servidor registra:
- ✅ Creación de preferencias
- 💳 Notificaciones de pago
- ❌ Errores

## 🐛 Troubleshooting

### Error: "Invalid access token"
- Verifica que tu `MP_ACCESS_TOKEN` sea correcto
- Asegúrate de usar el token correcto (test vs producción)

### Error: "CORS"
- Verifica que `FRONTEND_URL` esté configurado correctamente
- Asegúrate de que el frontend use la URL correcta del backend

### Webhook no recibe notificaciones
- Verifica que tu servidor sea accesible públicamente
- Revisa la configuración del webhook en Mercado Pago
- Revisa los logs del servidor

## 📚 Recursos

- [Documentación Mercado Pago](https://www.mercadopago.cl/developers/)
- [SDK Node.js](https://github.com/mercadopago/sdk-nodejs)
- [Checkout Pro](https://www.mercadopago.cl/developers/es/docs/checkout-pro/landing)

## 💬 Soporte

Para dudas: hola@astrochoc.cl



