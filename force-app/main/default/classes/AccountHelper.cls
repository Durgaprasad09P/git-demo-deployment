public with sharing class AccountHelper {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountData( string inputIndustry) {
        return  [ 
            SELECT id ,name, industry,rating 
            FROM account  
            WHERE Industry =: inputIndustry
            WITH USER_MODE
            ];
    }

@AuraEnabled
public static string updateTickerRecord( String recordId,String newTicker){
    Account acc=new  Account(Id=recordId,TickerSymbol=newTicker);
    try {
        update acc;
        return 'Successful';
    }catch (Exception e) {
        return e.getMessage();
    }
    
}


}