// backgrounds
import saiman from './background/saiman.jpg';
import astral from './background/astral.jpg';
import eoaalien from './background/eoaalien.jpg';
import panight from './background/panight.jpg';
import heroImg from './background/hero-img.jpg';
import cartoon1 from './background/cartoon1.jpg';
import cartoon2 from './background/cartoon2.jpg';
import cartoon3 from './background/cartoon3.jpg';

// cards
import ace from './Ace.png';
import bakezori from './Bakezori.png';
import blackSolus from './Black_Solus.png';
import calligrapher from './Calligrapher.png';
import chakriAvatar from './Chakri_Avatar.png';
import coalfist from './Coalfist.png';
import desolator from './Desolator.png';
import duskRigger from './Dusk_Rigger.png';
import flamewreath from './Flamewreath.png';
import furiosa from './Furiosa.png';
import geomancer from './Geomancer.png';
import goreHorn from './Gore_Horn.png';
import heartseeker from './Heartseeker.png';
import jadeMonk from './Jade_Monk.png';
import kaidoExpert from './Kaido_Expert.png';
import katara from './Katara.png';
import kiBeholder from './Ki_Beholder.png';
import kindling from './Kindling.png';
import lanternFox from './Lantern_Fox.png';
import mizuchi from './Mizuchi.png';
import orizuru from './Orizuru.png';
import scarletViper from './Scarlet_Viper.png';
import stormKage from './Storm_Kage.png';
import suzumebachi from './Suzumebachi.png';
import tuskBoar from './Tusk_Boar.png';
import twilightFox from './Twilight_Fox.png';
import voidTalon from './Void_Talon.png';
import whiplash from './Whiplash.png';
import widowmaker from './Widowmaker.png';
import xho from './Xho.png';

// logo
import logo from './logo.jpg';

// icon
import attack from './attack.png';
import defense from './defense.png';
import alertIcon from './alertIcon.svg';
import AlertIcon from './AlertIcon.jsx';

// players
import player01 from './player01.png';
import player02 from './player02.png';

// sounds
import attackSound from './sounds/attack.wav';
import defenseSound from './sounds/defense.mp3';
import explosion from './sounds/explosion.mp3';

export const allCards = [
  ace,
  bakezori,
  blackSolus,
  calligrapher,
  chakriAvatar,
  coalfist,
  desolator,
  duskRigger,
  flamewreath,
  furiosa,
  geomancer,
  goreHorn,
  heartseeker,
  jadeMonk,
  kaidoExpert,
  katara,
  kiBeholder,
  kindling,
  lanternFox,
  mizuchi,
  orizuru,
  scarletViper,
  stormKage,
  suzumebachi,
  tuskBoar,
  twilightFox,
  voidTalon,
  whiplash,
  widowmaker,
  xho,
];

export {
  saiman,
  astral,
  eoaalien,
  panight,
  heroImg,

  ace,
  bakezori,
  blackSolus,
  calligrapher,
  chakriAvatar,
  coalfist,
  desolator,
  duskRigger,
  flamewreath,
  furiosa,
  geomancer,
  goreHorn,
  heartseeker,
  jadeMonk,
  kaidoExpert,
  katara,
  kiBeholder,
  kindling,
  lanternFox,
  mizuchi,
  orizuru,
  scarletViper,
  stormKage,
  suzumebachi,
  tuskBoar,
  twilightFox,
  voidTalon,
  whiplash,
  widowmaker,
  xho,

  logo,

  attack,
  defense,
  alertIcon,
  AlertIcon,

  player01,
  player02,

  attackSound,
  defenseSound,
  explosion,
};

export const battlegrounds = [
  { id: 'bg-saiman', image: saiman, name: 'Saiman' },
  { id: 'bg-astral', image: astral, name: 'Astral' },
  { id: 'bg-eoaalien', image: eoaalien, name: 'Eoaalien' },
  { id: 'bg-panight', image: panight, name: 'Panight' },
  { id: 'bg-cartoon1', image: cartoon1, name: 'Cartoon1'},
  { id: 'bg-cartoon2', image: cartoon2, name: 'Cartoon2'},
  { id: 'bg-cartoon3', image: cartoon3, name: 'Cartoon3'}
];

export const gameRules = [
  '防御力和攻击力相同的卡牌会互相抵消。',
  '攻击卡牌的攻击力会扣除对方玩家的生命值。',
  '如果P1不防御，则P2的攻击会扣除对方的生命值。 ', 
  '如果 P1 防守，并且P2开始攻击，P1会受到 P2攻击力高于防守力的部分', 
  '如果玩家防守，他们会补充 3 点法力', 
  '如果玩家攻击，他们会消耗 3 点法力',
];