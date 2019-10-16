import { UnitSize } from "./unit-size";
import {GraphElement} from "./graph-element";
import {GRAPH_DEFAULT_XDOMAIN, GRAPH_DEFAULT_YDOMAIN, SVG_NAMESPACE} from "./constant";
import {Figure} from "./figure";
import {Axis} from "./axis";
import {GraphFunction} from "./graphFunction";
import {Coordinate2D} from "./coordinates";

export class Graph extends GraphElement<SVGElement>{

    constructor(private _figure: Figure) {
        super(_figure);
        this.ydomain = GRAPH_DEFAULT_XDOMAIN;
        this.xdomain = GRAPH_DEFAULT_YDOMAIN;
        this.element.classList.add("graph")
    }
    /**
     * The left origin of a graph.
     */
    private _xdomain: [number, number] = [0, 5];

    private _ydomain: [number, number] = [0, 5];

    private _origin: Coordinate2D = {x: 0, y: 0};

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



    public addFunction(exp:(x: number) => number): GraphFunction {
        let func = new GraphFunction(this, exp);
        this.element.appendChild(func.element);
        return func;

    }


    set xdomain(value: [number, number]) {
        this._xdomain = value;
        if(value[0] >= value[1]){
            throw new Error("The first value of the xDomain must be lower than the second value")
        }

        let width = (value[1] - value[0]);
        width = this.unitSize.toPixel(width);
        this.setAttribute("width", width);
        this.rectBorder.setAttribute("width", width.toString());
        this.width = width;
        this._origin.x = -value[0];

    }

    set ydomain(value: [number, number]) {
        this._ydomain = value;
        if(value[0] >= value[1]){
            throw new Error("The first value of the yDomain must be lower than the second value")
        }

        let height = (value[1] - value[0]);
        height = this.unitSize.toPixel(height);
        this.setAttribute("height", height);
        this.rectBorder.setAttribute("height", height.toString());
        this.height = height;
        this._origin.y = -value[0];
        console.log(this._origin)
    }


    get figure(): Figure {
        return this._figure;
    }


    get xdomain(): [number, number] {
        return this._xdomain;
    }

    get ydomain(): [number, number] {
        return this._ydomain;
    }

    get origin(): Coordinate2D {
        return this._origin;
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
}
