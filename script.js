const body = document.body, intro = document.getElementById('intro'), env = document.getElementById('env');
const song = document.getElementById('song'), music = document.getElementById('music');

const card = document.querySelector('.card');
const big = document.querySelector('.hero').cloneNode(true);   // card carries a copy of the first screen
card.appendChild(big);

function expandCard() {                                        // card grows to fill the whole screen
  const r = env.getBoundingClientRect();
  card.style.cssText = `left:${-r.left}px;top:${-r.top}px;width:${innerWidth}px;height:${innerHeight}px`;
  intro.classList.add('expand');
}
function openInvite() {
  if (env.classList.contains('open')) return;
  env.classList.add('open');                                   // flap opens
  setTimeout(() => intro.classList.add('out'), 1500);          // card slides out of the envelope
  setTimeout(expandCard, 3300);                                // card becomes the screen
  setTimeout(() => { body.classList.remove('locked'); intro.style.display = 'none'; music.hidden = false; }, 5200);
  song.play().catch(() => {});                                 // plays only if music.mp3 exists
}
env.addEventListener('click', openInvite);
env.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openInvite(); });

// music toggle
music.addEventListener('click', () => {
  if (song.paused) { song.play().catch(() => {}); music.textContent = '🔊'; }
  else { song.pause(); music.textContent = '🔇'; }
});

// FAQ accordion
document.querySelectorAll('.q button').forEach(b =>
  b.addEventListener('click', () => b.parentElement.classList.toggle('open')));

// scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .2 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// falling petals
const cols = ['#e9a3a0', '#f0a14a', '#e8814a', '#f6d2c8'];
for (let i = 0; i < 16; i++) {
  const p = document.createElement('span'), s = 8 + Math.random() * 10;
  p.className = 'petal';
  p.style.cssText = `left:${Math.random() * 100}vw;width:${s}px;height:${s}px;background:${cols[i % 4]};animation-duration:${9 + Math.random() * 9}s;animation-delay:${-Math.random() * 15}s`;
  body.appendChild(p);
}
