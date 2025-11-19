# 🔐 Seguridad de Credenciales - Guía Completa

## ⚠️ IMPORTANTE: Seguridad de Credenciales

### ✅ SÍ es Seguro:
- ✅ Usar `.env` para **desarrollo local** (nunca subir a Git)
- ✅ Usar **Public Key** en el frontend (está diseñada para eso)
- ✅ Usar **variables de entorno** en plataformas de hosting (AWS Amplify, Railway, etc.)
- ✅ Usar **Access Token** solo en el backend (nunca en el frontend)

### ❌ NO es Seguro:
- ❌ Subir archivos `.env` a Git (ya está en `.gitignore`)
- ❌ Usar **Access Token** en el frontend
- ❌ Compartir credenciales públicamente
- ❌ Hardcodear credenciales en el código

---

## 📍 Dónde y Cómo Configurar las Credenciales

### 🌐 FRONTEND (AWS Amplify) - SEGURO

#### Para Producción:
**NO uses archivo `.env` en producción.** En su lugar, usa **Variables de Entorno en AWS Amplify**:

1. Ve a AWS Amplify Console
2. Configuración de la aplicación > Variables de entorno
3. Agrega:
   ```
   VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key-aqui
   VITE_BACKEND_URL=https://api.astrochoc.cl
   ```

**¿Por qué es seguro?**
- La **Public Key** está diseñada para usar en el frontend
- No permite realizar operaciones sensibles
- Solo permite crear preferencias de pago
- Las variables de entorno en AWS Amplify están encriptadas

#### Para Desarrollo Local:
**SÍ puedes usar `.env` para desarrollo local:**

1. Crea un archivo `.env` en la raíz del proyecto
2. Agrega:
   ```
   VITE_MP_PUBLIC_KEY=TEST-tu-public-key-test
   VITE_BACKEND_URL=http://localhost:3001
   ```
3. **NUNCA** subas este archivo a Git (ya está en `.gitignore`)

**¿Por qué es seguro?**
- Solo está en tu máquina local
- No se sube a Git
- Usas credenciales de TEST (no dinero real)

---

### 🔧 BACKEND (Servidor) - SEGURO

#### Para Producción:
**NO uses archivo `.env` en producción.** En su lugar, usa **Variables de Entorno en tu plataforma**:

**Railway:**
1. Ve a Railway Dashboard
2. Variables > Agrega variables de entorno
3. Agrega:
   ```
   MP_ACCESS_TOKEN=APP_USR-tu-access-token-aqui
   FRONTEND_URL=https://astrochoc.cl
   BACKEND_URL=https://api.astrochoc.cl
   PORT=3001
   ```

**Heroku:**
1. Ve a Heroku Dashboard
2. Settings > Config Vars
3. Agrega las mismas variables

**VPS (Servidor propio):**
1. Crea un archivo `.env` en la carpeta `server/`
2. Agrega las variables
3. **Asegúrate** de que el archivo `.env` esté en `.gitignore`
4. Configura permisos restrictivos: `chmod 600 server/.env`

#### Para Desarrollo Local:
**SÍ puedes usar `.env` para desarrollo local:**

1. Crea un archivo `server/.env` en la carpeta `server/`
2. Agrega:
   ```
   MP_ACCESS_TOKEN=TEST-tu-access-token-test
   FRONTEND_URL=http://localhost:5173
   BACKEND_URL=http://localhost:3001
   PORT=3001
   ```
3. **NUNCA** subas este archivo a Git (ya está en `.gitignore`)

---

## 🔑 Diferencia entre Public Key y Access Token

### Public Key (VITE_MP_PUBLIC_KEY)
- ✅ **Segura para el frontend**
- ✅ Puede estar en el código del cliente
- ✅ Solo permite crear preferencias de pago
- ✅ No permite acceder a información sensible
- ✅ No permite realizar operaciones de pago

**Ejemplo:**
```javascript
// Frontend - SEGURO
const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY
// APP_USR-1234567890abcdef-123456-...
```

### Access Token (MP_ACCESS_TOKEN)
- ❌ **NUNCA en el frontend**
- ❌ Solo en el backend
- ⚠️ Permite realizar operaciones sensibles
- ⚠️ Permite acceder a información de pagos
- ⚠️ Permite crear preferencias y procesar pagos

