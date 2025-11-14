# 🔧 Solución de Problemas - AWS Amplify Build Failed

## 🔍 Cómo Revisar los Logs de Build

### Paso 1: Acceder a los Logs
1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Selecciona tu app "astrochoc"
3. Ve a **"Implementaciones"** (Deployments)
4. Haz click en la implementación que falló (debería tener un icono rojo ❌)
5. Haz click en **"Ver logs"** o **"Logs"** para ver los detalles del error

### Paso 2: Identificar el Error
Busca en los logs:
- **Errores en rojo** (ERROR)
- **Advertencias** (WARNING)
- **Mensajes de fallo** (FAILED)

---

## 🐛 Problemas Comunes y Soluciones

### Error 1: "npm ci failed" o "npm install failed"

**Causa:** Problemas con las dependencias o package-lock.json

**Solución:**
1. Verifica que `package-lock.json` esté en el repositorio
2. Ejecuta localmente: `npm ci`
3. Si falla, ejecuta: `npm install` y sube el nuevo `package-lock.json`
4. Verifica que todas las dependencias estén en `package.json`

### Error 2: "vite build failed"

**Causa:** Errores en el código o en la configuración de Vite

**Solución:**
1. Ejecuta localmente: `npm run build`
2. Si falla, revisa los errores en la consola
3. Verifica que todos los archivos importados existan
4. Revisa `vite.config.js` para errores de configuración

### Error 3: "Module not found" o "Cannot find module"

**Causa:** Archivos faltantes o rutas incorrectas

**Solución:**
1. Verifica que todos los archivos estén en el repositorio
2. Revisa las rutas de importación en el código
3. Verifica que las imágenes en `public/` estén en el repositorio
4. Asegúrate de que no haya archivos grandes que no se suban a Git

### Error 4: "Variables de entorno no encontradas"

**Causa:** Variables de entorno no configuradas en AWS Amplify

**Solución:**
1. Ve a **"Configuración de la aplicación"** > **"Variables de entorno"**
2. Agrega las variables necesarias:
   ```
   VITE_MP_PUBLIC_KEY=APP_USR-tu-public-key
   VITE_BACKEND_URL=https://api.astrochoc.cl
   ```
3. Reinicia el build después de agregar variables

### Error 5: "Node version not supported"

**Causa:** Versión de Node.js incompatible

**Solución:**
1. Crea un archivo `.nvmrc` en la raíz del proyecto con: `18`
2. En AWS Amplify, ve a **"Configuración de la aplicación"** > **"Build settings"**
3. Agrega una variable de entorno: `_LIVE_PACKAGE_UPDATES` = `[]`
4. O especifica la versión de Node.js en la configuración de build

### Error 6: "Build timeout" o "Build took too long"

**Causa:** Build demasiado lento o problemas de red

**Solución:**
1. Optimiza las dependencias en `package.json`
2. Reduce el tamaño de los archivos en `public/`
3. Verifica que no haya archivos innecesarios en el repositorio
4. Aumenta el timeout en la configuración de build (si es posible)

---

## ✅ Verificación Pre-Build

### Antes de subir a Git, verifica:

1. **Build local funciona:**
   ```bash
   npm run build
   ```

2. **No hay errores de linting:**
   ```bash
   npm run lint
   ```

3. **package-lock.json está actualizado:**
   ```bash
   npm install
   git add package-lock.json
   ```

4. **Todos los archivos necesarios están en Git:**
   ```bash
   git status
   ```

5. **No hay archivos grandes que no deban estar:**
   - Verifica que `.gitignore` esté configurado correctamente
   - No subas archivos `.env` con credenciales reales

---

## 🔍 Revisar los Logs de AWS Amplify

### Paso a Paso:

1. **Accede a los Logs:**
   - Ve a AWS Amplify Console
   - Selecciona tu app
   - Ve a "Implementaciones"
   - Haz click en la implementación que falló
   - Haz click en "Ver logs" o "Logs"

2. **Busca Errores:**
   - Busca líneas que digan "ERROR" o "FAILED"
   - Copia el mensaje de error completo
   - Revisa el contexto antes y después del error

3. **Identifica el Problema:**
   - ¿Es un error de dependencias?
   - ¿Es un error de código?
   - ¿Es un error de configuración?
   - ¿Es un error de variables de entorno?

4. **Solución:**
   - Sigue las soluciones arriba según el tipo de error
   - Haz los cambios necesarios
   - Sube los cambios a Git
   - Reinicia el build en AWS Amplify

---

## 📋 Checklist de Verificación

- [ ] Build local funciona (`npm run build`)
- [ ] No hay errores de linting
- [ ] `package-lock.json` está actualizado
- [ ] Todos los archivos necesarios están en Git
- [ ] Variables de entorno configuradas en AWS Amplify
- [ ] `.gitignore` está configurado correctamente
- [ ] No hay archivos `.env` con credenciales reales en Git
- [ ] `amplify.yml` está configurado correctamente
- [ ] `.nvmrc` especifica la versión de Node.js (18)

---

## 🆘 Si el Problema Persiste

### Paso 1: Revisa los Logs Detallados
1. Ve a los logs de build en AWS Amplify
2. Busca el error específico
3. Copia el mensaje de error completo

### Paso 2: Verifica la Configuración
1. Verifica que `amplify.yml` esté correcto
2. Verifica que las variables de entorno estén configuradas
3. Verifica que el repositorio esté conectado correctamente

### Paso 3: Prueba Localmente
1. Ejecuta `npm ci` localmente
2. Ejecuta `npm run build` localmente
3. Si funciona localmente, el problema está en AWS Amplify

### Paso 4: Contacta Soporte
1. Revisa la documentación de AWS Amplify
2. Contacta al soporte de AWS Amplify
3. Comparte los logs de error con el soporte

---

## 📚 Recursos

- [Documentación AWS Amplify](https://docs.amplify.aws/)
- [Troubleshooting AWS Amplify](https://docs.amplify.aws/react/build-settings/troubleshooting/)
- [Vite Build Configuration](https://vitejs.dev/guide/build.html)

---

✨ **¡Esperamos que esto te ayude a solucionar el problema!** 🔧🌙

