/* =========================================================
   inerWeb Édu — QCM Travail en hauteur (PRIMO-ARRIVANTS)
   Logique simple : 1 réponse par question + feedback immédiat
   Lecture audio (Web Speech API) + envoi collecteur universel
   ========================================================= */

let currentQuestion = 0;
let userAnswers = [];
let identite = {};
let voixFr = null;
let questionVerrouillee = false;

const MODULE_NOM = "QCM Travail en hauteur";

// Classes pour lesquelles la compétence "Sécurité - Travail en hauteur" est greffée
// (les autres classes sont enregistrées avec la note seule, sans compétence)
const CLASSES_AVEC_COMPETENCE = [
    "CAP IFCA", "BAC PRO MFER", "2nde TNE",
    "CAP MPI", "CAP ETAM", "BP ETAM",
    "TP CVC", "BTS FED", "Technicien BTP"
];

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
    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const classe = document.getElementById('classe').value.trim();

    if (!prenom || !nom || !classe) {
        alert("👉 Écris ton prénom, ton nom et ta classe.");
        return;
    }

    identite = {
        prenom, nom, classe,
        date: new Date().toLocaleDateString("fr-FR")
    };

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

    let html = `
        <div class="iw-progress-label">Question ${currentQuestion + 1} sur ${total}</div>
        <div class="iw-progress"><div class="iw-progress-bar" style="width:${progress}%"></div></div>
        <div class="iw-question-emoji">${q.emoji}</div>
        <div class="iw-question-text">${escapeHtml(q.question)}</div>
        <div class="iw-audio-row">
            <button class="iw-btn iw-btn-audio" onclick="lireQuestion()" title="Écouter la question">
                🔊 Écouter
            </button>
        </div>
        <ul class="iw-options" id="iw-options">
    `;

    q.options.forEach((opt, i) => {
        html += `
            <li>
                <button onclick="repondre(${i})" data-index="${i}">
                    <span class="opt-emoji">${opt.emoji}</span>
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
        feedback.textContent = "✅ Bravo !";
        feedback.className = "iw-feedback juste";
        lire("Bravo !");
    } else {
        const bonneTxt = q.options[q.correct].txt;
        feedback.textContent = "❌ La bonne réponse est : " + bonneTxt;
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

    const etoiles = "⭐".repeat(nbEtoiles) + "☆".repeat(5 - nbEtoiles);

    let visage, message;
    if (pct >= 75) {
        visage = "😃";
        message = "Très bien !";
    } else if (pct >= 50) {
        visage = "🙂";
        message = "C'est bien. Tu peux encore mieux faire.";
    } else {
        visage = "🤔";
        message = "Recommence pour t'améliorer.";
    }

    let html = `
        <h2>🏁 Tes résultats</h2>
        <div class="iw-result-emoji">${visage}</div>
        <div class="iw-result-text">${escapeHtml(identite.prenom)}, tu as ${score} bonnes réponses sur ${total}.</div>
        <div class="iw-stars">${etoiles}</div>
        <div class="iw-result-text">Note : ${note} / 20</div>
        <div class="iw-result-text" style="font-size:18pt; color:#555;">${message}</div>

        <div class="iw-result-detail">
            <strong>📋 Tes réponses :</strong>
            <ul>
    `;

    questions.forEach((q, idx) => {
        const isJuste = userAnswers[idx] === q.correct;
        const icone = isJuste ? "✅" : "❌";
        html += `<li>${icone} <strong>Question ${idx + 1}</strong> — ${escapeHtml(q.question)}`;
        if (!isJuste) {
            html += `<br><span style="color:#2e7d32;">→ Bonne réponse : ${escapeHtml(q.options[q.correct].txt)}</span>`;
        }
        html += `</li>`;
    });

    html += `
            </ul>
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:18px;">
            <button class="iw-btn iw-btn-bleu" onclick="window.print()">🖨️ Imprimer</button>
            <button class="iw-btn iw-btn-secondary" onclick="location.reload()">↺ Recommencer</button>
        </div>
    `;

    container.innerHTML = html;

    lire(`${identite.prenom}, tu as ${score} bonnes réponses sur ${total}. ${message}`);

    // Envoi collecteur universel inerWeb : note d'abord, compétence si la classe en a une
    if (typeof inerwebSend === "function") {
        const payload = {
            module: MODULE_NOM,
            nom: identite.nom,
            prenom: identite.prenom,
            classe: identite.classe,
            note20: note,
            score: pct,
            detail: `${score}/${total}`
        };

        // Greffer la compétence uniquement si la classe figure dans la liste reconnue
        const classeNorm = (identite.classe || "").toUpperCase();
        const aCompetence = CLASSES_AVEC_COMPETENCE.some(c =>
            classeNorm.includes(c.toUpperCase())
        );
        if (aCompetence) {
            payload.competences = {
                "Sécurité - Travail en hauteur": note >= 16 ? "Maîtrisé"
                                              : note >= 12 ? "Acquis"
                                              : note >= 8  ? "En cours"
                                              : "Non acquis"
            };
        }

        inerwebSend(payload);
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
