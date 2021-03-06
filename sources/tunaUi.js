var template = require ("./tunaUi.mustache");
var $ = require ("jquery");
module.exports = TunaUi;

function TunaUi (model) {
var parameters = Object.keys(model.model.defaults).map (function (name) {
var parameter = model.model.defaults[name];
parameter.name = name;
return parameter;
});


this.render = function ($target) {
$target.html (template({
parameters: parameters,

step: function () {
return (this.max - this.min) / 30.0;
} // step
}));

// add event handlers
$target.on ("keydown", "[type=range]", function (e) {
var key = e.keyCode;

if (e.key === "0" || (key >= 35 && key <= 40)) {
if (e.key == "0") $(e.target).val (0);

setTimeout (function () {
$(e.target).trigger ("change");
}, 50);
console.log ("changing ", $(e.target).attr("data-name"));
} // if
return true;

}).on ("change", "[data-name]", function (e) {
var name = $(e.target).attr ("data-name");
var value = Number($(e.target).val());
model.set (name, value);
console.log ("set ", name, value);
return true;

}).on ("change", "[data-name=bypass]", function (e) {
model.bypass = e.target.checked;
console.log ("bypass is ", e.target.checked);
return true;
});

// register callback for changes to model
model.onChange = function (name, value) {
var $parameter = $target.find (`[data-name=${name}]`);

if (Number($parameter.val()) !== value) {
$parameter.val (value);
$parameter.trigger ("change");
console.log ("set ui parameter ", name, value);
} // if


return value;
}; // change

return $target;
}; // this.render

} // TunaUi
