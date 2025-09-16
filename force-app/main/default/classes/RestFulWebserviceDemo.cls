@RestResource(URLMapping='/GetAllPositions/*')
global class RestFulWebserviceDemo {
    
    @HttpGet
    global static List<Position__c> getAllPositions() {
        Map<String, String> mapInputs = RestContext.request.params;
        
        return [
            SELECT Id, Name, Designation__c, Location_Name__c,Position_Status__c
            FROM Position__c
            WHERE Hiring_Manager__r.Name =: mapInputs.Get('Id')
        ];
    }
}

