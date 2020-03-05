const getGlobalConfig = (props) => ({
    initial: {
        distance: 75,
        rotation: 180,
        x: () => props.c.width / 2,
        y: () => props.c.height,
        thickness: 6,
        color: '#fff',
    },
    treesInForest: 6,
    fractalsPerTree: 1,
    distanceDecrement: 0.85,
    thicknessReductionStep: 0.4,
    limit: 8,
    distribution: 2,
    background: '#000',
    growingSpeed: 50
});

export default getGlobalConfig;
