const sections = Array.from(document.querySelectorAll('section'));
const progressBar = document.getElementById('progressBar');
const progressLabel = document.getElementById('progressLabel');
const timeOnTask = document.getElementById('timeOnTask');
const sideToggle = document.querySelector('.side-nav__toggle');
const sideList = document.querySelector('.side-nav__list');
const sideProgress = document.querySelector('.side-nav__progress');

const startTime = Date.now();

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const pct = Math.min(100, Math.round((scrollTop / docHeight) * 100));
  progressBar.style.width = `${pct}%`;
  progressLabel.textContent = `${pct}%`;
}

function updateTime() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  timeOnTask.textContent = `${minutes}:${seconds}`;
}

window.addEventListener('scroll', updateProgress);
window.addEventListener('load', updateProgress);
setInterval(updateTime, 1000);

// Smooth scroll buttons
Array.from(document.querySelectorAll('[data-scroll]')).forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Accordion
Array.from(document.querySelectorAll('[data-accordion] .accordion__item')).forEach(item => {
  item.addEventListener('click', () => {
    const panel = item.nextElementSibling;
    const expanded = item.getAttribute('aria-expanded') === 'true';
    item.setAttribute('aria-expanded', String(!expanded));
    const icon = item.querySelector('.accordion__icon');
    if (icon) icon.textContent = expanded ? '+' : '–';
    if (panel) panel.classList.toggle('open');
  });
});

// Mobile nav toggle
if (sideToggle) {
  sideToggle.addEventListener('click', () => {
    const expanded = sideToggle.getAttribute('aria-expanded') === 'true';
    sideToggle.setAttribute('aria-expanded', String(!expanded));
    if (sideList) sideList.style.display = expanded ? 'none' : 'grid';
    if (sideProgress) sideProgress.style.display = expanded ? 'none' : 'block';
  });
}

// Quiz data
const quizData = [
  {
    q: 'Welcher Analyse‑Frame fokussiert auf Ausschlüsse und Unsichtbarkeit?',
    options: ['Frame 1 – Blickachsen', 'Frame 2 – Bildpolitik & Ausschlüsse', 'Frame 3 – Affekt & Rhythmus'],
    a: 1
  },
  {
    q: 'Welche Frage passt zu Frame 4?',
    options: ['Wie zirkuliert das Material?', 'Wie wird Geschichte zitiert?', 'Welche Emotionen werden erzeugt?'],
    a: 1
  },
  {
    q: 'Welche Perspektive ist besonders wichtig für die Medienanalyse?',
    options: ['Nur die Produzentensicht', 'Die dominante und die verdrängte Sicht', 'Nur die Rezipientensicht'],
    a: 1
  }
];

const quizEl = document.getElementById('quiz');
const quizResult = document.getElementById('quizResult');
const checkQuiz = document.getElementById('checkQuiz');

if (quizEl) {
  quizEl.innerHTML = quizData.map((item, idx) => {
    const options = item.options.map((opt, i) => {
      return `<label><input type="radio" name="q${idx}" value="${i}"> ${opt}</label>`;
    }).join('');
    return `<div class="quiz__item"><p><strong>${idx + 1}. ${item.q}</strong></p>${options}</div>`;
  }).join('');
}

if (checkQuiz) {
  checkQuiz.addEventListener('click', () => {
    let score = 0;
    quizData.forEach((item, idx) => {
      const selected = document.querySelector(`input[name="q${idx}"]:checked`);
      if (selected && Number(selected.value) === item.a) score += 1;
    });
    if (quizResult) quizResult.textContent = `Ergebnis: ${score} / ${quizData.length}`;
  });
}

// Glossary
const glossaryData = [
  { term: 'Affekt', def: 'Emotionale Resonanz, die durch Bild, Ton, Rhythmus erzeugt wird.' },
  { term: 'Bildpolitik', def: 'Regelung dessen, was sichtbar wird und was ausgeschlossen bleibt.' },
  { term: 'Archiv', def: 'Sammlung von Materialien, die Erinnerung und Geschichte strukturieren.' },
  { term: 'Perspektive', def: 'Standpunkt, Blickrichtung und Erzählinstanz einer Darstellung.' },
  { term: 'Resonanz', def: 'Reaktionen, Weitergaben und öffentliche Wirkung eines Mediums.' }
];

const glossaryEl = document.getElementById('glossary');
const glossarySearch = document.getElementById('glossarySearch');

function renderGlossary(filter = '') {
  if (!glossaryEl) return;
  const items = glossaryData
    .filter(item => item.term.toLowerCase().includes(filter.toLowerCase()))
    .map(item => `<div class="glossary__item"><strong>${item.term}</strong><p>${item.def}</p></div>`)
    .join('');
  glossaryEl.innerHTML = items || '<p>Kein Treffer.</p>';
}

if (glossarySearch) {
  glossarySearch.addEventListener('input', (e) => renderGlossary(e.target.value));
}

renderGlossary();

// Notes
const notes = document.getElementById('notes');
const saveNotes = document.getElementById('saveNotes');
const clearNotes = document.getElementById('clearNotes');

if (saveNotes && notes) {
  saveNotes.addEventListener('click', () => {
    const blob = new Blob([notes.value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'views-berlin-notizen.txt';
    a.click();
    URL.revokeObjectURL(url);
  });
}

if (clearNotes && notes) {
  clearNotes.addEventListener('click', () => {
    notes.value = '';
  });
}
