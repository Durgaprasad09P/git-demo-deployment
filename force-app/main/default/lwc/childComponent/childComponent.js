import { LightningElement ,api} from 'lwc';

export default class ChildComponent extends LightningElement {
  name = '';

  @api resetForm() {
    this.name = '';
  }
  
  handleInputChange(event) {
    this.name = event.target.value;
  }


}