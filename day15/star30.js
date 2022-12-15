import loadPuzzleInput from "../utils/loadPuzzleInput.js";

const sensor = 0;
const beacon = 1;
const X = 0;
const Y = 1;

const referenceSize = 4000000;

function calculateRectilinearDistance(point1, point2) {
    const solution = Math.abs(point1[X] - point2[X]) + Math.abs(point1[Y] - point2[Y]);
    return solution;
}

function isInPerimeter(point, sensor, beacon) {
    const distanceToSensor = calculateRectilinearDistance(point, sensor);
    const beaconDistance = calculateRectilinearDistance(sensor, beacon);

    return distanceToSensor <= beaconDistance;
}

function calculateMinMax(input) {
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;

    input.forEach((line) => {
        const size = calculateRectilinearDistance(line[sensor], line[beacon]);
        const perimXMin = line[sensor][X] - size;
        const perimXMax = line[sensor][X] + size;
        const perimYMin = line[sensor][Y] - size;
        const perimYMax = line[sensor][Y] + size;

        minX = Math.min(minX, perimXMin);
        maxX = Math.max(maxX, perimXMax);
        minY = Math.min(minY, perimYMin);
        maxY = Math.max(maxY, perimYMax);
    });

    return {
        minX: Math.max(minX, 0),
        maxX: Math.min(maxX, referenceSize),
        minY: Math.max(minY, 0),
        maxY: Math.min(maxY, referenceSize),
    };
}

function getBeaconPositions(input) {
    const beacons = [];
    input.forEach((line) => {
        beacons.push(JSON.stringify(line[beacon]));
    });

    return new Set(beacons);
}

function getSkipValue(row, sensor, beacon) {
    const verticalDistance = Math.abs(sensor[Y] - row);
    const width = calculateRectilinearDistance(sensor, beacon);
    const rowWidth = width - verticalDistance;
    return sensor[X] + rowWidth;
}

function checkSensors(x, y, input) {
    for (let line = 0; line < input.length; line++) {
        const isInRange = isInPerimeter([x, y], input[line][sensor], input[line][beacon]);
        if (isInRange) {
            const skipValue = getSkipValue(y, input[line][sensor], input[line][beacon]);
            return { isInRange: true, skipValue };
        }
    }
    return { isInRange: false, skipValue: 0 };
}

function star30() {
    const input = loadPuzzleInput(15)
        .filter((line) => line.length > 0)
        .map((line) =>
            line
                .replace("Sensor at x=", "")
                .replaceAll(" y=", "")
                .replace(" closest beacon is at x=", "")
                .split(":")
                .map((coords) => {
                    const split = coords.split(",");
                    return [Number.parseInt(split[0]), Number.parseInt(split[1])];
                })
        );

    const { minX, maxX, minY, maxY } = calculateMinMax(input);
    const knownBeacons = getBeaconPositions(input);
    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const { isInRange, skipValue } = checkSensors(x, y, input);
            if (isInRange) {
                x = skipValue;
            }
            if (!isInRange && !knownBeacons.has(JSON.stringify([x, y]))) {
                return x * 4000000 + y;
            }
        }
    }
}

export default star30;
