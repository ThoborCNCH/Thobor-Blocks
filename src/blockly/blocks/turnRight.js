import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addTurnRightBlock() 
{
  Blockly.Blocks['turnRight'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Turn Right by ")
        .appendField(new Blockly.FieldTextInput("15"), "turnRight");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Turn the robot by the given degrees");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['turnRight'] = function(block, generator) {
    let turn = block.getFieldValue('turnRight');
    let code = `
      robotTurn += ` + turn + `;
      updateRobot();
      await new Promise(resolve => setTimeout(resolve, 350));
    `;
    return code;
  };
}

export {addTurnRightBlock};
