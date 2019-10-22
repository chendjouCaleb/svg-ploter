import {UnitSize} from "./unit-size";
import {Assert} from "./assert";
import {SVG_NAMESPACE} from "./constant";
import {GraphElement} from "./graph-element";

export abstract class GraphFillableElement<T extends SVGElement> extends GraphElement<T>{
    constructor(parent?: GraphElement<SVGElement>){

        super(parent);
        this._rectBorder = document.createElementNS(SVG_NAMESPACE, "rect");
        this.element.appendChild(this._rectBorder);

        this.borderWidth = 1;
        this.backgroundColor = "transparent"
    }



    protected readonly _rectBorder: SVGRectElement;





    protected _width: number;
    protected _height: number;
    protected _backgroundColor: string;
    protected _backgroundOpacity: number;
    protected _borderWidth: number;
    protected _borderColor: string;
    protected _borderOpacity: number;
    protected _borderStyle: string;


    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.setAttribute("width", value);
        this._rectBorder.setAttribute("width", value.toString());
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.setAttribute("height", this.height);
        this._rectBorder.setAttribute("height", value.toString());

        if(this.parent){
            this.y = this._y;
        }
    }




    get backgroundColor(): string {
        return this._backgroundColor;
    }

    set backgroundColor(value: string) {
        this._backgroundColor = value;
        this._rectBorder.setAttribute("fill", value);
    }


    get backgroundOpacity(): number {
        return this._backgroundOpacity;
    }

    set backgroundOpacity(value: number) {
        this._backgroundOpacity = value;
        this._rectBorder.setAttribute("fill-opacity", value.toString());
    }

    get borderOpacity(): number {
        return this._borderOpacity;
    }

    set borderOpacity(value: number) {
        this._borderOpacity = value;
        this._rectBorder.setAttribute("stroke-opacity", value.toString());
    }

    get borderWidth(): number {
        return this._borderWidth;
    }

    set borderWidth(value: number) {
        this._borderWidth = value;
        this._rectBorder.setAttribute("stroke-width", value.toString());
    }

    get borderStyle(): string {
        return this._borderStyle;
    }

    set borderStyle(value: string) {
        this._borderStyle = value;
        this._rectBorder.setAttribute("style", value);
    }


    get borderColor(): string {
        return this._borderColor;
    }

    set borderColor(value: string) {
        this._borderColor = value;
        this._rectBorder.setAttribute("stroke", value);
    }



    get rectBorder(): SVGRectElement {
        return this._rectBorder;
    }



}