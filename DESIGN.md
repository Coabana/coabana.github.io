# 🎨 Sistema de diseño "caribeño-tech"

Referencia **canónica** del sistema de diseño compartido por los dos sitios de la familia:

- **Coabana** (este repo) — los tokens viven en `css/style.css`
- **CV** ([roanny/roanny.github.io](https://github.com/roanny/roanny.github.io)) — replica estos tokens en el `<style>` de su `index.html`

Si cambias un token aquí, replica el cambio en el CV para mantener la familia alineada.

## Tokens

### Paleta

| Token | Oscuro (defecto) | Claro ("caribe de día") | Uso |
|---|---|---|---|
| `--bg` | `#07131d` | `#f7f4ec` | Fondo de página |
| `--bg-2` | `#0a1926` | `#f1ece1` | Fondo secundario / gradientes de panel |
| `--panel` | `#0d2030` | `#fffdf8` | Paneles destacados |
| `--panel-2` | `#102638` | `#fbf7ee` | Paneles secundarios |
| `--ink` | `#eaf4f4` | `#0d2531` | Texto principal |
| `--muted` | `#93adbc` | `#48616e` | Texto secundario |
| `--turquoise` | `#2fd6c3` | `#0b8b7d` | Acento principal (enlaces, énfasis) |
| `--cyan` | `#4cc9f0` | `#0f7ea6` | Acento secundario (gradientes) |
| `--coral` | `#ff8f6b` | `#c94b28` | Kickers, detalles cálidos |
| `--sand` | `#f4d58d` | `#8a6a1d` | Menciones doradas (honores, "antes se llamaba") |
| `--line` / `--line-strong` | turquesa al 10 % / 22 % | tinta al 12 % / 24 % | Bordes |

**Constantes de marca** (idénticas en ambos temas, hardcodeadas a propósito): el gradiente del botón primario `linear-gradient(92deg, #2fd6c3, #4cc9f0)` con texto `#05242a`, y los glows del fondo (`#2fd6c3` / `#ff8f6b` con `--glow-opacity` por tema).

### Superficies por tema

`--raise`, `--raise-strong` (rellenos sutiles), `--card-grad-top/bottom` (gradiente de cards), `--chip-bg`, `--stack-bg`, `--alt-band` (banda de secciones alternas), `--nav-bg[-scrolled|-mobile]`, `--float-bg`, `--input-bg`, `--footer-bg`, `--dots-color`, `--shadow`, `--card-shadow`, `--float-shadow`, `--placeholder-color`.

### Tintes de acento (`--tint-*`)

Escala de turquesa con alfa, **igual en ambos temas**: `--tint-6` (rellenos: badge, chip de acento), `--tint-8` (hovers), `--tint-14` (anillo de foco de inputs), `--tint-22` (bordes de acento), `--tint-32` (sombra del botón primario), `--tint-35` (selección de texto). Coral: `--tint-coral-7/14/35` (número de paso, error de campo). El CV añade `--tint-18/50` (puntos de la línea de tiempo).

### Tipografía

| Token | Familia | Uso |
|---|---|---|
| `--font-display` | Space Grotesk 500–700 | h1–h3, botones, marca |
| `--font-body` | Inter 400–600 | Cuerpo (16.5px base, line-height 1.65) |
| `--font-mono` | JetBrains Mono 400/600 | Kickers, chips, metadatos, etiquetas de formulario |

Escala: `h1` clamp según página · `h2 clamp(1.7rem, 3.4vw, 2.5rem)` · `h3 1.12rem`.

### Espaciado y forma

- Secciones: `96px` vertical (72px en móvil ≤720px) — **mismo valor en ambos sitios**
- Contenedor: `min(1120px, 92%)` · Nav: `--nav-h: 72px`
- Radios: `--radius: 16px` (cards/paneles), `999px` (píldoras), `8px` (chips), `10–12px` (inputs, menú)
- Breakpoints: `1000px` y `720px` (+ `min-height: 1600px` para heros)

### Motion

| Token | Valor | Uso |
|---|---|---|
| `--t-fast` | 0.2s | Colores, hovers de enlaces y botones |
| `--t-base` | 0.25s | Cards, pasos, canales, hamburguesa |
| `--t-slow` | 0.3s | Fondos de nav/body, menú móvil |
| `--t-reveal` | 0.7s | Animaciones de aparición |

Las animaciones decorativas (pulse 2.4s, floaty 5.5s, flow 3.2/4.1s) quedan fuera de la escala. Todo se anula con `prefers-reduced-motion` y el contenido es visible sin JavaScript (`html.js .reveal`).

## Componentes

### Botón (`.btn`)
- **Variantes**: `.btn-primary` (gradiente de marca, texto oscuro fijo), `.btn-ghost` (borde + relleno sutil), `.btn-small`, `.btn-block`
- **Estados**: hover (eleva −2px + sombra/tinte) · `:active` (vuelve a 0, sin sombra) · `[disabled]` (opacidad 0.55, `not-allowed`) · foco global `:focus-visible` (outline turquesa)

### Chip (`.chips` contenedor + `.chip` ítem) — unificado en ambos sitios
- **Neutral** `.chip`: mono 0.76rem, borde `--line`, fondo `--chip-bg`
- **Acento** `.chip-accent`: texto turquesa, fondo `--tint-6`, borde `--tint-22`
- Contenedores con ajuste propio conservan su clase junto a `.chips` (`.card-chips`, `.tags`, `.hero-meta`)

### Card (`.card`)
- Gradiente `--card-grad-top→bottom`, borde `--line`, radio `--radius`
- Hover: eleva −5px, borde `--line-strong`, `--card-shadow` y línea superior con gradiente mar (`::before`)

### Badge y kicker
- `.badge`: píldora mono uppercase con punto pulsante (`--tint-6` de fondo)
- `.kicker`: mono uppercase coral con prefijo `~` turquesa

### Navegación
- Fija con blur; `.scrolled` añade borde y sube opacidad de fondo
- `.lang-toggle` / `.theme-toggle`: píldoras mono turquesa con **semántica de destino** — ambos muestran lo que obtienes al pulsar: el idioma al que cambias ("ES"/"EN") y el tema que activarás (☀️ en oscuro, 🌙 en claro) — con `aria-label` dinámico y bilingüe
- CTA `.btn-primary.btn-small` → `#contact` ("Hablemos"/"Let's talk") en el nav de **ambos** sitios; oculto ≤720px
- Hamburguesa ≤720px con `aria-expanded` y cierre al navegar

### Preferencias de tema e idioma
Cascada idéntica en ambos sitios: **parámetro de URL** (`?theme=` / `?lang=`) → **elección manual guardada** (solo se persiste al pulsar el toggle; la detección automática nunca se guarda) → **sistema** (`prefers-color-scheme` con seguimiento en vivo mientras no haya elección manual; `navigator.language` con `es*` → español) → **fallback: oscuro / inglés**. El HTML estático (sin JavaScript) queda en el idioma base de cada sitio: ES en Coabana, EN en el CV.

### Formulario (solo Coabana)
- Inputs: fondo `--input-bg`, foco con anillo `--tint-14`
- **Error**: el JS marca `aria-invalid="true"` al validar → borde coral + anillo `--tint-coral-14`; se limpia al escribir
- **Envío**: botón `disabled` durante el fetch (evita doble envío); estado en `#formStatus` (`aria-live`)

### Fondo decorativo
`.bg-decor` fijo con dos glows (turquesa arriba-izquierda, coral abajo-derecha) y rejilla de puntos con máscara. Divisores de ola entre secciones seleccionadas.

## Marca gráfica

Este sitio es la **fuente de verdad de la marca de Coabana**, como lo es de los tokens que replica el CV: quien la use fuera de aquí la transcribe de estos archivos y fija sus colores; no la redibuja.

- **El glifo** (sol, palma y ola) es la marca. El wordmark «coabana» vive solo en el sitio (`.brand-name` en la navegación y el pie; `assets/logo.svg`, solo sobre fondo oscuro). **Fuera del sitio se usa el glifo solo**, sin wordmark.
- **Dos variantes**, la misma geometría (`viewBox="0 0 48 48"`, cuadrada):

| Variante | Fondo | Sol | Hojas | Tronco (degradado) | Ola | Fuente |
|---|---|---|---|---|---|---|
| Oscura | `--bg` oscuro `#07131d` | `#ff8f6b` | `#2fd6c3` | `#2fd6c3` → `#4cc9f0` | `#4cc9f0` | El glifo en línea de `index.html` (`.brand-glyph`), resuelto con los tokens del tema oscuro |
| Clara | papel o blanco | `#c94b28` | `#0b8b7d` | `#0b8b7d` → `#0f7ea6` | `#0f7ea6` | `assets/glyph-light.svg`, colores como literales; el id del degradado lleva el prefijo `coabana-glyph-` |

- **La baldosa** (`assets/mark-tile.svg`, `viewBox="0 0 60 60"`) es un renderizado derivado, no una tercera variante: la variante oscura sin alterar sobre un cuadrado `#07131d` de radio 13 (≈ 22 %). Es el único fondo propio sancionado para la marca, para los huecos que exigen una imagen opaca cuadrada o circular: el `logo` de los datos estructurados de `index.html` (`assets/mark-tile-512.png`), el icono grande (el mismo PNG) y los avatares. El glifo va centrado sobre su trazo, no sobre su caja de 48 (`translate(8 4)`), y cabe entero en el círculo inscrito, así que un recorte redondo no lo corta.
- **El favicon** (`assets/favicon.svg`, `assets/favicon-32.png`) es la baldosa dibujada para 16–32 px: los mismos trazados y colores, con trazos más gruesos (tronco 4.2, hojas 3.6, ola 3.4, sol de radio 6.3) y una baldosa más ceñida (48, radio 10.5, `translate(2 -2)`), para que la palma, el sol y la ola sobrevivan en la pestaña. Es la única simplificación declarada del glifo y no se usa por encima de 48 px.
- **La baldosa lleva su radio dibujado**: no se usa donde la plataforma aplica su propia máscara (`apple-touch-icon`, iconos adaptativos), porque el redondeo se duplicaría.
- **Los PNG se renderizan con resvg 0.48.1** y son reproducibles byte a byte: `resvg -w 512 -h 512 assets/mark-tile.svg assets/mark-tile-512.png` y `resvg -w 32 -h 32 assets/favicon.svg assets/favicon-32.png`.
- **`assets/logo.svg`** (glifo y wordmark en una rejilla de 300 × 72, tronco liso) es un dibujo anterior a esta sección que el sitio ya no enlaza: un renderizado derivado que no se transcribe.
- **La palma del hero** (`.island-svg` en `index.html`) es la palma del glifo a ×3.5 con peso de ilustración (tronco 7, hojas 6, el degradado del tronco) y sin sol ni ola: una ilustración que cita la marca, no una variante ni un peso nuevo del glifo. Es el único uso sancionado de la geometría del glifo como ilustración; si el glifo cambia, cambia con él.
- **Tamaño mínimo: 24 px** de lado; por debajo los trazos de las hojas se funden. El favicon (16–32 px) es la excepción, con su dibujo propio.
- **Espacio libre**: alrededor del cuadrado del glifo, al menos **¼ de su lado** (12 px para un glifo de 48 px) sin texto ni otra marca.
- **Contraste** (gráficos, mínimo WCAG 3:1): la variante clara sobre `#ffffff` da **4.20 / 4.61 / 4.65 : 1** (`#0b8b7d` / `#0f7ea6` / `#c94b28`), y sobre `--bg` claro `#f7f4ec`, 3.82 / 4.19 / 4.23 : 1; la oscura sobre `#07131d`, 10.29 / 9.75 / 8.39 : 1 (`#2fd6c3` / `#4cc9f0` / `#ff8f6b`). Sobre otro fondo se mide antes de usarla.
- **No se altera**: ni recolorear fuera de estas dos variantes, ni deformar, ni girar, ni añadirle contorno o sombra, ni ponerlo sobre otro fondo propio que la baldosa.

## Accesibilidad

`:focus-visible` global · contraste AA en ambos temas (los acentos se oscurecen en claro) · `prefers-reduced-motion` · contenido completo sin JavaScript · `aria-live` en el estado del formulario · favicons: `favicon.svg` + PNG de 32 px y la baldosa en PNG de 512 px (Safari no soporta favicons SVG; Google Search recomienda más de 48 px y no lista SVG).
