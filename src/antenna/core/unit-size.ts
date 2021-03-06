/**
 * Represent a unit of length used to compute a size of graph element in pixel.
 * @author Chendjou deGrace
 */
import {Point2D} from "./coordinates";

export class UnitSize {
    /**
     * The centimeter unit of length.
     */
    public static cmUnitSize = new UnitSize(37.79527559);


    /**
     * The em unit of length.
     */
    public static emUnitSize = new UnitSize(16);

    /**
     * The size of one unit in pixel.
     * ex: 1cm => 37,79 px
     */
    size: number;

    /**
     * 
     * @param value The value converter from unit of length to pixel.
     */
    toPixel: (value: number) => number = (value) => value * this.size;

    constructor(_size?: number, _toPixel: (value: number) => number = value => value * _size) {
        this.size = _size;
        this.toPixel = _toPixel;
    }

    pixel2D(point: Point2D): Point2D{
        return [this.toPixel(point[0]), this.toPixel(point[1])];
    }
}