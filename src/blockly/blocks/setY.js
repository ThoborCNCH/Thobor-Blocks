import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addSetYblock() 
{
  Blockly.Blocks['set_y'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Set Y input to ")
        .appendField(new Blockly.FieldTextInput("0"), "y");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Set the robot's Y to the given ammount");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['set_y'] = function(block, generator) {
    var text_y = block.getFieldValue('y');
    var code = `
      robotY = ` + text_y + `;
      robot.style.bottom = robotY + 'px';
    `;
    return code;
  };
}

export {addSetYblock};
