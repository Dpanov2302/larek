import { LarekAPI } from './components/LarekAPI';
import './scss/styles.scss';
import { IProductList } from './types';
import { API_URL, CDN_URL } from './utils/constants';

const api = new LarekAPI(CDN_URL, API_URL);

api.getProductList().then((products: IProductList) => console.log(products));