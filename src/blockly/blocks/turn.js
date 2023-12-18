import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addTurnBlock() 
{
  Blockly.Blocks['turn'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Turn by ")
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
      robot.style.transform = 'rotate(' + robotTurn + 'deg)';
    `;
    return code;
  };
}

export {addTurnBlock};
