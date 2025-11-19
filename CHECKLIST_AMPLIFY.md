# ✅ Checklist para Despliegue en AWS Amplify

## 🔍 Verificación Pre-Despliegue

### 1. Build Local Funciona
```bash
cd "c:\Users\damor\Desktop\Sitio web - Astro choc"
npm run build
```
**Estado:** ✅ Build local funciona correctamente

---

### 2. Archivos en el Repositorio Git

#### Archivos Esenciales ✅
- `package.json` - ✅
- `package-lock.json` - ✅
- `amplify.yml` - ✅
- `.nvmrc` - ✅ (Node.js 18)
- `vite.config.js` - ✅
- `tailwind.config.js` - ✅
- `index.html` - ✅

#### Archivos de Código ✅
- `src/main.jsx` - ✅
- `src/App.jsx` - ✅
- Todos los componentes en `src/components/` - ✅
- Todos los estilos - ✅

#### Archivos en Public 📁
Verificar que estos archivos estén en Git:
- `public/Logo.jpeg` - ✅
- `public/box-open.png` - ✅
- `public/chocolates-closeup.jpeg` - ✅
- `public/Sonido.wav` - ✅
- `public/hero-box.mp4` - ✅
- `public/video-unboxing.mp4` - ✅
- `public/Foto-producto-*.jpeg` (1-6) - ✅
- `public/tarjeta-*.png` (1-5) - ❓ (verificar)
- `public/tarjeta-*-reverso.png` (1-5) - ❓ (verificar)

---

### 3. Configuración de AWS Amplify

#### Variables de Entorno ⚠️ **IMPORTANTE**
¿Están configuradas en AWS Amplify?

- [ ] `VITE_MP_PUBLIC_KEY` = `APP_USR-...` (o `TEST-...` para pruebas)
- [ ] `VITE_BACKEND_URL` = URL de tu backend (o URL temporal)

**Si no tienes backend aún:**
- Puedes usar un valor temporal: `https://mi-backend-temporal.com`
- El sitio funcionará, pero Mercado Pago no procesará pagos

#### Build Settings
- [ ] Framework: React (Vite)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Node.js version: 18 (se especifica en `.nvmrc`)

---

### 4. Archivos que Podrían Causar Problemas

#### Archivos Grandes 📦
Los archivos muy grandes pueden causar timeouts en el build:
- Videos en `public/` (`.mp4`, `.webm`)
- Imágenes muy grandes
- Carpeta `public/imagenes/` con muchas imágenes

**Solución:** 
- Comprimir videos antes de subir
- Optimizar imágenes
- Considerar usar un CDN para archivos grandes

#### Archivos Faltantes ❌
Archivos que el código busca pero no existen:
- ~~`public/box-poster.jpg`~~ - ✅ Removido del código
- ~~`public/poster-video.jpg`~~ - ✅ Removido del código
- `public/box-closed.png` - ❓ (no usado actualmente)
- `public/vite.svg` - ❓ (referenciado en `index.html`)

---

### 5. Posibles Errores y Soluciones

#### Error: "npm ci failed"
**Causa:** Problemas con `package-lock.json`
**Solución:**
```bash
rm package-lock.json
npm install
git add package-lock.json
git commit -m "Update package-lock.json"
git push origin main
```

#### Error: "Module not found: tarjeta-X.png"
**Causa:** Archivos de tarjetas de tarot no están en Git
**Solución:**
```bash
# Verificar si las tarjetas están en public/
cd public
ls -la tarjeta-*.png

# Si no están, agregarlas
git add public/tarjeta-*.png
git commit -m "Add tarot card images"
git push origin main
```

#### Error: "Build timeout"
**Causa:** Archivos muy grandes en `public/`
**Solución:**
1. Comprimir videos
2. Optimizar imágenes
3. Considerar subir archivos grandes a un CDN

#### Error: "Variables de entorno no encontradas"
**Causa:** Variables no configuradas en AWS Amplify
**Solución:**
1. Ve a AWS Amplify Console
2. Configuración > Variables de entorno
3. Agrega las variables necesarias
4. Reinicia el build

---

### 6. Verificación de Archivos de Tarot

```bash
# Verificar si las imágenes de tarot están en Git
cd "c:\Users\damor\Desktop\Sitio web - Astro choc"
git ls-files | Select-String "tarjeta"
```

