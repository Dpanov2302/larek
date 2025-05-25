import { IBasket } from './Basket';

export interface IOrder {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    getProductsFromBasket(cart: IBasket): void;
}