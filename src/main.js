import Blockly from 'blockly';
import toolbox from './blockly/toolbox.js'
import {javascriptGenerator} from 'blockly/javascript';
 
const workspace = Blockly.inject(
  'blocklyDiv',
  {
    toolbox: toolbox,
    theme: Blockly.Theme.defineTheme('custom_theme', './blockly/theme.json')
  }
);

javascriptGenerator.addReservedWords('code');
javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
javascriptGenerator.addReservedWords('highlightBlock');
window.LoopTrap = 1000;
javascriptGenerator.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
var code = javascriptGenerator.workspaceToCode(workspace);
var myInterpreter = new Interpreter(code, initApi);

const runCodeButton = document.getElementById("run-code");
runCodeButton.addEventListener("click", () => {
  myInterpreter.run();
  // try {
  //   eval(code);
  // } catch (e) {
  //   alert(e);
  // }
});

function highlightBlock(id) {
  workspace.highlightBlock(id);
}

function initApi(interpreter, globalObject) {
  // Add an API function for the alert() block.
  var alertWrapper = function(text) {
    return alert(arguments.length ? text : '');
  };
  var highlightWrapper = function(id) {
    return workspace.highlightBlock(id);
  };
  interpreter.setProperty(globalObject, 'alert',
      interpreter.createNativeFunction(wrapper));
  interpreter.setProperty(globalObject, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

  // Add an API function for the prompt() block.
  wrapper = function(text) {
    return prompt(text);
  };
  interpreter.setProperty(globalObject, 'prompt',
      interpreter.createNativeFunction(wrapper));
}
