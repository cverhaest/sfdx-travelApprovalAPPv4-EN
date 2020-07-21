({
    getRulesList: function(component) {
        var action = component.get('c.getRulesListFct');
        
		var ruleType = component.get("v.ruleType");        
 
        console.log("ruleType:" + ruleType);        
        
        action.setParams({
            //sType : component.get("v.recordId")
            sType : ruleType
        });
        
        // Set up the callback
        action.setCallback(this, function(actionResult) {
            if (actionResult.getState() === "SUCCESS") {
            	component.set("v.lRules", actionResult.getReturnValue());
            } else if (actionResult.getState() === "ERROR") {
                $A.log("Errors", actionResult.getError());
            }
        });
        $A.enqueueAction(action);
    }
})