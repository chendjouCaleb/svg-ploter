import {UnitSize} from "./unit-size";
import {Assert} from "./assert";
import {SVG_NAMESPACE} from "./constant";

export abstract class GraphElement<T extends SVGElement> {
    constructor(parent?: GraphElement<SVGElement>){

        this._parent = parent;
        this._element = this.buildSvgElement();
        if(parent){
            parent.element.appendChild(this.element);
        }
        this._rectBorder = document.createElementNS(SVG_NAMESPACE, "rect");
        this.element.appendChild(this._rectBorder);

        this.borderWidth = 1;
        this.backgroundColor = "transparent"
    }

    private readonly _parent: GraphElement<SVGElement>;
    private readonly _element: T;
    private _classList: [] = [];
    private _style: string;
    private _id: string;
    private _zIndex: number;

    private readonly _rectBorder: SVGRectElement;

    /**
     * The unit size used to compute distance length in graph.
     */
    private _unitSize: UnitSize = new UnitSize(1);


    private _x: number = 0;
    private _y: number = 0;
    private _width: number;
    private _height: number;
    private _backgroundColor: string;
    private _backgroundOpacity: number;
    private _borderWidth: number;
    private _borderColor: string;
    private _borderOpacity: number;
    private _borderStyle: string;

    protected abstract buildSvgElement(): T;

    /**
     * Used to set a numerical value as length of a unit size.
     * @param length The length of unit size in pixel.
     */
    setUnitSize(length: number) {
        this._unitSize = new UnitSize(length);
    }


    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.setAttribute("width", this.realWidth);
        this._rectBorder.setAttribute("width", this.realWidth.toString());
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this.setAttribute("height", this.realHeight);
        this._rectBorder.setAttribute("height", this.realHeight.toString());

        if(this.parent){
            this.y = this._y;
        }
    }


    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
        this.setAttribute("x", this._x);
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
        let y = this.parent.height - value - this.height;
        this.setAttribute("y", y);
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

    get unitSize(): UnitSize {
        return this._unitSize;
    }



    get realWidth(): number {
        return this.unitSize.toPixel(this._width);
    }

    get realHeight(): number {
        return this.unitSize.toPixel(this._height);
    }

    public setAttribute(key: string, value: any) {
        Assert.isNotNullOrWhiteSpace(key);
        Assert.isNotNull(value);
        this.element.setAttribute(key, value.toString());
    }

    get element(): T{
        return this._element;
    }


    get classList(): [] {
        return this._classList;
    }

    get style(): string {
        return this._style;
    }

    get id(): string {
        return this._id;
    }

    get zIndex(): number {
        return this._zIndex;
    }

    get rectBorder(): SVGRectElement {
        return this._rectBorder;
    }


    get parent(): GraphElement<SVGElement> {
        return this._parent;
    }
}