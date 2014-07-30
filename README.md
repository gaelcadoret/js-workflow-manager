js-workflow-manager
===================

Javascript workflow manager - Call method stored in an array

##Example of use
'''
var boosterWorkflow = new Workflow();
boosterWorkflow.add(new WorkflowItem("splashscreen", 5000, this.splashscreen, booster2014.callback1));
boosterWorkflow.add(new WorkflowItem("intro", 3000, this.intro, booster2014.callback2));
boosterWorkflow.add(new WorkflowItem("popup-info", 1000, this.popupInfo, booster2014.callback3));
boosterWorkflow.add(new WorkflowItem("stake-prompt-popup", 5000, this.stakePromptPopup));
boosterWorkflow.run();
'''
