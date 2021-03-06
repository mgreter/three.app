var Sphere = THREEAPP.Class.create('Sphere', THREE.Mesh, ['Resources'])

// default options
.defaults({
	color: 0xFF0000,
	// texture: ...
})

// called on object construction
.ctor(function (app) {
	// fetch resources
	this.prefetch(this.options.texture ? {
		'texture': ['T', this.options.texture],
	} : {})
})

// called when texture is loaded
.ready(function () {

	var options = this.options;
	var texture = options.texture;
	var matopt = { color: options.color };
	if (texture) matopt.map = this.asset('texture');
	// create a sphere geometry with radius 4
	var geometry = new THREE.IcosahedronGeometry(4, 6);
	// create a lambert material with red color (needs light!)
	var material = new THREE.MeshLambertMaterial(matopt);
	// call base mesh constructor function
	THREE.Mesh.call(this, geometry, material);
	// add ourself to parent if given by options
	if (options.parent) options.parent.add(this);

})

;

// get the viewport dom element
var vp = document.getElementById('vp');

// create main ThreeApp instance
var app = new THREEAPP.App(vp, {
	// load plugins
	plugins: [
		// order is not important
		THREEAPP.Plugin.Scene,
		THREEAPP.Plugin.AutoSize,
		THREEAPP.Plugin.WebGLRenderer,
		THREEAPP.Plugin.PerspectiveCamera,
		THREEAPP.Plugin.TrackballControls,
		// asset loading and status
		THREEAPP.Plugin.Loader,
		THREEAPP.Plugin.Progress,
		// add statitics monitor
		THREEAPP.Plugin.MonitorGPU,
	],
	// autostart
	start: true
});

// get objects created by plugins
var scene = app.scene,
	camera = app.camera,
	controls = app.controls,
	renderer = app.renderer;

// instantiate our custom sphere
var sphere = new Sphere(app, {
	texture: 'land_shallow_topo_2048.jpg',
	parent: app.scene,
	color: 0x99CCFF
});

// create a point light (with white light)
var light = new THREE.PointLight(0xFFFFFF);

// set the light position
light.position.x = 10;
light.position.y = 50;
light.position.z = 130;

// add light to scene
app.scene.add(light);

// set camera position
app.camera.position.x = -6;
app.camera.position.z = 10;
