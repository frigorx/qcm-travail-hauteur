/* =========================================================
   inerWeb Édu — QCM Travail en hauteur
   Version PRIMO-ARRIVANTS : phrases courtes, 1 réponse, pictos
   Source pédagogique : Le-travail-en-hauteur.pdf (libre de droits)
   ========================================================= */

const questions = [
    {
        id: 1,
        emoji: "🪜",
        question: "Travailler en hauteur, c'est dangereux ?",
        options: [
            { txt: "Oui, je peux tomber.", emoji: "✅" },
            { txt: "Non, ce n'est pas grave.", emoji: "❌" },
            { txt: "Seulement la nuit.", emoji: "🌙" }
        ],
        correct: 0
    },
    {
        id: 2,
        emoji: "⚠️",
        question: "Avant de monter, je dois...",
        options: [
            { txt: "Regarder mon téléphone.", emoji: "📱" },
            { txt: "Regarder le danger.", emoji: "👀" },
            { txt: "Manger un gâteau.", emoji: "🍪" }
        ],
        correct: 1
    },
    {
        id: 3,
        emoji: "🦺",
        question: "Qu'est-ce qui est le PLUS sûr ?",
        options: [
            { txt: "Une protection pour tous (garde-corps).", emoji: "🛡️" },
            { txt: "Un harnais sur moi.", emoji: "🪢" },
            { txt: "Rien du tout.", emoji: "🚫" }
        ],
        correct: 0
    },
    {
        id: 4,
        emoji: "🪜",
        question: "L'échelle, c'est pour...",
        options: [
            { txt: "Travailler longtemps dessus.", emoji: "🔧" },
            { txt: "Monter et descendre seulement.", emoji: "⬆️" },
            { txt: "Faire la sieste.", emoji: "💤" }
        ],
        correct: 1
    },
    {
        id: 5,
        emoji: "🪖",
        question: "Sur le chantier, je porte...",
        options: [
            { txt: "Une casquette.", emoji: "🧢" },
            { txt: "Un casque de sécurité.", emoji: "🪖" },
            { txt: "Rien sur la tête.", emoji: "🧑" }
        ],
        correct: 1
    },
    {
        id: 6,
        emoji: "🪢",
        question: "Le harnais, c'est...",
        options: [
            { txt: "Un sac à dos.", emoji: "🎒" },
            { txt: "Un équipement qui me retient si je tombe.", emoji: "🦺" },
            { txt: "Une ceinture pour le pantalon.", emoji: "👖" }
        ],
        correct: 1
    },
    {
        id: 7,
        emoji: "🔗",
        question: "Mon harnais doit être attaché à...",
        options: [
            { txt: "Un point solide en hauteur.", emoji: "⚓" },
            { txt: "Mon collègue.", emoji: "👥" },
            { txt: "Une chaise.", emoji: "🪑" }
        ],
        correct: 0
    },
    {
        id: 8,
        emoji: "🚨",
        question: "Si je tombe avec mon harnais, je dois...",
        options: [
            { txt: "Garder le harnais et continuer.", emoji: "👍" },
            { txt: "Jeter le harnais et en prendre un neuf.", emoji: "🆕" },
            { txt: "Le laver et le remettre.", emoji: "🧼" }
        ],
        correct: 1
    },
    {
        id: 9,
        emoji: "👷",
        question: "Quand je travaille en hauteur, je suis...",
        options: [
            { txt: "Seul.", emoji: "🧍" },
            { txt: "Avec un collègue qui peut m'aider.", emoji: "👥" },
            { txt: "Avec mon chien.", emoji: "🐕" }
        ],
        correct: 1
    },
    {
        id: 10,
        emoji: "🚧",
        question: "Si le matériel est cassé, je...",
        options: [
            { txt: "L'utilise quand même.", emoji: "❌" },
            { txt: "Le répare avec du scotch.", emoji: "🔧" },
            { txt: "Le mets de côté et je le dis au chef.", emoji: "🗣️" }
        ],
        correct: 2
    }
];
