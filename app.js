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

// Quiz data (Transkript IV)
const quizData = [
  {
    q: 'Wie wird der Roman „Views“ im Transkript charakterisiert?',
    options: ['Als reiner Liebesroman', 'Als Thriller und „Fiebermesser“ der Gesellschaft', 'Als klassischer Historienroman'],
    a: 1,
    explain: 'Im Transkript wird „Views“ als Thriller beschrieben, der wie ein Fiebermesser die Gesellschaft misst.'
  },
  {
    q: 'Welche zentrale Frage treibt die Handlung an?',
    options: [
      'Wie wird ein verlorenes Kind gefunden?',
      'Was passiert, wenn ein einziges virales Video ein Land an den Rand des Abgrunds bringt?',
      'Wie entsteht eine Liebesgeschichte in Berlin?'
    ],
    a: 1,
    explain: 'Die zentrale, beunruhigende Frage betrifft die Wirkung eines einzigen viralen Videos auf die Gesellschaft.'
  },
  {
    q: 'Wer ist die Hauptfigur?',
    options: ['Journalist Stefan', 'BKA‑Hauptkommissarin Yassira Razad', 'Innenministerin'],
    a: 1,
    explain: 'Die Hauptfigur ist die BKA‑Hauptkommissarin Yassira Razad.'
  },
  {
    q: 'Was macht das Video im Transkript so „viral“?',
    options: ['Es ist über 2 Stunden lang', 'Es ist in perfekter TikTok‑Länge unter 60 Sekunden', 'Es wird nur im Fernsehen gezeigt'],
    a: 1,
    explain: 'Die „perfekte TikTok‑Länge“ unter 60 Sekunden macht das Video besonders viral.'
  },
  {
    q: 'Wie spaltet sich die Öffentlichkeit laut Transkript?',
    options: [
      'In Fans von TikTok und Fans von Instagram',
      'In zwei Lager: Verbrechen von „Fremden“ vs. Gewalt von Männern gegen eine Frau, Herkunft egal',
      'In Stadt und Land, ohne Bezug zum Video'
    ],
    a: 1,
    explain: 'Es entstehen zwei unversöhnliche Lager mit gegensätzlicher Deutung des Verbrechens.'
  },
  {
    q: 'Wer ist „Bär“ und wofür stehen die 88 Sekunden?',
    options: [
      'Ein Ermittler, 88 steht für einen Polizeicode',
      'Ein Netz‑Akteur, der Selbstjustiz fordert; 88 ist rechte Symbolik',
      'Ein Opfer des Videos, 88 ist sein Alter'
    ],
    a: 1,
    explain: '„Bär“ ruft zur Selbstjustiz auf; 88 wird als bewusst gesetzte rechte Symbolik gelesen.'
  },
  {
    q: 'Warum wird Yassira mit der Leitung der Ermittlungen betraut?',
    options: [
      'Weil sie die jüngste Ermittlerin ist',
      'Weil ihre „Nicht‑Deutsche“ Herkunft politisch gegen Rassismusvorwürfe genutzt werden soll',
      'Weil sie das Video gefilmt hat'
    ],
    a: 1,
    explain: 'Ihre Herkunft wird politisch instrumentalisiert, um Vorwürfe gegen die Polizei zu entkräften.'
  },
  {
    q: 'Was geschieht nach der Lösegeldforderung von 100.000 Dollar in Bitcoin?',
    options: [
      'Yassira glaubt sofort, dass der Täter gefasst ist',
      'Yassira vermutet Trittbrettfahrer, die die Tragödie ausnutzen',
      'Die Medien berichten nicht darüber'
    ],
    a: 1,
    explain: 'Yassira ist skeptisch und vermutet Trittbrettfahrer.'
  }
];

const quizEl = document.getElementById('quiz');

if (quizEl) {
  quizEl.innerHTML = quizData.map((item, idx) => {
    const options = item.options.map((opt, i) => {
      return `<label><input type="radio" name="q${idx}" value="${i}"> ${opt}</label>`;
    }).join('');
    return `<div class="quiz__item" data-q="${idx}"><p><strong>${idx + 1}. ${item.q}</strong></p>${options}<p class="quiz__feedback" id="qf${idx}"></p></div>`;
  }).join('');

  quizData.forEach((item, idx) => {
    const inputs = quizEl.querySelectorAll(`input[name="q${idx}"]`);
    inputs.forEach((input) => {
      input.addEventListener('change', () => {
        const feedback = document.getElementById(`qf${idx}`);
        const isCorrect = Number(input.value) === item.a;
        if (feedback) {
          feedback.textContent = isCorrect ? `Richtig. ${item.explain}` : `Falsch. ${item.explain}`;
          feedback.classList.toggle('is-correct', isCorrect);
          feedback.classList.toggle('is-wrong', !isCorrect);
        }
      });
    });
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
