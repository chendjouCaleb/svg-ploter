import {GraphElement} from "../graph-element";
import {SVG_NAMESPACE} from "../constant";
import {Axis} from "./axis";

export class AxisLine  extends GraphElement<SVGElement>{
    constructor(private _axis: Axis) {
        super(_axis);
        this.setAttribute("x1", 0);
        this.setAttribute("x2", 0);
        this.setAttribute("y1", 0);
        this.setAttribute("y2", 0);
        this.setAttribute("stroke-width", "2");
        this.setAttribute("stroke", "#555");
    }
    protected buildSvgElement(): SVGLineElement {
        return document.createElementNS(SVG_NAMESPACE, "line");
    }
}