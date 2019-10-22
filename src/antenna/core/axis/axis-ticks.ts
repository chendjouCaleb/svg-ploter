/**
 * A ticks marker of an axis
 */
import {SVG_NAMESPACE} from "../constant";
import {Coordinate2D} from "../coordinates";
import {Label} from "../label";
import {GraphFillableElement} from "../graph-fillable-element";

export class AxisTicks extends GraphFillableElement<SVGLineElement> {
    label: Label;
    start: Coordinate2D;
    end: Coordinate2D;

    protected buildSvgElement(): SVGLineElement {
        return document.createElementNS(SVG_NAMESPACE, "line");
    }
}