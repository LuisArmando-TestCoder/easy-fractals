import preset from './canvas-preset/index.js';
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

        canvas.clear(globalConfig.background);
        canvas.renderGroup('lines', forest);
        canvas.renderGroup('arc', sky.stars, sky.updateStar);
    });
});
