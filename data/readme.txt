--------
Commands
--------
cd /Users/cverhaest/Google\ Drive/cverhaest/00-Salesforce/08-PreSales/00-Salesforce/03-Salesforce\ DX/Sources/sfdx-travelApprovalAPPv2-EN 

1- Login to Source Org
sfdx force:auth:web:login   
sfdx force:config:set defaultusername=cverhaestdemo@salesforce.com

2- Export Data
sfdx force:data:tree:export --query "SELECT Approval_Status__c, Description__c, Travel_Cost__c, Travel_Date__c, Travel_Destination__c, Travel_Reason__c FROM Travel_Approval__c" --plan --targetusername cverhaestdemo@salesforce.com --outputdir data


3- Login to Target Org (here a Scratch Org)
sfdx force:auth:web:login --setalias TAScratchOrg --instanceurl https://power-flow-4370-dev-ed.cs85.my.salesforce.com

4- Import Data
sfdx force:data:tree:import --targetusername test-n9ml9leje1uy@example.com --plan data/Travel_Approval__c-plan.json



