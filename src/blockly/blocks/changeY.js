import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addChangeYblock() 
{
  Blockly.Blocks['change_y'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Change Y by")
        .appendField(new Blockly.FieldTextInput("10"), "y");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Change y by the given ammount");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['change_y'] = function(block, generator) {
    var text_y = block.getFieldValue('y');
    var code = `
      robotY += ` + text_y + `;
      updateRobot();
    `;
    return code;
  };
}

export {addChangeYblock};
