const defaultConfig = {
    site_title: "GAMEFORCE ELITE",
    hero_title: "GAMING CON PROPÓSITO SOCIAL",
    hero_subtitle: "Centro de gaming solidario donde cada partida cuenta. Competimos por la gloria y ayudamos a quienes más lo necesitan.",
    mission_title: "Nuestra Misión",
    primary_color: "#6366f1",
    secondary_color: "#f59e0b",
    accent_color: "#10b981",
    text_color: "#f8fafc",
    background_color: "#0f172a"
};

async function onConfigChange(config) {
    const getValue = key => config[key] || defaultConfig[key];
    const el = id => document.getElementById(id);

    const site = el("site-title");
    const hero = el("hero-title");
    const sub = el("hero-subtitle");
    const mission = el("mission-title");

    if (site) site.textContent = getValue("site_title");
    if (hero) {
        hero.textContent = getValue("hero_title");
        hero.setAttribute("data-text", getValue("hero_title"));
    }
    if (sub) sub.textContent = getValue("hero_subtitle");
    if (mission) mission.textContent = getValue("mission_title");

    const root = document.documentElement;

    const vars = {
        "--primary-color": "primary_color",
        "--secondary-color": "secondary_color",
        "--accent-color": "accent_color",
        "--text-light": "text_color",
        "--dark-bg": "background_color",
        "--neon-pink": "primary_color",
        "--neon-cyan": "secondary_color",
        "--neon-green": "accent_color"
    };

    Object.entries(vars).forEach(([css, key]) =>
        root.style.setProperty(css, getValue(key))
    );
}

