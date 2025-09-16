public with sharing class AccountController {
    public static List<Account> getAllActiveAccounts() {
      return [SELECT Id, Name, Active__c FROM Account WHERE Active__c = 'Yes' WITH SECURITY_ENFORCED];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getParentAccounts() {
      return [select Id,Name,Industry
                from Account 
                where AnnualRevenue != null
                with USER_MODE];
    
    }
  }