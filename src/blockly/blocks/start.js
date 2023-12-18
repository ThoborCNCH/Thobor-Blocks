import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addStartBlock() 
{
  Blockly.Blocks['start'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Start")
      this.setInputsInline(true);
      // this.setNextStatement(true, null);
      this.setNextStatement(true);
      this.setColour(240);
      this.setTooltip("Start the code");
      this.setHelpUrl("");
      this.setEditable(false);
    }
  };

  javascriptGenerator.forBlock['start'] = function(block, generator) {
    return '';
  };
}

export {addStartBlock};
