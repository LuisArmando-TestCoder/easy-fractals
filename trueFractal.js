size();

const degreesToRadians = degrees => degrees / 360 * 6.28;
const globalConfig = {
    initialDistance: 400,
    initialRotation: 180,
    distanceDecrement: 0.5
}
// 6.28 to 360
function splitLineVertex(line) {
    // { group, rotation, distance }
    const lineCopy = {
        ...line,
        distance: line.distance * globalConfig.distanceDecrement
    }
    const vertex = lineCopy.group[1];
    const getChild = direction => getDistantVertex(
        lineCopy.distance,
        vertex,
        lineCopy.rotation + (lineCopy.rotation / 4 * direction)
    );
    const makeLine = group => ({...lineCopy, group});
    const leftVertex = getChild(1);
    const rightVertex = getChild(-1);
    return [
        makeLine([vertex, leftVertex]),
        makeLine([vertex, rightVertex])
    ];
}

function recursiveFractal(vertices, limit = 1, allVertices = []) {
    const newVertices = vertices.map(splitLineVertex);
    allVertices.push(newVertices);
    if (limit <= 0) return allVertices.flat(2);
    return recursiveFractal(newVertices.flat(), limit - 1, allVertices.flat());
}

const getVertex = (x, y) => ({ x: x || c.width / 2, y: y || c.height / 1 });
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
const children = splitLineVertex(line);;
const tree = [
    line,
    ...children,
    ...recursiveFractal(children, 4)
];

draw(() => {
    clear();
    renderGroup('lines', tree);
});