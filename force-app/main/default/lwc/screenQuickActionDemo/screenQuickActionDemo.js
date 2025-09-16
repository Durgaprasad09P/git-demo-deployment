import { LightningElement ,api} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_IDUSTRY from '@salesforce/schema/Account.Industry';
import { CloseActionScreenEvent } from 'lightning/actions';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class ScreenQuickActionDemo extends LightningElement {
  @api recordId;
  @api objectApiName;
  fields = {
    accountName: ACCOUNT_NAME,
    accountIndustry: ACCOUNT_IDUSTRY
  };

  closeModal(){
    this.dispatchEvent(new CloseActionScreenEvent());
  }
  successHandler() {
    const event = new ShowToastEvent({
      title: 'Success',
      message: 'Account Updated Successfully',
      variant: 'success',  
   
    });
    this.dispatchEvent(event);
    this.dispatchEvent(new CloseActionScreenEvent());
 }

}