**Ejemplo:**
```javascript
// Backend - SEGURO (solo en servidor)
const accessToken = process.env.MP_ACCESS_TOKEN
// APP_USR-1234567890abcdef-123456-...
```

---

## 🛡️ Protección en el Código

### Frontend (`src/hooks/useMercadoPago.js`)
```javascript
// ✅ CORRECTO: Usar Public Key desde variables de entorno
const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY || config.mercadoPago.publicKey
const backendUrl = import.meta.env.VITE_BACKEND_URL || config.mercadoPago.checkoutUrl

// ❌ INCORRECTO: Hardcodear credenciales
// const publicKey = "APP_USR-1234567890abcdef-123456-..."
```

### Backend (`server/index.js`)
```javascript
// ✅ CORRECTO: Usar Access Token desde variables de entorno
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
})

// ❌ INCORRECTO: Hardcodear credenciales
// const client = new MercadoPagoConfig({
//   accessToken: "APP_USR-1234567890abcdef-123456-..."
// })
```

---

## 🔒 Verificación de Seguridad

### 1. Verificar que `.env` esté en `.gitignore`
```bash
# Verificar que .env está ignorado
cat .gitignore | grep .env
```

Deberías ver:
```
.env
.env.local
.env.production
.env.*
!.env.example
```

### 2. Verificar que no hay archivos `.env` en Git
```bash
# Verificar que no hay archivos .env en Git
git ls-files | grep .env
```

No deberías ver ningún archivo `.env` (solo `.env.example`)

### 3. Verificar que las credenciales no están hardcodeadas
```bash
# Buscar credenciales hardcodeadas en el código
grep -r "APP_USR-" src/ server/ --exclude-dir=node_modules
```

No deberías ver credenciales hardcodeadas

---

## 📋 Mejores Prácticas

### ✅ Desarrollo Local:
1. Usa archivo `.env` para desarrollo local
2. Usa credenciales de **TEST** (comienzan con `TEST-`)
3. **NUNCA** subas `.env` a Git
4. Usa `.env.example` como plantilla (sin valores reales)

### ✅ Producción:
1. **NUNCA** uses archivo `.env` en producción
2. Usa **Variables de Entorno** en la plataforma (AWS Amplify, Railway, etc.)
3. Usa credenciales de **PRODUCCIÓN** (comienzan con `APP_USR-`)
4. Rota las credenciales periódicamente
5. Monitorea el uso de las credenciales

### ✅ Seguridad Adicional:
1. Usa diferentes credenciales para desarrollo y producción
2. Limita el acceso a las credenciales
3. Rota las credenciales si se sospecha compromiso
4. Monitorea los logs para detectar uso anormal
5. Usa HTTPS siempre en producción

---

## 🚨 Si se Comprometen las Credenciales

### Si se compromete la Public Key:
1. Ve a Mercado Pago Developers
2. Genera una nueva Public Key
3. Actualiza la variable en AWS Amplify
4. Reinicia el build

### Si se compromete el Access Token:
1. **INMEDIATAMENTE** ve a Mercado Pago Developers
2. Revoca el Access Token comprometido
3. Genera un nuevo Access Token
4. Actualiza la variable en tu plataforma (Railway, Heroku, etc.)
5. Reinicia el servidor
6. Revisa los logs para detectar actividad sospechosa

---

## ✅ Checklist de Seguridad

- [ ] Archivo `.env` está en `.gitignore`
- [ ] No hay archivos `.env` en Git
- [ ] No hay credenciales hardcodeadas en el código
- [ ] Public Key solo en el frontend
- [ ] Access Token solo en el backend
- [ ] Variables de entorno configuradas en producción
- [ ] Credenciales de TEST para desarrollo
- [ ] Credenciales de PRODUCCIÓN para producción
- [ ] HTTPS configurado en producción
- [ ] Monitoreo de logs activo

---

## 📚 Recursos

- [Mercado Pago Security](https://www.mercadopago.cl/developers/es/docs/security)
- [AWS Amplify Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [OWASP Security Best Practices](https://owasp.org/www-project-web-security-testing-guide/)

---

✨ **¡Mantén tus credenciales seguras!** 🔒🌙



