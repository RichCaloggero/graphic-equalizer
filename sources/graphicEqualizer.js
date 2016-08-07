module.exports = GraphicEqualizer;

function GraphicEqualizer (minFrequency, bandCount, q, input, output) {
var bands;
var filters;
var outputGain;
var audio;

if (! (this instanceof GraphicEqualizer)) return new GraphicEqualizer (minFrequency, bandCount, q, input, output);

var self = this;
audio = input.context;
self.Q = q;
self.bandCount = bandCount;
init ();


// public methods
this.setGain = function (bandIndex, value) {
bands[bandIndex].gain = value;
filters[bandIndex].gain.value = value;
console.log(`band ${bandIndex} set to gain ${value}`);
}; // this.setGain

this.setQ = function (value) {
filters.forEach (function (filter) {
filter.Q.value = value;
}); // forEach filters
self.Q = q;
console.log (`set Q to ${value}`);
return value;
}; // setQ

this.bypass = function (bypass) {
if (bypass) {
input.disconnect ();
outputGain.disconnect ();
input.connect (output);
console.log ("enable bypass mode");

} else {

input.disconnect ();
init ();
console.log ("disable bypass mode");
} // if

return bypass;
}; // this.bypass


// internal methods

function init () {
var frequency = minFrequency;
outputGain = audio.createGain ();
outputGain.gain.value = 1/bandCount;
console.log ("outputGain: ", outputGain.gain.value, outputGain);
outputGain.connect (output);

if (! bands || bands.length === 0) {
bands = [];
for (var i=0; i<bandCount; i++) {
bands.push ({
frequency: frequency,
gain: 0.0
}); // band
frequency *= 2;
} // for
} // if

filters = bands.map (function (band) {
var filter = audio.createBiquadFilter ();
filter.type = "peaking";
filter.Q.value = self.Q;
filter.frequency.value = band.frequency;
filter.gain.value = band.gain;
input.connect (filter);
filter.connect (outputGain);
return filter;
}); // map over bands

self.frequencyBands = bands;
self.filters = filters;
console.log ("GraphicEqualizer initialized with ", self.frequencyBands.length, " bands");
} // init

} // GraphicEqualizer


