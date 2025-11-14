# ✅ Todo Listo - Astrochoc.cl

## 🎉 Repositorio Git Configurado

Tu código está en GitHub: **https://github.com/riodaah/astrochoc**

---

## 🚀 Próximos Pasos para AWS Amplify

### 1️⃣ Crear App en AWS Amplify

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Haz click en **"Crear nueva aplicación"** (Create new app)
3. Selecciona **"GitHub"** como proveedor
4. Autoriza AWS Amplify para acceder a GitHub
5. Selecciona el repositorio: **`riodaah/astrochoc`**
6. Selecciona la rama: **`main`**
7. Haz click en **"Siguiente"**

### 2️⃣ Configurar Variables de Entorno ⚠️ **MUY IMPORTANTE**

**Aquí es donde debes colocar tus credenciales de Mercado Pago:**

1. En la configuración de la app, busca **"Variables de entorno"**
2. Agrega estas variables:

   **Variable 1:**
   - **Nombre**: `VITE_MP_PUBLIC_KEY`
   - **Valor**: `APP_USR-tu-public-key-de-mercadopago`
   - **Descripción**: Public Key de Mercado Pago

   **Variable 2:**
   - **Nombre**: `VITE_BACKEND_URL`
   - **Valor**: `https://api.astrochoc.cl` (o tu URL de backend)
   - **Descripción**: URL del backend

3. Haz click en **"Guardar"**

### 3️⃣ Revisar y Desplegar

1. Revisa la configuración de build (debería detectar automáticamente Vite/React)
2. Verifica que las variables de entorno estén configuradas
3. Haz click en **"Guardar y desplegar"** (Save and deploy)
4. Espera a que el build termine (5-10 minutos)
5. Obtendrás una URL: `https://xxxxx.amplifyapp.com`

---

## 🔐 Dónde Obtener Credenciales de Mercado Pago

### Paso 1: Acceder a Mercado Pago

1. Ve a [Mercado Pago Developers](https://www.mercadopago.cl/developers/)
2. Inicia sesión con tu cuenta
3. Ve a **"Panel"** > **"Aplicaciones"**
4. Crea una aplicación "Astrochoc" si no la tienes

### Paso 2: Obtener Credenciales

**Para Producción:**
- **Public Key**: `APP_USR-123456789-...` (comienza con `APP_USR-`)
- **Access Token**: `APP_USR-123456789-...` (NO lo pongas en el frontend)

**Para Testing:**
- **Public Key**: `TEST-123456789-...` (comienza con `TEST-`)
- **Access Token**: `TEST-123456789-...` (NO lo pongas en el frontend)

### Paso 3: Configurar en AWS Amplify

1. En AWS Amplify, ve a **"Configuración de la aplicación"**
2. Ve a **"Variables de entorno"**
3. Agrega `VITE_MP_PUBLIC_KEY` con tu Public Key
4. Agrega `VITE_BACKEND_URL` con la URL de tu backend (si lo tienes)
5. Haz click en **"Guardar"**
6. Reinicia el build

---

## 📚 Documentación Completa

Tienes 3 guías detalladas en el repositorio:

1. **`GUIA_AMPLIFY_RAPIDA.md`** - Guía rápida paso a paso
2. **`CREDENCIALES_MERCADOPAGO.md`** - Guía completa de credenciales
3. **`DEPLOY_AMPLIFY.md`** - Guía detallada de despliegue

---

## ✅ Checklist Final

- [x] Repositorio Git configurado
- [x] Código subido a GitHub
- [x] Archivo `amplify.yml` creado
- [x] Documentación creada
- [ ] App creada en AWS Amplify
- [ ] Repositorio conectado a Amplify
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] URL de producción funcionando
- [ ] Mercado Pago probado

---

## 🎯 Resumen

### Repositorio Git
✅ **Listo**: https://github.com/riodaah/astrochoc

### AWS Amplify
📋 **Siguiente paso**: Crear app y configurar variables de entorno

### Mercado Pago
🔐 **Dónde configurar**: Variables de entorno en AWS Amplify

### Credenciales
🔑 **Qué poner**: Solo `VITE_MP_PUBLIC_KEY` (nunca el Access Token)

---

## 🆘 Si Tienes Problemas

1. **Error de build**: Revisa los logs en Amplify
2. **Variables no funcionan**: Verifica que comiencen con `VITE_`
3. **Mercado Pago no funciona**: Verifica que las credenciales sean correctas
4. **Consulta las guías**: Revisa `GUIA_AMPLIFY_RAPIDA.md` y `CREDENCIALES_MERCADOPAGO.md`

---

## 📞 Soporte

- 📧 Email: hola@astrochoc.cl
- 📱 Instagram: [@astro_choc](https://www.instagram.com/astro_choc/)
- 📚 Documentación: Revisa los archivos `.md` en el repositorio

---

## 🎉 ¡Listo!

Tu sitio está listo para desplegarse en AWS Amplify. Solo necesitas:

1. Crear la app en Amplify
2. Conectar el repositorio
3. Configurar las variables de entorno
4. ¡Desplegar!

**El universo te sonríe** 🌙✨

