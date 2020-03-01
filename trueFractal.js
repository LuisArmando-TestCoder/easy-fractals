import preset from "./canvas-preset/index.js";
preset(({
    c, size, draw, renderGroup, clear
}) => {
    size();

    const degreesToRadians = degrees => degrees / 360 * (Math.PI * 2);
    const globalConfig = {
        initialDistance: 125,
        initialRotation: 180,
        distanceDecrement: 0.65,
        limit: 4,
        distribution: 3
    }
    function getDistribution(times) {
        const distribution = [];
        for (let i = 0;  i < times * 2 + 1; i++) {
            distribution.push(i / times - 1);
        }
        return distribution.filter((n, i) => n && (i + 1) % 2);
    }
    function splitLineVertex(line) {
        const lineCopy = {
            ...line,
            distance: line.distance * globalConfig.distanceDecrement
        }
        // console.log('lineCopy', lineCopy);
        const distribution = getDistribution(globalConfig.distribution);
        const index = globalConfig.limit - this.currentLimit + 1;
        const getRotation = direction =>
        lineCopy.rotation + lineCopy.rotation /
        (distribution.length + 2 * index) * direction;
        const setRotation = direction => (
            // lineCopy.rotation = getRotation(direction),
            getRotation(direction)
        );
        const vertex = lineCopy.group[1];
        const getChild = direction => getDistantVertex(
            lineCopy.distance,
            vertex,
            setRotation(direction)
        );
        const makeLine = (group, additional = {}) => ({
            ...lineCopy, group, ...additional
        });

        return distribution
        .map(n => {
            // console.log('getRotation(n)', getRotation(n));
            // console.log('vertex', vertex);
            // console.log('getChild(n)', getChild(n));
            // console.log([...new Array(100)].map(n => '-').join(''));
            return makeLine(
                [
                    vertex,
                    getChild(n)
                ],
                {
                    rotation: getRotation(n)
                }
            )
        });
    }

    function recursiveFractal(vertices, limit = 1, allVertices = []) {
        const newVertices = vertices.map(splitLineVertex.bind({currentLimit: limit}));

        allVertices.push(newVertices);
        if (limit <= 1) return allVertices.flat(2);
        return recursiveFractal(newVertices.flat(), limit - 1, allVertices.flat());
    }

    const getVertex = (x, y) => ({ x: x || c.width / 2, y: y || c.height });
    const getDistantVertex = (distance, { x, y }, rotation) => ({
        x: x + Math.sin(degreesToRadians(rotation)) * distance,
        y: y + Math.cos(degreesToRadians(rotation)) * distance
    });
    const vertex = getVertex();
    const distantVertex = getDistantVertex(
        globalConfig.initialDistance,
        vertex,
        globalConfig.initialRotation
    );
    const line = {
        group: [ vertex, distantVertex ],
        w: 1,
        c: '#000',
        rotation: globalConfig.initialRotation,
        distance: globalConfig.initialDistance
    };
    const children = splitLineVertex.call({currentLimit: globalConfig.limit}, line);
    const tree = [
        line,
        ...children,
        ...recursiveFractal(children, globalConfig.limit)
    ];

    draw(() => {
        clear();
        renderGroup('lines', tree);
    });
});
