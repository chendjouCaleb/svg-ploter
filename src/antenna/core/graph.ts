import { UnitSize } from "./unit-size";
import {GraphFillableElement} from "./graph-fillable-element";
import {
    GRAPH_DEFAULT_HEIGHT,
    GRAPH_DEFAULT_ORIGIN, GRAPH_DEFAULT_UNIT_SIZE_X, GRAPH_DEFAULT_UNIT_SIZE_Y,
    GRAPH_DEFAULT_WIDTH,
    SVG_NAMESPACE
} from "./constant";
import {Figure} from "./figure";
import {Axis} from "./axis/axis";
import {GraphFunction} from "./graphFunction";
import {Point2D} from "./coordinates";
import {CoordinateHelpers} from "./coordinate-helpers";
import {Marker} from "./marker";

export class Graph extends GraphFillableElement<SVGElement>{

    constructor(private _figure: Figure) {
        super(_figure);
        this.xUnitSize = GRAPH_DEFAULT_UNIT_SIZE_X;
        this.yUnitSize = GRAPH_DEFAULT_UNIT_SIZE_Y;
        this.element.classList.add("graph");

        this.xDomain= [-5, 5];
        this.yDomain = [-5, 5];

        this.addXAxis();
        this.addYAxis();
    }


    private _landmark: Point2D = GRAPH_DEFAULT_ORIGIN;


    private _left: number;
    private _top: number;


    private _yAxis: Axis;
    private _xAxis: Axis;

    private _topAxis:Axis;
    private _bottomAxis:Axis;

    private _leftAxis:Axis;
    private _rightAxis:Axis;

    private _axis: Axis[] = [];

    private _functions: GraphFunction[] = [];

    private _xUnitSize = UnitSize.emUnitSize;
    private _yUnitSize = new UnitSize(100);
    private _xDomain: Point2D = [0, 0];
    private _yDomain:  Point2D = [0, 0];
    private _origin: Point2D = [0, 0];

    addXAxis(){
        this._xAxis = new Axis(this, this.xUnitSize);
        this._xAxis.start = [this.xDomain[0], 0];
        this._xAxis.end = [this.xDomain[1], 0];
    }

    addYAxis() {
        this._yAxis = new Axis(this, this.yUnitSize);
        this._yAxis.start = [0, this.yDomain[1]];
        this._yAxis.end = [0, this.yDomain[0]];
    }

    addLeftAxis() {
        this._leftAxis = new Axis(this, this.yUnitSize);
        this._leftAxis.start = [this.xDomain[0], this.yDomain[1]];
        this._leftAxis.end = [this.xDomain[0], this.yDomain[0]];
    }

    addRightAxis() {
        this._rightAxis = new Axis(this, this.yUnitSize);
        this._rightAxis.start = [this.xDomain[1], this.yDomain[1]];
        this._rightAxis.end = [this.xDomain[1], this.yDomain[0]];
    }

    addTopAxis(){
        this._topAxis = new Axis(this, this.xUnitSize);
        this._topAxis.start = [this.xDomain[0], this.yDomain[1]];
        this._topAxis.end = [this.xDomain[1], this.yDomain[1]];
    }


    addBottomAxis(){
        this._bottomAxis = new Axis(this, this.xUnitSize);
        this._bottomAxis.start = [this.xDomain[0], this.yDomain[0]];
        this._bottomAxis.end = [this.xDomain[1], this.yDomain[0]];
    }

    set landmark(value: [number, number]) {
        this._landmark = value;
    }

    public addFunction(exp:(x: number) => number): GraphFunction {
        let func = new GraphFunction(this, exp);
        this.element.appendChild(func.element);
        return func;
    }

    public addMarker(p: Point2D){
        let marker = new Marker(this);
        let xy: Point2D = [this.xUnitSize.toPixel(p[0]), this.yUnitSize.toPixel(p[1])];
        xy = CoordinateHelpers.normalize(this.realLandmark, xy);
        marker.x = xy[0];
        marker.y = xy[1];
        return marker;
    }


    set xDomain(value: [number, number]) {
        this._xDomain = value;
        let width = value[1] - value[0];
        width = this.xUnitSize.toPixel(width);
        this.width = width + 1;
        this._origin[0] = 0 - value[0];

    }

    set yDomain(value: [number, number]) {
        this._yDomain = value;
        let height = value[1] - value[0];
        height = this.yUnitSize.toPixel(height);
        this.height = height + 1;
        this._origin[1] = 0 - value[0];
    }

    get figure(): Figure {
        return this._figure;
    }




    protected buildSvgElement(): SVGElement {
        return document.createElementNS(SVG_NAMESPACE, "svg");
    }


    set xUnitSize(value: UnitSize) {
        this._xUnitSize = value;
    }

    set yUnitSize(value: UnitSize) {
        this._yUnitSize = value;
    }


    get xUnitSize(): UnitSize {
        return this._xUnitSize;
    }

    get yUnitSize(): UnitSize {
        return this._yUnitSize;
    }


    get landmark(): Point2D {
        return this._landmark;
    }

    private get svgLandmark(): Point2D {
        return CoordinateHelpers.fromBottomRightToOriginal(this.height, this.landmark);
    }


    get realWidth(): number {
        return this.xUnitSize.toPixel(this._width);
    }

    get realHeight(): number {
        return this.yUnitSize.toPixel(this._height);
    }

    get realLandmark(): Point2D {
        let lm: Point2D = [this.xUnitSize.toPixel(this._landmark[0]), this.yUnitSize.toPixel(this._landmark[1])];

        return CoordinateHelpers.fromBottomRightToOriginal(this.figure.height, lm);
    }


    get xDomain(): [number, number] {
        return this._xDomain;
    }

    get yDomain(): [number, number] {
        return this._yDomain;
    }

    get origin(): [number, number] {
        return this._origin;
    }

    get realOrigin(): [number, number] {
        const y = (this.yDomain[1] - this.yDomain[0]) - this.origin[1];
        return [this.xUnitSize.toPixel(this.origin[0]), this.yUnitSize.toPixel(y)]
    }

}
