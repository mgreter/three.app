/*
	Copyright 2017 Marcel Greter
	https://www.github.com/mgreter
*/

// private scope
(function (module, THREE, THREEAPP)
{
	"use strict";

	// ToDo: implement fallback?
	var defer = requestAnimationFrame;

	// uncomment if you want to test max framerate
	// defer = function () { setTimeout(arguments[0], 0); }

	var ThreeApp = THREEAPP.Class.create('ThreeApp', null, ['Events'])

	.ctor(function ctor(vp, options) {

		// scope for closures
		var app = this;
		// count frames
		app.frames = 9999;
		// application viewport
		app.viewport = vp;
		// extend instance options
		THREEAPP.extend(this.options, options);
		// query extended options
		options = this.options;

	})

	.init(function init(app) {

		// scope for closures
		var app = this;
		// query extended options
		var options = this.options;

		// instantiate all 3rd party plugins
		// create plan to resolve all plugins
		var plugins = this.options.plugins || [];
		var unsatisfied = [].concat(plugins); // clone array
		// loop until finished or failing
		var stop = false; var n = 0;
		while (n < unsatisfied.length) {
			// skip the ones that are not satisfied yet
			var required = unsatisfied[n].prototype.required;
			if (required && required.length) { ++ n; continue; }
			// this plugin has been satisfied
			var plugin = unsatisfied.splice(n, 1)[0];
			// check if it provides any services
			if (plugin.prototype.provided) {
				var provided = plugin.prototype.provided;
				for (var i = 0; i < unsatisfied.length; i++) {
					for (var service in provided) {
						var requires = unsatisfied[i].prototype.required;
						var idx = (requires || []).indexOf(service);
						if (idx == -1) continue;
						requires.splice(idx, 1);
					}
				}
				// restart lookup
				n = 0;
			}
			// call plugin constructor
			plugins[i] = new plugin(this);
		}

		// this should be empty now
		if (unsatisfied.length) {
			// list all unsatisfied plugins
			for (var i = 0; i < unsatisfied.length; i++) {
				var name = unsatisfied[i].name;
				var requires = unsatisfied[i].prototype.required;
				console.warn(name, "is missing", requires);
			}
			// error out hard (should never happen in prod)
			throw Error("Missing or circular dependencies");
		}

		// store on main object
		app.plugins = plugins;

	})

	.ready(function ready()
	{
		// scope for closures
		var app = this;
		// start app right away?
		if (this.options.start) {
			// use a timeout just in case
			window.setTimeout(function () {
				app.start(); // start app
			}, 0)
		}
	})

	.method('start', function start()
	{
		// scope for closures
		var app = this;
		// check if already runing
		if (app.started) return;
		// return if paused?
		if (app.paused) return;
		// start rendering
		defer( function () {
			app.render.call(app);
		});
		// set started flag
		app.started = true;
	})

	// resized the renderer viewport
	.method('resize', function resize(width, height) {
		// local var access
		var app = this;
		// set app dimensions
		app.width = width;
		app.height = height;
		// invoke resized event
		app.invoke('resized');
	})

	.method('render', function render() {
		// local var access
		var app = this;
		// invoke pre-render event
		app.invoke('preframe');
		// invoke render event
		app.invoke('render');
		// invoke post-render event
		app.invoke('postframe');
		// enqueue next frame
		if (app.started) {
			defer( function defered() {
				app.render.call(app);
			});
		}
		// count frames
		++ app.frames;
	})

	;

	// assign class to global namespace
	THREEAPP('App', ThreeApp);

// EO private scope
})(self, THREE, THREEAPP);