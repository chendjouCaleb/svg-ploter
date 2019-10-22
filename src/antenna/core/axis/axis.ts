import { GraphFillableElement } from "../graph-fillable-element";
import { Label } from "../label";
import { Point2D } from "../coordinates";
import { Graph } from "../graph";
import {SVG_NAMESPACE} from "../constant";
import {AxisTicks} from "./axis-ticks";
import {AxisLine} from "./axis-line";
import {CoordinateHelpers} from "../coordinate-helpers";
import {UnitSize} from "../unit-size";

export class Axis extends GraphFillableElement<SVGElement>{
    constructor(private _graph: Graph, private _unitSize: UnitSize){
        super(_graph);
        this.line = new AxisLine(this);
        this.element.setAttribute("object-type", "axis")
    }


    _ticks: AxisTicks[] = [];
    private _line: AxisLine;

    /**
     * The named label of the axis. Ex: x, y
     */
    _label: Label;
    private _start: Point2D = [0, 0];
    private _end: Point2D = [0, 0];

    protected buildSvgElement(): SVGElement {
        return document.createElementNS(SVG_NAMESPACE, "svg");
    }


    get line(): AxisLine {
        return this._line;
    }

    set line(value: AxisLine) {
        this._line = value;
    }

    get start(): [number, number] {
        return this._start;
    }

    set start(value: [number, number]) {
        this._start = value;
        console.log(this.realStart)
        let width = this.realEnd[0] - this.realStart[0];
        let height = this.realEnd[1] - this.realStart[1];
       // this.width = this.realEnd[0] - this.realStart[0];

        this.setAttribute("x", this.realStart[0]);
        this.setAttribute("y", this.realStart[1]);
        this.line.setAttribute("x2", Math.abs(width));
        this.line.setAttribute("y2", Math.abs(height));
    }

    get end(): [number, number] {
        return this._end;
    }

    set end(value: [number, number]) {
        this._end = value;
        console.log(this.realEnd);
        let width = this.realEnd[0] - this.realStart[0];
        let height = this.realEnd[1] - this.realStart[1];
        //this.width = this.realEnd[0] - this.realStart[0];
        //this.setAttribute("x", this.realStart[0]);
        //this.setAttribute("y", this.realStart[1]);
        this.line.setAttribute("x2", Math.abs(width));
        this.line.setAttribute("y2", Math.abs(height));
    }

    get realStart(): Point2D{
        return CoordinateHelpers.normalize(this._graph.realOrigin, this._unitSize.pixel2D(this.start))
    }

    get realEnd(): Point2D{
        return CoordinateHelpers.normalize(this._graph.realOrigin, this._unitSize.pixel2D(this.end))
    }
}

