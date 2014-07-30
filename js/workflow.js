/**
 * Created by Gael on 29/07/2014.
 * @description Workflow manager - call method stored in an array
 *
 * @exemple :
 * var boosterWorkflow = new Workflow();
 * boosterWorkflow.add(new WorkflowItem("splashscreen", 5000, this.animation_1, booster2014.callback1));
 * boosterWorkflow.add(new WorkflowItem("intro", 3000, this.animation_2, booster2014.callback2));
 * boosterWorkflow.add(new WorkflowItem("popup-info", 1000, this.animation_3, booster2014.callback3));
 * boosterWorkflow.add(new WorkflowItem("stake-prompt-popup", 5000, this.animation_4));
 * boosterWorkflow.run();
 *
 * ***** WARNING *****
 * In your "action" function, you must notify that the process has started by calling notify function :
 * ==> Workflow.prototype.notify('START');
 *
 * In your "callback" function, you must notify that the process has finished by calling notify function :
 * ==> Workflow.prototype.notify('END');
 *
 * animation_1: function() {
 *      Workflow.prototype.notify('START');
 *      // Do something here
 * }
 *
 * callback1: function() {
 *      Workflow.prototype.notify('END');
 * }
 */

var _WORKFLOW = [],
    _isWorkflowRunning = false,
    _CURRENT_IDX = 0;

/**
 * @description Workflow item - Structure of an item when adding new one in current workflow
 * @param {string} id - action/method identifier
 * @param {number} delay - delay in millisecond before calling callback function
 * @param {function} action - Function to call to do something (animation or anything else)
 * @param {requestCallback} callback - callback function to call when timeout is reach
 * @return {object} item - well formed item to be added in workflow array
 * @constructor WorkflowItem
 *
 *
 * */
var WorkflowItem = function(id, delay, action, callback) {
    var id = id || null,
        delay = delay || 0,
        action = action || function() {console.warn('You must add a function to do something!')},
        callback = callback || function() {console.log('***** End of workflow *****')};

    return {
        "id": id,
        "delay": delay,
        "action": action,
        "callback": callback
    }
}

/**
 * @constructor Workflow
 * */
var Workflow = function() {};

Workflow.prototype = {

    init: function() {
        _CURRENT_IDX = 0;
    },

    continueWorkflow: function() {
        booster2014.log('_CURRENT_IDX : ' + _CURRENT_IDX);

        if (_isWorkflowRunning) {
            if (_CURRENT_IDX < _WORKFLOW.length) {
                if (_WORKFLOW[_CURRENT_IDX].delay > 0) {
                    _WORKFLOW[_CURRENT_IDX].action();
                } else {
                    _isWorkflowRunning = false;
                    _WORKFLOW[_CURRENT_IDX].action();
                }
            }
        }
    },

    incrementIdx: function() {
        _CURRENT_IDX += 1;
    },

    decrementIdx: function() {
       _CURRENT_IDX -= 1;
    },

    notify: function(code) {
        switch(code) {
            case 'START': booster2014.log('START ==> ' +  _WORKFLOW[_CURRENT_IDX].id);
                    setTimeout(_WORKFLOW[_CURRENT_IDX].callback, _WORKFLOW[_CURRENT_IDX].delay);
                break;
            case 'END': booster2014.log('END ==> ' + _WORKFLOW[_CURRENT_IDX].id);
                    if (_isWorkflowRunning) {
                        this.incrementIdx(); this.continueWorkflow();
                    }
                break;
            case 'CONTINUE': _isWorkflowRunning = true; this.incrementIdx(); this.continueWorkflow();
                break;
            default:
        }
    },

    /**
     * @description Method for adding a new item in the current workflow
     * @param {object} item
     * */
    add: function(item) {
        _WORKFLOW.push(item);
    },

    /**
     * @description Method to call to start workflow
     * @param {number} startIdx - Index of the first function to call in the current workflow
     * @param {number} endIdx - Index of the last function to call in the current workflow
     * */
    run: function(startIdx, endIdx) {
        var startIdx = startIdx || _CURRENT_IDX,
            endIdx = endIdx || _WORKFLOW.length - 1;

        _isWorkflowRunning = true;

        if (startIdx < endIdx ) { _WORKFLOW[startIdx].action();
        } else { booster2014.log('Animation already done!'); }
    },

    pause: function() {
        booster2014.log('Workflow [pause]');
        _isWorkflowRunning = false;
    },

    restart: function() {
        booster2014.log('Workflow [restart]');
        _isWorkflowRunning = true;
        this.run(_CURRENT_IDX);
    }
};