const getGlobalConfig = (props) => ({
    initial: {
        distance: 180,
        rotation: 180,
        x: () => props.c.width / 2,
        y: () => props.c.height / 2
    },
    treesAmount: 1,
    distanceDecrement: 0.75,
    limit: 10,
    distribution: 2,
});

export default getGlobalConfig;
