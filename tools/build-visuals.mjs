import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = dirname(dirname(fileURLToPath(import.meta.url)));
const illustrationsDir = join(repo, 'assets', 'illustrations');
const iconsDir = join(repo, 'assets', 'icons');

const C = {
  navy: '#1B3A63',
  ink: '#10233C',
  orange: '#FF6B35',
  orangeDeep: '#C9451A',
  blue: '#3D7FCA',
  blueSoft: '#84B7EC',
  cream: '#F7F1E7',
  paper: '#FFFDF8',
  line: '#C7D2E0',
  green: '#1E7E54',
  greenSoft: '#E3F5EC',
  red: '#C0392B',
  redSoft: '#FBE7E4',
  amber: '#B06A00',
  amberSoft: '#FFF4E0',
};

const esc = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function iconDocument(title, description, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(description)}</desc>
  <g fill="none" stroke="${C.navy}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
${body}
  </g>
</svg>\n`;
}

function sceneDocument(title, description, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 220" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(description)}</desc>
  <rect x="2" y="2" width="476" height="216" rx="24" fill="${C.paper}" stroke="${C.line}" stroke-width="3"/>
  <path d="M34 188H446" stroke="${C.line}" stroke-width="4" stroke-linecap="round"/>
  <g fill="none" stroke="${C.navy}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
${body}
  </g>
</svg>\n`;
}

const fill = (color) => `fill="${color}"`;
const noStroke = 'stroke="none"';

function worker(x, y, { helmet = true, vest = true, scale = 1, pose = 'stand' } = {}) {
  const arms = pose === 'reach'
    ? '<path d="M-12 4L-34-12M12 4L32-18"/>'
    : pose === 'fall'
      ? '<path d="M-12 2L-34-14M12 2L34-4"/><path d="M-8 34L-28 54M8 34L30 48"/>'
      : '<path d="M-12 5L-24 30M12 5L25 29"/><path d="M-8 35L-14 64M8 35L16 64"/>';
  const legs = pose === 'fall' ? '' : '';
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <circle cx="0" cy="-22" r="12" ${fill(C.cream)}/>
    ${helmet ? `<path d="M-13-25Q0-39 13-25V-20H-13Z" ${fill(C.orange)} />` : ''}
    <path d="M-13-8Q0-14 13-8L11 35H-11Z" ${fill(vest ? C.blueSoft : C.cream)}/>
    ${vest ? `<path d="M-6-10L0 8L6-10M-10 16H10" stroke="${C.orangeDeep}" stroke-width="4"/>` : ''}
    ${arms}${legs}
  </g>`;
}

function ladder(x, y, height = 128, lean = -12) {
  const rungs = Array.from({ length: 6 }, (_, i) => {
    const yy = -height + 18 + i * ((height - 34) / 5);
    return `<path d="M-14 ${yy}H14"/>`;
  }).join('');
  return `<g transform="translate(${x} ${y}) skewX(${lean})">
    <path d="M-20 0L-20 ${-height}M20 0L20 ${-height}"/>
    ${rungs}
  </g>`;
}

function guardrail(x, y, width = 150, height = 92) {
  return `<g transform="translate(${x} ${y})">
    <path d="M0 0V-${height}M${width} 0V-${height}M0-${height}H${width}M0-${Math.round(height * .52)}H${width}"/>
    <rect x="0" y="-16" width="${width}" height="16" ${fill(C.orange)} />
  </g>`;
}

function scaffold(x, y, width = 150, height = 132) {
  return `<g transform="translate(${x} ${y})">
    <path d="M0 0V-${height}M${width} 0V-${height}M0-${height}H${width}M0-${height + 40}H${width}M0-${height + 82}H${width}"/>
    <path d="M0 0L${width}-${height}M${width} 0L0-${height}" stroke="${C.blue}"/>
    <rect x="-5" y="-${height + 10}" width="${width + 10}" height="12" rx="5" ${fill(C.orange)} />
    <circle cx="12" cy="7" r="9" ${fill(C.cream)}/><circle cx="${width - 12}" cy="7" r="9" ${fill(C.cream)}/>
  </g>`;
}

function harness(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M-30-42Q0-60 30-42L23 38H-23Z" ${fill(C.cream)}/>
    <path d="M-24-38L0-4L24-38M0-4V34M-20 4L20 4M-20 34L0 10L20 34" stroke="${C.orangeDeep}" stroke-width="7"/>
    <circle cx="0" cy="-4" r="6" ${fill(C.paper)}/>
  </g>`;
}

