# 🚀 Guía Rápida - AWS Amplify para Astrochoc

## ✅ Repositorio Git Listo

Tu código ya está en GitHub: `https://github.com/riodaah/astrochoc`

---

## 📋 Pasos para Desplegar en AWS Amplify

### Paso 1: Crear App en AWS Amplify

1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Haz click en **"Crear nueva aplicación"** (Create new app)
3. Selecciona **"Desplegar sin Git"** o **"GitHub"** (recomendado)

### Paso 2: Conectar con GitHub

1. Selecciona **"GitHub"**
2. Autoriza AWS Amplify
3. Selecciona repositorio: **`riodaah/astrochoc`**
4. Selecciona rama: **`main`**
5. Haz click en **"Siguiente"**

### Paso 3: Configurar Build

Amplify detectará automáticamente que es una app React/Vite usando el archivo `amplify.yml`.

**Verifica que la configuración sea:**
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Base directory**: `/` (raíz)

### Paso 4: ⚠️ **CONFIGURAR VARIABLES DE ENTORNO** (MUY IMPORTANTE)

En la sección **"Variables de entorno"**, agrega estas variables:

#### **Variables Necesarias:**

```
VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key-de-mercadopago
VITE_BACKEND_URL=https://tu-backend-url.com
```

#### **Cómo Agregar Variables:**

1. En la configuración de la app, busca **"Variables de entorno"**
2. Haz click en **"Agregar variable de entorno"**
3. Agrega cada variable:

   **Variable 1:**
   - **Nombre**: `VITE_MP_PUBLIC_KEY`
   - **Valor**: `APP_USR-tu-public-key-produccion`
   - **Descripción**: Public Key de Mercado Pago para el frontend

   **Variable 2:**
   - **Nombre**: `VITE_BACKEND_URL`
   - **Valor**: `https://api.astrochoc.cl` (o tu URL de backend)
   - **Descripción**: URL del backend para crear preferencias de pago

4. Haz click en **"Guardar"**

### Paso 5: Revisar y Desplegar

1. Revisa la configuración
2. Haz click en **"Guardar y desplegar"**
3. Espera a que el build termine (5-10 minutos)
4. Obtendrás una URL: `https://xxxxx.amplifyapp.com`

---

## 🔐 Obtener Credenciales de Mercado Pago

### 1. Accede a Mercado Pago

1. Ve a [Mercado Pago Developers](https://www.mercadopago.cl/developers/)
2. Inicia sesión
3. Ve a **"Aplicaciones"** > **"Astrochoc"**

### 2. Copia tus Credenciales

**Para Producción:**
- **Public Key**: `APP_USR-123456789-...` (comienza con `APP_USR-`)
- **Access Token**: `APP_USR-123456789-...` (NO lo pongas en el frontend)

**⚠️ IMPORTANTE:**
- ✅ **Public Key** → Va en `VITE_MP_PUBLIC_KEY` (frontend)
- ❌ **Access Token** → Solo en el backend (nunca en el frontend)

### 3. Configurar en Amplify

1. En AWS Amplify, ve a **"Variables de entorno"**
2. Agrega `VITE_MP_PUBLIC_KEY` con tu Public Key de producción
3. Si tienes backend, agrega `VITE_BACKEND_URL`

---

## 🌐 Configurar Dominio Personalizado (Opcional)

### Paso 1: Agregar Dominio

1. En AWS Amplify, ve a **"Configuración de dominio"**
2. Haz click en **"Agregar dominio"**
3. Ingresa: `astrochoc.cl`
4. Sigue las instrucciones

### Paso 2: Configurar DNS

En tu proveedor de DNS, agrega:

```
Tipo: CNAME
Nombre: www
Valor: xxxxx.amplifyapp.com (te lo dará Amplify)
```

---

## 🔄 Despliegue Automático

Cada vez que hagas push a `main`, Amplify desplegará automáticamente:

```bash
git add .
git commit -m "Actualización"
git push origin main
```

---

## 📝 Resumen de Variables de Entorno

### Frontend (AWS Amplify)

| Variable | Valor | Dónde Obtener |
|----------|-------|---------------|
| `VITE_MP_PUBLIC_KEY` | `APP_USR-...` | Mercado Pago Developers |
| `VITE_BACKEND_URL` | `https://api.astrochoc.cl` | Tu backend (si lo tienes) |

### Backend (Si lo tienes separado)

| Variable | Valor | Dónde Obtener |
|----------|-------|---------------|
| `MP_ACCESS_TOKEN` | `APP_USR-...` | Mercado Pago Developers |
| `FRONTEND_URL` | `https://astrochoc.cl` | Tu dominio |
| `BACKEND_URL` | `https://api.astrochoc.cl` | Tu backend |

---

## ✅ Checklist

- [ ] Repositorio en GitHub: `riodaah/astrochoc`
- [ ] App creada en AWS Amplify
- [ ] Repositorio conectado a Amplify
- [ ] `VITE_MP_PUBLIC_KEY` configurada
- [ ] `VITE_BACKEND_URL` configurada (si tienes backend)
- [ ] Build exitoso
- [ ] URL de producción funcionando
- [ ] Dominio personalizado configurado (opcional)
- [ ] Mercado Pago probado

---

## 🐛 Solución de Problemas

### Error: "Build failed"

1. Revisa los logs de build en Amplify
2. Verifica que las variables de entorno estén configuradas
3. Verifica que `npm run build` funcione localmente

### Error: "Variables de entorno no funcionan"

1. Las variables deben comenzar con `VITE_` para que Vite las reconozca
2. Reinicia el build después de agregar variables
3. Verifica que no haya espacios en los valores

### Error: "Mercado Pago no funciona"

1. Verifica que `VITE_MP_PUBLIC_KEY` esté configurada
2. Verifica que el Public Key sea de producción
3. Revisa la consola del navegador para errores

---

## 📞 Soporte

- 📧 Email: hola@astrochoc.cl
- 📱 Instagram: [@astro_choc](https://www.instagram.com/astro_choc/)
- 📚 Documentación: [DEPLOY_AMPLIFY.md](./DEPLOY_AMPLIFY.md)

---

## 🎉 ¡Listo!

Tu sitio está desplegado en AWS Amplify. Cada push a `main` desplegará automáticamente.

**URL**: `https://xxxxx.amplifyapp.com`
**Dominio**: `https://astrochoc.cl` (si lo configuraste)

✨ **El universo te sonríe** 🌙



