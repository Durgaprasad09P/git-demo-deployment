import { LightningElement, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import Rating_FIELD from '@salesforce/schema/Account.Rating';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import ACCOUNT_TYPE_FIELD from '@salesforce/schema/Account.Type';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class RecordFormDemo extends NavigationMixin(LightningElement) {
  @api objectApiName;
  @api recordId;
  fieldList = [NAME_FIELD, INDUSTRY_FIELD, Rating_FIELD, REVENUE_FIELD, ACCOUNT_TYPE_FIELD];
  showToast() {
    const event = new ShowToastEvent({
      title: 'success',
      message:
        'Record updated Successfully',
      variant: 'success'
    });
    this.dispatchEvent(event);
  }
  navigateToRecordPage(event) {

    console.log("event Details", event.detail);
    console.log('event Details ', JSON.stringify(event.detail));

    let pageRef = {
      type: 'standard__recordPage',
      attributes: {
        recordId: event.detail.id,
        objectApiName: this.objectApiName,
        actionName: 'view'
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }
}