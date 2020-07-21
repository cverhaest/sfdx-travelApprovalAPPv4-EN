public class Rules_CTRL {
    // Call Apex Methods
    // https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.apex
    @AuraEnabled(cacheable=true)
    public static list<public_rulestable__x> getRulesListRESTCalloutFct(string sType){
        system.debug('### CVER - Rules_CTRL - getRulesListRESTCalloutFct - sType:' + sType);
        
        list<public_rulestable__x> lRules = new list<public_rulestable__x>();
        
        Http oHttp = new Http();
		HttpRequest oRequest = new HttpRequest();
        
        if(sType != null && sType != ''){            
            //oRequest.setEndpoint('https://restwsrules.herokuapp.com/RulesTable?type=' + sType);
            oRequest.setEndpoint('callout:restWSRules_Credentials/RulesTable?type=' + sType);
            
            oRequest.setMethod('GET');
            HttpResponse oResponse = oHttp.send(oRequest);
            
            // If the request is successful, parse the JSON response.
            if (oResponse.getStatusCode() == 200) {
                system.debug('### CVER - Rules_CTRL - getRulesListRESTCalloutFct - response.getBody():' + oResponse.getBody());
                
                String sResponse = oResponse.getBody();
                
                // Standardize response string
                if (!sResponse.contains('"rows":')) {
                    if (sResponse.substring(0,1).equals('{')) {
                        sResponse = '[' + sResponse  + ']';
                    }
                    sResponse = '{"rows" : ' + sResponse + '}';
                }
                
                // Deserialize the JSON string into collections of primitive data types.
                Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(sResponse);
                // Cast the values in the 'animals' key as a list
                List<Object> lRowsTemp = (List<Object>) results.get('rows');
                
                for (Object oRow: lRowsTemp) {
                    system.debug('### CVER - Rules_CTRL - getRulesListRESTCalloutFct - oRow:' + oRow);
                    
                    Map<String, Object> mapRow = (Map<String, Object>)oRow;
                    
                    lRules.add(
                        new public_rulestable__x(name__c = (String) mapRow.get('name'), description__c = (String) mapRow.get('description'))
                    );
                }
            }            
        }
        
        system.debug('### CVER - Rules_CTRL - getRulesListRESTCalloutFct - lRules.size():' + lRules.size());

        return lRules;
    }    

    // Call Apex Methods
    // https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.apex
    @AuraEnabled(cacheable=true)
    public static list<public_rulestable__x> getRulesListFct(string sType){
        system.debug('### CVER - Rules_CTRL - getRulesListFct - sType:' + sType);
        
        list<public_rulestable__x> lRules = new list<public_rulestable__x>();
        
        if(sType != null && sType != ''){            
            for(public_rulestable__x oRulesTemp:[select name__c, description__c FROM public_rulestable__x WHERE type__c =:sType]){
            	lRules.add(oRulesTemp);  
                
                system.debug('### CVER - Rules_CTRL - getRulesListFct - name__c:' + oRulesTemp.name__c + ' - description__c' + oRulesTemp.description__c);
        	}
        }
        
        system.debug('### CVER - Rules_CTRL - getRulesListFct - lRules.size():' + lRules.size());

        return lRules;
    }
}