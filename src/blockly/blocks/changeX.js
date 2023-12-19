import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addChangeXblock() 
{
  Blockly.Blocks['change_x'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Change X by")
        .appendField(new Blockly.FieldTextInput("10"), "x");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Change x by the given ammount");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['change_x'] = function(block, generator) {
    var text_x = block.getFieldValue('x');
    var code = `
      robotX += (` + text_x + `);
      updateRobot();
    `;
    return code;
  };
}

export {addChangeXblock};
