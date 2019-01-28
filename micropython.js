Blockly.Blocks['machine_pin'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldVariable("item"), "NAME")
            .appendField("as Pin")
            .appendField(new Blockly.FieldNumber(0), "id")
            .appendField("mode")
            .appendField(new Blockly.FieldDropdown([["IN", "Pin.IN"], ["OUT", "Pin.OUT"], ["OPEN_DRAIN", "Pin.OPEN_DRAIN"]]), "mode")
            .appendField("pull")
            .appendField(new Blockly.FieldDropdown([["None", "None"], ["Up", "Pin.PULL_UP"], ["Down", "Pin.PULL_DOWN"]]), "pull");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['machine_pin'] = function (block) {
    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var pinID = block.getFieldValue('id');
    var mode = block.getFieldValue('mode');
    var pull = block.getFieldValue('pull');
    var code = variable_name + ' = Pin(' + pinID + ',' + mode + ',' + pull + ')\n';
    return code;
};

Blockly.Blocks['set_pin_value'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set")
            .appendField(new Blockly.FieldVariable("item"), "NAME");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["On", ".value(1)"], ["Off", ".value(0)"]]), "value");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['set_pin_value'] = function (block) {
    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var value = block.getFieldValue('value');
    var code = variable_name + value + '\n';
    return code;
};

Blockly.Blocks['uniqueid_mqtt_init'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/mqtt.png", 30, 30, "*"))
            .appendField("START")
            .appendField(new Blockly.FieldTextInput("Host"), "hostServer");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#d35400');
        this.setTooltip('');
    }
};

Blockly.Python['uniqueid_mqtt_init'] = function (block) {
    var text_hostserver = block.getFieldValue('hostServer');
    var code = 'CLIENT_ID = ubinascii.hexlify(unique_id())\nmqtt = MQTTClient.MQTTClient(CLIENT_ID,"' + text_hostserver + '")\n';
    return code;
};

Blockly.Blocks['mqtt_connect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/mqtt.png", 30, 30, "*"))
            .appendField("Connect");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#d35400');
        this.setTooltip('');
    }
};

Blockly.Python['mqtt_connect'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'mqtt.connect()\n';
    return code;
};

Blockly.Blocks['mqtt_disconnect'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/mqtt.png", 30, 30, "*"))
            .appendField("Disconnect");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#d35400');
        this.setTooltip('');
    }
};

Blockly.Python['mqtt_disconnect'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = 'mqtt.disconnect()\n';
    return code;
};

Blockly.Blocks['mqtt_publish'] = {
    init: function () {
        this.appendValueInput("publish")
            .appendField(new Blockly.FieldImage("images/block/mqtt.png", 30, 30, "*"))
            .setCheck(null)
            .appendField("Publish ")
            .appendField(new Blockly.FieldTextInput("topic"), "mqtt_topic")
            .appendField("  Message :");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["Plain text", "1"],
                ["JSON", "2"]
            ]), "dropdown")
            .appendField(" Retain :")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "mqtt_retain");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#d35400');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['mqtt_publish'] = function (block) {
    var text_mqtt_topic = block.getFieldValue('mqtt_topic');
    var value_mqtt_publish = Blockly.Python.valueToCode(block, 'publish', Blockly.Python.ORDER_ATOMIC);
    var checkbox_mqtt_retain = block.getFieldValue('mqtt_retain') == 'TRUE';
    var dropdown_name = block.getFieldValue('dropdown');

    if (checkbox_mqtt_retain) {
        checkbox_mqtt_retain = "True"
    } else {
        checkbox_mqtt_retain = "False"
    }

    if (dropdown_name == 1)
        var code = 'mqtt.publish(\'' + text_mqtt_topic + '\',' + value_mqtt_publish + ',retain=' + checkbox_mqtt_retain + ')\n';
    else
        var code = 'mqtt.publish(\'' + text_mqtt_topic + '\',ujson.dumps(' + value_mqtt_publish + '),retain=' + checkbox_mqtt_retain + ')\n';
    return code;
};

