# ⚡ Solución Rápida - Backend para Mercado Pago

## 🎯 Problema Actual

El sitio está funcionando, pero al intentar pagar sale este error:

```
❌ No se pudo conectar con el servidor de pagos

Asegúrate de que:
1. El servidor backend esté corriendo (npm run dev en /server)
2. VITE_BACKEND_URL esté configurado correctamente en .env
3. Las credenciales de Mercado Pago sean válidas
```

**Causa:** No tienes un backend desplegado que procese los pagos.

---

## ✅ Solución 1: Desplegar Backend en Railway (5 minutos)

### Paso a Paso:

#### 1. Ir a Railway
- Ve a: https://railway.app/
- Haz clic en **"Start a New Project"**
- Inicia sesión con GitHub

#### 2. Conectar Repositorio
- Haz clic en **"Deploy from GitHub repo"**
- Selecciona: **`riodaah/astrochoc`**
- Railway comenzará a desplegar

#### 3. Configurar Root Directory
- Ve a **"Settings"**
- En **"Root Directory"**, escribe: `server`
- En **"Start Command"**, escribe: `npm start`
- Guarda los cambios

#### 4. Agregar Variables de Entorno
En **"Variables"**, agrega:

```
MP_ACCESS_TOKEN = APP_USR-6887577645902345-111320-f38500... (tu Access Token COMPLETO)
FRONTEND_URL = https://main.d1dpbp1ahoxzq.amplifyapp.com (tu URL de AWS Amplify)
PORT = 3001
```

**⚠️ MUY IMPORTANTE:**
- Para `MP_ACCESS_TOKEN`: Usa el **Access Token** (el que tiene el ojo 👁️)
- NO uses la Public Key aquí
- Copia el valor COMPLETO del Access Token

#### 5. Copiar URL del Backend
- Railway te dará una URL como: `https://tu-app.up.railway.app`
- **Copia esta URL**

#### 6. Actualizar AWS Amplify
- Ve a AWS Amplify > Variables de entorno
- Actualiza `VITE_BACKEND_URL` con la URL de Railway
- Ejemplo: `https://tu-app.up.railway.app`
- Guarda y reinicia el build

#### 7. Esperar y Probar
- Espera 5-10 minutos a que se despliegue
- Abre tu sitio
- Prueba agregar al carrito y pagar
- ¡Debería funcionar! 🎉

---

## ✅ Solución 2: Usar Vercel (Alternativa)

Si Railway no funciona, prueba Vercel:

1. Ve a: https://vercel.com/
2. Importa tu repositorio de GitHub
3. Configura Root Directory: `server`
4. Agrega las mismas variables de entorno
5. Deploy

---

## ✅ Solución 3: Usar Render (Otra Alternativa)

1. Ve a: https://render.com/
2. Conecta tu repositorio
3. Selecciona "Web Service"
4. Root Directory: `server`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Agrega variables de entorno
8. Deploy

---

## 📋 Checklist Rápido

Para que el checkout funcione, necesitas:

- [ ] Backend desplegado en Railway/Vercel/Render
- [ ] Variables de entorno configuradas en el backend:
  - [ ] `MP_ACCESS_TOKEN` (Access Token de Mercado Pago)
  - [ ] `FRONTEND_URL` (URL de AWS Amplify)
  - [ ] `PORT` (3001)
- [ ] URL del backend copiada
- [ ] `VITE_BACKEND_URL` actualizada en AWS Amplify con la URL del backend
- [ ] Build reiniciado en AWS Amplify
- [ ] Sitio funcionando y conectado al backend

---

## 🔍 Verificar que Funciona

### Prueba 1: Backend está corriendo
- Abre en el navegador: `https://tu-backend.up.railway.app/health`
- Deberías ver: `{"status":"ok","service":"astrochoc-backend"}`

### Prueba 2: Checkout funciona
1. Abre tu sitio
2. Agrega un producto al carrito
3. Haz clic en "Proceder al pago"
4. Deberías ser redirigido a Mercado Pago

---

## ⏱️ Tiempo Estimado

- **Railway:** 5-10 minutos
- **Vercel:** 5-10 minutos
- **Render:** 10-15 minutos

---

## 💰 Costos

Todas estas opciones tienen plan gratuito:
- **Railway:** 500 horas/mes gratis
- **Vercel:** Ilimitado para proyectos personales
- **Render:** 750 horas/mes gratis

---

## 🆘 Si Tienes Problemas

Comparte:
1. Plataforma que usaste (Railway/Vercel/Render)
2. Mensaje de error que ves
3. URL del backend que te dieron

---

✨ **¡Sigue estos pasos y en 10 minutos tu checkout estará funcionando!** 🚀💳



