import aas from './audioAndStars.js';

const songCite = document.getElementById('songCite');

aas.audio.addEventListener('canplay', () => {
    songCite.innerText += ` ${aas.audio.name}`;
    songCite.cite = aas.audio.name;
});