# 🏆 GameForce Elite — Segundo Parcial

Proyecto web desarrollado para el **Segundo Parcial** de la materia  
**Taller de Lenguajes de Marcado y Tecnologías Web – 2do Cuatrimestre 2025**.

El trabajo consiste en crear un sitio completo para **GameHub Solidario**, una comunidad que organiza torneos de videojuegos con fines solidarios.

---

## 🔗 Demo Online
👉 https://0600donrouch.github.io/gameforcetournaments

---

## 🎮 Objetivo del Proyecto
El sitio web representa a **GameForce Elite**, una plataforma que combina:

1. **Competencias de esports de alto nivel.**  
2. **Impacto social real**, mostrando campañas solidarias y vías de colaboración.

El sitio cumple con todas las consignas de la evaluación e incluye:

---

## 📌 Páginas del Sitio

### ⭐ `index.html` — Sitio Público
Incluye:
- Portada del proyecto.
- Misión, objetivos y valor social del gaming solidario.
- Torneos activos.
- Reglas y reglamentos.
- Ranking / tabla de posiciones.
- Testimonios y galería multimedia.
- Botones *“Quiero colaborar”* hacia `quierocolaborar.html`.
- **Sistema de Login para administradores**  
  - Usuario: **mari**  
  - Clave: **123**  
  - Si es correcto → redirige con parámetro: `admin.html?user=mari`.  
  - Si es incorrecto → muestra mensaje sin avanzar.

---

### ⭐ `admin.html` — Panel Interno
Incluye:
- Lectura del usuario recibido por parámetro (ej: “Bienvenido/a mari”).
- **Maqueta ABM** de torneos/campañas (sin backend):
  - Crear torneo/campaña (título, juego, plataforma, fecha, cupos, objetivo solidario).
  - Editar reglas, premios simbólicos, enlaces a PDF y streams.
  - Eliminar elementos del listado.
- Opcional: listado de inscriptos y sponsors.
- Opción de volver al Home.
- Mismo header y footer del sitio público.

---

### ⭐ `quierocolaborar.html` — Formulario Público
Formulario dinámico según el tipo de colaboración:

#### 🟦 Dinero
- Monto  
- Tipo de aporte (único / mensual)  
- Medio de pago  

#### 🟩 Trabajo
- Rol  
- Disponibilidad  
- Zona  
- Juego/plataforma preferida  

#### 🟪 Difusión
- Redes sociales  
- Frecuencia  
- Descarga de kit de prensa  

Además:
- Navegación coherente.  
- Mismo header/footer.  
- Diseño accesible y responsivo.

---

## 🛠️ Tecnologías utilizadas
- **HTML5**  
- **CSS3**  
- **JavaScript**

---

## 📂 Estructura del proyecto
- index.html
- admin.html
- quierocolaborar.html
- css/
  - styles.css
- js/
  - scripts.js
- multimedia/
  - photo.jpg
  - video.mp4
  - audio.mp3

---

## 📝 Resultado / Nota
**Calificación:**  
> *10/10*

---

## 🧾 Devolución del profesor/a
> *Sitio muy completo y profesional. Buen diseño y contenido real. Excelente trabajo.*

---

## 🚀 Autor
**Rubén Díaz**  
[GitHub – 0600donrouch](https://github.com/0600donrouch)

---

*“¿Te animás a competir por un futuro mejor?”*
