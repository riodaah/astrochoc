🧠 Prompt Maestro – Astrochoc (para Cursor)

Crea una landing page e-commerce mágica para Astrochoc.cl, usando React, Vite, TailwindCSS y Framer Motion.
El sitio será de una sola página con carro de compra y checkout con Mercado Pago, y venderá un único producto:
la cajita piramidal Astrochoc, que incluye:

3 bombones de chocolate 39% cacao, sin azúcar, sin gluten, con avellanas y almendras.

1 carta de tarot al azar “elegida por el universo” para el cliente.

Una “nube” esponjosa que protege el contenido.

Caja azul noche con estampado dorado y lazo café, temática astrológica / mística.

La experiencia de navegación debe sentirse como entrar a un rito cósmico: el contenido aparece de a poco, con efectos de luz, estrellas y cartas flotando.

⚙️ Stack y Arquitectura

React + Vite

TailwindCSS

Framer Motion (scroll, fade-in, parallax, floating elements)

Context API para el carro de compra (CartContext)

Integración de Mercado Pago Checkout Pro mediante un hook/utilidad:

Cargar script de Mercado Pago con MP_PUBLIC_KEY desde .env.

Crear preferencia en backend simulado o endpoint configurable (config.mercadoPago.checkoutUrl).

Botón de “Finalizar compra” redirige al checkout de Mercado Pago.

📁 Estructura de carpetas

src/
├─ assets/
│ ├─ logo-astrochoc.png
│ ├─ box-closed.png (caja pirámide cerrada)
│ ├─ box-open.png (caja abierta mostrando carta + chocolates)
│ ├─ tarot-card.png (tarjeta ejemplo)
│ ├─ chocolates-closeup.png
│ ├─ bg-galaxy.jpg (fondo galaxia)
│ ├─ video-unboxing.mp4 (unboxing corto)
│ └─ sparkles.svg (formas decorativas)
├─ components/
│ ├─ Navbar.jsx
│ ├─ Hero.jsx
│ ├─ SectionExperience.jsx
│ ├─ SectionTarot.jsx
│ ├─ SectionChocolates.jsx
│ ├─ SectionHowItWorks.jsx
│ ├─ SectionReviews.jsx
│ ├─ SectionFAQ.jsx
│ ├─ ProductCard.jsx
│ ├─ AddToCartButton.jsx
│ ├─ CartDrawer.jsx
│ ├─ CheckoutSummary.jsx
│ ├─ MagicDivider.jsx (línea decorativa animada)
│ ├─ CTAButton.jsx
│ ├─ Footer.jsx
│ └─ ScrollReveal.jsx (wrapper reusable de animaciones)
├─ context/
│ └─ CartContext.jsx
├─ hooks/
│ └─ useMercadoPago.js
├─ config.json
├─ App.jsx
├─ main.jsx
└─ styles/
└─ globals.css

🎨 Estilo general

Modo oscuro permanente.

Fondo tipo cielo estrellado / nebulosa: azul profundo, morado y toques rosados, con estrellas sutiles.

Colores principales:

Azul noche de la caja (#0b1b3b aprox).

Dorado para textos importantes y líneas místicas.

Detalles cobre/marrón inspirados en la cinta.

Tipografías:

Títulos: estilo serif mágica (ej. Cinzel Decorative o similar).

Textos: sans elegante (ej. Poppins).

Estética: mística, elegante y limpia, no recargada.

Elementos flotantes: cartas del tarot, constelaciones, destellos.

Botones con gradientes suaves y glow al hacer hover.

Cada sección debe aparecer con scroll reveal (fade + movimiento) para dar sensación de ritual paso a paso.

💬 Contenido y secciones de la landing
🧭 Header / Navbar

Logo Astrochoc a la izquierda (desde logo-astrochoc.png).

Menú con scroll suave a secciones:

“Inicio”

“La Experiencia”

“El Chocolatito”

“Tarot”

“Cómo funciona”

“Preguntas”

A la derecha, icono de carrito con contador (usa CartContext).

Navbar con fondo semi-transparente y efecto blur al hacer scroll.

🌙 Hero – “Un regalo del universo”

Objetivo: enamorar en 3 segundos.

Fondo con galaxia animada ligera (parallax en el background).

Izquierda: texto.

Título grande:

“Astrochoc: Chocolates, Tarot y Magia en una sola caja”

Subtítulo:

“Dentro de cada pirámide hay 3 chocolates sin culpa y una carta del tarot que el universo eligió solo para ti.”

Puntos breves tipo badges:

“Sin azúcar”

“Sin gluten”

“39% cacao con avellanas y almendras”

Botones:

CTA principal: “Quiero mi caja mágica” → hace scroll a la sección del producto y abre el carrito al agregar.

CTA secundario: “Ver unboxing” → abre modal con video-unboxing.mp4.

Derecha: imagen de la caja piramidal cerrada (box-closed.png) con lazo, sobre una base con brillo y partículas flotando.
Usar Framer Motion para que la caja respire (leve scale up/down y sombra animada).

✨ Sección “La Experiencia”

Idea: explicar la magia paso a paso visualmente.

Layout en dos columnas con ScrollReveal.

Texto:

Título: “Más que chocolate, un pequeño ritual cósmico”

Párrafo: describir que al abrir la pirámide encuentras la nube esponjosa, la carta oculta y los tres chocolates.

Lista de pasos con iconos místicos:

“Abre la pirámide y rompe el sello del universo.”

“Descubre tu carta de tarot, elegida al azar solo para ti.”

“Disfruta los 3 chocolates sin culpa mientras reflexionas en tu mensaje.”

Visual:

A la derecha, imagen box-open.png mostrando carta + chocolates sobre la nube.

Pequeñas partículas y destellos alrededor de la carta usando Framer Motion.

🔮 Sección “Tu carta de Tarot”

Enfoque: la sorpresa personalizada.

Fondo ligeramente más oscuro, con constelaciones animadas.

Título: “Una carta, un mensaje del universo”.

Subtítulo: “Cada caja trae una carta distinta. No puedes elegirla, ella te elige a ti.”

Elementos visuales:

Slider o carrusel con 3–5 cartas de ejemplo (imágenes tarot-card.png y variantes).

Al pasar el mouse, las cartas se inclinan y brillan (hover + rotate + shadow).

Copy adicional:

Pequeño texto explicando que no es una lectura profesional, sino un mensaje lúdico y simbólico.

Botón CTA secundario: “Regálale uno a alguien especial” → scroll a producto.

🍫 Sección “El Chocolatito”

Enfoque: calidad del producto, ingredientes y beneficios.

Fondo con degradado azul → violeta y partículas de cacao estilizadas.

Título: “Chocolate sin culpa, con mucha magia”.

Dos columnas:

Izquierda: foto close-up de los bombones (chocolates-closeup.png).

Derecha: bullets:

“39% cacao cuidadosamente seleccionado.”

“Endulzado sin azúcar refinada.”

“Sin gluten.”

“Relleno con avellanas y almendras tostadas.”

Incluir un pequeño bloque tipo etiqueta nutricional simplificada.

Añadir un mini párrafo sobre la “nube esponjosa” que protege la experiencia y mantiene la textura de los chocolates.

🎁 Sección Producto + Carro (E-commerce)

Este es el corazón de la venta.

Componente ProductCard centrado:

Imagen principal de la caja.

Nombre: “Caja Astrochoc – Edición Tarot”.

Precio (leer desde config.product.price).

Selector de cantidad (±).

Lista rápida de lo que incluye:

“3 chocolates sin azúcar ni gluten”

“1 carta de tarot al azar”

“Nube protectora”

AddToCartButton: al hacer click:

Agrega al CartContext.

Muestra animación (shake/scale del icono del carrito).

Opcional: abrir CartDrawer desde el costado derecho.

CartDrawer:

Lista de productos (solo Astrochoc, pero soportar multiples unidades).

Subtotal.

Botón “Finalizar compra con Mercado Pago” → llama a useMercadoPago para redirigir a la preferencia de pago.

Si el carrito está vacío, mostrar un mensaje “Tu universo está vacío aún ✨ Agrega una caja mágica”.

🌀 Sección “Cómo funciona el envío”

Título: “¿Y cómo llega la magia a tu puerta?”

Timeline visual de 3 pasos:

“Haces tu pedido en Astrochoc.cl”

“Preparamos tu caja y tu carta de tarot con cariño.”

“La recibes en casa y comienzas tu ritual.”

Debajo: cuadro con info de tiempos de despacho y zonas de entrega (texto parametrizable desde config.json).

⭐ Sección “Opiniones estelares”

Título: “Lo que dicen quienes ya recibieron su mensaje”.

Cards de reseñas (dummy data):

Nombre + estrellas + texto corto (ej. “La experiencia completa es preciosa, la carta que me tocó fue muy precisa 💫”).

Animación: cada card aparece con delay y leve tilt.

❓ Sección FAQ

Acordeones con dudas típicas:

“¿Los chocolates son sin gluten?”

“¿Tienen azúcar?”

“¿Puedo elegir mi carta de tarot?” (Responder que no, es al azar).

“¿Cuánto se demora el envío?”

“¿Es apto para veganos?” (según lo que definan, dejar texto configurable).

🌌 CTA Final

Fondo más oscuro, lleno de estrellas, sensación de cierre de ritual.

Texto grande:

“¿Listo para ver qué mensaje tiene el universo para ti?”
“Pide tu caja Astrochoc y deja que el tarot y el chocolate hagan su magia.”

Botón grande:

“Quiero mi Astrochoc” → hace scroll a sección Producto y abre el carrito.

⚙️ Footer

Fondo negro sólido con líneas doradas.

Contenido:

Logo pequeño + tagline: “Astrochoc – Chocolate & Cosmic”.

Links a redes: Instagram, TikTok, etc. (desde config.socials).

Correo de contacto y datos de la empresa.

Enlaces a:

“Política de privacidad”

“Términos y condiciones”

Estas páginas pueden abrir modales simples o anclas internas.

⚙️ config.json (ejemplo)
{
  "colors": {
    "primary": "#0b1b3b",
    "accent": "#f4c867",
    "background": "#020317",
    "gradient": "linear-gradient(135deg, #0b1b3b, #2b174f, #020317)"
  },
  "product": {
    "name": "Caja Astrochoc – Edición Tarot",
    "price": 14990,
    "currency": "CLP",
    "description": "Pirámide mágica con 3 chocolates sin azúcar ni gluten, carta de tarot al azar y nube protectora."
  },
  "shipping": {
    "estimate": "Despachos entre 2 y 5 días hábiles.",
    "regions": "Disponible en Región Metropolitana (por ahora)."
  },
  "contact": {
    "email": "hola@astrochoc.cl",
    "instagram": "https://instagram.com/astrochoc",
    "tiktok": "https://www.tiktok.com/@astrochoc"
  },
  "mercadoPago": {
    "publicKey": "MP_PUBLIC_KEY_DESDE_ENV",
    "checkoutUrl": "https://mi-backend.com/astrochoc/create-preference"
  }
}


Indica en comentarios del código que publicKey se debe tomar realmente desde variables de entorno, y que checkoutUrl será un endpoint backend que devuelva la URL de pago de Mercado Pago.

🌈 Animaciones sugeridas (Framer Motion)

ScrollReveal:

initial={{ opacity: 0, y: 40 }}

whileInView={{ opacity: 1, y: 0 }}

transition={{ duration: 0.7, ease: "easeOut" }}

Parallax suave en el fondo de galaxia (usar transform con useScroll y useTransform).

Cartas del tarot con whileHover={{ rotate: -3, y: -8, boxShadow: ... }}.

Caja piramidal con animación de “respirar” (animate={{ scale: [1, 1.03, 1] }} loop).

💡 Tono del copy

Cercano, místico, lúdico, un poco poético pero claro.

Evitar lenguaje técnico; hablar de universo, señales, magia, ritual, cosmos.

Ideas de frases:

“Regálate un mensaje del universo envuelto en chocolate.”

“No eliges la carta, la carta te elige a ti.”

“Un detallito para el cuerpo, el corazón y el cosmos.”