**Archivos necesarios:**
- `public/tarjeta-1.png` y `public/tarjeta-1-reverso.png`
- `public/tarjeta-2.png` y `public/tarjeta-2-reverso.png`
- `public/tarjeta-3.png` y `public/tarjeta-3-reverso.png`
- `public/tarjeta-4.png` y `public/tarjeta-4-reverso.png`
- `public/tarjeta-5.png` y `public/tarjeta-5-reverso.png`

---

### 7. Comandos de Verificación

```bash
# 1. Verificar que el build funcione localmente
npm run build

# 2. Verificar que todos los archivos estén en Git
git ls-files | Select-String "public" | Select-String "\.(png|jpeg|jpg|mp4|wav)$"

# 3. Verificar el tamaño del repositorio
git count-objects -vH

# 4. Verificar archivos no rastreados
git status

# 5. Verificar que package-lock.json esté actualizado
git diff package-lock.json
```

---

### 8. Pasos para Desplegar

#### Opción A: Sin Variables de Entorno (Sitio Visual Solamente)
1. Ve a AWS Amplify Console
2. Conecta el repositorio GitHub
3. Selecciona rama `main`
4. Haz click en "Save and Deploy"
5. Espera a que termine el build (5-10 minutos)

**Nota:** El sitio funcionará visualmente, pero Mercado Pago no procesará pagos sin variables de entorno.

#### Opción B: Con Variables de Entorno (Sitio Completo)
1. Ve a AWS Amplify Console
2. Conecta el repositorio GitHub
3. Configura variables de entorno:
   - `VITE_MP_PUBLIC_KEY`
   - `VITE_BACKEND_URL`
4. Selecciona rama `main`
5. Haz click en "Save and Deploy"
6. Espera a que termine el build (5-10 minutos)

---

### 9. Después del Despliegue

#### Verificar que Funcione
1. Accede a la URL de Amplify: `https://xxxxx.amplifyapp.com`
2. Verifica que el sitio cargue correctamente
3. Verifica que las imágenes carguen
4. Verifica que los videos carguen
5. Verifica que la música funcione
6. Intenta agregar un producto al carrito

#### Si Mercado Pago No Funciona
1. Abre la consola del navegador (F12)
2. Busca errores relacionados con:
   - `VITE_MP_PUBLIC_KEY`
   - `VITE_BACKEND_URL`
3. Verifica que las variables estén configuradas en AWS Amplify
4. Reinicia el build en AWS Amplify

---

## 📝 Resumen de Estado Actual

### ✅ Completado
- [x] Código funcionando localmente
- [x] Build local exitoso
- [x] Repositorio Git configurado
- [x] Archivos esenciales en Git
- [x] `amplify.yml` configurado
- [x] `.nvmrc` creado (Node.js 18)
- [x] Archivos poster removidos del código

### ⚠️ Pendiente de Verificar
- [ ] Variables de entorno configuradas en AWS Amplify
- [ ] Archivos de tarjetas de tarot en Git (tarjeta-1.png, etc.)
- [ ] Backend para Mercado Pago desplegado (opcional)

### ❓ Recomendaciones
1. **Comprimir videos:** Los archivos `.mp4` pueden ser grandes y causar builds lentos
2. **Optimizar imágenes:** Reducir tamaño de imágenes sin perder calidad
3. **CDN para archivos grandes:** Considerar usar un CDN externo para videos y audios

---

## 🆘 Si Falla de Nuevo

### 1. Revisar Logs en AWS Amplify
1. Ve a AWS Amplify Console
2. Selecciona tu app
3. Ve a "Implementaciones" > Click en la implementación fallida
4. Haz click en "Ver logs"
5. Copia el mensaje de error completo

### 2. Buscar el Error Específico
- `npm ci failed` → Problema con dependencias
- `npm run build failed` → Problema con el código
- `Module not found` → Archivos faltantes
- `Timeout` → Archivos muy grandes o build muy lento

### 3. Compartir el Error
Si el error no es claro, comparte:
- El mensaje de error completo
- Los últimos 20-30 líneas de los logs
- En qué fase falla (preBuild, build, deploy)

---

✨ **¡Todo listo para desplegar!** 🚀🌙



