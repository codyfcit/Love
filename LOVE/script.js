/* Configuración general */
const messages = [
  "Te amo ❤️",
  "Eres mi universo ✨",
  "Siempre tú 💫",
  "Mi lugar favorito eres tú 💜",
  "Contigo todo brilla 🌌",
  "Eres mi calma y mi locura 💙",
  "A tu lado todo tiene color 🌠",
  "Eres mi luz en la oscuridad 🌙",
  "Mi corazón late por ti 💗",
  "Gracias por existir 🌸",
  "Te pienso a cada momento 💭💜",
  "Mi vida es más bonita contigo 💖",
  "Eres mi sueño favorito ✨",
  "Quiero estar contigo siempre 💍",
  "Me haces muy feliz 😍",
  "Eres magia en mi vida ✨💜",
  "Te adoro con el alma 💘",
  "Tu sonrisa es mi debilidad 😊💞",
  "Eres mi persona especial 💗",
  "Lo mejor que me pasó eres tú 💕",
  "Eres todo lo que quiero 💖",
  "Me encantas tanto 💜",
  "Eres mi hogar 🌙💗",
  "Me haces sentir en las estrellas 🌠",
  "Siempre contigo, mi amor 💞",
  "Eres el latido más bonito ❤️‍🔥",
  "Nunca dejaré de amarte 💗",
  "Eres mi todo 💜✨",
  "Tú y yo, siempre 💘"
];


const mainText = " Eres todo lo que quiero 💖✨";

// elementos DOM
const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const letter = document.getElementById("letter");
const centerMessage = document.getElementById("center-message");
const music = document.getElementById("bg-music");
const loveBtn = document.getElementById("love-btn");
const starsContainer = document.getElementById("stars");

/* === Mostrar texto central === */
centerMessage.innerText = mainText;

/* ===== Crear estrellas (fondo) ===== */
function spawnStars(count = 80) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 1; // 1 - 3 px
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.background = (Math.random() > 0.85) ? '#fff9' : '#ddd6';
    s.style.borderRadius = '50%';
    s.style.position = 'absolute';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.opacity = Math.random() * 0.9;
    s.style.filter = 'drop-shadow(0 0 8px rgba(120,80,240,0.12))';
    s.style.animation = `twinkle ${3 + Math.random()*4}s ease-in-out ${Math.random()*2}s infinite`;
    starsContainer.appendChild(s);
  }
}
spawnStars(90);

/* ===== Mensajes flotantes y corazones ===== */
let msgInterval, heartInterval;

function createFloat() {
  const el = document.createElement('div');
  el.className = 'float';
  el.innerText = messages[Math.floor(Math.random()*messages.length)];
  const left = Math.random() * 80 + 5; // vw
  const top = Math.random() * 40 + 50; // vh lower area start
  el.style.left = left + 'vw';
  el.style.top = top + 'vh';
  el.style.animationDuration = (8 + Math.random()*4) + 's';
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 10000);
}

function createHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.innerText = '💜';
  const left = Math.random() * 90;
  h.style.left = left + 'vw';
  h.style.bottom = '-20px';
  h.style.fontSize = (18 + Math.random()*18) + 'px';
  h.style.animationDuration = (5 + Math.random()*3) + 's';
  document.body.appendChild(h);
  setTimeout(()=> h.remove(), 7000);
}

/* ===== Iniciar animación al presionar start ===== */
startBtn.onclick = () => {
  startScreen.style.display = 'none';
  letter.classList.remove('hidden');
  // reproducir música (requiere interacción del usuario)
  try { music.volume = 0.45; music.play(); } catch(e){ console.warn(e); }
  // iniciar loops
  msgInterval = setInterval(createFloat, 900);
  heartInterval = setInterval(createHeart, 700);
};

/* ===== Botón "Te amo" - explosion + vibración ===== */
loveBtn.addEventListener('click', () => {
  // vibrar pantalla (añadir clase que anima body)
  document.body.classList.add('shake');
  setTimeout(()=> document.body.classList.remove('shake'), 650);

  // crear muchos "TE AMO" explotando desde el centro
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight * 0.38; // approx center-message Y
  const count = 36;
  for (let i = 0; i < count; i++) {
    createAmo(centerX, centerY, i, count);
  }

  // opcional: un pulso de brillo (crea un overlay momentáneo)
  flashPulse();
});

/* helper: crear cada TE AMO */
function createAmo(cx, cy, idx, total) {
  const el = document.createElement('div');
  el.className = 'explode-amo';
  el.innerText = (Math.random() > 0.2) ? 'TE AMO LALO❤️' : 'TE AMO LALO';
  // posición inicial en el centro (usamos transform to position)
  el.style.left = cx + 'px';
  el.style.top = cy + 'px';

  // calcular dirección aleatoria pero distribuida
  const angle = (Math.PI * 2) * (idx / total) + (Math.random()*0.4 - 0.2);
  const dist = 160 + Math.random()*200;
  const tx = Math.cos(angle) * dist + (Math.random()*40 - 20);
  const ty = Math.sin(angle) * dist + (Math.random()*40 - 20);

  el.style.setProperty('--tx', `${tx}px`);
  el.style.setProperty('--ty', `${ty}px`);
  el.style.setProperty('--rot', (Math.random()*60 - 30) + 'deg');
  el.style.fontSize = (14 + Math.random()*14) + 'px';
  el.style.color = (Math.random() > 0.6) ? '#fff' : '#ffdbf7';
  el.style.opacity = '1';

  document.body.appendChild(el);
  // remover al terminar la animación
  setTimeout(()=> el.remove(), 2000 + Math.random()*700);
}

/* pulso de brillo */
function flashPulse() {
  const pulse = document.createElement('div');
  pulse.style.position = 'fixed';
  pulse.style.left = 0;
  pulse.style.top = 0;
  pulse.style.width = '100%';
  pulse.style.height = '100%';
  pulse.style.background = 'radial-gradient(ellipse at center, rgba(124,58,237,0.18), rgba(0,0,0,0))';
  pulse.style.pointerEvents = 'none';
  pulse.style.zIndex = 999;
  document.body.appendChild(pulse);
  setTimeout(()=> {
    pulse.style.transition = 'opacity 600ms ease';
    pulse.style.opacity = '0';
    setTimeout(()=> pulse.remove(), 650);
  }, 50);
}

/* limpieza al cerrar pestaña (opcional) */
window.addEventListener('beforeunload', () => {
  clearInterval(msgInterval);
  clearInterval(heartInterval);
});
