// =========================
// THEME TOGGLE + LOCAL STORAGE
// =========================
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
if(localStorage.getItem('theme') === 'light'){
  document.body.classList.add('light');
  toggle.textContent = '🌙';
}

// =========================
// FADE-IN SECTIONS ON SCROLL
// =========================
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('fade-in');
  });
}, { threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));

// =========================
// HERO MOUSE PARALLAX EFFECT
// =========================
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  hero.style.backgroundPosition = `${x * 50}% ${y * 50}%`;
});

// =========================
// PARTICLE BACKGROUND
// =========================
const canvas = document.createElement('canvas');
hero.appendChild(canvas);
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0';
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
  canvas.width = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Create particles
for(let i=0;i<100;i++){
  particles.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*3+1,
    dx: (Math.random()-0.5)*1.5,
    dy: (Math.random()-0.5)*1.5,
    color: ['#00ffc3','#1e90ff','#ffd700'][Math.floor(Math.random()*3)]
  });
}

// Animate particles
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if(p.x<0 || p.x>canvas.width) p.dx*=-1;
    if(p.y<0 || p.y>canvas.height) p.dy*=-1;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// =========================
// BUTTON HOVER LIGHT EFFECTS
// =========================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.boxShadow = `${x/5}px ${y/5}px 20px #00ffc3, ${-x/5}px ${-y/5}px 20px #1e90ff`;
  });
  btn.addEventListener('mouseleave', e => {
    btn.style.boxShadow = '0 0 10px #00ffc3';
  });
});

// =========================
// NEON FLASHING HEADINGS
// =========================
const headings = document.querySelectorAll('.hero-title, h2');
setInterval(() => {
  headings.forEach(h => {
    h.style.textShadow = `${Math.random()*20-10}px ${Math.random()*20-10}px 20px #00ffc3,
                          ${Math.random()*20-10}px ${Math.random()*20-10}px 20px #1e90ff,
                          ${Math.random()*20-10}px ${Math.random()*20-10}px 20px #ffd700`;
  });
}, 300);

// =========================
// SCROLL-BASED ELEMENT MOVEMENT
// =========================
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.card').forEach((card, index) => {
    card.style.transform = `translateY(${Math.sin((scrollY+index*50)/100)*20}px)`;
  });
});

// =========================
// RANDOM POPPING LIGHT SPARKS
// =========================
function spawnSpark(){
  const spark = document.createElement('div');
  spark.style.position = 'absolute';
  spark.style.width = '4px';
  spark.style.height = '4px';
  spark.style.borderRadius = '50%';
  spark.style.background = ['#00ffc3','#1e90ff','#ffd700'][Math.floor(Math.random()*3)];
  spark.style.top = `${Math.random()*window.innerHeight}px`;
  spark.style.left = `${Math.random()*window.innerWidth}px`;
  spark.style.boxShadow = `0 0 8px ${spark.style.background},0 0 16px ${spark.style.background}`;
  spark.style.pointerEvents = 'none';
  spark.style.opacity = 1;
  document.body.appendChild(spark);
  let alpha = 1;
  const interval = setInterval(() => {
    alpha -= 0.03;
    spark.style.opacity = alpha;
    spark.style.transform = `scale(${1-alpha*2})`;
    if(alpha<=0){
      clearInterval(interval);
      spark.remove();
    }
  },30);
}
setInterval(spawnSpark, 200);

// =========================
// CARD HOVER 3D TILT EFFECT
// =========================
const cards = document.querySelectorAll('.card, .team-card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width/2;
    const midY = rect.height/2;
    const rotateX = ((y-midY)/midY)*10;
    const rotateY = ((x-midX)/midX)*10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
});

// =========================
// FLOATING NEON ORBS
// =========================
const orbCount = 15;
let orbs = [];
for(let i=0;i<orbCount;i++){
  const orb = document.createElement('div');
  orb.style.position = 'absolute';
  orb.style.width = `${Math.random()*20+10}px`;
  orb.style.height = orb.style.width;
  orb.style.borderRadius = '50%';
  orb.style.background = ['#00ffc3','#1e90ff','#ffd700'][Math.floor(Math.random()*3)];
  orb.style.opacity = 0.3;
  orb.style.top = `${Math.random()*window.innerHeight}px`;
  orb.style.left = `${Math.random()*window.innerWidth}px`;
  orb.style.pointerEvents = 'none';
  orb.style.filter = 'blur(8px)';
  document.body.appendChild(orb);
  orbs.push({el: orb, dx:(Math.random()-0.5)*0.3, dy:(Math.random()-0.5)*0.3});
}
function animateOrbs(){
  orbs.forEach(o => {
    let top = parseFloat(o.el.style.top);
    let left = parseFloat(o.el.style.left);
    o.el.style.top = `${top+o.dy}px`;
    o.el.style.left = `${left+o.dx}px`;
    if(top<0 || top>window.innerHeight) o.dy*=-1;
    if(left<0 || left>window.innerWidth) o.dx*=-1;
  });
  requestAnimationFrame(animateOrbs);
}
animateOrbs();