Blockly.Blocks['mqtt_subscribe'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/mqtt.png", 30, 30, "*"))
            .appendField("Subscribe ")
            .appendField(new Blockly.FieldTextInput("topic"), "mqtt_topic")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#d35400');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['mqtt_subscribe'] = function (block) {
    var text_mqtt_topic = block.getFieldValue('mqtt_topic');
    var code = 'mqtt.subscribe(b\'' + text_mqtt_topic + '\')\n' + 'while True:\n' + Blockly.Python.INDENT + 'mqtt.wait_msg()\n';
    return code;
};

Blockly.Blocks['mqtt_onmessage'] = {
    init: function () {
        this.appendValueInput("NAME")
            .appendField(new Blockly.FieldImage("images/block/mqtt.png", 30, 30, "*"))
            .setCheck(null)
            .appendField("Onmessage");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#d35400');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Python['mqtt_onmessage'] = function (block) {
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = 'mqtt.set_callback(' + value_name.split('(')[1] + ')\n';
    return code;
};
// var pwm_port = 0;
// Blockly.Blocks['Pin_PWM'] = {
//     init: function() {
//         this.appendStatementInput("NAME")
//             .setCheck(null)
//             .appendField("Set PWM on Port")
//             .appendField(new Blockly.FieldDropdown([
//                 ["1", "1"],
//                 ["2", "2"]
//             ]), "port");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour('#1abc9c');
//         this.setTooltip('');
//         this.setHelpUrl('');
//     }
// };
// Blockly.Python['Pin_PWM'] = function(block) {
//     var dropdown_port = block.getFieldValue('port');
//     pwm_port = dropdown_port;
//     var statements_name = Blockly.Python.statementToCode(block, 'NAME', true);
//     // console.log(statements_name)
//     statements_name = statements_name.replace(/\s/g, '');
//     // console.log(statements_name)
//     statements_name = statements_name.replace(/\$n/g, '\n');
//     if (pwm_port == '1') {
//         var code = 'pwm' + pwm_port + ' = PWM(Pin(14))' + statements_name + '\n';
//     } else {
//         var code = 'pwm' + pwm_port + ' = PWM(Pin(13))' + statements_name + '\n';
//     }
//     return code;
// };

// Blockly.Blocks['Pin_PWMFreq'] = {
//     init: function() {
//         this.appendValueInput("freq")
//             .setCheck("Number")
//             .appendField("PWM Frequency");
//         this.appendDummyInput()
//             .appendField("0 for show current value");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour('#1abc9c');
//         this.setTooltip('');
//         this.setHelpUrl('');
//     }
// };

// Blockly.Python['Pin_PWMFreq'] = function(block) {
//     var value_freq = Blockly.Python.valueToCode(block, 'freq', Blockly.Python.ORDER_ATOMIC);
//     if (value_freq == 0)
//         var code = '$npwm' + pwm_port + '.freq()';
//     else
//         var code = '$npwm' + pwm_port + '.freq(' + value_freq + ')';
//     return code;
// };

// Blockly.Blocks['Pin_PWMDuty'] = {
//     init: function() {
//         this.appendValueInput("duty")
//             .setCheck("Number")
//             .appendField("PWM Duty (0 - 1024)");
//         this.appendDummyInput()
//             .appendField("0 for show current value");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour('#1abc9c');
//         this.setTooltip('');
//         this.setHelpUrl('');
//     }
// };

// Blockly.Python['Pin_PWMDuty'] = function(block) {
//     var value_duty = Blockly.Python.valueToCode(block, 'duty', Blockly.Python.ORDER_ATOMIC);
//     if (value_duty == 0)
//         var code = '$npwm' + pwm_port + '.duty()';
//     else
//         var code = '$npwm' + pwm_port + '.duty(' + value_duty + ')';
//     return code;
// };

// Blockly.Blocks['Pin_PWMDeinit'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("PWM Deinit");
//         this.setPreviousStatement(true, null);
//         this.setColour('#1abc9c');
//         this.setTooltip('');
//         this.setHelpUrl('');
//     }
// };
// Blockly.Python['Pin_PWMDeinit'] = function(block) {
//     var code = 'pwm' + pwm_port + '.deinit()\n';
//     return code;
// };

Blockly.Blocks['Pin_I2C_read'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/link-button.png", 30, 30, "*"))
            .appendField("Read I2C from ")
            .appendField(new Blockly.FieldTextInput("address 0x00"), "i2c_addr");
        this.setOutput(true, null);
        this.setColour('#27ae60');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Python['Pin_I2C_read'] = function (block) {
    var ext_i2c_addr = block.getFieldValue('i2c_addr');
    var code = 'I2C(scl=Pin(13), sda=Pin(5)).readfrom(' + ext_i2c_addr + ', 4)';
    return [code, Blockly.Python.ORDER_NONE];
};

// Blockly.Blocks['Pin_I2C_write'] = {
//     init: function() {
//         this.appendValueInput("i2c")
//             .appendField(new Blockly.FieldImage("images/block/link-button.png", 30, 30, "*"))
//             .setCheck(["String", "Array"])
//             .appendField("Write I2C to ")
//             .appendField(new Blockly.FieldTextInput("address 0x00"), "i2c_addr");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour('#27ae60');
//         this.setTooltip('');
//         this.setHelpUrl('');
//     }
// };

Blockly.Blocks['Pin_I2C_write'] = {
    init: function () {
        this.appendValueInput("i2c")
            .appendField(new Blockly.FieldImage("images/block/link-button.png", 30, 30, "*"))
            .setCheck(["Number", "String", "Array"])
            .appendField("Write I2C");
        this.appendDummyInput()
            .appendField("to")
            .appendField(new Blockly.FieldTextInput("address 0x00"), "i2c_addr");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#27ae60');
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Python['Pin_I2C_write'] = function (block) {
    var value_i2c = Blockly.Python.valueToCode(block, 'i2c', Blockly.Python.ORDER_ATOMIC);
    var text_i2c_addr = block.getFieldValue('i2c_addr');
    // TODO: Assemble Python into code variable.
    var code = 'i2c = I2C(scl=Pin(13), sda=Pin(5))\ni2c.writeto(' + text_i2c_addr + ', ' + value_i2c + ')\n';
    return code;
};

// Blockly.Python['Pin_I2C_write'] = function(block) {
//     var text_i2c_addr = block.getFieldValue('i2c_addr');
//     var value_i2c = Blockly.Python.valueToCode(block, 'i2c', Blockly.Python.ORDER_ATOMIC);
//     // TODO: Assemble Python into code variable.
//     var code = 'i2c = I2C(scl=Pin(13), sda=Pin(5))\ni2c.writeto(' + text_i2c_addr + ', ' + value_i2c + ')\n';
//     // TODO: Change ORDER_NONE to the correct strength.
//     return code;
// };

Blockly.Blocks['Pin_I2C_scan'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/link-button.png", 30, 30, "*"))
            .appendField("Scan I2C Device(s)");
        this.setOutput(true, null);
        this.setColour('#27ae60');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Python['Pin_I2C_scan'] = function (block) {
    // TODO: Assemble Python into code variable.
    var code = 'I2C(scl=Pin(13), sda=Pin(5)).scan()';
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['WLAN_setting'] = {
    init: function () {
        this.appendStatementInput("Wifi_Mode")
            .appendField(new Blockly.FieldImage("images/block/wifi-signal-waves.png", 30, 30, "*"))
            .setCheck(null)
            .appendField("Set WiFi Mode")
            .appendField(new Blockly.FieldDropdown([
                ["Access Point", "AP_IF"],
                ["Station (Other WiFi)", "STA_IF"]
            ]), "Mode")
            .appendField("Active")
            .appendField(new Blockly.FieldDropdown([
                ["Enable", "True"],
                ["Disable", "False"]
            ]), "State");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#16a085');
        this.setTooltip('');
    }
};

Blockly.Python['WLAN_setting'] = function (block) {
    var dropdown_mode = block.getFieldValue('Mode');
    var dropdown_state = block.getFieldValue('State');
    var statements_wifi = Blockly.Python.statementToCode(block, 'Wifi_Mode', true);
    statements_wifi = statements_wifi.replace(/\s/g, '');
    statements_wifi = statements_wifi.replace(/\$n/g, '\n');
    // var value_wifi_mode = Blockly.Python.valueToCode(block, 'Wifi Mode', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = 'wlan = network.WLAN(network.' + dropdown_mode + ')\n' + 'wlan.active(' + dropdown_state + ')' + statements_wifi + '\n';
    return code;
};

Blockly.Blocks['WLAN_connectwifi'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/wifi-signal-waves.png", 30, 30, "*"))
            .appendField("Connect to ")
            .appendField(new Blockly.FieldTextInput("Wifi Name"), "ssid")
            .appendField(" Password")
            .appendField(new Blockly.FieldTextInput("Password"), "pw");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        // this.setOutput(true,null)
        this.setColour('#16a085');
        this.setTooltip('');
    }
};

Blockly.Python['WLAN_connectwifi'] = function (block) {
    var text_ssid = block.getFieldValue('ssid');
    var text_pw = block.getFieldValue('pw');
    // TODO: Assemble Python into code variable.
    var code = '$nwlan.connect(' + text_ssid + ', ' + text_pw + ')';
    return code;
};

Blockly.Blocks['WLAN_checknetwork'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/wifi-signal-waves.png", 30, 30, "*"))
            .appendField("Check Network Status")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#16a085');
        this.setTooltip('');
    }
};

Blockly.Python['WLAN_checknetwork'] = function (block) {
    var code = '$nwlan.ifconfig()';
    return code;
};

var pin_servo = 0;
Blockly.Blocks['Pin_PWM_output'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Talk to")
            .appendField(new Blockly.FieldDropdown([
                ["Servo1", "1"],
                ["Servo2", "2"]
            ]), "pin_pwm");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#1abc9c');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['Pin_PWM_output'] = function (block) {
    var dropdown_pin = block.getFieldValue('pin_pwm');
    pin_servo = dropdown_pin;
    if (pin_servo == '1') {
        var code = 'servo1 = PWM(Pin(4), freq=50, duty=77)\n';
    } else {
        var code = 'servo2 = PWM(Pin(14), freq=50, duty=77)\n';
    }
    sensor_servo = 77;
    return code;
};

Blockly.Blocks['ADC_input'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("images/block/swap-horizontal-orientation-arrows.png", 30, 30, "*"))
            .appendField("Read Sensor on analog port")
        this.setOutput(true, null);
        this.setColour('#4FC3F7');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Python['ADC_input'] = function (block) {
    // TODO: Assemble Python into code variable.
    var code = 'ADC(0).read()';
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['time_delay'] = {
    init: function () {
        this.appendValueInput("delay")
            .appendField("Wait")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["second(s)", "sleep"],
                ["millisecond(ms)", "sleep_ms"],
                ["microsecond(us)", "sleep_us"]
            ]), "prefix_second");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour('#2ecc71');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['time_delay'] = function (block) {
    if (block.getField('delay')) {
        // Internal number.
        var delay = parseFloat(block.getFieldValue('delay'));
    } else {
        // External number.
        var delay = Blockly.Python.valueToCode(block, 'delay',
            Blockly.Python.ORDER_NONE);
    }

    var prefix_second = block.getFieldValue('prefix_second');
    var code = 'time.' + prefix_second + '(' + delay + ')\n'

    return code;
};

Blockly.Blocks['text_binary'] = {
    init: function () {
        this.appendValueInput("text")
            .setCheck(null)
            .appendField("Binary Text");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour("#8e44ad");
        this.setTooltip('');
        this.setHelpUrl('');
    }
};

Blockly.Python['text_binary'] = function (block) {
    var value_name = Blockly.Python.valueToCode(block, 'text', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = "b" + String(value_name);
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Blocks['ujson_json'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(null)
            .appendField("JSON Key :")
            .appendField(new Blockly.FieldTextInput("key"), "key1")
            .appendField("  value :");
        this.appendDummyInput();
        this.appendValueInput("NAME2")
            .setCheck(null)
            .appendField("Key :")
            .appendField(new Blockly.FieldTextInput("key"), "key2")
            .appendField("  value :");
        this.setOutput(true, null);
        this.setColour('#8e44ad');
        this.setTooltip('');
        this.setHelpUrl('');
    }
};
Blockly.Python['ujson_json'] = function (block) {
    var text_key1 = block.getFieldValue('key1');
    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);
    var text_key2 = block.getFieldValue('key2');
    var value_name2 = Blockly.Python.valueToCode(block, 'NAME2', Blockly.Python.ORDER_ATOMIC);
    // TODO: Assemble Python into code variable.
    var code = "{'" + text_key1 + "': " + value_name + ", '" + text_key2 + "': " + value_name2 + "}";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.Python.ORDER_NONE];
};
