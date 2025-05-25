import { AppState } from './components/AppData';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/Basket';
import { Card } from './components/Card';
import { Modal } from './components/common/Modal';
import { Success } from './components/common/Success';
import { LarekAPI } from './components/LarekAPI';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { IProduct } from './components/Product';
import './scss/styles.scss';
import { IOrderForm, IProductList } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
});

const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

const appData = new AppState({}, events);

const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);

events.on('items:changed', () => {
    page.gallery = appData.gallery.map((item: IProduct) => {
        const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item),
        });
        return card.render({
            title: item.title,
            image: item.image,
            description: item.description,
            category: item.category,
            price: item.price,
        });
    });

    page.counter = appData.getBasketTotal();
});

events.on('order:submit', () => {
    api
        .makeOrder(appData.order)
        .then((result) => {
            const success = new Success(cloneTemplate(successTemplate), {
                onClick: () => {
                    modal.close();
                    appData.clearBasket();
                    events.emit('auction:changed');
                },
            });

            success.setTotal(result.total);

            modal.render({
                content: success.render({}),
            });
        })
        .catch((err) => {
            console.error(err);
        });
});

// events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
// 	const { email, phone } = errors;
// 	order.valid = !email && !phone;
// 	order.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
// });

events.on(
    /^order\..*:change/,
    (data: { field: keyof IOrderForm; value: string }) => {
        appData.setOrderField(data.field, data.value);
    }
);

// Открыть форму заказа
events.on('order:open', () => {
    modal.render({
        content: order.render({
            phone: '',
            email: '',
            valid: false,
            errors: [],
        }),
    });
});

events.on('basket:open', () => {
    modal.render({
        content: createElement<HTMLElement>('div', {}, [basket.render()]),
    });
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});

api
    .getProductList()
    .then((products: IProductList) => {
        appData.setGallery(products);
    })
    .catch((err) => {
        console.error(err);
    });