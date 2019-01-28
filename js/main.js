var basic_mode_default=true;
var tb = document.getElementById("toolbar");
var terminal_show = true;

function set_size() {
  var code_height = (window.innerHeight - tb.offsetHeight) + 'px';
  document.getElementById("coding").style.height = code_height;
  var code_width = window.innerWidth - document.getElementById("editor_toolbar").offsetWidth - document.getElementById("terminal_toolbar").offsetWidth;
  if (terminal_show) {
    document.getElementById("editor").style.width = (code_width / 2) + 'px';
    document.getElementById("terminalArea").style.width = (code_width / 2 - 1) + 'px';
    document.getElementById("terminalArea").style.display = 'inline-block';
    document.getElementById('hide_term_button').className = "fa fa-forward";  
  } else {
    document.getElementById("editor").style.width = code_width-1 + 'px';
    document.getElementById("terminalArea").style.display = 'none';
    document.getElementById('hide_term_button').className = "fa fa-backward";  
  }
}

function terminal_hidden() {
  terminal_show = !terminal_show;
  set_size();
  onresize();
}

function on_start() {
  openFullscreen();
  set_size();
  open_term();
  set_mode();
}

function set_mode() {
  if (basic_mode_default) {
    basic_mode();
  }
  else {
    advance_mode();
  }
}

function basic_mode() {
  basic_mode_default=false;
  document.getElementById('btn_mode').className = "fa fa-code";
  document.getElementById('btn_mode').title = "Advance mode";  
  document.getElementById("basic").style.display = "inline-block";
  document.getElementById("advance").style.display = "none";
  onresize();
}

function advance_mode() {
  basic_mode_default=true;
  document.getElementById('btn_mode').className = "fa fa-cube";
  document.getElementById('btn_mode').title = "Basic mode";  
  document.getElementById("basic").style.display = "none";
  document.getElementById("advance").style.display = "inline-block";
  onresize();
  editor.resize();
  var size = calculate_size();
  term.resize(size[0], size[1]);
}

window.addEventListener('resize', function() {
  set_size();
  onresize();
  var size = calculate_size();
  term.resize(size[0], size[1]);
});

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}