import {UnitSize} from "./unit-size";
import {Assert} from "./assert";

export abstract class GraphElement <T extends SVGElement> {

    protected readonly _parent: GraphElement<SVGElement>;
    protected readonly _element: T;
    protected _classList: [] = [];
    protected _style: string;
    protected _id: string;
    protected _zIndex: number;


    constructor(parent?: GraphElement<SVGElement>) {

        this._parent = parent;
        this._element = this.buildSvgElement();
        if (parent) {
            parent.element.appendChild(this.element);
        }
    }

    protected abstract buildSvgElement(): T;
    protected _x: number = 0;
    protected _y: number = 0;


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
        //let y = value - this.height;
        this.setAttribute("y", value);
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

    get parent(): GraphElement<SVGElement> {
        return this._parent;
    }

}