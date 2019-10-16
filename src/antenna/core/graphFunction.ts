import {GraphElement} from "./graph-element";
import {Coordinate2D} from "./coordinates";
import {SVG_NAMESPACE} from "./constant";
import {createPathElement} from "./utils";
import {Graph} from "./graph";

export class GraphFunction extends GraphElement<SVGPathElement> {
    constructor(private graph: Graph, _expression: (x: number) => number, _precision: number = 0.1) {
        super(graph);
        this.expression = _expression;
        this.precision = _precision;
        this.setAttribute("stroke", "#444");
        this.setAttribute("fill", "transparent");
        this.setAttribute("stroke-width", "2");

    }


    private _expression: (x: number) => number;
    private _values: Coordinate2D[] = [];
    private _pathValues: Coordinate2D[] = [];
    private _precision: number = 0.1;


    get expression(): (x: number) => number {
        return this._expression;
    }

    set expression(value: (x: number) => number) {
        this._expression = value;
        let str = "";
        for(let i = this.graph.xdomain[0]; i < this.graph.xdomain[1]; i+= this.precision){
            let c = this.addValue(i, this._expression(i));
            str += ` L ${c.x} ${c.y}`;
        }
        console.log(this.values)
        str = `M${this._pathValues[0].x} ${this._pathValues[0].y}` + str;
        this.setAttribute("d", str);
    }

    addValue(x:number, y: number){
        let coord = {
            x: this.graph.origin.x +  x ,
            y: (this.parent.height - this.graph.origin.y) - y/this.graph.yUnitSize.size
        };
        this._values.push({x:x, y:y});
        this._pathValues.push(coord);
        return coord;
    }
    get values(): Coordinate2D[] {
        return this._values;
    }


    get precision(): number {
        return this._precision;
    }

    set precision(value: number) {
        this._precision = value;
    }


    protected buildSvgElement(): SVGPathElement {
        return document.createElementNS(SVG_NAMESPACE, "path");
    }
}