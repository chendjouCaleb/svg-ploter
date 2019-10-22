import {GraphFillableElement} from "./graph-fillable-element";
import {Coordinate2D, Point2D} from "./coordinates";
import {SVG_NAMESPACE} from "./constant";
import {createPathElement} from "./utils";
import {Graph} from "./graph";
import {CoordinateHelpers} from "./coordinate-helpers";

export class GraphFunction extends GraphFillableElement<SVGPathElement> {
    constructor(private graph: Graph, _expression: (x: number) => number, _precision: number = 0.1) {
        super(graph);
        this.expression = _expression;
        this.precision = _precision;
        this.setAttribute("stroke", "#444");
        this.setAttribute("fill", "transparent");
        this.setAttribute("stroke-width", "2");

    }


    private _expression: (x: number) => number;
    private _values: Point2D[] = [];
    private _pathValues: Point2D[] = [];
    private _precision: number = 0.1;


    get expression(): (x: number) => number {
        return this._expression;
    }

    set expression(value: (x: number) => number) {
        this._expression = value;
        let str = "";
        let start = this.graph.xUnitSize.toPixel(this.graph.xDomain[0]);
        let end = this.graph.xUnitSize.toPixel(this.graph.xDomain[1]);

        for(let i = start; i < end; i+= this.precision){
            let c = this.addValue(i, this._expression(i));
            str += ` L ${c[0]} ${c[1]}`;
        }

        str = `M${this._pathValues[0][0]} ${this._pathValues[0][0]}` + str;
        this.setAttribute("d", str);
    }

    addValue(x:number, y: number){
        let coord:Point2D = [this.graph.xUnitSize.toPixel(x), this.graph.yUnitSize.toPixel(y)];
        coord = CoordinateHelpers.normalize(this.graph.realOrigin, coord);

        this._values.push([x, y]);
        this._pathValues.push(coord);
        return coord;
    }
    get values(): Point2D[] {
        return this._values;
    }


    get precision(): number {
        return this._precision;
    }

    set precision(value: number) {
        this._precision = value;
    }

    set color(value: string){
        this.setAttribute("stroke", value);
    }


    protected buildSvgElement(): SVGPathElement {
        return document.createElementNS(SVG_NAMESPACE, "path");
    }
}