function helmet(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M-42 16Q-38-32 0-38Q38-32 42 16Z" ${fill(C.orange)}/>
    <path d="M-48 16H48M0-36V9"/>
  </g>`;
}

function magnifier(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <circle cx="-10" cy="-10" r="30" ${fill(C.blueSoft)}/>
    <path d="M12 12L38 38" stroke-width="10"/>
    <path d="M-22-10L-12 0L5-20" stroke="${C.green}"/>
  </g>`;
}

function calendar(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <rect x="-48" y="-42" width="96" height="84" rx="10" ${fill(C.paper)}/>
    <path d="M-48-18H48M-24-52V-32M24-52V-32"/>
    <path d="M-25 4H-8M8 4H25M-25 22H-8M8 22H25" stroke="${C.blue}"/>
  </g>`;
}

function carabiner(x, y, scale = 1, locked = true) {
  return `<g transform="translate(${x} ${y}) rotate(-20) scale(${scale})">
    <path d="M-34-42Q-55-5-33 36Q-7 66 28 40Q50 17 39-19Q29-50-2-50Q-20-50-34-42Z"/>
    <path d="M-5-32L29 22" stroke="${C.orangeDeep}" stroke-width="9"/>
    ${locked ? `<rect x="5" y="-8" width="26" height="28" rx="6" ${fill(C.orange)} />` : ''}
  </g>`;
}

function pemp(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <rect x="-64" y="24" width="128" height="34" rx="10" ${fill(C.blueSoft)}/>
    <circle cx="-40" cy="60" r="13" ${fill(C.cream)}/><circle cx="40" cy="60" r="13" ${fill(C.cream)}/>
    <path d="M-28 24L14-56L58-90" stroke="${C.orangeDeep}" stroke-width="12"/>
    <rect x="34" y="-116" width="74" height="42" rx="6" ${fill(C.paper)}/>
    <path d="M34-116V-70M108-116V-70M34-76H108"/>
  </g>`;
}