function mapToCapabilities(config) {
    const make = key => ({
        get: () => config[key] || defaultConfig[key],
        set: v => window.elementSdk?.setConfig({ [key]: v })
    });

    return {
        recolorables: [
            "primary_color",
            "secondary_color",
            "accent_color",
            "text_color",
            "background_color"
        ].map(make),
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    const keys = ["site_title", "hero_title", "hero_subtitle", "mission_title"];
    return new Map(keys.map(k => [k, config[k] || defaultConfig[k]]));
}

function scrollToSection(id) {
    const t = document.getElementById(id);
    if (!t) return;

    t.scrollIntoView({
        behavior: "smooth",
        block: 'center'
    });

    document.querySelectorAll(".nav-link").forEach(l =>
        l.classList.remove("active")
    );
    document.querySelector(`a[href="#${id}"]`)?.classList.add("active");
}

const redirectToColaborar = () =>
    window.open("quierocolaborar.html", "_blank");


let tournaments = [
    {
        id: 1,
        title: "Copa Solidaria LoL 2025",
        game: "League of Legends",
        platform: "PC",
        date: "2025-02-15T18:00",
        slots: 32,
        objective: "Ayuda a niños en situación vulnerable",
        rules: "Formato eliminación directa, Bo3 en finales",
        prizes: "Trofeos personalizados y certificados",
        pdfLink: "https://ejemplo.com/reglamento-lol.pdf",
        streamLink: "https://twitch.tv/gameforceelite",
        participants: ["MidLaneGod", "JungleKing", "ADC_Legend", "SuppMasteR", "TopFrag"],
        sponsors: ["HyperX Gaming", "Razer Latam", "EnergyDrink Turbo", "Logitech G"],
        image: "./multimedia/lol.jpg"
    },
    {
        id: 2,
        title: "Torneo Benéfico Valorant",
        game: "Valorant",
        platform: "PC",
        date: "2025-02-20T20:00",
        slots: 16,
        objective: "Recaudación para refugio de animales",
        rules: "Formato suizo, mapas competitivos",
        prizes: "Skins exclusivas y merchandising",
        pdfLink: "",
        streamLink: "https://youtube.com/gameforceelite",
        participants: ["AimBot_99", "PistoleroPro", "SentinelGuard", "ControllerX", "DuelistARG"],
        sponsors: ["AMD Gaming", "NVIDIA GeForce", "SecretLab Latam", "RedBull Energy"],
        image: "./multimedia/valorant.jpg"
    }
];

function renderTournaments() {
    const container = document.getElementById("tournamentsList");

    if (!container) return;

    if (tournaments.length === 0) {
        container.innerHTML =
            '<p class="text-center text-muted">No hay torneos creados aún.</p>';
        return;
    }

    container.innerHTML = tournaments
        .map(
            t => `
            <div class="tournament-card">
                <div class="tournament-content-wrapper">
                    <div class="tournament-title">${t.title}</div>

                    <div class="tournament-info">
                        <strong>Juego:</strong> ${t.game} | <strong>Plataforma:</strong> ${t.platform} | <strong>Fecha:</strong> ${new Date(t.date).toLocaleDateString(
                "es-ES",
                {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })} ${new Date(t.date).toLocaleTimeString(
                    "es-ES",
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }
                )}
                    </div>

                    <div class="tournament-info">
                        <strong>Cupos:</strong> ${t.slots} | <strong>Objetivo:</strong> ${t.objective}
                    </div>

                    <div class="tournament-actions">
                        <button class="btn btn-warning btn-sm" onclick="editTournament(${t.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>

                        <button class="btn btn-success btn-sm" onclick="viewParticipants(${t.id})">
                            <i class="fas fa-users"></i> Ver Inscritos
                        </button>

                        <button class="btn btn-danger btn-sm" onclick="deleteTournament(${t.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
                
                <div class="tournament-banner-wrapper">
                    <img src="${t.image}" alt="Banner ${t.title}" class="tournament-banner-img">
                </div>
            </div>
        `
        )
        .join("");
}

document.getElementById("tournamentForm")?.addEventListener("submit", e => {
    e.preventDefault();

    const imageInput = document.getElementById("bannerImage");
    let bannerPath = "./multimedia/default_banner.jpg";


    if (imageInput.files.length > 0) {


        const file = imageInput.files[0];


        bannerPath = URL.createObjectURL(file);
    }

    const newTournament = {
        id: Date.now(),
        title: document.getElementById("title").value,
        game: document.getElementById("game").value,
        platform: document.getElementById("platform").value,
        date: document.getElementById("date").value,
        slots: parseInt(document.getElementById("slots").value),
        objective: document.getElementById("objective").value,
        rules: "",
        prizes: "",
        pdfLink: "",
        streamLink: "",
        participants: [],
        sponsors: [],
        image: bannerPath
    };

    tournaments.push(newTournament);
    renderTournaments();

    e.target.reset();
    alert("¡Torneo creado exitosamente!");
});

function deleteTournament(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este torneo?")) return;
    tournaments = tournaments.filter(t => t.id !== id);
    renderTournaments();
}

function editTournament(id) {
    const t = tournaments.find(t => t.id === id);
    if (!t) return;

    document.getElementById("editId").value = t.id;
    document.getElementById("editRules").value = t.rules || "";
    document.getElementById("editPrizes").value = t.prizes || "";
    document.getElementById("editPdfLink").value = t.pdfLink || "";
    document.getElementById("editStreamLink").value = t.streamLink || "";

    new bootstrap.Modal(document.getElementById("editModal")).show();
}

function saveEdit() {
    const id = parseInt(document.getElementById("editId").value);
    const t = tournaments.find(t => t.id === id);
    if (!t) return;

    t.rules = document.getElementById("editRules").value;
    t.prizes = document.getElementById("editPrizes").value;
    t.pdfLink = document.getElementById("editPdfLink").value;
    t.streamLink = document.getElementById("editStreamLink").value;

    renderTournaments();
    bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
    alert("¡Torneo actualizado exitosamente!");
}

function viewParticipants(id) {
    const t = tournaments.find(t => t.id === id);
    if (!t) return;

    const participantsList = document.getElementById("participantsList");
    const sponsorsList = document.getElementById("sponsorsList");

    participantsList.innerHTML =
        t.participants.length === 0
            ? '<p class="text-muted">No hay participantes inscritos aún.</p>'
            : t.participants
                .map(
                    p => `
                <div class="participant-item">
                    <span><i class="fas fa-user text-success me-1"></i> ${p}</span>
                    <span class="badge bg-success">Inscrito</span>
                </div>
            `
                )
                .join("");

    sponsorsList.innerHTML =
        t.sponsors.length === 0
            ? '<p class="text-muted">No hay sponsors asociados aún.</p>'
            : t.sponsors
                .map(
                    s => `
                <div class="sponsor-item">
                    <span><i class="fas fa-handshake text-warning me-1"></i> ${s}</span>
                    <span class="badge bg-warning">Sponsor</span>
                </div>
            `
                )
                .join("");

    new bootstrap.Modal(document.getElementById("participantsModal")).show();
}

renderTournaments();

document.addEventListener("DOMContentLoaded", () => {

    const introPopup = document.getElementById('intro-popup');
    const btnListenSimple = document.getElementById('btn-listen-simple');
    const btnSkipSimple = document.getElementById('btn-skip-simple');
    const introAudio = document.getElementById('intro-audio');

    const closePopup = () => {
        if (!introPopup) return;


        introPopup.classList.add('hidden');


        setTimeout(() => {
            introPopup.style.display = 'none';
            introPopup.style.pointerEvents = 'none';
        }, 400);
    };


    const skipAndClose = (e) => {
        if (e) e.preventDefault();
        if (introAudio) {
            introAudio.pause();
            introAudio.currentTime = 0;
        }
        closePopup();
    }


    if (introPopup && btnListenSimple && btnSkipSimple && introAudio) {


        btnListenSimple.addEventListener('click', () => {
            const playPromise = introAudio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {

                    closePopup();
                }).catch(error => {

                    console.warn("La reproducción automática de audio ha sido bloqueada. Accediendo sin audio. Error:", error);

                    closePopup();
                });
            } else {

                closePopup();
            }
        });

        btnSkipSimple.addEventListener('click', skipAndClose);
    }

    const form = document.getElementById("loginForm");
    const modal = document.getElementById("loginModal");

    if (form && modal) {
        form.addEventListener("submit", e => {
            e.preventDefault();

            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const msg = document.getElementById("errorMessage");
            const btn = form.querySelector('button[type="submit"]');

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando...';

            setTimeout(() => {
                if (username === "mari" && password === "123") {
                    window.open(
                        `admin.html?user=${encodeURIComponent(username)}`,
                        "_blank"
                    );
                    bootstrap.Modal.getInstance(modal).hide();

                    form.reset();
                    msg.style.display = "none";
                } else {
                    msg.textContent = "Usuario incorrecto";
                    msg.style.display = "block";
                    document.getElementById("password").value = "";
                    setTimeout(() => (msg.style.display = "none"), 4000);
                    document.getElementById("username").focus();
                }

                btn.disabled = false;
                btn.innerHTML =
                    '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
            }, 800);
        });

        modal.addEventListener("hidden.bs.modal", () => {
            const msg = document.getElementById("errorMessage");
            const btn = form.querySelector('button[type="submit"]');

            msg.style.display = "none";
            form.reset();
            btn.disabled = false;
            btn.innerHTML =
                '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
        });

        modal.addEventListener("shown.bs.modal", () =>
            document.getElementById("username").focus()
        );
    }

    document.querySelectorAll(".colaborar-redirect-btn").forEach(b =>
        b.addEventListener("click", redirectToColaborar)
    );

    document.getElementById("downloadReglamento")?.addEventListener("click", (e) => {
        e.preventDefault();
        const contenidoReglamento = `
REGLAMENTO OFICIAL DE COMPETICIÓN GAMEFORCE ELITE (V 1.2)
======================================================
Vigencia: Noviembre 2025 - Noviembre 2026
GameForce Elite (GFE) | Plataforma de Gaming Solidario

## SECCIÓN 1: NORMAS GENERALES DE PARTICIPACIÓN

1.1. ELEGIBILIDAD
Todo participante debe ser mayor de 16 años (o contar con autorización escrita de un tutor legal). El registro es obligatorio y se valida únicamente tras la confirmación de la donación mínima estipulada para el torneo.

1.2. CÓDIGO DE CONDUCTA Y FAIR PLAY
Se espera que todos los jugadores mantengan un nivel de respeto y deportividad.
* **Prohibiciones:** Está estrictamente prohibido el uso de lenguaje ofensivo, discriminatorio, amenazas, acoso (harassment) o cualquier forma de comportamiento tóxico.
* **Sanciones:** La violación de este código resultará en una advertencia, seguida de la descalificación inmediata del torneo y la prohibición de participación futura en eventos de GFE.

1.3. PUNTUALIDAD
Los participantes deben estar presentes en el canal de comunicación o sala de juego designada **15 minutos antes** de la hora de inicio oficial. Un retraso superior a **10 minutos** sin notificación previa resultará en la pérdida automática del primer mapa/juego.

## SECCIÓN 2: INTEGRIDAD COMPETITIVA

2.1. PROHIBICIÓN DE TRAMPAS (CHEATING)
El uso de software de terceros, hardware no aprobado, exploits o cualquier manipulación del juego para obtener una ventaja injusta está absolutamente prohibido.
* **Detección:** Todo el hardware de GFE y los sistemas de streaming están sujetos a revisión.
* **Consecuencia:** La detección de trampas resultará en la **expulsión de por vida** de la plataforma GFE, la anulación de todos los premios ganados y la notificación a las plataformas de juego correspondientes (ej: Valve, Riot Games).

2.2. CUENTAS Y JUGADORES
Solo el jugador registrado puede utilizar su cuenta durante el torneo. El 'account sharing' o suplantación de identidad resultará en descalificación.

2.3. DESCONEXIONES
En caso de desconexión del servidor por problemas de red o hardware (D/C):
* Si ocurre en los primeros 3 minutos de juego, el mapa/ronda podrá reiniciarse (sujeto a la decisión del árbitro).
* Si ocurre después de los 3 minutos, el juego continuará. El jugador debe reconectarse tan pronto como sea posible.

## SECCIÓN 3: FORMATO DE TORNEOS

3.1. FORMATOS ESTÁNDAR
Los formatos de torneo serán:
* **Eliminación Simple:** El perdedor es eliminado del evento.
* **Doble Eliminación:** El perdedor pasa al 'bracket' de perdedores.
* **Formato Round Robin:** Utilizado para la fase de grupos.

3.2. REGLAMENTO ESPECÍFICO DEL JUEGO
Cada torneo tendrá un Anexo de Reglas Específicas del Juego (ej: Anexo VALORANT, Anexo FIFA), que detalla configuraciones de servidor, mapas elegibles y reglas de 'pick/ban'. Estos anexos prevalecen sobre el Reglamento General.

## SECCIÓN 4: ARBITRAJE Y DECISIONES FINALES

4.1. ÁRBITROS
Cada torneo contará con un equipo de árbitros designados por GFE. Los árbitros son los únicos responsables de interpretar y hacer cumplir este reglamento.
4.2. APELACIONES
Las decisiones arbitrales relacionadas con el juego son finales. Solo se permite la apelación en casos de error administrativo o violación clara de este reglamento.

**CONTACTO PARA DUDAS O INCUMPLIMIENTOS**
* **Email:** arbitraje@gameforceelite.com
* **Canal:** Discord #soporte-reglamento

---
*Este documento es propiedad de GameForce Elite. Última revisión: 14 de Noviembre de 2025.*
        `;

        const link = document.createElement('a');
        const contenidoCodificado = encodeURIComponent(contenidoReglamento.trim());

        link.href = 'data:text/plain;charset=utf-8,' + contenidoCodificado;
        link.download = 'Reglamento_General_GameForceElite.txt';
        link.click();

        const btn = document.getElementById("downloadReglamento");
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Descargado';
            btn.classList.add('btn-success');
            btn.classList.remove('btn-outline-light');
            setTimeout(() => {
                btn.innerHTML = 'Ver reglamento completo';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-outline-light');
            }, 3000);
        }
    });

    document.getElementById("downloadListaEspera")?.addEventListener("click", (e) => {
        e.preventDefault();
        const contenidoListaEspera = `
LISTA DE ESPERA - INSCRIPCIÓN PREVIA
======================================================
Torneo: LoL New Year Cup
Fecha del Torneo: 28-30 Diciembre 2024
Estado: Inscripciones Cerradas. 8/8 equipos confirmados.

## 📝 PROCESO DE LISTA DE ESPERA

1. **Propósito:** El formulario de Lista de Espera permite a los equipos expresar su interés en participar en caso de que un equipo clasificado cancele su inscripción o sea descalificado.

2. **Orden de Prioridad:** La prioridad se asignará estrictamente en el orden cronológico en que se reciban las solicitudes completas de Lista de Espera.

3. **Requisitos de Regstro:** Para ser incluido en la Lista de Espera, el equipo debe:
    * Nombrar un Capitán de Equipo.
    * Proveer la lista de 5 jugadores principales y 2 suplentes.
    * Realizar la pre-donación de compromiso mínima de $X (monto simulado, que será devuelto si el equipo no entra al torneo).

4. **Notificación:** Si se abre un cupo, el equipo con mayor prioridad en la Lista de Espera será notificado por correo electrónico (el registrado por el Capitán).
    * El equipo notificado tendrá un plazo de **6 horas** para confirmar su participación y completar cualquier documentación pendiente.
    * Si la confirmación no se recibe a tiempo, el cupo pasará automáticamente al siguiente equipo en la lista.

5. **Beneficio Adicional:** Los equipos en Lista de Espera tendrán acceso prioritario a la fase clasificatoria del próximo gran torneo de League of Legends de GameForce Elite, el "LoL Spring Invitational 2025".

## 📧 CONTACTO

Para registrarse en la Lista de Espera, por favor complete el formulario en línea o envíe un correo con la información de su equipo a:

**Email:** listasdeespera@gameforceelite.com
**Asunto:** [Lista de Espera] LoL New Year Cup

---
*GameForce Elite agradece su interés y compromiso con el gaming solidario. Lo contactaremos únicamente si se abre un cupo.*
        `;

        const link = document.createElement('a');
        const contenidoCodificado = encodeURIComponent(contenidoListaEspera.trim());

        link.href = 'data:text/plain;charset=utf-8,' + contenidoCodificado;
        link.download = 'GameForce_Lista_Espera.txt';
        link.click();

        const btn = document.getElementById("downloadListaEspera");
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Documento generado';
            btn.classList.add('btn-success');
            btn.classList.remove('btn-secondary');
            setTimeout(() => {
                btn.innerHTML = 'Lista de espera';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-secondary');
            }, 3000);
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            scrollToSection(this.getAttribute('href').substring(1));
        });
    });

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(e => {
                if (e.isIntersecting) e.target.classList.add("animated");
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach(el =>
        observer.observe(el)
    );

    const header = document.querySelector(".main-header");
    const mission = document.querySelector("#mision");
    const sections = document.querySelectorAll("section[id]");
    const links = document.querySelectorAll(".nav-link");
    const trigger = mission ? mission.offsetTop : 0;

    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        const currentHeaderHeight = header.offsetHeight;

        header.classList.toggle("scrolled", y > 100);
        if (trigger > 0) header.classList.toggle("header-visible", y > trigger);

        let current = "";
        sections.forEach(s => {
            const top = s.offsetTop - currentHeaderHeight - 5;
            const h = s.clientHeight;
            if (y >= top && y < top + h) current = s.id;
        });

        links.forEach(l =>
            l.classList.toggle("active", l.getAttribute("href") === `#${current}`)
        );
    });

    if (window.elementSdk) {
        window.elementSdk.init({
            defaultConfig,
            onConfigChange,
            mapToCapabilities,
            mapToEditPanelValues
        });
    }
});

(function () {
    function c() {
        var b = a.contentDocument || a.contentWindow.document;
        if (b) {
            var d = b.createElement('script');
            d.innerHTML = "window.__CF$cv$params={r:'99e05a9a31a84b84',t:'MTc2MzA1ODc2OS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
            b.getElementsByTagName('head')[0].appendChild(d)
        }
    }
    if (document.body) {
        var a = document.createElement('iframe');
        a.height = 1;
        a.width = 1;
        a.style.position = 'absolute';
        a.style.top = 0;
        a.style.left = 0;
        a.style.border = 'none';
        a.style.visibility = 'hidden';
        document.body.appendChild(a);
        if ('loading' !== document.readyState) c();
        else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
        else {
            var e = document.onreadystatechange || function () { };
            document.onreadystatechange = function (b) {
                e(b);
                'loading' !== document.readyState && (document.onreadystatechange = e, c())
            }
        }
    }
})();