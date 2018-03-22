
// create namespace for webmerge if not yet defined
if (typeof webmerge == 'undefined') window.webmerge = {};

// define default JS loader function, overwrite with
// other defered JS loaders like head.hs or requireJS
if (typeof webmerge.loadJS != 'function')
{
	webmerge.loadJS = function (src)
	{
		document.write('<script src="' + src + '"></script>');
	}
}

// include a JS file (rewrite url if configured to)
// then call the loadJS function to import the code
if (typeof webmerge.includeJS != 'function')
{
	webmerge.includeJS = function (src)
	{
		// check if we have a custom webroot
		if (webmerge.webroot) src = [webmerge.webroot, src].join('/');
		// check if we have a custom url rewriter
		if (webmerge.rewriteJS) src = webmerge.rewriteJS(src);
		// call the importer function, which
		// can be overwritten by a custom loader
		webmerge.loadJS.call(this, src);
	}
}

;
/* autogenerated by webmerge (dev context) */
;
webmerge.includeJS('/src/Base.js?A7434CBA241B');
;
webmerge.includeJS('/src/Base/Class.js?123F94203D68');
;
webmerge.includeJS('/src/Mixins/Options.js?A436FFB7E71E');
;
webmerge.includeJS('/src/Mixins/Events.js?56980B709A4F');
;
webmerge.includeJS('/src/Mixins/Plugin.js?215BA68FBE9F');
;
webmerge.includeJS('/src/Mixins/Resources.js?A9AA98231106');
;
webmerge.includeJS('/lib/loaders/ArrayLoader.js?093BACD718E4');
;
webmerge.includeJS('/lib/loaders/BlobLoader.js?24E2470A546D');
;
webmerge.includeJS('/lib/loaders/DataLoader.js?3A27679DA1E0');
;
webmerge.includeJS('/lib/loaders/JsonLoader.js?917A5CA6DF44');
;
webmerge.includeJS('/lib/loaders/TextLoader.js?DE266EE46221');
;
webmerge.includeJS('/lib/loaders/TextureLoader.js?C93CFD1B8FF0');
;
webmerge.includeJS('/src/Base/Object3D.js?936DFA802CC2');
;
webmerge.includeJS('/src/Base/Scene.js?EF60849AA383');
;
webmerge.includeJS('/src/Base/LOD.js?75B23E365339');
;
webmerge.includeJS('/src/Materials/CustomMaterial.js?5D6ADB46C516');
;
webmerge.includeJS('/src/Materials/CustomPhong.js?BC83EF231640');
;
webmerge.includeJS('/src/Plugins/Clock.js?793393A474E9');
;
webmerge.includeJS('/src/Plugins/Scene.js?008FBF9A5FA8');
;
webmerge.includeJS('/src/Plugins/AutoSize.js?1B47965F756D');
;
webmerge.includeJS('/src/Plugins/WebGLRenderer.js?2437D92613DF');
;
webmerge.includeJS('/src/Plugins/PerspectiveCamera.js?77C36357028E');
;
webmerge.includeJS('/src/Plugins/TrackballControls.js?84E36CCADD17');
;
webmerge.includeJS('/src/Plugins/Loader.js?817F5D287771');
;
webmerge.includeJS('/src/Plugins/Progress.js?411BFFFD0FDE');
;
webmerge.includeJS('/src/Plugins/Uniforms.js?551F8BA98FFE');
;
webmerge.includeJS('/src/Plugins/Background.js?3630D47256C9');
;
webmerge.includeJS('/src/Plugins/LOD.js?E4B497095D16');
;
webmerge.includeJS('/src/Plugins/UI.js?9D9231B7EE26');
;
webmerge.includeJS('/lib/extras/StatsGPU.js?2D125F01B8AE');
;
webmerge.includeJS('/src/Plugins/MonitorGPU.js?C121EBBDA4D6');
;
webmerge.includeJS('/lib/sprintf-0.7-beta1.js?5E9AB2F7C788');
;
webmerge.includeJS('/src/App.js?3B8FC68E2936');

/* crc: 2F2C0FEB633D96F0062A3FAC3FD37017 */
