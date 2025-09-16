import { LightningElement ,wire,api} from 'lwc';
import getParentAccounts from '@salesforce/apex/AccountController.getParentAccounts';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_ID from '@salesforce/schema/Account.Id';
import ACCOUNT_PARENT from '@salesforce/schema/Account.ParentId';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_SLA_EXPIRY_DT from '@salesforce/schema/Account.SLAExpirationDate__c';
import ACCOUNT_DESCRIPTION from '@salesforce/schema/Account.Description';
import ACCOUNT_NO_OF_LOCATIONS from '@salesforce/schema/Account.NumberofLocations__c';
import SLA_TYPE from '@salesforce/schema/Account.SLA__c';
import { createRecord, deleteRecord, getFieldValue, getRecord ,updateRecord} from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const fieldsToLoad = [ACCOUNT_PARENT,ACCOUNT_NAME,ACCOUNT_SLA_EXPIRY_DT,SLA_TYPE,ACCOUNT_NO_OF_LOCATIONS,ACCOUNT_DESCRIPTION]
export default class AccountDetails extends NavigationMixin(LightningElement) {
  parentoptions = [];
  selparentAcc = '';
  selnooflocations = '1';
  selAccName = '';
  selslatype = '';
  selDescription = '';
  selSLAExDate = null;
  @api recordId;

  @wire(getRecord, {
    recordId: '$recordId',
    fields: fieldsToLoad
  }) wiredgetRecord_Function({ data, error }) {
    if (data) {
      console.log('Getting existing values', data);
      this.selparentAcc = getFieldValue(data, ACCOUNT_PARENT);
      this.selnooflocations = getFieldValue(data, ACCOUNT_NO_OF_LOCATIONS);
      this.selAccName = getFieldValue(data, ACCOUNT_NAME);
      this.selslatype = getFieldValue(data, SLA_TYPE);
      this.selDescription = getFieldValue(data, ACCOUNT_DESCRIPTION);
      this.selSLAExDate = getFieldValue(data, ACCOUNT_SLA_EXPIRY_DT);
    } else if (error) {
      console.log('error message during retrieval', error);
    }
  }
    
  @wire(getParentAccounts)
  wiredParentAccounts({ error, data }) {
    this.parentoptions = [];
    if (data) {
      this.parentoptions = data.map((currItem) => ({
        label: currItem.Name,
        value: currItem.Id
      }));
    } else if (error) {
      console.log('error while getting parent records', error);
    }
  }
  @wire(getObjectInfo,
    {
      objectApiName: ACCOUNT_OBJECT
    }
  ) accountobjectinfo;
   
  @wire(getPicklistValues, {
    recordTypeId: '$accountobjectinfo.data.defaultRecordTypeId',
    fieldApiName: SLA_TYPE
  }) slapicklist;
  
  handleChange(event) {
    let { name, value } = event.target;
    if (name === 'parentacc') {
      this.selparentAcc = value;
    }
    if (name === 'nooflocations') {
      this.selnooflocations = value;
    }
    if (name === 'slatype') {
      this.selslatype = value;
    }
    if (name === 'accName') {
      this.selAccName = value;
    }
    if (name === 'slaexdt') {
      this.selSLAExDate = value;
    }
    if (name === 'description') {
      this.selDescription = value;
    }

        
  }

  saveRecord() {
    console.log('ACCOUNT_OBJECT', ACCOUNT_OBJECT);
    console.log('ACCOUNT_NAME', ACCOUNT_NAME);
    if (this.validateInput()) {
      let inputFields = {};
      inputFields[ACCOUNT_SLA_EXPIRY_DT.fieldApiName] = this.selSLAExDate;
      inputFields[ACCOUNT_PARENT.fieldApiName] = this.selparentAcc;
      inputFields[ACCOUNT_NO_OF_LOCATIONS.fieldApiName] = this.selnooflocations;
      inputFields[ACCOUNT_NAME.fieldApiName] = this.selAccName;
      inputFields[SLA_TYPE.fieldApiName] = this.selslatype;
      inputFields[ACCOUNT_DESCRIPTION.fieldApiName] = this.selDescription;
      if (this.recordId) {
        inputFields[ACCOUNT_ID.fieldApiName] = this.recordId;
        let recordInput = {
          fields: inputFields
        };
        updateRecord(recordInput)
          .then((result) => {
            console.log('ACCOUNT UPDATED SUCCESSFULLY', result);
            this.showToast();
          })
          .catch((error) => {
            console.log('error while updating record', error);
          });
        
        
      } else {
        let recordInput = {
          apiName: ACCOUNT_OBJECT.objectApiName,
          fields: inputFields
        };
        createRecord(recordInput)
          .then((result) => {
            console.log('ACCOUNT CREATED SUCCESSFULLY', result);
            this.dispatchEvent(
              new ShowToastEvent({
                title: 'Success',
                message: 'Record created successfully',
                variant: 'success'
              })
            );

            let pageRef = {
              type: 'standard__recordPage',
              attributes: {
                recordId: result.id,
                objectApiName: ACCOUNT_OBJECT.objectApiName,
                actionName: 'view'
              }
            };

            this[NavigationMixin.Navigate](pageRef);
          
          })
          .catch((error) => {
            console.log('error while saving record', error);
          });
      }
    }
      
    else {
      console.log('Input is not valid');
    }
      

  }
  validateInput() {
    let fields = Array.from(this.template.querySelectorAll('.validateme'));
    let isValid = fields.every((curritem) => curritem.checkValidity());
    return isValid;
  }
  get formTitle() {
    if (this.recordId) {
      return 'Edit Account';
    }
    else {
      return 'Create Account';
    }

  }
  get isDeletedAvilable() {
    if (this.recordId) {
      return true;
    }
    else {
      return false;
    }
  }
  showToast() {
    const event = new ShowToastEvent({
      title: 'Success',
      message: 'Record Updated successfully ',
      variant: 'success'
    });
    this.dispatchEvent(event);
  }
  deleteHandler() {
    deleteRecord(this.recordId)
      .then(() => {
        console.log('ACCOUNT DELETED SUCCESSFULLY', this.recordId);
         this.dispatchEvent(
          new ShowToastEvent({
            title: 'Success',
            message: 'Record Deleted successfully',
            variant: 'success'
          })
        );
        let pageref =
        {
          type: 'standard__objectPage',
          attributes: {
            objectApiName: 'ns__Widget__c',
            actionName: 'list'
          },
          state: {
            filterName: 'AllAccounts'
          }
        };
        
        this[NavigationMixin.Navigate](pageref);
      })
      .catch((error) => {
        console.log('error while deleting record', error);
      });
  }
}