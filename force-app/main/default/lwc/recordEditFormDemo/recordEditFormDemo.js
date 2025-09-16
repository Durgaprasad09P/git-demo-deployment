import { LightningElement ,api} from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import ACCOUNT_RATING_FIELD from '@salesforce/schema/Account.Rating';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_DATE_FIELD from '@salesforce/schema/Account.SLAExpirationDate__c';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RecordEditFormDemo extends NavigationMixin(
  LightningElement) {
  @api recordId;
  @api objectApiName;



  fields = {
    name: ACCOUNT_NAME_FIELD,
    rating: ACCOUNT_RATING_FIELD,
    industry: ACCOUNT_INDUSTRY,
    sladate: ACCOUNT_DATE_FIELD
  }
  
  successHandler(event) {
    // Handle success
    console.log('successHandler event: ', event);
    let pageref = {
      type: 'standard__recordPage',
      attributes: {
        recordId: event.detail.id,
        objectApiName: this.objectApiName,
        actionName: 'view'
      }
    };
    this[NavigationMixin.Navigate](pageref);
  }

  handleError(event) {
    // Handle error
    console.log('handleError event: ', event.detail);

    const cusevent = new ShowToastEvent({
      title: 'Error',
      message: event.detail.message,
      variant: 'error'
    });
     
    this.dispatchEvent(cusevent);
  }
  submitHandler(event) {
    // Handle submit
    console.log('submit event: ', event.detail);
    console.log(JSON.stringify(event.detail));
        
    event.preventDefault();
    const fields = event.detail.fields;
    if (!fields.Industry) {
       fields.Industry = 'Energy';
    }
    this.template.querySelector('lightning-record-edit-form').submit(fields);
  }
  clickHandler() {
  let inputField = this.template.querySelector('lightning-input-field');
    inputField.forEach((curritem) => {
      curritem.reset();
    })
    
  }
}