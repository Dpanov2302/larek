import { IProductList } from '../types';
import { IBasket } from './Basket';

export interface IPage {
    counter: number;
    basket: IBasket;
    products: IProductList;
}