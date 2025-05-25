import { IProduct } from '../components/Product';

export interface IProductList {
    products: IProduct[];
    setProducts(): void;
}

export interface ICart {
    products: Map<string, IProduct>;
    addProduct(id: string): void;
    removeProduct(id: string): void;
}

export interface IOrderResult {
    id: string;
    total: number;
}