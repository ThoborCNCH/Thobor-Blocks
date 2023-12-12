const toolbox = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "",
    },
    {
      "kind": "category",
      "name": "Logic",
      "colour": "999",
      "contents": [
        {
          "kind": "block",
          "type": "controls_if"
        },
        {
          "kind": "block",
          "type": "controls_repeat_ext"
        },
        {
          "kind": "block",
          "type": "logic_compare"
        },
        {
          "kind": "block",
          "type": "math_number"
        },
        {
          "kind": "block",
          "type": "math_arithmetic"
        },
        {
          "kind": "block",
          "type": "text"
        },
        {
          "kind": "block",
          "type": "text_print"
        },
      ]
    },
    {
      "kind": "category",
      "name": "Movement",
      "colour": "210",
      "contents": [

        {
          "kind": "block",
          "type": "change_y"
        },
        {
          "kind": "block",
          "type": "change_x"
        },
        {
          "kind": "block",
          "type": "set_y"
        },
        {
          "kind": "block",
          "type": "set_x"
        }
      ]
    }
  ]
};

export default toolbox;
