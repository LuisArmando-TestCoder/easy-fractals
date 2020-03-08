let audio = new Audio();
let audioAnalyser;

audio.crossOrigin = 'anonymous';
audio.src = 'assets/sounds/El son del farolito - Nádaqui.mp3';
audio.path = /.*\//g.exec(audio.src)[0];
audio.name = /(.*)\..*/g.exec(decodeURIComponent(audio.src.substr(audio.path.length)))[1];

export default ({
    audio,
    audioAnalyser
});