import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addTurnLeftBlock() 
{
  Blockly.Blocks['turnLeft'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Turn Left by ")
        .appendField(new Blockly.FieldTextInput("15"), "turn");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Turn the robot by the given degrees");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['turnLeft'] = function(block, generator) {
    let turn = block.getFieldValue('turn');
    let code = `
      robotTurn -= ` + turn + `;
      updateRobot();
      await new Promise(resolve => setTimeout(resolve, 350));
    `;
    return code;
  };
}

export {addTurnLeftBlock};
