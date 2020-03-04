// import preset from './canvas-preset/index.js';
// import getGlobalConfig from './fractalConfig.js';

// function move(key) {
//     function to(b, atSpeed = 10) {
//         return this.a[key] += (b[key] - this.a[key]) / atSpeed;
//     }
//     return {
//         in: a => ({ to: to.bind({a}) })
//     }
// }

// preset(({
//     c, size, draw, renderGroup, clear
// }) => {   
//     size();

//     const globalConfig = getGlobalConfig({c});
//     const localConfig = {
//         distance: 1,
//         distanceDecrement: 0.1,
//     };
//     const degreesToRadians = degrees => degrees / 360 * (Math.PI * 2);
//     function getDistribution(times) {
//         const distribution = [];
//         for (let i = 0;  i < times * 2 + 1; i++) {
//             distribution.push(i / times - 1);
//         }
//         return distribution.filter((n, i) => n && (i + 1) % 2);
//     }
//     function splitLineVertex(line) {
//         const lineCopy = {
//             ...line
//         }
//         const distribution = getDistribution(globalConfig.distribution);
//         const getRotation = direction =>
//         lineCopy.rotation + (globalConfig.limit * distribution.length * direction);
//         const vertex = lineCopy.group[1];
//         const getChild = direction => getDistantVertex(
//             lineCopy.distance,
//             vertex,
//             getRotation(direction)
//         );
//         const makeLine = (group, additional = {}) => ({
//             ...lineCopy, group, ...additional
//         });

//         return distribution
//         .map(n => {
//             return makeLine(
//                 [
//                     vertex,
//                     getChild(n)
//                 ],
//                 {
//                     rotation: getRotation(n),
//                     distance: line.distance * localConfig.distanceDecrement,
//                     w: lineCopy.w - lineCopy.w * globalConfig.thicknessReductionStep,
//                 }
//             )
//         });
//     }

//     function recursiveFractal(vertices, limit = 1, allVertices = []) {
//         const newVertices = vertices.map(splitLineVertex);

//         allVertices.push(newVertices);
//         if (limit <= 1) return allVertices.flat(2);
//         return recursiveFractal(newVertices.flat(), limit - 1, allVertices.flat());
//     }
//     const getVertex = (x, y) => ({
//         x: x || globalConfig.initial.x(),
//         y: y || globalConfig.initial.y()
//     });
//     const getDistantVertex = (distance, { x, y }, rotation) => ({
//         x: x + Math.sin(degreesToRadians(rotation)) * distance,
//         y: y + Math.cos(degreesToRadians(rotation)) * distance
//     });
//     const getTrees = () =>
//         [...new Array(globalConfig.treesAmount)]
//         .map((_, i) => {
//             const getInitialRotation = () => 
//                 360 / globalConfig.treesAmount * i + globalConfig.initial.rotation;
//             const vertex = getVertex();
//             const distantVertex = getDistantVertex(
//                 localConfig.distance,
//                 vertex,
//                 getInitialRotation()
//             );
//             const line = {
//                 group: [ vertex, distantVertex ],
//                 w: globalConfig.initial.thickness,
//                 c: globalConfig.initial.color,
//                 rotation: getInitialRotation(),
//                 distance: localConfig.distance
//             };
//             const children = splitLineVertex(line);
//             const tree = [
//                 line,
//                 ...children,
//                 ...recursiveFractal(children, globalConfig.limit)
//             ];

//             return tree;
//         }).flat();

//     let trees = getTrees();

//     draw(() => {
//         clear(globalConfig.background);
//         trees.splice(0);
//         trees = getTrees();

//         move('distanceDecrement')
//         .in(localConfig)
//         .to(globalConfig, globalConfig.growingSpeed);

//         move('distance')
//         .in(localConfig)
//         .to(globalConfig.initial, globalConfig.growingSpeed * 2);

//         renderGroup('lines', trees);
//     });
// });
import preset from './canvas-preset/index.js';
import getGlobalConfig from './fractalConfig.js';

function move(key) {
    function to(b, atSpeed = 10) {
        return this.a[key] += (b[key] - this.a[key]) / atSpeed;
    }
    return {
        in: a => ({ to: to.bind({a}) })
    }
}

preset(({
    c, size, draw, renderGroup, clear, random
}) => {   
    size();

    const globalConfig = getGlobalConfig({c});
    const localConfig = {
        distance: 100,
        distanceDecrement: 0.75,
    };
    const degreesToRadians = degrees => degrees / 360 * (Math.PI * 2);
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
                    distance: line.distance * localConfig.distanceDecrement,
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
    const getVertex = (x, y) => ({
        x: x || globalConfig.initial.x(),
        y: y || globalConfig.initial.y()
    });
    const getDistantVertex = (distance, { x, y }, rotation) => ({
        x: x + Math.sin(degreesToRadians(rotation)) * distance * random(1),
        y: y + Math.cos(degreesToRadians(rotation)) * distance * random(1)
    });
    const getTrees = () =>
        [...new Array(globalConfig.treesAmount)]
        .map((_, i) => {
            const getInitialRotation = () => 
                360 / globalConfig.treesAmount * i + globalConfig.initial.rotation;
            const vertex = getVertex();
            const distantVertex = getDistantVertex(
                localConfig.distance,
                vertex,
                getInitialRotation()
            );
            const line = {
                group: [ vertex, distantVertex ],
                w: globalConfig.initial.thickness,
                c: globalConfig.initial.color,
                rotation: getInitialRotation(),
                distance: localConfig.distance
            };
            const children = splitLineVertex(line);
            const tree = [
                line,
                ...children,
                ...recursiveFractal(children, globalConfig.limit)
            ];

            return tree;
        }).flat();

    let trees = getTrees();

    draw(() => {
        clear(globalConfig.background);
        // trees.splice(0);
        // trees = getTrees();

        // move('distanceDecrement')
        // .in(localConfig)
        // .to(globalConfig, globalConfig.growingSpeed);

        // move('distance')
        // .in(localConfig)
        // .to(globalConfig.initial, globalConfig.growingSpeed * 2);

        renderGroup('lines', trees);
    });
});
