public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList()
     {
    List<Contact> conList=[
        select Id,Name,Title,Phone,Email,PhotoUrl 
        from Contact
        where PhotoUrl != null
        WITH USER_MODE
        LIMIT 10
    ];
    return conList;
}
@AuraEnabled(cacheable=true)
public static List<Contact> getContactListForDataTable(){
    List<Contact> conlist =[Select Id, Name,Title,Phone,Email,PhotoUrl__c,Rank__c,AccountId,Account.Name 
                            from Contact Where AccountId != null
                            with USER_MODE
                            Limit 10];

return conlist;
}}