import Blockly from 'blockly';
import {FixedEdgesMetricsManager} from '@blockly/fixed-edges';
import toolbox from './blockly/toolbox.js'
import theme from './blockly/theme.js'
import {javascriptGenerator} from 'blockly/javascript';

import {addChangeYblock} from './blockly/blocks/changeY.js';
import {addChangeXblock} from './blockly/blocks/changeX.js';
import {addSetYblock}    from './blockly/blocks/setY.js';
import {addSetXblock}    from './blockly/blocks/setX.js';
import {addTurnBlock}    from './blockly/blocks/turn.js';
import {addForwardBlock} from './blockly/blocks/forward.js';
import {addStartBlock}   from './blockly/blocks/start.js';
import {addWaitBlock}    from './blockly/blocks/wait.js';

const screen = document.getElementById("screen");
const robot  = document.getElementById("robot");

let robotX = screen.offsetWidth  / 100;
let robotY = screen.offsetHeight / 100 * 68;
let robotTurn = 0;

robot.style.bottom = robotY + 'px';
robot.style.left   = robotX + 'px';
robot.style.transform = 'rotate(' + robotTurn + 90 + 'deg)';

addChangeYblock();
addChangeXblock();
addSetYblock();
addSetXblock();
addTurnBlock();
addForwardBlock();
addStartBlock();
addWaitBlock();

FixedEdgesMetricsManager.setFixedEdges
({
  top: true,
  left: true,
});
const workspace = Blockly.inject
(
  'blocklyDiv',
  {
    toolbox: toolbox,
    theme: Blockly.Theme.defineTheme('custom_theme', theme),
    plugins: {
      metricsManager: FixedEdgesMetricsManager,
    },
  }
);


javascriptGenerator.addReservedWords('code');
javascriptGenerator.addReservedWords('highlightBlock');
window.LoopTrap = 1000;
javascriptGenerator.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';


var startBlock = workspace.newBlock('start');
startBlock.initSvg();
startBlock.render();
startBlock.moveBy(60, 40);
startBlock.setDeletable(false);

const runCodeButton = document.getElementById("run-code");
runCodeButton.addEventListener("click", async () => 
{
    try {
      // executeBlocksSequentially();
      var code = javascriptGenerator.workspaceToCode(workspace);
      eval('(async function() {' + code + '})()');
    } catch (e) {
      // alert(e);
      console.log(e)
    }
});

function initApi(interpreter, globalObject) 
{
  var wrapper = function(text) {
    return alert(arguments.length ? text : '');
  };

  interpreter.setProperty(globalObject, 'alert',
    interpreter.createNativeFunction(wrapper));

  ////////////

  var wrapper = function(id) {
    return workspace.highlightBlock(id);
  };

  interpreter.setProperty(globalObject, 'highlightBlock',
    interpreter.createNativeFunction(wrapper));

  ///////////

  var wrapper = function(text) {
    return prompt(text);
  };

  interpreter.setProperty(globalObject, 'prompt',
    interpreter.createNativeFunction(wrapper));
}

function executeBlocksSequentially() {
  var startingBlock = workspace.getTopBlocks()[0];

  if (startingBlock) {
    function executeBlock(block) {
      if (block) {
        var code = javascriptGenerator.blockToCode(block);
        if (code) eval(code); 

        setTimeout(function () {
          executeBlock(block.getNextBlock()); 
        }, 500); 
      }
    }

    executeBlock(startingBlock.getNextBlock());
  }
}
