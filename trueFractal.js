import preset from './canvas-preset/index.js';
import getGlobalConfig from './globalConfig.js';
import createForest from './createForest.js';
import createSky from './createSky.js';

preset(canvas => {
    canvas.size();

    const globalConfig = getGlobalConfig();
    const forest = createForest(canvas);
    const sky = createSky(canvas);

    canvas.draw(() => {
        canvas.clear(globalConfig.background);

        canvas.renderGroup('lines', forest);
        canvas.renderGroup('arc', sky.stars, sky.updateStar);
    });
});
