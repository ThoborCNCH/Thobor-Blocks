import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addTurnBlock() 
{
  Blockly.Blocks['turn'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Turn Right by ")
        .appendField(new Blockly.FieldTextInput("15"), "turn");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Turn the robot by the given degrees");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['turn'] = function(block, generator) {
    var turn = block.getFieldValue('turn');
    var code = `
      robotTurn += ` + turn + `;
      robot.style.transform = 'rotate(' + (robotTurn + 90) + 'deg)';
    `;
    return code;
  };
}

export {addTurnBlock};
