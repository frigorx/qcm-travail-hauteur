/* =========================================================
   inerWeb Édu — QCM Travail en hauteur (PRIMO-ARRIVANTS)
   Logique simple : 1 réponse par question + feedback immédiat
   Lecture audio (Web Speech API) + bilan sauvegardé en local
   ========================================================= */

let currentQuestion = 0;
let userAnswers = [];
let voixFr = null;
let questionVerrouillee = false;

const MODULE_NOM = "QCM Travail en hauteur";

// ----- Préparer la voix française -----
function chargerVoix() {
    const voix = window.speechSynthesis.getVoices();
    voixFr = voix.find(v => v.lang.startsWith("fr")) || voix[0] || null;
}

if ('speechSynthesis' in window) {
    chargerVoix();
    window.speechSynthesis.onvoiceschanged = chargerVoix;
}

// ----- Lecture vocale -----
function lire(texte) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = "fr-FR";
    u.rate = 0.85;   // un peu plus lent
    u.pitch = 1.0;
    if (voixFr) u.voice = voixFr;
    window.speechSynthesis.speak(u);
}

function lireQuestion() {
    const q = questions[currentQuestion];
    let txt = q.question + ". ";
    q.options.forEach((o, i) => {
        txt += `Réponse ${i + 1} : ${o.txt}. `;
    });
    lire(txt);
}

// ----- Démarrage -----
function startQCM() {
    document.getElementById('identification').style.display = 'none';
    document.getElementById('qcm-container').style.display = 'block';
    showQuestion();
}

// ----- Afficher une question -----
function showQuestion() {
    questionVerrouillee = false;
    const container = document.getElementById('qcm-container');
    const q = questions[currentQuestion];
    const total = questions.length;
    const progress = Math.round((currentQuestion / total) * 100);
    const visual = QUESTION_VISUALS[q.id];

    let html = `
        <div class="iw-progress-label">Question ${currentQuestion + 1} sur ${total}</div>
        <div class="iw-progress"><div class="iw-progress-bar" style="width:${progress}%"></div></div>
        <figure class="iw-question-illustration">
            <img src="${visual.src}" alt="${escapeHtml(visual.alt)}">
        </figure>
        <div class="iw-question-text">${escapeHtml(q.question)}</div>
        <div class="iw-audio-row">
            <button class="iw-btn iw-btn-audio" onclick="lireQuestion()" title="Écouter la question">
                ${iwIcon('speaker', 'iw-btn-icon')}<span>Écouter</span>
            </button>
        </div>
        <ul class="iw-options" id="iw-options">
    `;

    q.options.forEach((opt, i) => {
        html += `
            <li>
                <button onclick="repondre(${i})" data-index="${i}">
                    ${iwIcon(OPTION_MARKERS[i], 'opt-icon')}
                    <span class="opt-txt">${escapeHtml(opt.txt)}</span>
                </button>
            </li>
        `;
    });

    html += `</ul><div class="iw-feedback" id="iw-feedback"></div>`;

    container.innerHTML = html;

    // Lecture auto à l'arrivée sur la question
    setTimeout(() => lireQuestion(), 300);
}

// ----- Réponse -----
function repondre(i) {
    if (questionVerrouillee) return;
    questionVerrouillee = true;

    const q = questions[currentQuestion];
    userAnswers[currentQuestion] = i;

    const isJuste = (i === q.correct);
    const boutons = document.querySelectorAll('#iw-options button');
    boutons.forEach(b => {
        const idx = parseInt(b.dataset.index);
        if (idx === q.correct) b.classList.add('juste');
        if (idx === i && !isJuste) b.classList.add('faux');
    });

    const feedback = document.getElementById('iw-feedback');
    if (isJuste) {
        feedback.innerHTML = `${iwIcon('check', 'iw-feedback-icon')}<span>Bravo !</span>`;
        feedback.className = "iw-feedback juste";
        lire("Bravo !");
    } else {
        const bonneTxt = q.options[q.correct].txt;
        feedback.innerHTML = `${iwIcon('cross', 'iw-feedback-icon')}<span>La bonne réponse est : ${escapeHtml(bonneTxt)}</span>`;
        feedback.className = "iw-feedback faux";
        lire("La bonne réponse est : " + bonneTxt);
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 2200);
}

