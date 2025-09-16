import { LightningElement,api ,wire} from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TICKER from '@salesforce/schema/Account.TickerSymbol';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import updateTickerRecord from '@salesforce/apex/AccountHelper.updateTickerRecord';
export default class ImperativeApexForm extends LightningElement {
  @api recordId;
  accname = '';
  accticker = '';
  @wire(getRecord, {
      recordId: '$recordId',
           fields: [ACCOUNT_NAME,ACCOUNT_TICKER]
  })
  outputFuction({ data, error }) {
    if (data) {
      console.log('Get Record Account',data);
      this.accname = getFieldValue(data,ACCOUNT_NAME);
      this.accticker = getFieldValue(data,ACCOUNT_TICKER);
    }
    else if (error) {
      console.log('Get Record Account',error);
    }
  }
  changeHandler(event) {
    this.accticker = event.target.value;
  }

  updateTicker() {
    updateTickerRecord({
      recordId: this.recordId,
      newTicker: this.accticker
    })
      .then(result => {
        console.log('Update Ticker Record succesfully', result);
        
        notifyRecordUpdateAvailable([{recordId: this.recordId}]);
      })
    .catch(error => {
        console.log('Update Ticker Record Failed',error);
    });
}

}