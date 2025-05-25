import { IOrderResult, IProductList, IOrder } from '../types';
import { Api } from './base/api';
import { IProduct } from './Product';

export interface ILarekAPI {
    getProductList(): Promise<IProductList>;
    getProduct(id: string): Promise<IProduct>;
    makeOrder(order: IOrder): Promise<IOrderResult>;
}

export class LarekAPI extends Api implements ILarekAPI {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
    }

    getProductList(): Promise<IProductList> {
        return this.get(`/product`).then((products: IProductList) => ({
            ...products,
        }));
    }

    getProduct(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then((product: IProduct) => product);
    }

    makeOrder(order: IOrder): Promise<IOrderResult> {
        return this.post(`/order`, order).then((res: IOrderResult) => res);
    }
}