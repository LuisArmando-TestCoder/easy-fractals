const getGlobalConfig = (props) => ({
    initial: {
        distance: 75,
        rotation: 180,
        x: () => props.c.width / 2,
        y: () => props.c.height,
        thickness: 6,
        color: '#f0f0f0',
    },
    distanceDecrement: 0.885,
    thicknessReductionStep: 0.3,
    treesAmount: 1,
    limit: 9,
    distribution: 2,
    background: '#10101022',
    growingSpeed: 50
});

export default getGlobalConfig;
