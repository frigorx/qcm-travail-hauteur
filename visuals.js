/* Visuels originaux inerWeb — générés depuis tools/build-visuals.mjs. */
const QUESTION_VISUALS = Object.freeze({
  1: { src: "assets/illustrations/q01-danger-chute.svg", alt: "Un travailleur est près d’un bord protégé tandis qu’une flèche rappelle le risque de chute." },
  2: { src: "assets/illustrations/q02-analyser-danger.svg", alt: "Un travailleur observe le sol, l’échelle et la zone en hauteur avant de commencer." },
  3: { src: "assets/illustrations/q03-reaction-chute.svg", alt: "Un chronomètre et la silhouette d’un travailleur en déséquilibre illustrent la rapidité d’une chute." },
  4: { src: "assets/illustrations/q04-choc-six-metres.svg", alt: "Une plateforme haute et une voiture séparées par une flèche rappellent qu’une chute peut produire un choc violent." },
  5: { src: "assets/illustrations/q05-protection-collective.svg", alt: "Un garde-corps protège la plateforme et un travailleur porte aussi un harnais." },
  6: { src: "assets/illustrations/q06-hauteur-garde-corps.svg", alt: "Un garde-corps complet est accompagné d’une ligne de mesure verticale sans valeur chiffrée." },
  7: { src: "assets/illustrations/q07-plinthe.svg", alt: "Une clé et un petit objet restent bloqués par la plinthe au pied du garde-corps." },
  8: { src: "assets/illustrations/q08-echelle-acces.svg", alt: "Une échelle mène à une plateforme avec une flèche de montée et une flèche de descente." },
  9: { src: "assets/illustrations/q09-stabilite-echelle.svg", alt: "L’échelle est calée au sol et attachée en partie haute pour empêcher glissement et basculement." },
  10: { src: "assets/illustrations/q10-plateforme-pir.svg", alt: "Une plateforme individuelle roulante possède des marches, un plancher et un garde-corps." },
  11: { src: "assets/illustrations/q11-montage-echafaudage.svg", alt: "Un travailleur casqué assemble un échafaudage en consultant une notice de montage." },
  12: { src: "assets/illustrations/q12-verification-echafaudage.svg", alt: "Une loupe et une liste de contrôle accompagnent un échafaudage." },
  13: { src: "assets/illustrations/q13-ancrage-nacelle.svg", alt: "Dans la nacelle, la longe relie le harnais du travailleur à l’anneau d’ancrage prévu." },
  14: { src: "assets/illustrations/q14-collegue-au-sol.svg", alt: "Un opérateur travaille dans la nacelle tandis qu’un collègue reste aux commandes au sol." },
  15: { src: "assets/illustrations/q15-casque-securite.svg", alt: "Un travailleur de chantier porte un casque orange avec jugulaire." },
  16: { src: "assets/illustrations/q16-harnais-antichute.svg", alt: "Vue simplifiée d’un harnais avec sangles croisées, ceinture et points de connexion." },
  17: { src: "assets/illustrations/q17-point-ancrage.svg", alt: "La longe du harnais monte vers un point d’ancrage fixe placé au-dessus du travailleur." },
  18: { src: "assets/illustrations/q18-tirant-air.svg", alt: "La zone libre sous une personne reliée à un antichute est matérialisée jusqu’au sol." },
  19: { src: "assets/illustrations/q19-absorbeur-energie.svg", alt: "Une longe relie deux mousquetons et comporte au centre un absorbeur replié." },
  20: { src: "assets/illustrations/q20-mousqueton-verrouille.svg", alt: "Un mousqueton est agrandi pour montrer sa bague de verrouillage fermée." },
  21: { src: "assets/illustrations/q21-controle-harnais.svg", alt: "Deux mains écartent les sangles d’un harnais pendant une vérification visuelle." },
  22: { src: "assets/illustrations/q22-materiel-apres-chute.svg", alt: "Un harnais est placé dans une zone de quarantaine signalée par un cadre rouge tireté." },
  23: { src: "assets/illustrations/q23-controle-annuel.svg", alt: "Un calendrier, une loupe et un harnais représentent le contrôle périodique par une personne compétente." },
  24: { src: "assets/illustrations/q24-travail-en-binome.svg", alt: "Deux travailleurs équipés se voient et peuvent s’aider pendant le travail en hauteur." },
  25: { src: "assets/illustrations/q25-materiel-casse.svg", alt: "Une sangle endommagée est étiquetée hors service et signalée à un responsable." },
});

const OPTION_MARKERS = Object.freeze(["option-a", "option-b", "option-c"]);

function iwIcon(name, className = "iw-icon") {
    return `<img class="${className}" src="assets/icons/${name}.svg" alt="" aria-hidden="true">`;
}
