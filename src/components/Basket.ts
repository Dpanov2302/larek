import { IProduct } from './Product';

export interface IBasket {
    products: Map<string, IProduct>;
    addProduct(id: string): void;
    removeProduct(id: string): void;
}