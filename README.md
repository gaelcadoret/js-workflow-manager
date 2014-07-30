js-workflow-manager
===================

Javascript workflow manager - Call method stored in an array

##Example of use
```
var myAppIntroWorkflow = new Workflow();
myAppIntroWorkflow.add(new WorkflowItem("splashscreen", 5000, myApp.splashscreen, myApp.callback1));
myAppIntroWorkflow.add(new WorkflowItem("intro", 3000, myApp.intro, myApp.callback2));
myAppIntroWorkflow.add(new WorkflowItem("popup-info", 1000, myApp.popupInfo, myApp.callback3));
myAppIntroWorkflow.add(new WorkflowItem("stake-prompt-popup", 5000, myApp.stakePromptPopup));
myAppIntroWorkflow.run();
```

###***** WARNING *****
====================
####In your "action" function, you must notify that the process has started by calling notify function:
==> `Workflow.prototype.notify('START');`
####In your "callback" function, you must notify that the process has finished by calling notify function:
==> `Workflow.prototype.notify('END');`

Let see example below:
```
var App = function() {};

App.prototype = {
    ...
    splashscreen: function() {
        Workflow.prototype.notify('START');
        // Do something here
    },
    
    callback1: function() {
       Workflow.prototype.notify('END');
    }
    ...
    
}

var myApp = new App();
```

####Other usefull methods:
To pause the process, use `Workflow.prototype.pause();` and to restart, use `Workflow.prototype.restart();`
