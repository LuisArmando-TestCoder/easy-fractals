
import getGlobalConfig from './fractalConfig.js';

function createForest({
    c, size, draw, renderGroup, clear, random
}) {
    function degreesToRadians(degrees) {
        return degrees / 360 * (Math.PI * 2);
    }
    function getVertex(x, y) {
        return {
            x: x || localConfig.x ? localConfig.x() : globalConfig.initial.x(),
            y: y || globalConfig.initial.y()
        };
    }
    function getDistantVertex (distance, { x, y }, rotation) {
        return {
            x: x + Math.sin(degreesToRadians(rotation)) * distance * random(),
            y: y + Math.cos(degreesToRadians(rotation)) * distance * random()
        };
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
            ...line
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
                    distance: line.distance * (localConfig.distanceDecrement || globalConfig.distanceDecrement),
                    w: lineCopy.w - lineCopy.w * globalConfig.thicknessReductionStep,
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
    function getTrees(treeIndex) {
        // const {treesInForestAmount} = this;
        // const MAX_DECIMAL_IN_HEXADECIMAL = 9;
        // const opacity = treesInForestAmount / MAX_DECIMAL_IN_HEXADECIMAL * treeIndex;
        return [...new Array(globalConfig.fractalsPerTree)]
        .map((_, i) => {
            const getInitialRotation = () => 
                360 / globalConfig.fractalsPerTree * i + globalConfig.initial.rotation;
            const vertex = getVertex();
            const distantVertex = getDistantVertex(
                localConfig.distance || globalConfig.distance,
                vertex,
                getInitialRotation()
            );
            const line = {
                group: [ vertex, distantVertex ],
                w: globalConfig.initial.thickness,
                // c: globalConfig.initial.color + opacity,
                c: globalConfig.initial.color,
                rotation: getInitialRotation(),
                distance: localConfig.distance || globalConfig.distance
            };
            const children = splitLineVertex(line);
            const tree = [
                line,
                ...children,
                ...recursiveFractal(children, globalConfig.limit)
            ];

            return tree;
        }).flat();
    }
    function getForest(treesInForestAmount) {
        return [...new Array(treesInForestAmount).keys()]
            .map(getTrees.bind({treesInForestAmount})).flat();
    }

    const globalConfig = getGlobalConfig({c});
    const localConfig = {
        distance: 150,
        distanceDecrement: 0.75,
        x: () => random(c.width)
    };
    const forest = getForest(globalConfig.treesInForest);

    return forest;
}

export default createForest;