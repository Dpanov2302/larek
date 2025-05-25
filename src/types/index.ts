import { IBasket } from '../components/Basket';
import { IProduct } from '../components/Product';

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
    items: string[];
}

export interface IAppState {
    basket: IBasket[];
    gallery: IProduct[];
    order: IOrder | null;
    loading: boolean;
}

export type formErrors = Partial<Record<keyof IOrder, string>>;

export interface IProductList {
    total: number;
    items: IProduct[];
}