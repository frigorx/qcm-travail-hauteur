/* =========================================================
   inerWeb Édu — QCM Le travail en hauteur
   25 questions courtes avec pictogrammes
   Source : Le-travail-en-hauteur.pdf (libre de droits)
   ========================================================= */

const questions = [
    // ===== 1. SENSIBILISATION AU RISQUE =====
    {
        id: 1, emoji: "🪜",
        question: "Travailler en hauteur, c'est dangereux ?",
        options: [
            { txt: "Oui, je peux tomber.", emoji: "✅" },
            { txt: "Non, ce n'est pas grave.", emoji: "❌" },
            { txt: "Seulement la nuit.", emoji: "🌙" }
        ],
        correct: 0
    },
    {
        id: 2, emoji: "⚠️",
        question: "Avant de monter, je dois...",
        options: [
            { txt: "Regarder mon téléphone.", emoji: "📱" },
            { txt: "Regarder le danger.", emoji: "👀" },
            { txt: "Manger un gâteau.", emoji: "🍪" }
        ],
        correct: 1
    },
    {
        id: 3, emoji: "⏱️",
        question: "Si je tombe, je peux réagir en...",
        options: [
            { txt: "1 seconde.", emoji: "🐢" },
            { txt: "Une demi-seconde.", emoji: "⚡" },
            { txt: "5 secondes.", emoji: "🦥" }
        ],
        correct: 1
    },
    {
        id: 4, emoji: "🚗",
        question: "Tomber de 6 mètres, c'est comme un choc en voiture à...",
        options: [
            { txt: "20 km/h.", emoji: "🚙" },
            { txt: "40 km/h.", emoji: "🚗" },
            { txt: "100 km/h.", emoji: "🏎️" }
        ],
        correct: 1
    },

    // ===== 2. PRÉVENTION =====
    {
        id: 5, emoji: "🦺",
        question: "Qu'est-ce qui est le PLUS sûr ?",
        options: [
            { txt: "Une protection pour tous (garde-corps).", emoji: "🛡️" },
            { txt: "Un harnais sur moi.", emoji: "🪢" },
            { txt: "Rien du tout.", emoji: "🚫" }
        ],
        correct: 0
    },
    {
        id: 6, emoji: "🧱",
        question: "Le garde-corps protège du vide à partir de...",
        options: [
            { txt: "1 mètre.", emoji: "📏" },
            { txt: "3 mètres.", emoji: "📐" },
            { txt: "10 mètres.", emoji: "🏗️" }
        ],
        correct: 1
    },
    {
        id: 7, emoji: "🛑",
        question: "Un garde-corps a deux barres et une plinthe en bas. La plinthe sert à...",
        options: [
            { txt: "Ranger les outils.", emoji: "🧰" },
            { txt: "Empêcher des objets de tomber.", emoji: "📦" },
            { txt: "Faire joli.", emoji: "🎨" }
        ],
        correct: 1
    },

    // ===== 3. ÉCHELLES & PIR =====
    {
        id: 8, emoji: "🪜",
        question: "L'échelle, c'est pour...",
        options: [
            { txt: "Travailler longtemps dessus.", emoji: "🔧" },
            { txt: "Monter et descendre seulement.", emoji: "⬆️" },
            { txt: "Faire la sieste.", emoji: "💤" }
        ],
        correct: 1
    },
    {
        id: 9, emoji: "🪜",
        question: "L'échelle ne doit pas...",
        options: [
            { txt: "Glisser ou basculer.", emoji: "⚠️" },
            { txt: "Avoir des barreaux.", emoji: "🪜" },
            { txt: "Être en bois.", emoji: "🪵" }
        ],
        correct: 0
    },
    {
        id: 10, emoji: "🧰",
        question: "Pour travailler en hauteur, mieux vaut une...",
        options: [
            { txt: "Chaise.", emoji: "🪑" },
            { txt: "Plateforme avec garde-corps (PIR).", emoji: "🛗" },
            { txt: "Échelle simple.", emoji: "🪜" }
        ],
        correct: 1
    },

    // ===== 4. ÉCHAFAUDAGE =====
    {
        id: 11, emoji: "🏗️",
        question: "Qui a le droit de monter un échafaudage ?",
        options: [
            { txt: "N'importe qui.", emoji: "🤷" },
            { txt: "Une personne formée et compétente.", emoji: "👷" },
            { txt: "Le chef du chantier seulement.", emoji: "👔" }
        ],
        correct: 1
    },
    {
        id: 12, emoji: "🔍",
        question: "On doit vérifier l'échafaudage...",
        options: [
            { txt: "Jamais.", emoji: "🚫" },
            { txt: "Régulièrement (au moins tous les 3 mois).", emoji: "📅" },
            { txt: "Tous les 10 ans.", emoji: "⏳" }
        ],
        correct: 1
    },

    // ===== 5. NACELLE (PEMP) =====
    {
        id: 13, emoji: "🚜",
        question: "Dans une nacelle, le harnais s'attache...",
        options: [
            { txt: "Sur les barres du panier.", emoji: "❌" },
            { txt: "Sur l'anneau d'ancrage prévu.", emoji: "⚓" },
            { txt: "Sur mon collègue.", emoji: "👥" }
        ],
        correct: 1
    },
    {
        id: 14, emoji: "👥",
        question: "Dans une nacelle, je suis...",
        options: [
            { txt: "Tout seul.", emoji: "🧍" },
            { txt: "Avec un collègue formé au sol.", emoji: "👷" },
            { txt: "Avec mon chien.", emoji: "🐕" }
        ],
        correct: 1
    },

    // ===== 6. ÉQUIPEMENTS DE PROTECTION INDIVIDUELLE =====
    {
        id: 15, emoji: "🪖",
        question: "Sur le chantier, je porte...",
        options: [
            { txt: "Une casquette.", emoji: "🧢" },
            { txt: "Un casque de sécurité.", emoji: "🪖" },
            { txt: "Rien sur la tête.", emoji: "🧑" }
        ],
        correct: 1
    },
    {
        id: 16, emoji: "🪢",
        question: "Le harnais, c'est...",
        options: [
            { txt: "Un sac à dos.", emoji: "🎒" },
            { txt: "Un équipement qui me retient si je tombe.", emoji: "🦺" },
            { txt: "Une ceinture pour le pantalon.", emoji: "👖" }
        ],
        correct: 1
    },
    {
        id: 17, emoji: "🔗",
        question: "Mon harnais doit être attaché à...",
        options: [
            { txt: "Un point solide en hauteur.", emoji: "⚓" },
            { txt: "Mon collègue.", emoji: "👥" },
            { txt: "Une chaise.", emoji: "🪑" }
        ],
        correct: 0
    },
    {
        id: 18, emoji: "📏",
        question: "Le tirant d'air, c'est...",
        options: [
            { txt: "La place sous moi pour ne pas toucher le sol en cas de chute.", emoji: "📐" },
            { txt: "Le vent en hauteur.", emoji: "💨" },
            { txt: "La taille de mon casque.", emoji: "🪖" }
        ],
        correct: 0
    },
    {
        id: 19, emoji: "🪢",
        question: "La longe (corde du harnais) doit avoir...",
        options: [
            { txt: "Un absorbeur d'énergie.", emoji: "✅" },
            { txt: "Une couleur jaune.", emoji: "🟡" },
            { txt: "Un nœud à la main.", emoji: "🪢" }
        ],
        correct: 0
    },
    {
        id: 20, emoji: "🔒",
        question: "Le mousqueton (crochet) doit...",
        options: [
            { txt: "Être ouvert.", emoji: "🔓" },
            { txt: "Avoir un système de verrouillage.", emoji: "🔒" },
            { txt: "Être en plastique.", emoji: "🧸" }
        ],
        correct: 1
    },

    // ===== 7. CONTRÔLE & RÈGLES =====
    {
        id: 21, emoji: "🔍",
        question: "Avant chaque utilisation, je vérifie mon harnais ?",
        options: [
            { txt: "Oui, toujours.", emoji: "✅" },
            { txt: "Non, jamais.", emoji: "❌" },
            { txt: "Seulement le lundi.", emoji: "📅" }
        ],
        correct: 0
    },
    {
        id: 22, emoji: "🚨",
        question: "Si je tombe avec mon harnais, je dois...",
        options: [
            { txt: "Garder le harnais et continuer.", emoji: "👍" },
            { txt: "Jeter le harnais et en prendre un neuf.", emoji: "🆕" },
            { txt: "Le laver et le remettre.", emoji: "🧼" }
        ],
        correct: 1
    },
    {
        id: 23, emoji: "📅",
        question: "Le harnais est contrôlé par une personne compétente...",
        options: [
            { txt: "Tous les 5 ans.", emoji: "⏳" },
            { txt: "Au moins une fois par an.", emoji: "📅" },
            { txt: "Jamais.", emoji: "🚫" }
        ],
        correct: 1
    },
    {
        id: 24, emoji: "👷",
        question: "Quand je travaille en hauteur, je suis...",
        options: [
            { txt: "Seul.", emoji: "🧍" },
            { txt: "Avec un collègue qui peut m'aider.", emoji: "👥" },
            { txt: "Avec mon chien.", emoji: "🐕" }
        ],
        correct: 1
    },
    {
        id: 25, emoji: "🚧",
        question: "Si le matériel est cassé, je...",
        options: [
            { txt: "L'utilise quand même.", emoji: "❌" },
            { txt: "Le répare avec du scotch.", emoji: "🔧" },
            { txt: "Le mets de côté et je le dis au chef.", emoji: "🗣️" }
        ],
        correct: 2
    }
];
