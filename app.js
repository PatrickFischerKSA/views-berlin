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
  if (progressBar) progressBar.style.width = `${pct}%`;
  if (progressLabel) progressLabel.textContent = `${pct}%`;
}

function updateTime() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  if (timeOnTask) timeOnTask.textContent = `${minutes}:${seconds}`;
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

// VIEWS_Fragen (Sofortfeedback)
const viewsQuestions = [
  {
    q: 'Warum entscheidet sich Yasira trotz Skepsis für ein Date mit Stefan im Hard Rock Café?',
    a: 'Sie will ihr Privatleben nicht aufs Wochenende verschieben; der Mittwoch passt und trotz Spott über das Hard Rock Café lässt sie sich auf das Tinder-Date ein.'
  },
  {
    q: 'Was lässt sich aus Stefans Äusserungen über Gleichberechtigung und Namen wie «David» über seine Weltsicht erkennen?',
    a: 'Er wirkt liberal und gleichberechtigungsbewusst, aber zugleich unsicher und performativ; er will korrekt wirken und plappert sich um Kopf und Kragen.'
  },
  {
    q: 'Wie reagiert Yasira auf die Frage, wo sie herkommt, und was zeigt das über ihren Umgang mit Alltagsrassismus?',
    a: 'Sie kontert mit „Wilmersdorf“ und „U‑Bahn“, gibt dann präzise Herkunft an; humorvoll, kontrolliert und souverän im Umgang mit Alltagsrassismus.'
  },
  {
    q: 'Welche Rolle spielt Yasiras Humor im Gespräch mit Stefan, und wie setzt sie ihn ein?',
    a: 'Trocken-ironisch; sie testet ihn, entschärft Spannung und behält die Gesprächsführung.'
  },
  {
    q: 'Welche Wirkung hat Yasiras «Geschichte» über ihren Mann Mehmet auf Stefan – und auf die Lesenden?',
    a: 'Sie schockiert Stefan, entlarvt seine Unsicherheit; für Lesende zeigt sie Yasiras Witz und die Klischees im Hintergrund.'
  },
  {
    q: 'Welche Bedeutung hat es, dass Stefan selbst geschieden ist und Kinder hat?',
    a: 'Es zeigt, dass beide „Gepäck“ haben; macht ihn als Partner in ihrem Alter plausibel und relativiert ihre eigene Situation.'
  },
  {
    q: 'Wie reflektiert Yasira beim Blick in den Spiegel ihre eigene Lebenssituation?',
    a: 'Sie prüft Alter, Aussehen und Einsamkeit, erkennt ihren Status Anfang 40 und versucht sich Mut zu machen.'
  },
  {
    q: 'Wie wird das Thema Vegetarismus zwischen Yasira und ihrer Tochter Zara angedeutet?',
    a: 'Zara hat sie moralisch zum Vegetarismus gedrängt; Yasira bestellt den Veggieburger, isst aber gelegentlich heimlich Fisch.'
  },
  {
    q: 'Welche Wirkung hat das Video auf Stefan, als er es zum ersten Mal sieht?',
    a: 'Er ist schockiert und alarmiert – er nennt das Video „Sprengstoff“.'
  },
  {
    q: 'Wie reagiert Yasira auf das Video, und was sagt das über ihre emotionale Belastung aus?',
    a: 'Sie bleibt professionell und analysiert, wird aber emotional getroffen und denkt sofort an Zara.'
  },
  {
    q: 'Warum bezeichnet Stefan das Video als «Sprengstoff», und wie reagiert Yasira darauf?',
    a: 'Weil es gesellschaftlich explodieren kann; Yasira erkennt sofort, dass er recht hat.'
  },
  {
    q: 'Wie beschreibt Yasira das Video konkret – worauf achtet sie besonders?',
    a: 'Tatort Waldlichtung in der Dämmerung, Picknicktisch, zerrissenes Kleid; drei schwarze Männer, Snoopy‑Pullover, Baseballcap/Lockenmann, französischer Akzent; perfekte TikTok‑Länge.'
  },
  {
    q: 'Welche Gedanken hat Yasira über den möglichen Täterkreis – und wie differenziert sie dabei?',
    a: 'Sie zählt vier Täter inkl. Kameramann; der Uploader könnte Täter sein, aber auch Teil einer Weiterleitungskette.'
  },
  {
    q: 'Was befürchtet Yasira hinsichtlich der öffentlichen Reaktionen auf das Video?',
    a: 'Eskalation: Empörung, Polarisierung, politische Überreaktionen, Gewalt und Lynchstimmung.'
  },
  {
    q: 'Wie bewertet Yasira die Dynamik zwischen Empörung und rechter Mobilisierung?',
    a: 'Sie sieht, dass Empörung rechte Mobilisierung anheizt; der Aktive Heimatschutz wächst rasant.'
  },
  {
    q: 'Was sagt Stefan über den Unterschied zwischen Verbrechen von Flüchtlingen und von Nazis?',
    a: 'Er sagt sinngemäß: Unter Flüchtlingen gibt es auch Arschlöcher, unter Nazis nur Arschlöcher – eine zugespitzte Gegenüberstellung.'
  },
  {
    q: 'Wie äussert sich Yasiras Zweifel am Begriff «Geflüchtete»?',
    a: 'Sie hält ihn für einen moralischen Sprachcode, der mehr Abgrenzung als Lösung erzeugt.'
  },
  {
    q: 'Warum zweifelt Yasira an der Wirkung von idealistischer Sprache und Haltung?',
    a: 'Sie sagt, die Realität schleift Idealismus; reine Sprache ändert die Lage nicht.'
  },
  {
    q: 'Was erzählt Yasira über ihre Motivation, zur Polizei zu gehen?',
    a: 'Sie arbeitet aus Pflicht- und Gerechtigkeitssinn; sie will schützen und aufklären.'
  },
  {
    q: 'Wie deutet Yasira an, dass sie ihren Idealismus verloren hat?',
    a: 'Sie nennt sich Zynikerin und sagt, die Realität habe ihren Idealismus geschliffen.'
  },
  {
    q: 'Welche Wirkung hat das Video auf Zara, und wie zeigt sich ihre Betroffenheit?',
    a: 'Zara ist betroffen; das Video erzeugt Angst und Beklemmung – Yasira denkt sofort an sie.'
  },
  {
    q: 'Wie spricht Yasira mit Zara über das Video, und welche Unterschiede zwischen den beiden Generationen werden deutlich?',
    a: 'Das Gespräch macht den Generationenunterschied sichtbar: Zara (ehemals idealistisch) wirkt resignierter, Yasira pragmatischer.'
  },
  {
    q: 'Warum ärgert sich Yasira über Zaras Resignation – und was sagt das über ihre eigenen Erwartungen?',
    a: 'Sie wünscht sich Hoffnung und Engagement von einer 16‑Jährigen; ihre Erwartungen an Zukunftsglauben sind hoch.'
  },
  {
    q: 'Wie wird Yasiras Weg zur Arbeit in der Ringbahn begründet?',
    a: 'Sie fährt Ringbahn vom Hohenzollerndamm zur BKA‑Zentrale in Treptow, weil Zara sie wegen Klimaschutz zum BVG‑Abo gebracht hat.'
  },
  {
    q: 'Was erfährt man über Yasiras Arbeitsplatz im BKA und seine Geschichte?',
    a: 'Treptowers nahe Treptower Park; Gebäudegeschichte: Telegraphen‑Bataillon, Polizei, Wehrmacht, Rote Armee, Volkspolizei/DDR‑Grenztruppen, Bundeswehr, Asylunterkunft, heute BKA.'
  },
  {
    q: 'Wie verläuft das Gespräch mit Jenny über das Töpfchen und Beethoven – und was sagt es über den Ton des Romans aus?',
    a: 'Sie reden über singende Töpfchen (Lambada) und Beethoven; banaler Smalltalk kontrastiert den Horrorfall – der Ton ist ironisch‑alltagsnah.'
  },
  {
    q: 'Wie beschreibt der Text Yasiras Kollegen Michael, und was bedeutet seine «DDR-Nostalgie» im Kontext der Handlung?',
    a: 'Michael Becker ist Mitte 50, DDR‑geprägt, loyal, manchmal latent rassistisch; keine Verklärung der DDR, sondern biografische Prägung.'
  },
  {
    q: 'Warum hält Yasira das Verhalten des Uploaders des Videos für irrational – oder doch nicht?',
    a: 'Sie bezweifelt, dass die Täter selbst hochgeladen haben; eher Kette von Weiterleitungen oder der vierte Mann.'
  },
  {
    q: 'Wie reagiert der Chef auf das Video, und warum wird Yasira als Ermittlerin eingesetzt?',
    a: 'Gebhardt macht den Fall zur Chefsache; Yasira wird eingesetzt, um schnell aufzuklären und politisch zu deeskalieren.'
  },
  {
    q: 'Wie kommentiert Yasira die Entscheidung, dass eine «Nicht-Deutsche» den Fall übernehmen soll?',
    a: 'Sie registriert die Anführungszeichen und die Instrumentalisierung ihrer Herkunft.'
  },
  {
    q: 'Welche Ambivalenz spürt Yasira gegenüber der ihr übertragenen Verantwortung?',
    a: 'Sie will aufklären, fühlt aber den politischen Druck und die Rolle als Symbolfigur.'
  },
  {
    q: 'Welche Personen gehören zum Ermittlungsteam, und welche Eigenschaften zeichnen sie aus?',
    a: 'Jenny Winkler (vertraute Kollegin), Timo Schenk (ehrgeizig, IDKO‑Erfahrung), Katja Jürgens (sachlich), Michael Becker (loyal, DDR‑geprägt) u. a.'
  },
  {
    q: 'Wie kommentiert das Team die Spitznamen der Täter, und was zeigt das über die Dynamik im Team?',
    a: 'Spitznamen wie Mützenmann, Lockenmann, Snoopy werden scherzhaft kommentiert (Kappenmann) – zeigt trockenen Teamhumor trotz Druck.'
  },
  {
    q: 'Warum ist der Tatort für Yasira von so zentraler Bedeutung?',
    a: 'Die Tatortdetails liefern Ort/Zeithinweise und sind Schlüssel zur Täter‑ und Opferidentifizierung.'
  },
  {
    q: 'Wie versucht das Team, durch technische Hinweise den Uploader zu identifizieren?',
    a: 'Der Uploader wird als eigene Spur behandelt; digitale Forensik, technische Dienste (Cyber‑Chris) und Upload‑Kettenanalyse.'
  },
  {
    q: 'Was sagt Yasira über die Wichtigkeit schneller Aufklärung in diesem Fall?',
    a: 'Sie sieht massiven Zeitdruck: Das Land kocht, ein Lynchmob droht – schnelle Aufklärung ist zwingend.'
  },
  {
    q: 'Warum erscheinen rechte Gruppen wie der «Aktive Heimatschutz» im Verlauf der Handlung als zunehmend bedrohlich?',
    a: 'Sie wachsen rasant, bewaffnen sich, verbreiten Videos und rufen zu Selbstjustiz auf.'
  },
  {
    q: 'Welche Symbolik steckt in Bärs Video – etwa in den Buchstabenkombinationen oder der Videolänge?',
    a: '88 Sekunden = HH/Heil Hitler; bewusste rechte Codes und Symbolik.'
  },
  {
    q: 'Was ist Yasiras erste Reaktion auf das Video von Bär, und wie schätzt sie seine Gefährlichkeit ein?',
    a: 'Entsetzen; sie erkennt eine gefährliche Lynchjustiz‑Inszenierung und die Eskalationsgefahr.'
  },
  {
    q: 'Wie entwickelt sich Yasiras Blick auf den Fall bis zu dem Punkt, an dem sie das Team koordiniert – was treibt sie an?',
    a: 'Vom Schock zur strategischen Führung: Sie übernimmt Verantwortung, getrieben von Gerechtigkeit, Schutz des Opfers und der Verhinderung gesellschaftlicher Eskalation.'
  }
];

