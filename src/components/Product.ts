import { Component } from './base/Component';

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: string;
    description: string;
    price: number;
}

export class Product extends Component<IProduct> {
    protected _title: HTMLElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _description: HTMLElement;
    protected _price: HTMLElement;

    constructor(protected blockName: string, container: HTMLElement) {
        super(container);
    }

    set setId(val: string) {
        this.container.dataset.id = val;
    }

    get getId() {
        return this.container.dataset.id || '';
    }

    set setTitle(val: string) {
        this.setText(this._title, val);
    }

    get getTitle() {
        return this._title.textContent || '';
    }

    set image(val: string) {
        this.setImage(this._image, val, this._title.textContent);
    }
}