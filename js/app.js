/**
 * Created by Gael on 29/07/2014.
 */

var App = function() {};

App.prototype = {

    DEBUG: true,
    USER_MISE: null,

    init: function() {
        this.log('App [init]');

        var boosterWorkflow = new Workflow();
        boosterWorkflow.add(new WorkflowItem("splashscreen", 5000, this.splashscreen, booster2014.callback1));
        boosterWorkflow.add(new WorkflowItem("intro", 3000, this.intro, booster2014.callback2));
        boosterWorkflow.add(new WorkflowItem("popup-info", 3000, this.popupInfo, booster2014.callback3));
        boosterWorkflow.add(new WorkflowItem("stake-prompt-popup", 0, this.stakePromptPopup, booster2014.callback4));
        boosterWorkflow.add(new WorkflowItem("other-animation-ingame", 3000, this.finalGameStep));
        boosterWorkflow.run();
    },

    log: function(msg) {
        if (this.DEBUG)
            console.log(msg);
    },

    splashscreen: function() {
        Workflow.prototype.notify('START');
        booster2014.log('App [animation_1]');
        var container = document.querySelector('.container');
        container.innerHTML = 'SPLASHSCREEN<br/>BOOSTER 2014';
    },

    intro: function() {
        Workflow.prototype.notify('START');
        booster2014.log('App [animation_2]');
        var container = document.querySelector('.container');
        container.innerHTML = 'INTRO';
    },

    popupInfo: function() {
        Workflow.prototype.notify('START');
        booster2014.log('App [animation_3]');
        var container = document.querySelector('.container');
        container.innerHTML = container.innerHTML + '<div class="popup"><h1>POPUP</h1><p>Contenu de la popup</p></div>';
    },

    stakePromptPopup: function() {
        Workflow.prototype.notify('START');
        booster2014.log('App [animation_4]');
        var container = document.querySelector('.container');
        container.innerHTML = '<h1>Select your stake</h1>' +
                            '<input type="button" value="1 €" onclick="App.prototype.goOn(1);"/>' +
                            '<input type="button" value="2 €" onclick="App.prototype.goOn(2);"/>' +
                            '<input type="button" value="3 €" onclick="App.prototype.goOn(3);"/>';
    },

    goOn: function(userStake) {
        console.log('userStake', userStake);
        App.prototype.USER_MISE = userStake;
        Workflow.prototype.notify('CONTINUE');
    },

    finalGameStep: function() {
        if( App.prototype.USER_MISE == null ) return;
        Workflow.prototype.notify('START');
        booster2014.log('App [animation_5]');
        var container = document.querySelector('.container');
        container.innerHTML = '<h1>Booster 2014</h1><p>Your stake is <strong>' + App.prototype.USER_MISE + ' &euro;</strong>.</p>';
    },

    callback1: function() {
        Workflow.prototype.notify('END');
    },

    callback2: function() {
        Workflow.prototype.notify('END');
    },

    callback3: function() {
        Workflow.prototype.notify('END');
    },

    callback4: function() {
        Workflow.prototype.notify('END');
    }

};

var booster2014 = new App();
booster2014.init();