import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class HederlessQuickActionDemo extends NavigationMixin(LightningElement) {
  @api invoke() {
    this[NavigationMixin.Navigate]({
      type: 'standard__objectPage',
      attributes: {
        objectApiName: 'Contact',
        actionName: 'home'
      }
    });
  }
}