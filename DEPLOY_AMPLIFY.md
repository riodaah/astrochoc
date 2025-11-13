# 🚀 Guía de Despliegue en AWS Amplify - Astrochoc

Esta guía te ayudará a desplegar Astrochoc.cl en AWS Amplify paso a paso.

## 📋 Prerequisitos

1. ✅ Repositorio Git configurado y subido a GitHub
2. ✅ Cuenta de AWS
3. ✅ Credenciales de Mercado Pago

---

## 🌐 Paso 1: Conectar Repositorio a AWS Amplify

### 1.1 Acceder a AWS Amplify

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Inicia sesión con tu cuenta de AWS
3. Haz click en **"Crear nueva aplicación"** (Create new app)

### 1.2 Conectar Repositorio

1. Selecciona **"GitHub"** como proveedor de código
2. Autoriza AWS Amplify para acceder a tu cuenta de GitHub
3. Selecciona el repositorio: `riodaah/astrochoc`
4. Selecciona la rama: `master` o `main`
5. Haz click en **"Siguiente"**

---

## ⚙️ Paso 2: Configurar Build Settings

Amplify debería detectar automáticamente que es una aplicación Vite/React. Si no, configura manualmente:

### 2.1 Configuración de Build

El archivo `amplify.yml` ya está configurado en el repositorio. AWS Amplify lo detectará automáticamente.

**Configuración automática:**
- **Framework**: React (Vite)
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Base directory**: `/` (raíz)

### 2.2 Variables de Entorno

**⚠️ IMPORTANTE: Aquí es donde debes colocar tus credenciales de Mercado Pago**

En la sección **"Variables de entorno"**, agrega:

```
VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key-aqui
VITE_BACKEND_URL=https://tu-backend-url.com
```

**Para encontrar las Variables de Entorno en Amplify:**
1. En la configuración de la app, busca la sección **"Variables de entorno"**
2. Haz click en **"Agregar variable de entorno"** (Add environment variable)
3. Agrega cada variable una por una:

   | Variable | Valor | Descripción |
   |----------|-------|-------------|
   | `VITE_MP_PUBLIC_KEY` | `APP_USR-...` | Public Key de Mercado Pago |
   | `VITE_BACKEND_URL` | `https://...` | URL de tu backend (si tienes) |

---

## 🔐 Paso 3: Configurar Credenciales de Mercado Pago

### 3.1 Obtener Credenciales

1. Ve a [Mercado Pago Developers](https://www.mercadopago.cl/developers/)
2. Inicia sesión con tu cuenta
3. Ve a **"Aplicaciones"** > **"Astrochoc"**
4. Copia tus credenciales:

   - **Public Key** (para el frontend)
   - **Access Token** (para el backend - NO lo pongas en el frontend)

### 3.2 Configurar en Amplify

1. En AWS Amplify, ve a **"Configuración de la aplicación"**
2. Ve a **"Variables de entorno"**
3. Agrega las variables:

   ```
   VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key-produccion
   VITE_BACKEND_URL=https://api.astrochoc.cl
   ```

   ⚠️ **NUNCA** pongas el Access Token aquí, solo el Public Key.

### 3.3 Configurar Backend (Opcional)

Si tienes un backend separado:

1. Despliega tu backend en otro servicio (Railway, Heroku, etc.)
2. Configura la URL del backend en `VITE_BACKEND_URL`
3. En el backend, configura el `MP_ACCESS_TOKEN` como variable de entorno

---

## 🏗️ Paso 4: Revisar y Desplegar

### 4.1 Revisar Configuración

1. Revisa la configuración de build
2. Verifica las variables de entorno
3. Verifica la rama y el repositorio

### 4.2 Iniciar Despliegue

1. Haz click en **"Guardar y desplegar"** (Save and deploy)
2. Espera a que el build termine (5-10 minutos)
3. Una vez completado, obtendrás una URL: `https://xxxxx.amplifyapp.com`

---

## 🌍 Paso 5: Configurar Dominio Personalizado (Opcional)

### 5.1 Agregar Dominio

1. En AWS Amplify, ve a **"Configuración de dominio"**
2. Haz click en **"Agregar dominio"**
3. Ingresa tu dominio: `astrochoc.cl`
4. Sigue las instrucciones para configurar DNS

### 5.2 Configurar DNS

Necesitarás agregar registros CNAME en tu proveedor de DNS:

```
Tipo: CNAME
Nombre: www
Valor: xxxxx.amplifyapp.com
```

---

## 🔄 Paso 6: Configurar Despliegue Automático

### 6.1 Despliegue Continuo

AWS Amplify desplegará automáticamente cada vez que hagas push a la rama principal.

**Para desplegar:**
```bash
git add .
git commit -m "Actualización"
git push origin master
```

### 6.2 Builds Automáticos

- ✅ Cada push a `master` → Despliegue automático
- ✅ Pull requests → Build de preview
- ✅ Builds fallidos → Notificaciones por email

---

## 📝 Variables de Entorno Necesarias

### Frontend (AWS Amplify)

```env
VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key
VITE_BACKEND_URL=https://api.astrochoc.cl
```

### Backend (Si lo tienes separado)

```env
MP_ACCESS_TOKEN=APP_USR-tu-access-token
MP_PUBLIC_KEY=APP_USR-tu-public-key
FRONTEND_URL=https://astrochoc.cl
BACKEND_URL=https://api.astrochoc.cl
PORT=3001
```

---

## 🐛 Solución de Problemas

### Error: "Build failed"

1. Verifica que las variables de entorno estén configuradas
2. Revisa los logs de build en Amplify
3. Verifica que el comando `npm run build` funcione localmente

### Error: "Variables de entorno no encontradas"

1. Verifica que las variables estén configuradas en Amplify
2. Las variables deben comenzar con `VITE_` para que Vite las reconozca
3. Reinicia el build después de agregar variables

### Error: "Mercado Pago no funciona"

1. Verifica que `VITE_MP_PUBLIC_KEY` esté configurado correctamente
2. Verifica que el Public Key sea de producción (no de test)
3. Revisa la consola del navegador para errores

---

## 📚 Recursos Adicionales

- [Documentación AWS Amplify](https://docs.amplify.aws/)
- [Mercado Pago Developers](https://www.mercadopago.cl/developers/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## ✅ Checklist de Despliegue

- [ ] Repositorio Git configurado
- [ ] Código subido a GitHub
- [ ] AWS Amplify app creada
- [ ] Repositorio conectado a Amplify
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] URL de producción funcionando
- [ ] Dominio personalizado configurado (opcional)
- [ ] Mercado Pago funcionando
- [ ] Pruebas de checkout completadas

---

## 🎉 ¡Listo!

Tu sitio de Astrochoc ahora está desplegado en AWS Amplify. Cada vez que hagas cambios y los subas a Git, se desplegará automáticamente.

**URL de producción**: `https://xxxxx.amplifyapp.com`
**Dominio personalizado**: `https://astrochoc.cl` (si lo configuraste)

---

💬 **Soporte**: Si tienes problemas, revisa los logs de build en AWS Amplify o contacta a hola@astrochoc.cl
