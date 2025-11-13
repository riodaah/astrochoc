# ✨ Astrochoc - Landing Page E-commerce

> **Chocolate, Tarot y Magia en una sola caja**

Landing page mágica y mística para Astrochoc.cl - una experiencia de e-commerce única que combina chocolates premium sin azúcar y sin gluten con cartas de tarot elegidas por el universo.

## 🌟 Características

- 🎨 **Diseño místico y elegante** con animaciones cósmicas
- 🛒 **Sistema de carrito** completo con Context API
- 💳 **Integración con Mercado Pago** Checkout Pro
- 📱 **Totalmente responsive** - móvil, tablet y desktop
- ⚡ **Animaciones fluidas** con Framer Motion
- 🌙 **Modo oscuro permanente** con tema galáctico
- ✨ **Efectos de scroll reveal** y parallax
- 🎁 **Enfoque en regalar con sentido**

## 🚀 Stack Tecnológico

- **React 18** - Framework principal
- **Vite** - Build tool ultra rápido
- **TailwindCSS** - Estilos utilitarios
- **Framer Motion** - Animaciones y transiciones
- **Context API** - Gestión de estado del carrito
- **Mercado Pago SDK** - Procesamiento de pagos

## 📦 Instalación

### Prerrequisitos

- Node.js 16+ 
- npm o yarn

### Pasos de instalación

1. **Clona el repositorio**
```bash
git clone git@github.com:riodaah/astrochoc.git
cd astrochoc
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_MP_PUBLIC_KEY=tu_public_key_de_mercado_pago
VITE_BACKEND_URL=https://tu-backend.com/astrochoc
```

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
astrochoc-landing/
├── src/
│   ├── assets/              # Imágenes y recursos estáticos
│   ├── components/          # Componentes React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── SectionExperience.jsx
│   │   ├── SectionTarot.jsx
│   │   ├── SectionChocolates.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── context/
│   │   └── CartContext.jsx  # Estado global del carrito
│   ├── hooks/
│   │   └── useMercadoPago.js # Hook para Mercado Pago
│   ├── styles/
│   │   └── globals.css      # Estilos globales
│   ├── config.json          # Configuración del sitio
│   ├── App.jsx
│   └── main.jsx
├── public/                  # Archivos públicos
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Componentes Principales

### Navbar
Navegación fija con scroll suave, contador de carrito animado y menú móvil responsive.

### Hero
Sección principal con parallax, animaciones de partículas y CTAs destacados.

### ProductCard
Card del producto principal con selector de cantidad y botón "Agregar al carrito".

### CartDrawer
Drawer lateral animado con resumen del carrito y checkout de Mercado Pago.

### PolicyModal
Modal animado para políticas de privacidad, devoluciones y términos.

## 🛠️ Configuración

### config.json

Personaliza el contenido del sitio en `src/config.json`:

```json
{
  "product": {
    "name": "Caja Astrochoc – Edición Tarot",
    "price": 14990,
    "currency": "CLP"
  },
  "contact": {
    "email": "hola@astrochoc.cl",
    "instagram": "https://www.instagram.com/astro_choc/"
  }
}
```

### Mercado Pago

Para habilitar pagos reales:

1. **Obtén tus credenciales** en [Mercado Pago Developers](https://www.mercadopago.cl/developers)

2. **Crea un endpoint backend** que genere preferencias de pago:

```javascript
// Ejemplo de endpoint (Node.js)
app.post('/astrochoc/create-preference', async (req, res) => {
  const preference = {
    items: req.body.items,
    back_urls: req.body.back_urls,
    auto_return: 'approved'
  };
  
  const response = await mercadopago.preferences.create(preference);
  res.json({ init_point: response.body.init_point });
});
```

3. **Configura las variables de entorno** con tu public key y URL del backend

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Genera build optimizado
npm run preview      # Preview del build de producción
```

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 Móviles (320px - 768px)
- 📲 Tablets (768px - 1024px)
- 💻 Desktop (1024px+)

## ✨ Animaciones

Todas las animaciones están creadas con **Framer Motion**:

- 🌊 Scroll reveal progresivo
- 🎭 Parallax en fondos
- 🎨 Hover effects en cards
- 🌀 Partículas flotantes
- 💫 Transiciones suaves

## 🎁 Características del Producto

### Caja Astrochoc incluye:
- 🍫 **3 bombones** de chocolate 39% cacao
- 🔮 **1 carta de tarot** al azar
- ☁️ **Nube protectora** esponjosa
- 📦 **Caja piramidal** azul noche con detalles dorados

### Características:
- ✅ Sin azúcar refinada
- ✅ Sin gluten
- ✅ Con avellanas y almendras
- ✅ Empaque premium

## 🌐 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático con cada push

### Otras opciones

- **Netlify**: Drag & drop del folder `dist`
- **GitHub Pages**: Usando `gh-pages`
- **Servidor propio**: Servir el folder `dist`

## 🔒 Variables de Entorno

```env
# Mercado Pago
VITE_MP_PUBLIC_KEY=tu_public_key_aqui

# Backend URL
VITE_BACKEND_URL=https://tu-api.com/astrochoc
```

## 📝 Personalización

### Colores

Modifica los colores en `tailwind.config.js`:

```javascript
colors: {
  'cosmic-blue': '#0b1b3b',
  'cosmic-gold': '#f4c867',
  // ...
}
```

### Fuentes

Las fuentes están en `index.html`:
- **Cinzel Decorative** - Títulos místicos
- **Poppins** - Texto general

## 🐛 Solución de Problemas

### El carrito no persiste
- Verifica que localStorage esté habilitado
- Limpia la caché del navegador

### Mercado Pago no funciona
- Verifica las credenciales en `.env`
- Asegúrate de que el backend esté funcionando
- Revisa la consola para errores

### Animaciones lentas
- Reduce la cantidad de partículas en los componentes
- Desactiva blur effects en móviles

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

## 📞 Contacto

**Astrochoc**
- 📧 Email: hola@astrochoc.cl
- 📱 Instagram: [@astro_choc](https://www.instagram.com/astro_choc/)
- 🌐 Website: astrochoc.cl

---

⭐ **Hecho con magia y amor cósmico** ✨

Si te gusta este proyecto, ¡dale una estrella! ⭐

