# 🌴 Coabana — GitHub Page

Sitio web de **Coabana**, estudio de ingeniería de datos especializado en **Google Cloud**: qué es la marca, qué servicios ofrece y cómo contactar.

Construido con HTML, CSS y JavaScript puros — sin frameworks ni paso de build. GitHub Pages lo sirve tal cual.

## Estructura

```
├── index.html          # Toda la página (una sola página con secciones)
├── 404.html            # Página de error
├── css/style.css       # Estilos (tema caribeño-tech, oscuro y claro)
├── js/i18n.js          # ✏️ TEXTOS del sitio en español e inglés
├── js/main.js          # Idioma, menú, animaciones y formulario
└── assets/             # Logo y favicon (SVG)
```

## Cómo editar los textos

Todos los textos viven en **`js/i18n.js`**, en dos diccionarios (`es` y `en`) con las mismas claves. Edita el valor de la clave en ambos idiomas y listo. El HTML tiene el texto en español como contenido por defecto (por si JavaScript no carga); si cambias algo grande, actualízalo también en `index.html` para mantenerlos alineados.

El idioma se detecta automáticamente (navegador → `es`/`en`), se puede forzar con `?lang=en` o `?lang=es` en la URL, y el visitante puede cambiarlo con el botón **EN/ES** del menú.

## Tema claro / oscuro

El sitio arranca según la apariencia del sistema del visitante (oscuro por defecto), se puede forzar con `?theme=light` o `?theme=dark` en la URL, y el visitante puede cambiarlo con el botón **🌙/☀️** del menú (la elección se recuerda). El tema claro es la variante "caribe de día": misma paleta sobre arena/papel. Los colores de ambos temas viven en las variables CSS del inicio de `css/style.css`.

## Formulario de contacto

Conectado a [Formspree](https://formspree.io) (proyecto **Coabana** → formulario *Contacto sitio web*); el endpoint vive en la constante `FORM_ENDPOINT` de `js/main.js`. Los envíos llegan a tu correo. Si algún día el endpoint se vacía o falla, el formulario cae a un `mailto:` con el mensaje ya redactado.

> 💡 Cuando el sitio esté publicado, activa **Restrict to Domain** en los ajustes del proyecto de Formspree con el valor `coabana.github.io` para bloquear envíos desde otros dominios.

## Publicar en GitHub Pages

1. Haz merge de este contenido a la rama `main`.
2. En GitHub: **Settings → Pages → Build and deployment**.
3. En *Source* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. En unos minutos el sitio estará en **`https://coabana.github.io/coabana/`**.

> 💡 **URL más corta**: si renombras este repositorio a `Coabana.github.io`, el sitio se publica en la raíz: `https://coabana.github.io/`. Todos los enlaces internos son relativos, así que funciona sin cambios (solo actualiza las URLs de `og:url` y el JSON-LD en `index.html`).

## Probar en local

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```
