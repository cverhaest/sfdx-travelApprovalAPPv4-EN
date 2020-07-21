({  
    handleSingleUploadFinished: function (component, event) {
        // Get the list of uploaded files
        var uploadedFiles = event.getParam("files");
        
        console.log('### Salesforce - Filename:' + uploadedFiles[0].name);
        console.log('### Salesforce - Fileid:' + uploadedFiles[0].documentId);
        
        component.set('v.fileId', uploadedFiles[0].documentId);
        
        // show success message – with no of files uploaded
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "type": "success",
            "message": uploadedFiles[0].name+" uploaded successfully!"
        });
        toastEvent.fire();
        
        $A.get('e.force:refreshView').fire();
    },    
})