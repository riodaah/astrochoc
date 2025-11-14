# 🔐 Guía de Credenciales de Mercado Pago

## 📍 Dónde Colocar las Credenciales

### 🌐 Frontend (AWS Amplify)

**Variables de Entorno en AWS Amplify:**

```
VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key-aqui
VITE_BACKEND_URL=https://api.astrochoc.cl
```

**Cómo configurarlas:**
1. Ve a AWS Amplify Console
2. Selecciona tu app "Astrochoc"
3. Ve a **"Configuración de la aplicación"**
4. Ve a **"Variables de entorno"**
5. Agrega las variables una por una
6. Haz click en **"Guardar"**
7. Reinicia el build

---

### 🔧 Backend (Si lo tienes separado)

**Variables de Entorno en tu Backend:**

```env
MP_ACCESS_TOKEN=APP_USR-tu-access-token-aqui
MP_PUBLIC_KEY=APP_USR-tu-public-key-aqui
FRONTEND_URL=https://astrochoc.cl
BACKEND_URL=https://api.astrochoc.cl
PORT=3001
```

**Dónde configurarlas:**
- Si usas **Railway**: Variables de entorno en Railway
- Si usas **Heroku**: Config vars en Heroku
- Si usas **VPS**: Archivo `.env` en el servidor
- Si usas **Vercel**: Variables de entorno en Vercel

---

## 🔑 Obtener Credenciales de Mercado Pago

### Paso 1: Acceder a Mercado Pago Developers

1. Ve a [https://www.mercadopago.cl/developers/](https://www.mercadopago.cl/developers/)
2. Inicia sesión con tu cuenta
3. Ve a **"Panel"** > **"Aplicaciones"**

### Paso 2: Crear o Seleccionar Aplicación

1. Si no tienes una aplicación, haz click en **"Crear aplicación"**
2. Nombre: **"Astrochoc"**
3. Tipo: **E-commerce / Marketplace**
4. Haz click en **"Crear"**

### Paso 3: Obtener Credenciales

Una vez creada la aplicación, ve a la sección **"Credenciales"**:

#### **Para Producción:**
- **Public Key**: `APP_USR-1234567890abcdef-123456-...`
- **Access Token**: `APP_USR-1234567890abcdef-123456-...`

#### **Para Testing (Sandbox):**
- **Public Key**: `TEST-1234567890abcdef-123456-...`
- **Access Token**: `TEST-1234567890abcdef-123456-...`

---

## ⚠️ IMPORTANTE: Seguridad

### ✅ SÍ hacer:
- ✅ Usar **Public Key** en el frontend (AWS Amplify)
- ✅ Usar **Access Token** solo en el backend
- ✅ Usar credenciales de **producción** en producción
- ✅ Usar credenciales de **test** en desarrollo

### ❌ NO hacer:
- ❌ **NUNCA** poner Access Token en el frontend
- ❌ **NUNCA** subir credenciales a Git
- ❌ **NUNCA** compartir credenciales públicamente
- ❌ **NUNCA** usar credenciales de test en producción

---

## 📝 Configuración en AWS Amplify

### Paso 1: Acceder a Variables de Entorno

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Selecciona tu app "Astrochoc"
3. Ve a **"Configuración de la aplicación"** (App settings)
4. Haz click en **"Variables de entorno"** (Environment variables)

### Paso 2: Agregar Variables

**Variable 1: Public Key de Mercado Pago**

1. Haz click en **"Agregar variable de entorno"** (Add environment variable)
2. **Nombre**: `VITE_MP_PUBLIC_KEY`
3. **Valor**: `APP_USR-tu-public-key-completo-aqui`
4. Haz click en **"Guardar"**

**Variable 2: URL del Backend**

1. Haz click en **"Agregar variable de entorno"**
2. **Nombre**: `VITE_BACKEND_URL`
3. **Valor**: `https://api.astrochoc.cl` (o tu URL de backend)
4. Haz click en **"Guardar"**

### Paso 3: Reiniciar Build

1. Después de agregar las variables, ve a **"Despliegues"** (Deployments)
2. Haz click en **"Reiniciar build"** (Redeploy this version)
3. Espera a que termine el build

---

## 🔍 Verificar que Funcione

### 1. Verificar en el Código

El código usa las variables así:

```javascript
// src/hooks/useMercadoPago.js
const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY
const backendUrl = import.meta.env.VITE_BACKEND_URL
```

### 2. Verificar en el Navegador

1. Abre tu sitio en el navegador
2. Abre la consola del navegador (F12)
3. Ve a la pestaña "Console"
4. Deberías ver: `🛒 Enviando pedido al backend: ...`
5. Si ves errores, verifica las variables de entorno

---

## 🧪 Testing

### Modo Test (Desarrollo)

Para probar sin usar dinero real:

1. Usa credenciales de **test** (comienzan con `TEST-`)
2. Configura en Amplify:
   ```
   VITE_MP_PUBLIC_KEY=TEST-tu-public-key-test
   ```
3. Usa tarjetas de prueba de Mercado Pago

### Modo Producción

Para recibir pagos reales:

1. Activa tu cuenta en Mercado Pago
2. Usa credenciales de **producción** (comienzan con `APP_USR-`)
3. Configura en Amplify:
   ```
   VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key-produccion
   ```

---

## 📚 Recursos

- [Mercado Pago Developers](https://www.mercadopago.cl/developers/)
- [Checkout Pro](https://www.mercadopago.cl/developers/es/docs/checkout-pro/landing)
- [Variables de Entorno en Vite](https://vitejs.dev/guide/env-and-mode.html)
- [AWS Amplify Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)

---

## ✅ Checklist de Credenciales

- [ ] Cuenta de Mercado Pago creada
- [ ] Aplicación "Astrochoc" creada
- [ ] Credenciales de producción obtenidas
- [ ] `VITE_MP_PUBLIC_KEY` configurada en Amplify
- [ ] `VITE_BACKEND_URL` configurada en Amplify (si tienes backend)
- [ ] Build reiniciado después de agregar variables
- [ ] Probado en modo test
- [ ] Probado en modo producción

---

## 🆘 Soporte

Si tienes problemas:

1. Verifica que las variables estén configuradas correctamente
2. Verifica que las credenciales sean válidas
3. Revisa los logs de build en Amplify
4. Revisa la consola del navegador
5. Contacta: hola@astrochoc.cl

---

✨ **¡Listo para recibir pagos!** 💳🌙

