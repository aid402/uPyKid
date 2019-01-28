//kidbright
Blockly.Blocks['kidbright_led'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set KB")
            .appendField(new Blockly.FieldDropdown([["LED-BT", ".BT"], ["LED-WIFI", ".WIFI"], ["LED-NTP", ".NTP"], ["LED-IOT", ".IOT"]]), "led")
            .appendField("as")
            .appendField(new Blockly.FieldDropdown([["On", "(1)"], ["Off", "(0)"]]), "state");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['kidbright_led'] = function (block) {
    var led = block.getFieldValue('led');
    var state = block.getFieldValue('state');
    var code = 'kb' + led + state + '\n';
    return code;
};

Blockly.Blocks['kidbright_temp'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("KB-Temperature");
        this.setOutput(true, null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['kidbright_temp'] = function (block) {
    var code = 'kb.TEMP.read()\n';
    return code;
};

Blockly.Blocks['kidbright_i2c_scan'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("scan")
            .appendField(new Blockly.FieldDropdown([["I2C_0", "I2C0"], ["I2C_1", "I2C1"]]), "i2c");
        this.setOutput(true, null);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['kidbright_i2c_scan'] = function (block) {
    var i2c = block.getFieldValue('i2c');
    var code = 'kb.'+i2c+'.scan()\n';
    return code;
};