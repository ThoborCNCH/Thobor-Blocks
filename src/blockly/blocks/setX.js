import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addSetXblock() 
{
  Blockly.Blocks['set_x'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Set X input to ")
        .appendField(new Blockly.FieldTextInput("0"), "x");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Set the robot's X to the given ammount");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['set_x'] = function(block, generator) {
    var text_x = block.getFieldValue('x');
    var code = `
      robotX = ` + text_x + `;
      updateRobot();
      await new Promise(resolve => setTimeout(resolve, 350));
    `;
    return code;
  };
}

export {addSetXblock};
