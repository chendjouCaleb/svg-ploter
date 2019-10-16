import {SVG_NAMESPACE} from "./constant";

export function createPathElement(): SVGPathElement{
    return document.createElementNS(SVG_NAMESPACE, "path") as SVGPathElement
}