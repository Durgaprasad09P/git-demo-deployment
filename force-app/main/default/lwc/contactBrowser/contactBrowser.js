import { LightningElement ,wire} from 'lwc';
import getContactListByFilter from '@salesforce/apex/ContactBrowserController.getContactListByFilter'
export default class ContactBrowser extends LightningElement {
  selectedAccountId='';
  selectedIndustry = '';
  
    @wire(getContactListByFilter, {
      accountId: "$selectedAccountId",
      industry: "$selectedIndustry"
    })
    
    contactsFunction({ data, error }) {
      if (data) {
        console.log("searched Contacts: ",data)
      }
      if (error) {
        console.log("searched Contacts Failed ",error)
      }
    }
  handleFilterChange(event) {
    this.selectedAccountId = event.detail.accountId;
     this.selectedIndustry = event.detail.industry;
  }
    
}