// ----- Résultats -----
function showResult() {
    const container = document.getElementById('qcm-container');
    const total = questions.length;
    let score = 0;

    questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correct) score++;
    });

    const note = parseFloat((score / total * 20).toFixed(1));
    const pct = Math.round((score / total) * 100);

    // Étoiles : 1 à 5
    let nbEtoiles;
    if (pct >= 90) nbEtoiles = 5;
    else if (pct >= 75) nbEtoiles = 4;
    else if (pct >= 50) nbEtoiles = 3;
    else if (pct >= 25) nbEtoiles = 2;
    else nbEtoiles = 1;

    const etoiles = Array.from({ length: 5 }, (_, index) =>
        iwIcon(index < nbEtoiles ? 'star-filled' : 'star-empty', 'iw-star-icon')
    ).join('');

    let resultIcon, message;
    if (pct >= 75) {
        resultIcon = "face-success";
        message = "Très bien !";
    } else if (pct >= 50) {
        resultIcon = "face-progress";
        message = "C'est bien. Tu peux encore mieux faire.";
    } else {
        resultIcon = "face-retry";
        message = "Recommence pour t'améliorer.";
    }

    let html = `
        <h2 class="iw-result-heading">${iwIcon('flag', 'iw-heading-icon')}<span>Tes résultats</span></h2>
        <div class="iw-result-illustration">${iwIcon(resultIcon, 'iw-result-icon')}</div>
        <div class="iw-result-text">Tu as ${score} bonnes réponses sur ${total}.</div>
        <div class="iw-stars">${etoiles}</div>
        <div class="iw-result-text">Note : ${note} / 20</div>
        <div class="iw-result-text" style="font-size:18pt; color:#555;">${message}</div>

        <div class="iw-result-detail">
            <strong class="iw-detail-heading">${iwIcon('clipboard', 'iw-detail-heading-icon')}<span>Tes réponses :</span></strong>
            <ul>
    `;

    questions.forEach((q, idx) => {
        const isJuste = userAnswers[idx] === q.correct;
        const icone = iwIcon(isJuste ? 'check' : 'cross', 'iw-detail-icon');
        const statut = isJuste ? 'Correct' : 'À revoir';
        html += `<li>${icone}<span class="iw-sr-only">${statut} : </span><strong>Question ${idx + 1}</strong> — ${escapeHtml(q.question)}`;
        if (!isJuste) {
            html += `<br><span style="color:#2e7d32;">→ Bonne réponse : ${escapeHtml(q.options[q.correct].txt)}</span>`;
        }
        html += `</li>`;
    });

    html += `
            </ul>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:18px;">
            <button class="iw-btn iw-btn-bleu" onclick="window.print()">${iwIcon('print', 'iw-btn-icon')}<span>Imprimer</span></button>
            <button class="iw-btn iw-btn-secondary" onclick="location.reload()">${iwIcon('restart', 'iw-btn-icon')}<span>Recommencer</span></button>
        </div>
    `;

    container.innerHTML = html;

    lire(`Tu as ${score} bonnes réponses sur ${total}. ${message}`);

    sauvegarderResultatLocal(note, pct, score, total);
}

// ----- Sauvegarde locale du bilan (aucun envoi, aucun nom) -----
function sauvegarderResultatLocal(note, pct, score, total) {
    try {
        const cle = 'qcm-travail-hauteur-resultats';
        const resultats = JSON.parse(localStorage.getItem(cle) || '[]');
        resultats.push({
            module: MODULE_NOM,
            note20: note,
            score: pct,
            detail: `${score}/${total}`,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(cle, JSON.stringify(resultats));
    } catch (e) {
        console.warn('[QCM] Sauvegarde locale impossible', e);
    }
}

// ----- Util -----
function escapeHtml(s) {
    if (s === undefined || s === null) return '';
    return String(s)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}
