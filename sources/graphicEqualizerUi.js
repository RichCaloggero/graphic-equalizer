var template = require ("./graphicEqualizer.mustache");
var $ = require ("jquery");

module.exports = GraphicEqualizerUi;

function GraphicEqualizerUi (model) {
var self = this;

this.render = function ($target) {
$target.html (template(model));

// add access keys
if (model.bandCount <= 10) {
$target.find (".band .gain").each (function (index, node) {
$(node).attr ("accesskey", (index+1) % model.bandCount);
}); // each
} // if

// add event handlers
$target.on ("keydown", ".gain, .q", function (e) {
var key = e.keyCode;

if (e.key === "0" || (key >= 35 && key <= 40)) {
if (e.key == "0") $(e.target).val (0);

setTimeout (function () {
$(e.target).trigger ("change");
}, 50);
} // if
return true;

}).on ("change", ".band", function (e) {
var $band = $(this);
var frequency = Number($(".frequency", $band).text());
var gain = Number($(e.target).val());
var bandIndex = $(".band", $target).index ($band);
model.setGain (bandIndex, gain);
return false;

}).on ("change", ".q", function (e) {
model.setQ (Number( $(e.target).val() ));
return false;

}).on ("click", ".reset", function (e) {
$target.find (".band .gain").val (0).trigger("change");
return false;

}).on ("click", ".bypass", function (e) {
model.bypass (e.target.checked);
return true;
}); // events

}; // render

} // GraphicEqualizerUi
