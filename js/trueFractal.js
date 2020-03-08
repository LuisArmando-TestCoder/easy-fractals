import preset from '../canvas-preset/index.js';
import createForest from './createForest.js';
import createSky from './createSky.js';
import aas from './audioAndStars.js';
import getGlobalConfig from './globalConfig.js';

preset(canvas => {
    canvas.size();
    const globalConfig = getGlobalConfig(canvas);
    const sky = createSky(canvas);
    let forest = createForest(canvas);
    let frame = 0;

    aas.audio.addEventListener('canplay', () => {
        document.getElementById('songCite').style.color = 'var(--f6)';
        window.addEventListener('click', () => {
            if (!aas.audioAnalyser) aas.audioAnalyser = canvas.analyseAudio(aas.audio);
            if (aas.audio.paused) return aas.audio.play();
            aas.audio.pause();
        });
    });

    canvas.draw(() => {
        frame++;

        if (!(frame % globalConfig.treeSpanFrequency)) {
            forest.splice(0);
            forest = createForest(canvas);
        }

        if (aas.audioAnalyser) {
            const arrayFreqs = aas.audioAnalyser.getFrequency().array;
            sky.stars.forEach((star, i) => {
                star.r = arrayFreqs[i] / 100 + 0.5;
            });
        }

        var gradient = canvas.ctx.createRadialGradient(
            canvas.c.width / 2,
            -canvas.c.height / 4,
            canvas.c.width,
            canvas.c.width / 2,
            -canvas.c.height / 4, canvas.c.width / 2
        );
        gradient.addColorStop(0, ' #014a9044');
        gradient.addColorStop(0.5, '#5565cc44');
        gradient.addColorStop(1, '#948fd844');
        canvas.ctx.fillStyle = gradient;
        canvas.ctx.fillRect(0, 0, canvas.c.width, canvas.c.height);

        canvas.renderGroup('arc', sky.stars, sky.updateStar);
        canvas.renderGroup('lines', forest);
    });
});