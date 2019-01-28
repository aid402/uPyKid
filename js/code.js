
var workspace = Blockly.inject(document.getElementById('blocklyDiv'), {
    media: 'media/',
    toolbox: document.getElementById('toolbox'),
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1.0,
      maxScale: 2.4,
      minScale: 0.3,
      scaleSpeed: 1.1,
    },
    grid: {
      spacing: 20,
      length: 2.5,
      colour: '#ccc',
      snap: true
    },

});
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
onresize();


var time = new Date();
document.getElementById('status').value = "false"
document.getElementById('filename').value = "Untitled";
var sel = false;
var space = Blockly.Python.INDENT;
var d_space = Blockly.Python.INDENT + Blockly.Python.INDENT;
var t_space = Blockly.Python.INDENT + Blockly.Python.INDENT + Blockly.Python.INDENT;
var connected = false;
var run_status = false;
var commandSystem = false;
var trigger = false;

var cmd = "";
var arrCMD = [];
var arrfile = [];
var log = [];
console.log(document.getElementById('status').value)
var arraddons = [];
arraddons = JSON.parse(window.localStorage.getItem('addons'));
console.log(arraddons)
    //connect('ws://' + localStorage.nsc_prompt_ip + ':' + '8266' + '/')
setInterval(function() {
    Blockly.svgResize(workspace);
    autosaveBlock();
}, 100);
autoloadBlock();

function generate() {
    var head = generateXML();
    var execcode='';
    if (head[0] != '') { execcode += head[0] + "\n"}
    if (head[1] != '') { execcode += head[1] + "\n"}
    if (head[2] != '') { execcode += head[2] + "\n"}
    var code = Blockly.Python.workspaceToCode(workspace).split('\n');
    for (var i = 0; i < code.length; i++) {
        if (code[i].search("= None") < 0 && code[i]!=""){
            execcode += code[i] + "\n";
        }
    }
    execcode += "\n";
    editor.setValue(execcode);
}

function generateXML() {
    var _import = "";
    var _machine = "";
    var _init = "";
    var arrXml = [];
    var first = true;
    var first_sublib = true;
    var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    arrXml.push(xmlText.search("Pin"))
    arrXml.push(xmlText.search("WLAN"))
    arrXml.push(xmlText.search("mqtt"))
    arrXml.push(xmlText.search("PWM"))
    arrXml.push(xmlText.search("IIC"))
    arrXml.push(xmlText.search("ADC"))
    arrXml.push(xmlText.search("time"))
    arrXml.push(xmlText.search("httplib"))
    arrXml.push(xmlText.search("json"))
    arrXml.push(xmlText.search("oled"))
    arrXml.push(xmlText.search("beeper"))
    arrXml.push(xmlText.search("math"))
    arrXml.push(xmlText.search("uniqueid"))
    arrXml.push(xmlText.search("ujson"))
    arrXml.push(xmlText.search("kidbright"))
    for (var i = 0; i < arrXml.length; i++) {
        // console.log(arrXml)
        if (arrXml[i] > 0) {

            switch (i) {
                case 0:
                    if (first_sublib) {
                        // console.log(first)
                        _machine += "from machine import Pin";
                        first_sublib = false;
                    } else if (!first_sublib) {
                        _machine += ",";
                        _machine += "Pin";
                    }
                    break;
                case 1:
                    if (first) {
                        _import += "import network";
                        first = false;
                    } else if (!first) {
                        _import += ",";
                        _import += "network";
                    }
                    break;
                case 2:

                    if (first) {
                        _import += "import ubinascii,umqtt.simple as MQTTClient";
                        first = false;
                    } else if (!first) {
                        _import += ",ubinascii,";
                        _import += "umqtt.simple as MQTTClient";
                    }
                    break;
                case 3:
                    if (first_sublib) {
                        _machine += "from machine import PWM";
                        first_sublib = false;
                    } else if (!first_sublib) {
                        _machine += ",";
                        _machine += "PWM";
                    }
                    break;
                case 4:
                    if (first_sublib) {
                        _machine += "from machine import I2C";
                        first_sublib = false;
                    } else if (!first_sublib) {
                        _machine += ",";
                        _machine += "I2C";
                    }
                    break;
                case 5:
                    if (first_sublib) {
                        _machine += "from machine import ADC";
                        first_sublib = false;
                    } else if (!first_sublib) {
                        _machine += ",";
                        _machine += "ADC";
                    }
                    break;
                case 6:
                    if (first) {
                        _import += "import time";
                        first = false;
                    } else if (!first) {
                        _import += ",";
                        _import += "time";
                    }
                    break;

                case 7:
                    if (first) {
                        _import += "import httplib";
                        first = false;
                    } else if (!first) {
                        _import += ",";
                        _import += "httplib";
                    }
                    break;
                case 8:
                    if (first) {
                        _import += "import json";
                        first = false;
                    } else if (!first) {
                        _import += ",";
                        _import += "json";
                    }
                    break;
                case 9:
                    if (first) {
                        _import += "import oled";
                        first = false;
                    } else if (!first) {
                        _import += ",";
                        _import += "oled";
                    }
                    break;

                case 10:
                    if (first) {
                        _import += "import beeper";
                        first = false;
                    } else if (!first) {
                        _import += ","
                        _import += "beeper";
                    }
                    break;

                case 11:
                    if (first) {
                        _import += "import math";
                        first = false;
                    } else if (!first) {
                        _import += ",";
                        _import += "math";
                    }
                    break;

                case 12:
                    if (first_sublib) {
                        _machine += "from machine import unique_id";
                        first_sublib = false;
                    } else if (!first_sublib) {
                        _machine += ",";
                        _machine += "unique_id";

                    }
                    break;
                case 13:
                    if (first) {
                        _import += "import ujson";
                        first = false;
                    } else if (!first) {
                        _import += ",";
                        _import += "ujson";
                    }
                    break;
                case 14:
                    if (first) {
                        _import += "import kidbright";
                        first = false;
                    } else if (!first) {
                        _import += ",";
                        _import += "kidbright";
                    }
                    _init += "kb = kidbright.INIT()\n"
                    break;
            }
        }
    }
    return [ _import, _machine, _init];
}

