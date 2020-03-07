const getGlobalConfig = (props) => ({
    initial: {
        distance: 200,
        rotation: 180,
        x: () => props.c.width / 2,
        y: () => props.c.height,
        thickness: 9,
        color: '#fff',
    },
    sky: {
        x: () => props.c.width / 2,
        y: () => -props.c.height / 4,
        starsAmount: 500,
        rotor: {
            direction: -1,
            speedResistance: 42,
        }
    },
    treesInForest: 1,
    fractalsPerTree: 1,
    distanceDecrement: 0.655,
    thicknessReductionStep: 0.3,
    limit: 9,
    distribution: 2,
    background: '#0001',
    treesColor: '#000',
    growingSpeed: 50
});

export default getGlobalConfig;
