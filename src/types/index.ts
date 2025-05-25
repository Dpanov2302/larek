import { IBasket } from '../components/Basket';
import { IProduct } from '../components/Product';

export interface IProductList {
    products: IProduct[];
    setProducts(): void;
}

export interface IOrderResult {
    id: string;
    total: number;
}

export type Payment = 'online' | 'offline';

export interface IOrderForm {
    payment: Payment;
    email: string;
}

export interface IContacts {
    phone: string;
    address: string;
}

export interface IOrder extends IOrderForm, IContacts {
    total: number;
    items: string[];
}