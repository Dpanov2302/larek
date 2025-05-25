import { createElement } from '../utils/utils';
import { Component } from './base/Component';
import { EventEmitter } from './base/events';
import { IProduct } from './Product';

export interface IBasket {
    products: Map<string, IProduct>;
    total: number;
    addProduct(id: string): void;
    removeProduct(id: string): void;
}

interface IBasketView {
    products: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasketView> {
    protected _submit: HTMLButtonElement;
    protected _price: HTMLElement;
    protected _list: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._submit = this.container.querySelector('.basket__button');
        this._price = this.container.querySelector('.basket__price');
        this._list = this.container.querySelector('.basket__list');

        if (this._submit) {
            this._submit.addEventListener('click', () => {
                console.log('submit basket');
            });
        }
    }

    set products(products: HTMLElement[]) {
        if (products.length) {
            this._list.replaceChildren(...products);
        } else {
            this._list.replaceChildren(
                createElement<HTMLParagraphElement>('p', {
                    textContent: 'Корзина пуста',
                })
            );
        }
    }

    set total(total: number) {
        this.setText(this._price, total);
    }
}