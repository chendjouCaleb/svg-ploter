import {FigureProperty} from "./graph-element-property";
import {SVG_NAMESPACE} from "./constant";
import {Graph} from "./graph";
import {UnitSize} from "./unit-size";
import {GraphFillableElement} from "./graph-fillable-element";

export class Figure extends GraphFillableElement<SVGElement>{
    protected buildSvgElement(): SVGElement {
        return document.createElementNS(SVG_NAMESPACE, "svg");
    }

    private _graphs: Graph[] = [];

    constructor(private htmlElement: HTMLElement) {
        super();

        this.htmlElement.appendChild(this.element);
    }


    addGraph(x: number = 0, y: number = 0){
        let graph = new Graph(this);
        graph.x = x;
        graph.y = y;


        this._graphs.push(graph);

        return graph;
    }


}