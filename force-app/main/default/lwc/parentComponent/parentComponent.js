export default class ParentComponent extends LightningElement {
    handleReset() {
        const childComponents = this.template.querySelectorAll('c-child-component');
        childComponents.forEach(child => {
            child.resetForm(); // call @api method on each child
        });
    }
}