const viewsQuestionsEl = document.getElementById('viewsQuestions');
if (viewsQuestionsEl) {
  viewsQuestionsEl.innerHTML = viewsQuestions.map((item, idx) => {
    return `
      <div class="qa-item" data-q="${idx}">
        <div class="qa-question"><strong>${idx + 1}. ${item.q}</strong></div>
        <textarea class="qa-textarea" rows="3" placeholder="Deine Antwort …" aria-label="Antwort zu Frage ${idx + 1}"></textarea>
        <div class="qa-actions">
          <button class="btn btn--ghost qa-show" type="button">Antwort anzeigen</button>
        </div>
        <div class="qa-feedback" id="qa-feedback-${idx}">Musterantwort: ${item.a}</div>
      </div>
    `;
  }).join('');

  const inputs = viewsQuestionsEl.querySelectorAll('.qa-textarea');
  inputs.forEach((input, idx) => {
    input.addEventListener('input', () => {
      const feedback = document.getElementById(`qa-feedback-${idx}`);
      if (feedback) feedback.classList.add('is-visible');
    });
  });

  const buttons = viewsQuestionsEl.querySelectorAll('.qa-show');
  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      const feedback = document.getElementById(`qa-feedback-${idx}`);
      if (feedback) feedback.classList.toggle('is-visible');
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
