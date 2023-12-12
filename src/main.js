import Blockly from 'blockly';
import {FixedEdgesMetricsManager} from '@blockly/fixed-edges';
// import toolbox from './blockly/categoryToolbox.js'
import toolbox from './blockly/toolbox.js'
import {javascriptGenerator} from 'blockly/javascript';

import {addChangeYblock} from './blockly/blocks/changeY.js';
import {addChangeXblock} from './blockly/blocks/changeX.js';
import {addSetYblock}    from './blockly/blocks/setY.js';
import {addSetXblock}    from './blockly/blocks/setX.js';
import {addTurnBlock}    from './blockly/blocks/turn.js';
import {addForwardBlock} from './blockly/blocks/forward.js';
import {addStartBlock}   from './blockly/blocks/start.js';

const screen = document.getElementById("screen");
const robot  = document.getElementById("robot");

// let robotX = screen.offsetWidth  / 2 - robot.offsetWidth  / 2;
// let robotY = screen.offsetHeight / 2 - robot.offsetHeight / 2;
let robotX = screen.offsetWidth  / 100;
let robotY = screen.offsetHeight / 100 * 68;
let robotTurn = 0;

robot.style.bottom = robotY + 'px';
robot.style.left   = robotX + 'px';
robot.style.transform = 'rotate(' + robotTurn + 'deg)';

addChangeYblock();
addChangeXblock();
addSetYblock();
addSetXblock();
addTurnBlock();
addForwardBlock();
addStartBlock();

FixedEdgesMetricsManager.setFixedEdges({
  top: true,
  left: true,
});
const workspace = Blockly.inject
(
  'blocklyDiv',
  {
    toolbox: toolbox,
    theme: Blockly.Theme.defineTheme('custom_theme', './blockly/theme.json'),
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
runCodeButton.addEventListener("click", () => 
{
    try {
      executeBlocksSequentially();
    } catch (e) {
      alert(e);
    }
});

function executeBlocksSequentially() {
  var startingBlock = workspace.getTopBlocks()[0];

  function executeBlock(block) {
    if (block !== undefined) {
      console.log(block);
      var code = Blockly.JavaScript.blockToCode(block);
      eval(code); // Execute the block
      setTimeout(function () {
        executeBlock(block.getNextBlock()); // Move to the next block after a delay
      }, 100); // Adjust the delay time (in milliseconds) as needed
    }
  }

  executeBlock(startingBlock.getNextBlock());
}
