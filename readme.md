# Graphic Equalizer

This is meant to be a test project to learn how to use npm tools (i.e. browserify and mustache templating) to build browser apps using modules written in the commonjs style (i.e. using require as in node.js).

The repository contains two modules, and a demo meant to exercise the modules:
- `sources/graphicEqualizer.js` contains the graphic equalizer model
- `sources/graphicEqualizerUi` contains the UI which uses jQuery and mustach templating to generate a ui and make requests of the model

The root directory contains `demo.js` which exercises the browserify bundle, `demo.html` which is run in the browser, and `package.json` which runs the build process.

The `dist` directory contains UMD (i.e. standalone) modules and the same demo files which use them. These standalone modules are build from the same codebase and can be loaded in the browser via standard `script` element. They drop their module name as a global - i.e. `GraphicEqualizer` and `GraphicEqualizerUi`.
