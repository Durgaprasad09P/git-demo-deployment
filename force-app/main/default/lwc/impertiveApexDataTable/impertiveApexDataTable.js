import { LightningElement } from 'lwc';
import searchAccountRecords from '@salesforce/apex/GetAllAccountRecords.SearchAccountRecords';

const tableColumns = [
  { label: 'Account Name', fieldName: 'Name', sortable: true },
  { label: 'Rating', fieldName: 'Rating', sortable: true },
  { label: 'Industry Name', fieldName: 'Industry', sortable: true },
  { label: 'Annual Revenue', fieldName: 'AnnualRevenue', sortable: true },
  { label: 'Account Type', fieldName: 'Type', sortable: true },
  { label: 'Ownership', fieldName: 'Ownership', sortable: true },
  { label: 'Contact Number', fieldName: 'Phone', sortable: true },
  { label: 'Fax Number', fieldName: 'Fax', sortable: true },
  { label: 'SLA', fieldName: 'SLA__c', sortable: true },
  { label: 'Priority', fieldName: 'CustomerPriority__c', sortable: true },
  { label: 'Active Status', fieldName: 'Active__c', sortable: true }
];

export default class ImpertiveApexDataTable extends LightningElement {
  searchContent = '';
  matchingAccountRecords = [];
  accountRecordColumns = tableColumns;

  handleOnChange(event) {
    this.searchContent = event.target.value;
  }

  searchMatchingAccounts() {
    if (!this.searchContent || this.searchContent.trim() === '') {
      this.matchingAccountRecords = [];
      return;
    }

    searchAccountRecords({ startingChars: this.searchContent })
      .then(result => {
        this.matchingAccountRecords = result;
      })
      .catch(error => {
        console.error('Error while fetching records', error);
        this.matchingAccountRecords = [];
      });
  }
}
