import { LightningElement ,wire} from 'lwc';
import getContactListForDataTable from '@salesforce/apex/ContactController.getContactListForDataTable';
const columns = [
  {
    label: 'Name',
    type: "customNameType",
    typeAttributes: {
      contactName: {
        fieldName: 'Name'
      }
    
  } },
  {
    label: 'Account Name',
    fieldName: 'accountLink',
    type: 'url',
    typeAttributes: {
      label: {
        fieldName: 'accountName'
      },
      target: '_blank'
    }
      }
  ,
  {
    label: 'Title',
    fieldName: 'Title',
    cellAttributes: { 
      class: {
        fieldName: 'titlecolor'
      }
     }
  },
  {
    label: 'Rank',
    fieldName: 'Rank__c',
    type: 'customRank',
    typeAttributes: {
      rankIcon: {
        fieldName: 'rankIcon'
      }
    }
  },
    { label: 'Phone', fieldName: 'Phone' ,type:'phone'},
    { label: 'Email', fieldName: 'Email' ,type:'email'},
  {
    label: 'Picture',
    type: 'customImage',
    typeAttributes: {
      imageUrl: {
        fieldName: 'PhotoUrl__c'
      }
    }, cellAttributes: {
      alignment: 'center'
    }
  }
];
export default class CustomStyleDataTable extends LightningElement {
  contacts;
  columns = columns;
  @wire(getContactListForDataTable)wiredContacts({ data, error }) {
    if (data) {
      //this.contacts = data;
     this.contacts = data.map((record) => {
        let accountLink = "/" + record.AccountId;
       let accountName = record.Account.Name;
       let titlecolor = "slds-text-color_success";
       let rankIcon = record.Rank__c > 5 ? "utility:ribbon" : "";
        return {
          ...record,
          accountLink: accountLink,
          accountName: accountName,
          titlecolor: titlecolor,
           rankIcon: rankIcon
          
        };
      });
      

      console.log(data);
    } else {
      console.log(error);
    }
  }
}