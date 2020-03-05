const getGlobalConfig = (props) => ({
    initial: {
        distance: 175,
        rotation: 180,
        x: () => props.c.width / 2,
        y: () => props.c.height,
        thickness: 4,
        color: '#fff',
    },
    sky: {
        x: () => props.c.width / 2,
        y: () => -props.c.height / 4,
        starsAmount: 100,
        rotor: {
            direction: -1,
            speedResistance: 10,
        }
    },
    treesInForest: 3,
    fractalsPerTree: 1,
    distanceDecrement: 0.655,
    thicknessReductionStep: 0.25,
    limit: 8,
    distribution: 2,
    background: '#0002',
    growingSpeed: 50
});

export default getGlobalConfig;