const icons = {
  snowflake: ['Flocon inerWeb', 'Flocon géométrique de la marque inerWeb.', `<path d="M32 8V56M11 20L53 44M53 20L11 44M32 8L25 15M32 8L39 15M32 56L25 49M32 56L39 49M11 20L21 20M11 20L16 29M53 44L43 44M53 44L48 35M53 20L43 20M53 20L48 29M11 44L21 44M11 44L16 35" stroke="${C.paper}"/>`],
  ladder: ['Échelle', 'Échelle simple dessinée en traits bleu marine et orange.', `<path d="M20 56L28 8M44 56L52 8M25 20H49M23 32H47M21 44H45"/><path d="M17 56H47" stroke="${C.orangeDeep}"/>`],
  speaker: ['Écouter', 'Haut-parleur avec deux ondes sonores.', `<path d="M10 25H22L36 14V50L22 39H10Z" ${fill(C.blueSoft)}/><path d="M44 23Q54 32 44 41M50 16Q64 32 50 48" stroke="${C.orangeDeep}"/>`],
  play: ['Commencer', 'Triangle de lecture dans un cercle.', `<circle cx="32" cy="32" r="25" ${fill(C.paper)}/><path d="M27 21L45 32L27 43Z" ${fill(C.orange)} stroke="${C.orangeDeep}"/>`],
  check: ['Correct', 'Coche dans un double cercle vert.', `<circle cx="32" cy="32" r="25" stroke="${C.green}" stroke-width="6"/><circle cx="32" cy="32" r="19" stroke="${C.green}" stroke-width="2"/><path d="M19 32L28 41L46 22" stroke="${C.green}" stroke-width="7"/>`],
  cross: ['À revoir', 'Croix dans un cercle rouge tireté.', `<circle cx="32" cy="32" r="25" stroke="${C.red}" stroke-width="5" stroke-dasharray="7 5"/><path d="M22 22L42 42M42 22L22 42" stroke="${C.red}" stroke-width="7"/>`],
  flag: ['Résultats', 'Drapeau d’arrivée quadrillé.', `<path d="M15 56V10M16 13Q29 6 48 14V38Q31 30 16 38" ${fill(C.paper)}/><path d="M17 14L33 34M32 10L48 30M17 28L29 39" stroke="${C.orangeDeep}"/>`],
  clipboard: ['Liste des réponses', 'Planchette avec une liste cochée.', `<rect x="13" y="12" width="38" height="46" rx="5" ${fill(C.paper)}/><rect x="23" y="6" width="18" height="12" rx="4" ${fill(C.orange)}/><path d="M21 29L25 33L31 25M35 29H44M21 43L25 47L31 39M35 43H44" stroke="${C.green}"/>`],
  print: ['Imprimer', 'Imprimante avec une feuille.', `<path d="M18 24V8H46V24M18 45H11V25H53V45H46M18 37H46V56H18Z" ${fill(C.paper)}/><path d="M24 44H40M24 50H37" stroke="${C.blue}"/>`],
  restart: ['Recommencer', 'Flèche circulaire de reprise.', `<path d="M49 20A22 22 0 1 0 51 41"/><path d="M48 8V22H34" stroke="${C.orangeDeep}"/>`],
  'face-success': ['Très bien', 'Visage souriant dans un double cercle vert.', `<circle cx="32" cy="32" r="25" ${fill(C.greenSoft)} stroke="${C.green}" stroke-width="5"/><circle cx="24" cy="27" r="2" ${fill(C.navy)} ${noStroke}/><circle cx="40" cy="27" r="2" ${fill(C.navy)} ${noStroke}/><path d="M21 37Q32 48 43 37" stroke="${C.green}"/>`],
  'face-progress': ['Continue', 'Visage calme dans un cercle bleu.', `<circle cx="32" cy="32" r="25" ${fill('#EAF2FB')} stroke="${C.blue}" stroke-width="5"/><circle cx="24" cy="27" r="2" ${fill(C.navy)} ${noStroke}/><circle cx="40" cy="27" r="2" ${fill(C.navy)} ${noStroke}/><path d="M22 38Q32 44 42 38"/>`],
  'face-retry': ['À reprendre', 'Visage attentif dans un cercle ambre pointillé.', `<circle cx="32" cy="32" r="25" ${fill(C.amberSoft)} stroke="${C.amber}" stroke-width="5" stroke-dasharray="3 4"/><circle cx="24" cy="27" r="2" ${fill(C.navy)} ${noStroke}/><circle cx="40" cy="27" r="2" ${fill(C.navy)} ${noStroke}/><path d="M23 42Q32 35 41 42"/>`],
  'star-filled': ['Étoile acquise', 'Étoile pleine orange bordée de bleu marine.', `<path d="M32 8L39 24L56 26L43 37L47 54L32 45L17 54L21 37L8 26L25 24Z" ${fill(C.orange)} />`],
  'star-empty': ['Étoile non acquise', 'Étoile vide bordée de bleu marine.', `<path d="M32 8L39 24L56 26L43 37L47 54L32 45L17 54L21 37L8 26L25 24Z" ${fill(C.paper)} />`],
  'option-a': ['Réponse A', 'Repère circulaire bleu marine portant la lettre A.', `<circle cx="32" cy="32" r="25" ${fill(C.paper)}/><path d="M22 46L32 17L42 46M26 35H38"/><text x="32" y="42" text-anchor="middle" font-family="Calibri,Segoe UI,Arial,sans-serif" font-size="30" font-weight="700" fill="${C.navy}" stroke="none">A</text>`],
  'option-b': ['Réponse B', 'Repère circulaire bleu marine portant la lettre B.', `<circle cx="32" cy="32" r="25" ${fill(C.paper)}/><text x="32" y="42" text-anchor="middle" font-family="Calibri,Segoe UI,Arial,sans-serif" font-size="30" font-weight="700" fill="${C.navy}" stroke="none">B</text>`],
  'option-c': ['Réponse C', 'Repère circulaire bleu marine portant la lettre C.', `<circle cx="32" cy="32" r="25" ${fill(C.paper)}/><text x="32" y="42" text-anchor="middle" font-family="Calibri,Segoe UI,Arial,sans-serif" font-size="30" font-weight="700" fill="${C.navy}" stroke="none">C</text>`],
};

