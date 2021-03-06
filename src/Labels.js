/*
	Copyright 2017 Marcel Greter
	https://www.github.com/mgreter
*/

// private scope
(function (THREE, THREEAPP)
{
	"use strict";

	var margin = 2;

	var packer = new GrowingPacker();

	function setupDraw(label)
	{
		var ctx = this.context;
		var opt = this.options;
		var fontSize = label.fontSize || opt.fontSize;
		var fontFamily = label.fontFamily || opt.fontFamily;
		ctx.font = fontSize + "px " + fontFamily;
		ctx.fillStyle = label.color || opt.fillStyle;
		ctx.strokeStyle = label.stroke || opt.strokeStyle;
		ctx.lineWidth = label.lineWidth || opt.lineWidth;
	}

	function drawBg(label)
	{
		var fit = label.fit;
		var x = fit.x + margin;
		var y = fit.y + label.h;
		y = y - margin - 1;
		var ctx = this.context;
		var opt = this.options;
		if (label.background || opt.background) {
			ctx.fillStyle = label.background || opt.background;
			ctx.fillRect(fit.x, fit.y, label.w, label.h);
		}
		if (label.borderStyle || opt.borderStyle) {
			ctx.strokeStyle = label.borderStyle || opt.borderStyle;
			ctx.lineWidth = label.borderWidth || opt.borderWidth || 1.0;
			ctx.rect(fit.x, fit.y, label.w, label.h);
			ctx.stroke();
		}
	}

	function drawText(label)
	{
		var fit = label.fit;
		var x = fit.x + margin;
		var y = fit.y + label.h;
		// not sure how to measure baseline offset?
		y = y - margin - Math.round(label.h / 6);
		var ctx = this.context;
		var opt = this.options;
		if (label.stroke || opt.strokeStyle) {
			ctx.strokeText(label.txt, x, y);
		}
		if (label.color || opt.fillStyle) {
			ctx.fillText(label.txt, x, y);
		}
	}

	// return power of 2
	function pow2(v)
	{
		v--;
		v |= v >> 1;
		v |= v >> 2;
		v |= v >> 4;
		v |= v >> 8;
		v |= v >> 16;
		v++;
		return v;
	}

	// create a new (augmented) class
	var Labels = THREEAPP.Class.create('Labels', null, ['Group'])

	.defaults({
		hardLimit: 8192,
		fontSize: 10, // only px
		fontFamily: 'Tahoma, sans',
		// fillStyle: '#F0F0F0',
		strokeStyle: '#0F0F0F',
		lineWidth: 1.0
	})

	// constructor
	.ctor(function ctor(app)
	{
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext("2d");
		app.viewport.appendChild(this.canvas);
		this.canvas.style.position = "absolute";
		this.canvas.style.display = "none";
		this.canvas.style.left = "0px";
		this.canvas.style.top = "0px";
		this.canvas.height = 128;
		this.canvas.width = 128;
	})

	.listen('resized', function resized()
	{
		// sort items by their size
		this.items.sort(function (a, b) {
			return Math.max(b.w, b.h) - Math.max(a.w, a.h);
		});
		// remove previous fitting information
		for (var i = 0; i < this.length; i += 1) {
			delete this.items[i].fit;
		};
		// distribute in 2d texture
		packer.fit(this.items);
		var root = packer.root;
		var canvas = this.canvas;
		var context = this.context;
		var width = canvas.width = pow2(root.w);
		var height = canvas.height = pow2(root.h);
		// re-draw the texture immediately
		// maybe we need to resize it too
		context.clearRect(0, 0, canvas.width, canvas.height);

		// call the drawer for each item
		for (var i = 0; i < this.length; i += 1) {
			drawBg.call(this, this.items[i]);
			setupDraw.call(this, this.items[i]);
			drawText.call(this, this.items[i]);
		}
		// invoke async (delayed)
		this.invoke('texture.drawn');
	})

	.listen('inserted', function inserted(label)
	{
		var ctx = this.context, options = this.options;
		setupDraw.call(this, label); // for measure text!
		var fontSize = label.fontSize || options.fontSize;
		label.h = margin + fontSize + margin;
		var size = ctx.measureText(label.txt);
		label.w = margin + size.width + margin;
	})
	
	;

	// assign class to global namespace
	THREEAPP('Labels', Labels);

// EO private scope
})(THREE, THREEAPP);
