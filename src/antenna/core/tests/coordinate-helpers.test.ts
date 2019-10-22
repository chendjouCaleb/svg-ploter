import {CoordinateHelpers} from "../coordinate-helpers";


describe("coordinate helper", () => {
    let origin: [number, number] = [9, 9];
    let points: [number, number] [][] = [
        [[0, 0], [9, 9]],
        [[2, 2], [11, 7]],
        [[3, 4], [12, 5]],
        [[0, 2], [9, 7]],
        [[2, 0], [11, 9]],
        [[-1, 1], [8, 8]],
        [[-1, -2], [8, 11]],
        [[-2, -1], [7, 10]],
        [[-1, 0], [8, 9]],
        [[0, -1], [9, 10]],
        [[-2, 1], [7, 8]],
        [[2, -1], [11, 10]],
    ];
    it("compute coordinate", () => {

        for (let point of points) {
            let transform = CoordinateHelpers.normalize(origin, point[0]);
            expect(transform).toStrictEqual(point[1])
        }
    });

});

describe("from bottom right to original", () => {
    let height = 6;
    let points: [number, number] [][] = [
        [[0, 0], [0, 6]],
        [[1, 1], [1, 5]],
        [[0, 1], [0, 5]],
        [[-1, -1], [-1, 7]],
        [[-1, 0], [-1, 6]],
        [[0, -1], [0, 7]],
    ];

    it("compute real coordinate", () => {

        for (let point of points) {
            let transform = CoordinateHelpers.fromBottomRightToOriginal(height, point[0]);
            expect(transform).toStrictEqual(point[1])
        }
    });

})