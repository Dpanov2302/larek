import { IOrder, Payment } from '../types';
import { IEvents } from './base/events';
import { Form } from './common/Form';

export class Order extends Form<IOrder> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set payment(val: Payment) {
        (this.container.elements.namedItem('payment') as HTMLSelectElement).value =
            val;
    }

    set email(val: Payment) {
        (this.container.elements.namedItem('email') as HTMLSelectElement).value =
            val;
    }

    set phone(val: Payment) {
        (this.container.elements.namedItem('phone') as HTMLSelectElement).value =
            val;
    }

    set address(val: Payment) {
        (this.container.elements.namedItem('address') as HTMLSelectElement).value =
            val;
    }
}