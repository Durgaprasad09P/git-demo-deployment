import { LightningElement } from 'lwc';

export default class SimpleInterestCalComponent extends LightningElement {

    productQuantity = 0;
    unitPrice = 0;
    discount = 0;

    billAmount = 0;
    discountAmount = 0;
    netAmount = 0;

    handleOnChange(event) {
        const name = event.target.name;
        const value = parseFloat(event.target.value);

        if (name === 'ProductQuantity') {
            this.productQuantity = isNaN(value) ? 0 : value;
        } else if (name === 'UnitPrice') {
            this.unitPrice = isNaN(value) ? 0 : value;
        } else if (name === 'Discount') {
            this.discount = isNaN(value) ? 0 : value;
        }
    }

    calculateBill() {
        this.billAmount = this.productQuantity * this.unitPrice;
        this.discountAmount = (this.billAmount * this.discount) / 100;
        this.netAmount = this.billAmount - this.discountAmount;

        console.log('Qty:', this.productQuantity);
        console.log('Unit Price:', this.unitPrice);
        console.log('Discount:', this.discount);
        console.log('Total:', this.billAmount);
        console.log('Discount Amount:', this.discountAmount);
        console.log('Net:', this.netAmount);
        this.productQuantity="";
        this.unitPrice="";
        this.discount="";
    }

    // reset
    


}