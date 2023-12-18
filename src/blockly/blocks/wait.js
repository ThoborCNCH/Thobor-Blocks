import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addWaitBlock() 
{
  Blockly.Blocks['wait'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Wait ")
        .appendField(new Blockly.FieldTextInput("1"), "wait");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Wait a nr of seconds");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['wait'] = function(block, generator) {
    var duration = block.getFieldValue('wait');
    var code = `
      await new Promise(resolve => setTimeout(resolve, ` + duration + ` * 1000));
    `;
    return code;
  };
}

export {addWaitBlock};
