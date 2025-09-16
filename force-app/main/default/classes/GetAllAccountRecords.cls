

public  class GetAllAccountRecords {

   @AuraEnabled(cacheable=true)    
    public static List<Account> SearchAccountRecords(String startingChars)
    {
        List<Account> lstAccounts = [Select Id, Name, Rating, Industry, AnnualRevenue, Phone, Fax,
                                            Type, Ownership, SLA__c, CustomerPriority__c, Active__c
                                                    from Account
                                                        Where Name Like : startingChars+'%'];

        return lstAccounts;
    }
}
