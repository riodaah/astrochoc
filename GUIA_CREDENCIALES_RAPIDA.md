# 🔐 Guía Rápida: Configurar Credenciales de Mercado Pago

## 📍 Dónde Configurar las Credenciales

### 🌐 **FRONTEND (AWS Amplify)**

Las credenciales del frontend se configuran en **AWS Amplify Console**:

#### Paso 1: Acceder a AWS Amplify
1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Selecciona tu app "Astrochoc"
3. Ve a **"Configuración de la aplicación"** (App settings)
4. Haz click en **"Variables de entorno"** (Environment variables)

#### Paso 2: Agregar Variables
Agrega estas dos variables:

**Variable 1: Public Key de Mercado Pago**
- **Nombre**: `VITE_MP_PUBLIC_KEY`
- **Valor**: `APP_USR-tu-public-key-aqui`
- **Ejemplo**: `APP_USR-1234567890abcdef-123456-123456`

**Variable 2: URL del Backend**
- **Nombre**: `VITE_BACKEND_URL`
- **Valor**: `https://api.astrochoc.cl` (o tu URL de backend)
- **Ejemplo**: `https://api.astrochoc.cl`

#### Paso 3: Guardar y Reiniciar
1. Haz click en **"Guardar"** (Save)
2. Ve a **"Despliegues"** (Deployments)
3. Haz click en **"Reiniciar build"** (Redeploy this version)
4. Espera a que termine el build

---

### 🔧 **BACKEND (Servidor)**

Las credenciales del backend se configuran según dónde alojes tu servidor:

#### Opción 1: Railway
1. Ve a [Railway Dashboard](https://railway.app/)
2. Selecciona tu proyecto
3. Ve a **"Variables"** (Variables)
4. Agrega las variables del archivo `server/.env.example`

#### Opción 2: Heroku
1. Ve a [Heroku Dashboard](https://dashboard.heroku.com/)
2. Selecciona tu app
3. Ve a **"Settings"** > **"Config Vars"**
4. Agrega las variables del archivo `server/.env.example`

#### Opción 3: VPS (Servidor propio)
1. Crea un archivo `.env` en la carpeta `server/`
2. Copia el contenido de `server/.env.example`
3. Reemplaza los valores con tus credenciales reales

#### Variables del Backend:
```env
MP_ACCESS_TOKEN=APP_USR-tu-access-token-aqui
FRONTEND_URL=https://astrochoc.cl
BACKEND_URL=https://api.astrochoc.cl
PORT=3001
```

---

## 🔑 Cómo Obtener las Credenciales

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

## 📝 Resumen de Variables

### Frontend (AWS Amplify):
```
VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key-aqui
VITE_BACKEND_URL=https://api.astrochoc.cl
```

### Backend (Servidor):
```
MP_ACCESS_TOKEN=APP_USR-tu-access-token-aqui
FRONTEND_URL=https://astrochoc.cl
BACKEND_URL=https://api.astrochoc.cl
PORT=3001
```

---

## 🔍 Verificar que Funcione

### 1. Verificar en el Código
El código usa las variables así:

**Frontend (`src/hooks/useMercadoPago.js`):**
```javascript
const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY
const backendUrl = import.meta.env.VITE_BACKEND_URL
```

**Backend (`server/index.js`):**
```javascript
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})
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

## ✅ Checklist

- [ ] Cuenta de Mercado Pago creada
- [ ] Aplicación "Astrochoc" creada
- [ ] Credenciales de producción obtenidas
- [ ] `VITE_MP_PUBLIC_KEY` configurada en Amplify
- [ ] `VITE_BACKEND_URL` configurada en Amplify
- [ ] `MP_ACCESS_TOKEN` configurada en el backend
- [ ] `FRONTEND_URL` configurada en el backend
- [ ] `BACKEND_URL` configurada en el backend
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



