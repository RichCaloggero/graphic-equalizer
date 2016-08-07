var audio = new AudioContext ();

var GraphicEqualizer = require ("./graphicEqualizer");
var GraphicEqualizerUi = require ("./graphicEqualizerUi");
var $ = require ("jquery");
var audioElement = $("#player")[0];
var eq, ui, source;

source = audio.createMediaElementSource (audioElement);

eq = new GraphicEqualizer (32, 10, 1.0, source, audio.destination);
ui = new GraphicEqualizerUi (eq);
ui.render ($(".eq"));
audioElement.play ();

$("#source").on ("change", function (e) {
$(audioElement).attr ("src", $(e.target).val());
return false;
});

