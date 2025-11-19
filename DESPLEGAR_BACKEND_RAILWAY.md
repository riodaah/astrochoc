# 🚀 Desplegar Backend en Railway - Guía Rápida

## ¿Qué es Railway?
Railway es una plataforma gratuita para desplegar aplicaciones Node.js. Es perfecta para el backend de Astrochoc.

---

## 📋 Paso 1: Crear Cuenta en Railway

1. Ve a [Railway.app](https://railway.app/)
2. Haz clic en **"Start a New Project"**
3. Inicia sesión con GitHub

---

## 📦 Paso 2: Desplegar el Backend

### Opción A: Desde GitHub (Recomendado)

1. En Railway, haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Autoriza Railway para acceder a GitHub
4. Selecciona el repositorio: **`riodaah/astrochoc`**
5. Railway detectará automáticamente que es un proyecto Node.js

### Opción B: Configuración Manual

Si Railway no detecta la carpeta `server/`:

1. Después de conectar el repo, ve a **"Settings"**
2. En **"Root Directory"**, escribe: `server`
3. En **"Start Command"**, escribe: `npm start`

---

## 🔑 Paso 3: Configurar Variables de Entorno

En Railway, ve a la sección **"Variables"** y agrega:

```
MP_ACCESS_TOKEN=APP_USR-6887577645902345-111320-f38500... (tu Access Token completo)
MP_PUBLIC_KEY=APP_USR-b0305921-60c7-49ac-8ce0-1a081a2... (tu Public Key)
FRONTEND_URL=https://astrochoc.cl
PORT=3001
```

**⚠️ IMPORTANTE:**
- Usa el **Access Token** (el que tiene el ojo 👁️ en Mercado Pago)
- NO uses la Public Key aquí, usa el Access Token
- `FRONTEND_URL` debe ser tu URL de AWS Amplify (o `https://astrochoc.cl` cuando tengas dominio)

---

## 📍 Paso 4: Obtener la URL del Backend

1. Una vez desplegado, Railway te dará una URL
2. Ejemplo: `https://astrochoc-backend-production.up.railway.app`
3. **Copia esta URL**

---

## 🔗 Paso 5: Actualizar AWS Amplify

1. Ve a AWS Amplify
2. Ve a **"Variables de entorno"**
3. Actualiza `VITE_BACKEND_URL`:
   - Valor anterior: `https://api-placeholder.com`
   - Valor nuevo: `https://astrochoc-backend-production.up.railway.app` (tu URL de Railway)
4. **Guarda los cambios**

---

## 🔄 Paso 6: Reiniciar Build en AWS Amplify

1. Ve a **"Implementaciones"**
2. Haz clic en **"Reiniciar este build"**
3. Espera 5-10 minutos

---

## ✅ Verificar que Funciona

1. Abre tu sitio: `https://astrochoc.cl`
2. Agrega un producto al carrito
3. Haz clic en **"Proceder al pago"**
4. Deberías ser redirigido a Mercado Pago

---

## 🐛 Solución de Problemas

### Error: "Backend not found"
- Verifica que el backend esté corriendo en Railway
- Verifica la URL en `VITE_BACKEND_URL`

### Error: "Unauthorized"
- Verifica que `MP_ACCESS_TOKEN` esté correctamente configurado en Railway
- Asegúrate de usar el Access Token (no la Public Key)

### Error: "CORS"
- Verifica que `FRONTEND_URL` en Railway sea correcto
- Debe coincidir con la URL de tu sitio

---

## 💰 Costo

**Railway:**
- ✅ **Gratis** para 500 horas/mes
- ✅ Más que suficiente para empezar
- ✅ Escalable cuando crezcas

---

## 📝 Resumen de URLs

Necesitas tener estas 3 URLs:

1. **Frontend (AWS Amplify):** `https://astrochoc.cl`
2. **Backend (Railway):** `https://astrochoc-backend-production.up.railway.app`
3. **Mercado Pago:** Tus credenciales configuradas en Railway

---

✨ **¡Listo! Tu backend estará funcionando en Railway y conectado con Mercado Pago!** 🚀



