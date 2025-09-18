import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
  handleReset() {
    const childComponent = this.template.querySelector('c-child-component');
    childComponent.resetForm();
  }
}
  