const getGlobalConfig = (props) => ({
    initial: {
        distance: 200,
        rotation: 180,
        x: () => props.c.width / 2,
        y: () => props.c.height,
        thickness: 9,
        color: '#fff',
        skyRotation: 75
    },
    sky: {
        x: () => props.c.width / 2,
        y: () => -props.c.height / 4,
        maxRadius: 1,
        starsAmount: 750,
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
    growingSpeed: 50,
    treeSpanFrequency: 150,
    background: '#0001',
    treesColor: '#000',
    song: 'assets/sounds/POLO & PAN - Canopée (audio).mp3',
});

export default getGlobalConfig;
