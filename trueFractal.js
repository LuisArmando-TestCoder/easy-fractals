import preset from "./canvas-preset/index.js";
preset(({
    c, size, draw, renderGroup, clear
}) => {
    size();

    const degreesToRadians = degrees => degrees / 360 * (Math.PI * 2);
    const globalConfig = {
        initial: {
            distance: 180,
            rotation: 180,
            x: () => c.width / 2,
            y: () => c.height / 2
        },
        treesAmount: 7,
        distanceDecrement: 0.75,
        limit: 10,
        distribution: 2,
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
        const distribution = getDistribution(globalConfig.distribution);
        const getRotation = direction =>
        lineCopy.rotation + (globalConfig.limit * distribution.length * direction);
        const vertex = lineCopy.group[1];
        const getChild = direction => getDistantVertex(
            lineCopy.distance,
            vertex,
            getRotation(direction)
        );
        const makeLine = (group, additional = {}) => ({
            ...lineCopy, group, ...additional
        });

        return distribution
        .map(n => {
            return makeLine(
                [
                    vertex,
                    getChild(n)
                ],
                {
                    rotation: getRotation(n),
                    w: lineCopy.w - 1
                }
            )
        });
    }

    function recursiveFractal(vertices, limit = 1, allVertices = []) {
        const newVertices = vertices.map(splitLineVertex);

        allVertices.push(newVertices);
        if (limit <= 1) return allVertices.flat(2);
        return recursiveFractal(newVertices.flat(), limit - 1, allVertices.flat());
    }
    const getVertex = (x, y) => ({
        x: x || globalConfig.initial.x(),
        y: y || globalConfig.initial.y()
    });
    const getDistantVertex = (distance, { x, y }, rotation) => ({
        x: x + Math.sin(degreesToRadians(rotation)) * distance,
        y: y + Math.cos(degreesToRadians(rotation)) * distance
    });

    const trees = [...new Array(globalConfig.treesAmount)]
        .map((_, i) => {
            const getInitialRotation = () => 360 / globalConfig.treesAmount * i;
            const vertex = getVertex();
            const distantVertex = getDistantVertex(
                globalConfig.initial.distance,
                vertex,
                getInitialRotation()
            );
            const line = {
                group: [ vertex, distantVertex ],
                w: globalConfig.limit,
                c: '#000',
                rotation: getInitialRotation(),
                distance: globalConfig.initial.distance
            };
            const children = splitLineVertex(line);
            const tree = [
                line,
                ...children,
                ...recursiveFractal(children, globalConfig.limit)
            ];

            return tree;
        }).flat();

    draw(() => {
        clear();
        renderGroup('lines', trees);
    });
});