const scenes = [
  ['q01-danger-chute.svg', 'Risque de chute', 'Un travailleur est près d’un bord protégé tandis qu’une flèche rappelle le risque de chute.', `${guardrail(270, 188, 150, 92)}${worker(335, 92, { pose: 'fall', scale: .9 })}<path d="M205 65V145M205 145L191 126M205 145L219 126" stroke="${C.orangeDeep}" stroke-width="9"/>${ladder(115, 188, 120, -7)}`],
  ['q02-analyser-danger.svg', 'Analyser avant de monter', 'Un travailleur observe le sol, l’échelle et la zone en hauteur avant de commencer.', `${worker(105, 122, { pose: 'reach' })}${ladder(280, 188, 132, -8)}${magnifier(383, 81, .8)}<path d="M155 90Q205 48 255 75" stroke="${C.orangeDeep}" stroke-dasharray="8 8"/>`],
  ['q03-reaction-chute.svg', 'Temps de réaction très court', 'Un chronomètre et la silhouette d’un travailleur en déséquilibre illustrent la rapidité d’une chute.', `<circle cx="160" cy="103" r="63" ${fill(C.paper)}/><path d="M160 40V25M141 25H179M160 103L193 75M160 103V67"/><path d="M112 151Q160 180 208 151" stroke="${C.orangeDeep}"/>${worker(330, 105, { pose: 'fall', scale: 1 })}<path d="M385 68V153M385 153L372 135M385 153L398 135" stroke="${C.orangeDeep}" stroke-width="9"/>`],
  ['q04-choc-six-metres.svg', 'Chute et choc', 'Une plateforme haute et une voiture séparées par une flèche rappellent qu’une chute peut produire un choc violent.', `${guardrail(55, 86, 130, 62)}<path d="M55 188V86H185"/>${worker(120, 36, { scale: .65 })}<path d="M225 65V152M225 152L211 134M225 152L239 134" stroke="${C.orangeDeep}" stroke-width="9"/><g transform="translate(330 145)"><path d="M-70 18L-50-20H42L70 18V39H-70Z" ${fill(C.blueSoft)}/><circle cx="-45" cy="41" r="14" ${fill(C.cream)}/><circle cx="45" cy="41" r="14" ${fill(C.cream)}/><path d="M-40-19L-20-43H22L42-19"/></g>`],
  ['q05-protection-collective.svg', 'Protection collective et harnais', 'Un garde-corps protège la plateforme et un travailleur porte aussi un harnais.', `${guardrail(210, 188, 210, 105)}${worker(300, 105, { scale: 1.05 })}<path d="M290 93L300 111L310 93M300 111V139" stroke="${C.orangeDeep}" stroke-width="6"/><path d="M55 154H170V188H55Z" ${fill(C.blueSoft)}/><path d="M78 154V102M146 154V102M78 102H146"/>`],
  ['q06-hauteur-garde-corps.svg', 'Hauteur du garde-corps', 'Un garde-corps complet est accompagné d’une ligne de mesure verticale sans valeur chiffrée.', `${guardrail(190, 188, 200, 116)}<path d="M126 188V72M112 188H140M112 72H140" stroke="${C.orangeDeep}"/><path d="M126 90L118 102M126 90L134 102M126 170L118 158M126 170L134 158" stroke="${C.orangeDeep}"/>`],
  ['q07-plinthe.svg', 'Plinthe du garde-corps', 'Une clé et un petit objet restent bloqués par la plinthe au pied du garde-corps.', `${guardrail(150, 188, 250, 105)}<path d="M215 145Q232 156 244 176" stroke="${C.orangeDeep}" stroke-dasharray="7 7"/><g transform="translate(215 137) rotate(25)"><circle cx="-16" cy="0" r="10" ${fill(C.cream)}/><path d="M-6 0H28M18 0V10M27 0V8"/></g><path d="M150 172H400" stroke="${C.orangeDeep}" stroke-width="12"/>`],
  ['q08-echelle-acces.svg', 'Échelle comme moyen d’accès', 'Une échelle mène à une plateforme avec une flèche de montée et une flèche de descente.', `${ladder(236, 188, 140, -6)}<path d="M250 48H420V188"/><path d="M120 150V70M120 70L106 90M120 70L134 90" stroke="${C.green}" stroke-width="8"/><path d="M165 70V150M165 150L151 130M165 150L179 130" stroke="${C.blue}" stroke-width="8"/>`],
  ['q09-stabilite-echelle.svg', 'Échelle stabilisée', 'L’échelle est calée au sol et attachée en partie haute pour empêcher glissement et basculement.', `${ladder(250, 188, 140, -8)}<path d="M160 43H390V188"/><path d="M236 64L190 50" stroke="${C.orangeDeep}" stroke-width="7"/><circle cx="184" cy="49" r="9" ${fill(C.orange)} /><path d="M207 188H295" stroke="${C.green}" stroke-width="10"/><path d="M201 188L186 171M301 188L316 171" stroke="${C.green}"/>`],
  ['q10-plateforme-pir.svg', 'Plateforme individuelle roulante', 'Une plateforme individuelle roulante possède des marches, un plancher et un garde-corps.', `<g transform="translate(125 188)"><path d="M0 0L70-118H210V0M70-118V0M0 0H210M15-25H70M29-50H70M43-75H70M57-100H70"/><path d="M70-118H210M85-118V-170M195-118V-170M85-170H195M85-144H195"/><circle cx="45" cy="7" r="10" ${fill(C.cream)}/><circle cx="185" cy="7" r="10" ${fill(C.cream)}/><rect x="70" y="-130" width="140" height="12" ${fill(C.orange)} /></g>${worker(260, 70, { scale: .78 })}`],
  ['q11-montage-echafaudage.svg', 'Montage par une personne formée', 'Un travailleur casqué assemble un échafaudage en consultant une notice de montage.', `${scaffold(245, 188, 165, 132)}${worker(105, 123, { pose: 'reach' })}<g transform="translate(165 88) rotate(-8)"><rect x="-30" y="-38" width="60" height="76" rx="6" ${fill(C.paper)}/><path d="M-18-20H18M-18-5H18M-18 10H10" stroke="${C.blue}"/><path d="M-18 25L-10 32L3 18" stroke="${C.green}"/></g>`],
  ['q12-verification-echafaudage.svg', 'Vérification de l’échafaudage', 'Une loupe et une liste de contrôle accompagnent un échafaudage.', `${scaffold(65, 188, 185, 132)}${magnifier(345, 88, .95)}<g transform="translate(365 158)"><rect x="-45" y="-36" width="90" height="66" rx="8" ${fill(C.paper)}/><path d="M-30-16L-23-9L-12-23M-4-16H28M-30 5L-23 12L-12-2M-4 5H28" stroke="${C.green}"/></g>`],
  ['q13-ancrage-nacelle.svg', 'Ancrage prévu dans la nacelle', 'Dans la nacelle, la longe relie le harnais du travailleur à l’anneau d’ancrage prévu.', `${pemp(205, 128, .9)}${worker(300, 36, { scale: .55 })}<path d="M300 50Q335 72 344 106" stroke="${C.orangeDeep}" stroke-width="7"/><circle cx="347" cy="109" r="8" ${fill(C.orange)} />`],
  ['q14-collegue-au-sol.svg', 'Collègue formé au sol', 'Un opérateur travaille dans la nacelle tandis qu’un collègue reste aux commandes au sol.', `${pemp(182, 126, .8)}${worker(265, 42, { scale: .5 })}${worker(392, 123, { pose: 'reach', scale: .9 })}<path d="M354 164H424V188H354Z" ${fill(C.blueSoft)}/><path d="M371 164V145H408V164"/>`],
  ['q15-casque-securite.svg', 'Casque de sécurité', 'Un travailleur de chantier porte un casque orange avec jugulaire.', `${worker(240, 106, { scale: 1.35 })}<path d="M220 80Q240 93 260 80" stroke="${C.orangeDeep}" stroke-width="5"/>${helmet(115, 118, .7)}<path d="M335 132H412" stroke="${C.blue}"/><path d="M350 115L366 132L397 98" stroke="${C.green}" stroke-width="8"/>`],
  ['q16-harnais-antichute.svg', 'Harnais antichute', 'Vue simplifiée d’un harnais avec sangles croisées, ceinture et points de connexion.', `${harness(240, 116, 1.55)}<circle cx="240" cy="34" r="18" ${fill(C.cream)}/><path d="M130 80H75M350 80H405M130 146H75M350 146H405" stroke="${C.line}"/><circle cx="65" cy="80" r="8" ${fill(C.orange)}/><circle cx="415" cy="80" r="8" ${fill(C.orange)}/><circle cx="65" cy="146" r="8" ${fill(C.orange)}/><circle cx="415" cy="146" r="8" ${fill(C.orange)}/>`],
  ['q17-point-ancrage.svg', 'Point d’ancrage solide', 'La longe du harnais monte vers un point d’ancrage fixe placé au-dessus du travailleur.', `<path d="M110 44H370" stroke-width="14"/><circle cx="240" cy="55" r="13" ${fill(C.orange)} /><path d="M240 68Q210 92 232 126" stroke="${C.orangeDeep}" stroke-width="7"/>${worker(240, 124, { scale: .95 })}<path d="M228 115L240 132L252 115M240 132V155" stroke="${C.orangeDeep}" stroke-width="6"/>`],
  ['q18-tirant-air.svg', 'Tirant d’air', 'La zone libre sous une personne reliée à un antichute est matérialisée jusqu’au sol.', `<path d="M70 65H300" stroke-width="12"/><circle cx="195" cy="75" r="10" ${fill(C.orange)} /><path d="M195 85Q155 112 184 142" stroke="${C.orangeDeep}" stroke-width="7"/>${worker(185, 133, { pose: 'fall', scale: .8 })}<path d="M365 80V188M350 80H380M350 188H380" stroke="${C.blue}"/><path d="M365 98L356 112M365 98L374 112M365 170L356 156M365 170L374 156" stroke="${C.blue}"/>`],
  ['q19-absorbeur-energie.svg', 'Longe avec absorbeur d’énergie', 'Une longe relie deux mousquetons et comporte au centre un absorbeur replié.', `<path d="M65 105Q105 45 150 100" stroke="${C.blue}" stroke-width="9"/>${carabiner(62, 110, .55, true)}<path d="M155 100L185 100"/><path d="M185 78L205 122L225 78L245 122L265 78L285 100" stroke="${C.orangeDeep}" stroke-width="8"/><rect x="173" y="68" width="124" height="64" rx="14" stroke="${C.orange}" stroke-dasharray="7 7"/> <path d="M285 100Q340 45 410 105" stroke="${C.blue}" stroke-width="9"/>${carabiner(414, 110, .55, true)}`],
  ['q20-mousqueton-verrouille.svg', 'Mousqueton verrouillé', 'Un mousqueton est agrandi pour montrer sa bague de verrouillage fermée.', `${carabiner(240, 112, 1.75, true)}<path d="M330 70H420M330 102H420" stroke="${C.line}"/><path d="M389 70V102" stroke="${C.orangeDeep}"/><circle cx="420" cy="86" r="10" ${fill(C.greenSoft)} stroke="${C.green}"/><path d="M415 86L419 90L426 81" stroke="${C.green}" stroke-width="4"/>`],
  ['q21-controle-harnais.svg', 'Contrôle avant utilisation', 'Deux mains écartent les sangles d’un harnais pendant une vérification visuelle.', `${harness(245, 116, 1.15)}<path d="M92 126Q130 100 170 112L188 125L170 143Q135 137 110 153" ${fill(C.cream)}/><path d="M398 126Q360 100 320 112L302 125L320 143Q355 137 380 153" ${fill(C.cream)}/>${magnifier(395, 67, .55)}`],
  ['q22-materiel-apres-chute.svg', 'Matériel mis hors service après une chute', 'Un harnais est placé dans une zone de quarantaine signalée par un cadre rouge tireté.', `<rect x="72" y="38" width="230" height="142" rx="18" ${fill(C.redSoft)} stroke="${C.red}" stroke-width="6" stroke-dasharray="12 8"/>${harness(187, 111, .9)}<path d="M336 58H422V148H336Z" ${fill(C.paper)}/><path d="M351 79H407M351 100H397M351 121H385" stroke="${C.blue}"/><path d="M322 166H438" stroke="${C.red}" stroke-width="9"/>`],
  ['q23-controle-annuel.svg', 'Contrôle périodique du harnais', 'Un calendrier, une loupe et un harnais représentent le contrôle périodique par une personne compétente.', `${calendar(118, 110, .9)}${harness(308, 120, .9)}${magnifier(398, 70, .58)}<path d="M118 151V174M101 162H135" stroke="${C.orangeDeep}"/>`],
  ['q24-travail-en-binome.svg', 'Travail avec un collègue', 'Deux travailleurs équipés se voient et peuvent s’aider pendant le travail en hauteur.', `${guardrail(210, 188, 205, 90)}${worker(275, 105, { scale: .9 })}${worker(118, 124, { pose: 'reach', scale: .9 })}<path d="M157 82Q205 53 246 82" stroke="${C.blue}" stroke-dasharray="7 7"/><circle cx="201" cy="61" r="8" ${fill(C.orange)} />`],
  ['q25-materiel-casse.svg', 'Matériel cassé signalé', 'Une sangle endommagée est étiquetée hors service et signalée à un responsable.', `<path d="M70 118H205" stroke="${C.blue}" stroke-width="16"/><path d="M205 118L224 99L241 138L259 98L278 118H320" stroke="${C.red}" stroke-width="12"/><rect x="164" y="145" width="150" height="38" rx="10" ${fill(C.redSoft)} stroke="${C.red}" stroke-dasharray="7 6"/>${worker(380, 118, { pose: 'reach', scale: .9 })}<path d="M326 84Q346 66 359 76" stroke="${C.orangeDeep}" stroke-dasharray="6 7"/>`],
];

