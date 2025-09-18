import { LightningElement } from "lwc";
export default class ParentComponent extends LightningElement {
    handleReset() {
        this.template.querySelectorAll('c-child-component').forEach(child => child.resetForm());
        
             // call @api method on each child
        
    }
}
