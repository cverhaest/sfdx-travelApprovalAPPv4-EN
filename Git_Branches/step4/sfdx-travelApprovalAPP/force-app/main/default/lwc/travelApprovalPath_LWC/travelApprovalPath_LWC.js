import { LightningElement, api, track } from 'lwc';

export default class TravelApprovalPath_LWC extends LightningElement {
    // Public Properties / Public Reactive Properties
    // https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.reactivity_public
    @api step;

    // Reactivity and Data Types
    // https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.reactivity_data_types
    @track steps=['General Information','Cost','Approval']; 

    get stepsValues() {
        var i=0;
        let stepsList = [];
        
        for(i=0; i < this.steps.length; i++){
            console.log('### travelApprovalPath_LWC - picklistValues - i:' + i);
            console.log('### travelApprovalPath_LWC - picklistValues - this.steps[i]:' + this.steps[i]);

            let classList;

            if (i == this.step) {
                // This is the current step of the path    
                classList = 'slds-path__item slds-is-current slds-is-active';
            } else {
                classList = 'slds-path__item slds-is-incomplete';
            }

            console.log('### travelApprovalPath_LWC - picklistValues - classList:' + classList);

            stepsList.push({
                label: this.steps[i],
                classList: classList
            })
        }    
        return stepsList;
    }    

    handleSelect(event) {
        // Nothing todo
    }
}