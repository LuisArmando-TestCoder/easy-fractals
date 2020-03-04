const getGlobalConfig = (props) => ({
    initial: {
        distance: 100,
        rotation: 0,
        x: () => props.c.width / 2,
        y: () => props.c.height / 2,
        thickness: 6,
        color: '#f0f0f0',
    },
    distanceDecrement: 0.7885,
    thicknessReductionStep: 0.3,
    treesAmount: 5,
    limit: 7,
    distribution: 2,
    background: '#10101022',
    growingSpeed: 50
});

export default getGlobalConfig;
