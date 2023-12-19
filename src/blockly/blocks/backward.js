import Blockly from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';

function addBackwardBlock() 
{
  Blockly.Blocks['backward'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Move the robot backwards")
        .appendField(new Blockly.FieldTextInput("10"), "backwards");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Move the robot backwards by the specified distance");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['forward'] = function(block, generator) {
    var distance = block.getFieldValue('backwards');
    var code = `
      robotX -= Math.cos((robotTurn * Math.PI) / 180) * `  + distance + `
      robotY -= Math.sin((robotTurn * Math.PI) / 180) * -` + distance + `
      updateRobot();
    `;
    return code;
  };
}

export {addBackwardBlock};
