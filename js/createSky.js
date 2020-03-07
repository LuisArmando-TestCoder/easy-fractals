import getGlobalConfig from './globalConfig.js';
import { degreesToRadians } from './utils.js';

function createSky({ c, random }) {
    const globalConfig = getGlobalConfig({c});
    const getRandomWidth = () => random(c.width);
    const getRandomHeight = () => random(globalConfig.sky.y());
    const getX = (step, randomWidth) => globalConfig.sky.x() + Math.sin(step) * randomWidth;
    const getY = (step, randomWidth) => globalConfig.sky.y() + Math.cos(step) * randomWidth;

    function getStar(index) {
        const { starsAmount } = this;
        const step = degreesToRadians(360 / starsAmount * index);
        const randomWidth = getRandomWidth();
        const randomHeight = getRandomHeight();
        const x = getX(step, randomWidth);
        const y = getY(step, randomWidth);
        const r = random(globalConfig.sky.maxRadius) + 1;
        return {
            x,
            y,
            r,
            step,
            index,
            randomWidth,
            randomHeight,
            c: globalConfig.initial.color,
        };
    }

    function createStars(starsAmount) {
        return [...new Array(starsAmount).keys()].map(getStar.bind({ starsAmount }));
    }

    function updateStar(star) {
        star.step += degreesToRadians(star.r / globalConfig.sky.rotor.speedResistance * globalConfig.sky.rotor.direction);
        star.x = getX(star.step, star.randomWidth);
        star.y = getY(star.step, star.randomWidth);
    }

    const stars = createStars(globalConfig.sky.starsAmount);

    return {
        stars,
        updateStar
    };
}

export default createSky;