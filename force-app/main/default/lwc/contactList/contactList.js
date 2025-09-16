import { LightningElement ,wire} from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
import {publish,MessageContext} from 'lightning/messageService';
import recordSelected from '@salesforce/messageChannel/sendContactMessage__c';



export default class ContactList extends LightningElement {
  @wire(getContactList) contacts;
  @wire(MessageContext)
  messageContext;
  selectedContact;
  selectionHandler(event) {
    let selectedContactId = event.detail;

    this.selectedContact = this.contacts.data.find(
      (currItem) => currItem.Id === selectedContactId);
    
    const payload = {lmsData: this.selectedContact};
    publish(this.messageContext, recordSelected, payload);
  }
}