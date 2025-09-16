import { LightningElement, wire} from 'lwc';
import Account_OBJECT from '@salesforce/schema/Account';
import Account_INDUSTRY from '@salesforce/schema/Account.Industry';
import { NavigationMixin } from 'lightning/navigation';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
export default class ContactFilter extends NavigationMixin(LightningElement) {
  selectedAccountId='';
  selectedIndustry='';
  isButtonDisabled = true;

  @wire(getObjectInfo, {
    objectApiName: Account_OBJECT
  })
  accountinfo;

  @wire(getPicklistValues, {
    recordTypeId: "$accountinfo.data.defaultRecordTypeId",
    fieldApiName: Account_INDUSTRY
        
  })
  industryPickList;


  selectedRecordHandler(event) {
    this.selectedAccountId = event.detail;
      console.log('this.selectedAccountId: ', this.selectedAccountId);
     if(this.selectedAccountId ){
       this.isButtonDisabled = false;
     }
    else{
      this.isButtonDisabled = true;
     }
    this.notifyFilterChange();
  
  }
  handleChange(event) {
    this.selectedIndustry = event.target.value;
    this.notifyFilterChange();
  }

  addNewContact() {
    let defaultValues = encodeDefaultFieldValues({
      AccountId: this.selectedAccountId
    });
    let pageRef =
    {
      type: 'standard__objectPage',
      attributes: {
        objectApiName: 'Contact',
        actionName: 'new'
      },
      state: {
        defaultFieldValues: defaultValues
      }
    };
    this[NavigationMixin.Navigate](pageRef);
   
  }
  notifyFilterChange() {
    let myCustomEvent=new CustomEvent('filterchange',{
      detail: {
        accountId:this.selectedAccountId,
        industry: this.selectedIndustry
      }
    });
    this.dispatchEvent(myCustomEvent);
  }
}