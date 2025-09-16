public with sharing class ToDoManager {
    @AuraEnabled(cacheable=true)
    public static List<ToDoManager__c> loadAllInCompleteRecords() {
        return [
                SELECT Id,Name,Task_Date__c
                FROM ToDoManager__c
                WHERE ownerId =:UserInfo.getUserId() AND Is_Completed__c=false
                WITH  USER_MODE
                ORDER BY Task_Date__c
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<ToDoManager__c> loadAllCompleteRecords() {
        return [
                SELECT Id,Name,Task_Date__c
                FROM ToDoManager__c
                WHERE ownerId =:UserInfo.getUserId() AND Is_Completed__c=true
                WITH  USER_MODE
                ORDER BY Completed_Date__c DESC
        ];
    }
}