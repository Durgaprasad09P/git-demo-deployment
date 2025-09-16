import { LightningElement ,api} from 'lwc';

export default class ContactItem extends LightningElement {
  @api contact;

  clickHandler(event) {
    event.preventDefault();
    console.log(this.contact);
    const selectionevent = new CustomEvent("selection",
      { detail : this.contact.Id });
  
  
    this.dispatchEvent(selectionevent);
  
    // fire the custom event
  }
}