await mkdir(iconsDir, { recursive: true });
await mkdir(illustrationsDir, { recursive: true });

await Promise.all(Object.entries(icons).map(([name, [title, description, body]]) =>
  writeFile(join(iconsDir, `${name}.svg`), iconDocument(title, description, body), 'utf8')));

await Promise.all(scenes.map(([file, title, description, body]) =>
  writeFile(join(illustrationsDir, file), sceneDocument(title, description, body), 'utf8')));

const visualMap = scenes.map(([file, title, description], index) =>
  `  ${index + 1}: { src: "assets/illustrations/${file}", alt: "${esc(description)}" },`
).join('\n');

const visualsJs = `/* Visuels originaux inerWeb — générés depuis tools/build-visuals.mjs. */
const QUESTION_VISUALS = Object.freeze({
${visualMap}
});

const OPTION_MARKERS = Object.freeze(["option-a", "option-b", "option-c"]);

function iwIcon(name, className = "iw-icon") {
    return \`<img class="\${className}" src="assets/icons/\${name}.svg" alt="" aria-hidden="true">\`;
}
`;

await writeFile(join(repo, 'visuals.js'), visualsJs, 'utf8');

console.log(`Visuels générés : ${scenes.length} illustrations et ${Object.keys(icons).length} icônes.`);
