import Blockly from 'blockly';
import toolbox from './blockly/toolbox.js'
import {javascriptGenerator} from 'blockly/javascript';
import {addChangeYblock} from './blockly/blocks/changeY.js';
import {addChangeXblock} from './blockly/blocks/changeX.js';
import {addSetYblock}    from './blockly/blocks/setY.js';
import {addSetXblock}    from './blockly/blocks/setX.js';

const screen = document.getElementById("screen");
const robot  = document.getElementById("robot");

let robotX = screen.offsetWidth  / 2 - robot.offsetWidth  / 2;
let robotY = screen.offsetHeight / 2 - robot.offsetHeight / 2;

robot.style.bottom = robotY + 'px';
robot.style.left   = robotX + 'px';

addChangeYblock();
addChangeXblock();
addSetYblock();
addSetXblock();

const workspace = Blockly.inject
(
  'blocklyDiv',
  {
    toolbox: toolbox,
    theme: Blockly.Theme.defineTheme('custom_theme', './blockly/theme.json')
  }
);


javascriptGenerator.addReservedWords('code');
javascriptGenerator.addReservedWords('highlightBlock');
window.LoopTrap = 1000;
javascriptGenerator.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
// javascriptGenerator.STATEMENT_PREFIX = 'workspace.highlightBlock(%1);\n';


const runCodeButton = document.getElementById("run-code");
runCodeButton.addEventListener("click", () => 
{
    var code = javascriptGenerator.workspaceToCode(workspace);
    // TODO: make the interpreter work
    // var myInterpreter = new Interpreter(code, initApi);
    try {
      eval(code);
      // myInterpreter.run();
    } catch (e) {
      alert(e);
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
