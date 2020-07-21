({
    init : function (component) {
        var flow = component.find("flowData");
        
        // Try to set retURL of the flow - SEEMS that it doesn't work !!!
        // retURL not used here as the flow is redirected to the right Travel Approval record. See "handleStatusChange()" method
        var inputVariables = [{ name:"retURL", type:"String", value:"" }];
        
        flow.startFlow("Travel_Approval_Flow", inputVariables);
    },
    
    handleStatusChange : function (component, event) {
        if(event.getParam("status") === "FINISHED") {
            
            var outputVariables = event.getParam("outputVariables");
            console.log("outputvars",outputVariables);
            
            var outputVar;
            
            // Manage retURL using output var !!!
            for(var i = 0; i < outputVariables.length; i++) {
            
                outputVar = outputVariables[i];
                
                // Pass the values to the component's attributes
                if(outputVar.name === "TravelApprovalRecordId") {
                    console.log("### TravelApprovalRecordId:",outputVar.name);

                    var navService = component.find("navService");

                    // Sets the route to /lightning/r/Travel_Approval__c/RECORD_ID/view
                    var pageReference = {
                        type: 'standard__recordPage',
                        attributes: {
                            objectApiName: 'Travel_Approval__c',
                            actionName: 'view',
                            recordId: outputVar.value
                        }
                    };
                    event.preventDefault();
                    navService.navigate(pageReference);

                    break;
                } 
            }
        }
    },

    closeModal: function(component, event, helper) {
        var navService = component.find("navService");

        // Sets the route to /lightning/o/Travel_Approval__c/home
        var pageReference = {
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Travel_Approval__c',
                actionName: 'home'
            }
        };
        event.preventDefault();
        navService.navigate(pageReference);
    },
})