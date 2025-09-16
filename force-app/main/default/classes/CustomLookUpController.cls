public with sharing class CustomLookUpController {
     @AuraEnabled(cacheable=true)           
    public static List<SObject> searchRecords(String objectApiName, String searchKey) {
        
         List<SObject> sObjectList = new List<SObject>();
        if(String.isNotBlank(searchKey)){
            string key = '%'+ searchKey + '%';
            string queryString = 'Select Id,Name From ' + objectApiName + ' Where Name Like :key ';
             sObjectList = Database.query( queryString,AccessLevel.USER_MODE );
        }
            return sObjectList;
        }
    }
