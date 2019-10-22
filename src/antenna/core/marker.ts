import {GraphFillableElement} from "./graph-fillable-element";
import {SVG_NAMESPACE} from "./constant";

export class Marker extends GraphFillableElement<SVGRectElement>{
    constructor(parent?: GraphFillableElement<SVGElement>) {
        super(parent);
        this.width = 20;
        this.height = 20;
        this.backgroundColor = "red";
    }
    protected buildSvgElement(): SVGRectElement {
        return document.createElementNS(SVG_NAMESPACE, "rect");
    }

}