import preset from '../canvas-preset/index.js';
import getGlobalConfig from './globalConfig.js';
import createForest from './createForest.js';
import createSky from './createSky.js';

preset(canvas => {
    canvas.size();

    const globalConfig = getGlobalConfig();
    const sky = createSky(canvas);
    let forest = createForest(canvas);

    let frame = 0;

    canvas.draw(() => {

        frame++;

        if(!(frame % 512)) {
            forest.splice(0);
            forest = createForest(canvas);
        }

        // canvas.clear(globalConfig.background);
        // canvas.clear();
        var gradient = canvas.ctx.createRadialGradient(canvas.c.width / 2, canvas.c.height / 4, canvas.c.width, canvas.c.width / 2, -canvas.c.height / 4, canvas.c.width / 2);
        gradient.addColorStop(0, ' #014a9022');
        gradient.addColorStop(0.5, '#5565cc22');
        gradient.addColorStop(1, '#948fd822');
        canvas.ctx.fillStyle = gradient;
        canvas.ctx.fillRect(0, 0, canvas.c.width, canvas.c.height);

        canvas.renderGroup('arc', sky.stars, sky.updateStar);
        canvas.renderGroup('lines', forest);
    });
});