function Savecode() {
    var code = editor.getValue();
    var nameInput = document.getElementById('filename').value;
    if (!nameInput ? alert("Please fill name") : download(nameInput + '.py', code));
}

function Savecode_edi() {
    var code = generate();
    var nameInput = document.getElementById('get_filename').value;
    if (!nameInput ? alert("Please fill name") : download(nameInput + '.py', code));
}

function save_file() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var xml_text = Blockly.Xml.domToText(xml);
    var nameInput = document.getElementById('file_name').value;
    if (!nameInput ? alert("Please fill name") : download(nameInput + '.xml', xml_text));
}

function loadXml() {
    var parseInputXMLfile = function(e) {
        var xmlFile = e.target.files[0];
        var filename = xmlFile.name;
        var extensionPosition = filename.lastIndexOf('.');
        if (extensionPosition !== -1) {
            filename = filename.substr(0, extensionPosition);
        }

        var reader = new FileReader();
        reader.onload = function() {
            var xml = Blockly.Xml.textToDom(reader.result);
            Blockly.Xml.domToWorkspace(workspace, xml);
            console.log(reader.result);

        };
        reader.readAsText(xmlFile);
    };

    // Create once invisible browse button with event listener, and click it
    var selectFile = document.getElementById('select_file');
    if (selectFile === null) {
        var selectFileDom = document.createElement('INPUT');
        selectFileDom.type = 'file';
        selectFileDom.id = 'select_file';

        var selectFileWrapperDom = document.createElement('DIV');
        selectFileWrapperDom.id = 'select_file_wrapper';
        selectFileWrapperDom.style.display = 'none';
        selectFileWrapperDom.appendChild(selectFileDom);

        document.body.appendChild(selectFileWrapperDom);
        selectFile = document.getElementById('select_file');
        selectFile.addEventListener('change', parseInputXMLfile, false);
    }
    selectFile.click();
}


function showCode() {
    // Generate JavaScript code and display it.
    Blockly.Python.INFINITE_LOOP_TRAP = null;
    var code = Blockly.Python.workspaceToCode(workspace);
    alert(code);
}

function autosaveBlock() {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    var data = Blockly.Xml.domToText(xml);
    // Store data in blob.
    window.localStorage.setItem('autoSaveBlock', data);
}

function autoloadBlock() {
    console.log('-- Loading saved code.')
    var xml = Blockly.Xml.textToDom('<xml><block type="controls_main" x="229" y="170"></block></xml>');
    xml.editable = false;
    xml.deletable = false;
    workspace.clear();
    Blockly.Xml.domToWorkspace(workspace, xml);

    generate()

    var loadedBlock = window.localStorage.getItem('autoSaveBlock');
    console.log(loadedBlock)

    if (!loadedBlock) return;
    if (!(loadedBlock.split('<block type="controls_main"')[1])) {
        loadedBlock = loadedBlock.split('</xml>')[0] + '<block type="controls_main" x="229" y="170"></block></xml>';
    }
    try {
        var xml = Blockly.Xml.textToDom(loadedBlock);
    } catch (e) {

        return;
    }
    if (xml.childElementCount == 0) return;
    workspace.clear();
    Blockly.Xml.domToWorkspace(workspace, xml);
}
