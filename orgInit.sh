sfdx force:org:create -f config/project-scratch-def.json -s -d 7
sfdx force:source:push
sfdx shane:user:password:set -p Salesforce2020TA! -g User -l User --json
sfdx force:org:display --verbose
sfdx force:org:open