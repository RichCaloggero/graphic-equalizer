module.exports = TunaModel;

function TunaModel (model) {
this.model = model;

function set (name, value) {
model[name] = value;
if (this.onChange && this.onChange instanceof Function) this.onChange.call (this, name, value);
} // set

// public properties

// public methods
this.set = set;

} // TunaModel

