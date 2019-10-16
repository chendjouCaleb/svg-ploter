import { GraphElement } from "./graph-element";
import { Label } from "./label";
import { Coordinate2D } from "./coordinates";
import { Graph } from "./graph";
import {SVG_NAMESPACE} from "./constant";

export class Axis extends GraphElement<SVGLineElement>{
    graph: Graph;

    ticks: AxisTicks[] = [];

    /**
     * The named label of the axis. Ex: x, y
     */
    label: Label;
    start: Coordinate2D;
    end: Coordinate2D;

    protected buildSvgElement(): SVGLineElement {
        return document.createElementNS(SVG_NAMESPACE, "line");
    }
}

/**
 * A ticks marker of an axis
 */
export class AxisTicks extends GraphElement<SVGLineElement> {
    label: Label;
    start: Coordinate2D;
    end: Coordinate2D;

    protected buildSvgElement(): SVGLineElement {
        return document.createElementNS(SVG_NAMESPACE, "line");
    }
}