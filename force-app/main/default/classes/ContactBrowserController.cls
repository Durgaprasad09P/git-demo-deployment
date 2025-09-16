public with sharing class ContactBrowserController {
  
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactListByFilter(
        String accountId,
        String industry
               ) {
                String query='select Id,Name,Title,Phone,Email,PhotoUrl from Contact' ;
                List<String> filters= new List<String>();
                if(String.isNotBlank(accountId)){
                    filters.add('accountId = :accountId');
                }
                
                if(String.isNotBlank(industry)){
                    filters.add('Contact.Account.Industry = :industry');

                }
                if(!filters.isEmpty()){
                    query +=' where ' + String.join(filters,' and ');
                }
                query += ' WITH USER_MODE ';
                query += 'order by Name';
                System.debug('query=' +query);
                
                List<Contact> contactList = Database.query(query);
                return contactList;
               



}

}