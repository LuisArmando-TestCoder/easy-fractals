import preset from './canvas-preset/index.js';
import getGlobalConfig from './fractalConfig.js';
import createForest from './createForest.js';

function move(key) {
    function to(b, atSpeed = 10) {
        return this.a[key] += (b[key] - this.a[key]) / atSpeed;
    }
    return {
        in: a => ({ to: to.bind({a}) })
    }
}

preset(canvas => {

    canvas.size();

    const forest = createForest(canvas);
    const globalConfig = getGlobalConfig();

    canvas.draw(() => {
        canvas.clear(globalConfig.background);

        canvas.renderGroup('lines', forest);
    });
});
