import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Access Labels
// https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.create_labels
import TA_Upload_Expense_Receipt from '@salesforce/label/c.TA_Upload_Expense_Receipt';
import TA_Expense_Receipt from '@salesforce/label/c.TA_Expense_Receipt';

export default class TravelApprovalFileUpload_LWC extends LightningElement {
    // Make a Component Aware of Its Record Context
    // https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.use_record_context
    @api recordId;

    // Make a Component Aware of Its Object Context
    // https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.use_object_context
    @api objectApiName;    

    // Access Labels
    // https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.create_labels
    // Expose the labels to use in the template.
    label = {
        TA_Upload_Expense_Receipt,
        TA_Expense_Receipt
    };

    get acceptedFormats() {
        return ['.pdf', '.png', '.docx', '.xlsx'];
    }

    handleUploadFinished(event) {
        console.log('### travelApprovalFileUpload_LWC - handleUploadFinished() - START');

        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;

        console.log('### travelApprovalFileUpload_LWC - handleUploadFinished() - Filename:' + uploadedFiles[0].name);
        console.log('### travelApprovalFileUpload_LWC - handleUploadFinished() - Fileid:' + uploadedFiles[0].documentId);
        console.log('### travelApprovalFileUpload_LWC - handleUploadFinished() - No. of files uploaded : ' + uploadedFiles.length);

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success!',
                message: uploadedFiles[0].name+' uploaded successfully!',
                variant: 'success',
            }),
        );

        console.log('### travelApprovalFileUpload_LWC - handleUploadFinished() - END');
    }   
}