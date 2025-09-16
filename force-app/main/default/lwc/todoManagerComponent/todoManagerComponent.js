
import { createRecord,deleteRecord, updateRecord } from 'lightning/uiRecordApi';
import { LightningElement,wire } from 'lwc';
import TASK_MANAGER_OBJECT from '@salesforce/schema/ToDoManager__c';
import TASK_NAME_FIELD from '@salesforce/schema/ToDoManager__c.Name';
import TASK_DATE_FIELD from '@salesforce/schema/ToDoManager__c.Task_Date__c';
import COMPLETED_FIELD from '@salesforce/schema/ToDoManager__c.Completed_Date__c';
import IS_COMPLETED_FIELD from '@salesforce/schema/ToDoManager__c.Is_Completed__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import loadAllInCompleteRecords from '@salesforce/apex/ToDoManager.loadAllInCompleteRecords';
import loadAllCompleteRecords from '@salesforce/apex/ToDoManager.loadAllCompleteRecords';
import ID_FIELD from '@salesforce/schema/ToDoManager__c.Id';
import {refreshApex} from '@salesforce/apex';
export default class TodoManagerComponent extends LightningElement {

    taskname = "";
    taskdate = null;
    incompletedtask = [];
    completedtask = [];
    inCompleteTaskResult;
    completeTaskResult;

    
    @wire(loadAllInCompleteRecords)
    wiredIncompleteRecords(result) {
        this.inCompleteTaskResult = result;
        let { data, error } = result;
        if (data) {
            console.log("incomplete Task Records", data);
            this.incompletedtask = data.map((curritem) => ({
                taskId: curritem.Id,
                taskname: curritem.Name,
                taskdate: curritem.Task_Date__c
                
            }));
            console.log("incomplete task array", this.incompletedtask);
        }
        else if (error) {
            console.log("Complete task records", error);
        }

    }
     @wire(loadAllCompleteRecords)
     wiredcompleteRecords(result ) {
         this.completeTaskResult = result;
         let { data, error } = result;
        if (data) {
            console.log("complete Task Records", data);
            this.completedtask = data.map((curritem) => ({
                taskId: curritem.Id,
                taskname: curritem.Name,
                taskdate: curritem.Task_Date__c
                
            }));
            console.log("complete task array", this.completedtask);
        }
        else if (error) {
            console.log("Complete task records", error);
        }

    }
    changeHandler(event) {
        let { name, value } = event.target;
        if (name === "taskname") {
            this.taskname = value;
        } else if (name === "taskdate") {
            this.taskdate = value;
        }
    }

    resetHandler() {
        this.taskname = "";
        this.taskdate = null;
    }

    addTaskHandler() {
        console.log("➡️ addTaskHandler called");
        console.log("Task Name:", this.taskname);
        console.log("Task Date:", this.taskdate);
    
        if (!this.taskdate) {
            this.taskdate = new Date().toISOString().slice(0, 10);
        }
    
        const isValid = this.validateTask();
        console.log("✅ Task Valid?", isValid);
    
        if (isValid) {
            // this.incompletedtask = [
            //     ...this.incompletedtask,
            //     {
            //         taskname: this.taskname,
            //         taskdate: this.taskdate
            //     }
            // ];
            // this.resetHandler();
    
            // let sortedArray = this.sortTask(this.incompletedtask);
            // this.incompletedtask = [...sortedArray];
            // if(this.incompletedtask.length > 0){
            // console.log('📝 Final Incompleted Task:', this.incompletedtask);
            
            let inputfields = {};
            inputfields[TASK_NAME_FIELD.fieldApiName] = this.taskname;
            inputfields[TASK_DATE_FIELD.fieldApiName] = this.taskdate;
            inputfields[IS_COMPLETED_FIELD.fieldApiName] = false;
            
            let recordInput = {
                apiName: TASK_MANAGER_OBJECT.objectApiName,
                fields: inputfields
            };
            createRecord(recordInput)
                .then((result) => {
                    console.log('Successfully created record: ', result);
                    this.showToast("Success", "Task Created Successfully", "success");
                    refreshApex(this.inCompleteTaskResult);
                });
                
        }
    }
        
    
    

    validateTask() {
        let isValid = true;
        let element = this.template.querySelector(".taskname");

        if (!this.taskname) {
            isValid = false;
        } 
        else {
            let taskitem = this.incompletedtask.find(
                (currItem) =>
                    currItem.taskname === this.taskname &&
                    currItem.taskdate === this.taskdate
            );
            if (taskitem) {
                isValid = false;
                element.setCustomValidity("Task Already Exists");
            }
        }

        if (isValid) {
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }

    sortTask(inputarr) {
        let sortedArray = inputarr.sort((a, b) => {
            return new Date(a.taskdate) - new Date(b.taskdate);
        });
        return sortedArray;
    }
     removalHandler(event){
        //  let index = event.target.name;
        //  this.incompletedtask.splice(index, 1);
        //  let sortedArray = this.sortTask(this.incompletedtask);
        //  this.incompletedtask = [...sortedArray];
         //  console.log("this.incompletedtask", this.incompletedtask);
         let recordId = event.target.name;
         console.log('Deleted Id', recordId);
         
         deleteRecord(recordId)
             .then(() => {
                 this.showToast("Deleted", "Task Deleted Successfully", "success");
                 refreshApex(this.inCompleteTaskResult);
                 
             })
         .catch((error) => {
             this.showToast("Error", error.message, "error");
         });

         
     }

     completetaskHandler(event){
        let recordId=event.target.name;
       this.refreshData(recordId);
        
     }

     dragStartHandler(event){
         event.dataTransfer.setData("index", event.target.dataset.item);

      }

       allowDrop(event){
        event.preventDefault();
      }

      dropElementHandler(event){
        let recordId = event.dataTransfer.getData("index");
        this.refreshData(recordId );
     } 
    
      async refreshData(recordId) {
         let inputfields = {};
        inputfields[ID_FIELD.fieldApiName] = recordId;
        inputfields[IS_COMPLETED_FIELD.fieldApiName] = true;
        inputfields[COMPLETED_FIELD.fieldApiName] = new Date().toISOString().slice(0, 10);
        let recordInput = {
            
            fields: inputfields
        };
          try {
            
          await updateRecord(recordInput);
          await refreshApex(this.inCompleteTaskResult);
          await refreshApex(this.completeTaskResult);
              this.showToast("Updated", "Task Updated Successfully", "success");

          } catch (error) {
            console.log('Update operation failed', error);
            this.showToast('Error', 'Update operation failed', 'error')
          }
          



    //     let removeItem=this.incompletedtask.splice(index, 1);
    //     let sortedArray = this.sortTask(this.completedtask);
    //     this.completedtask = [...sortedArray];
    //     console.log("this.incompletedtask", this.incompletedtask);
    //     this.completedtask=[...this.completedtask, removeItem[0]];
         
         
     }
    
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
    
}