(function(global) {
	
	var CornerstoneResources = {
		icons: {},
		templates: {},
		icon: function(name, element) {
			if (CornerstoneResources.icons.hasOwnProperty(name)) {
				if (typeof jQuery !== 'undefined') {
					if (!(element instanceof jQuery)) {
						element = jQuery(element);
					}
					element.html(CornerstoneResources.icons[name]);
				}
				else {
					element.innerHTML = CornerstoneResources.icons[name];
				}
			}
		},
		template: function(name, data) {
			if (CornerstoneResources.templates.hasOwnProperty(name)) {
				return bglib.fn.interpolate(CornerstoneResources.templates[name], data);
			}
			else {
				return '';
			}
		}
	};

	CornerstoneResources.icon.get = function(name) {
		if (CornerstoneResources.icons.hasOwnProperty(name)) {
			return CornerstoneResources.icons[name];
		}
		else {
			return '';
		}
	};

	CornerstoneResources.template.get = function(name) {
		if (CornerstoneResources.templates.hasOwnProperty(name)) {
			return CornerstoneResources.templates[name];
		}
		else {
			return '';
		}
	};

	CornerstoneResources.icons['arrow'] = '<svg width="100%" height="100%" viewBox="0 0 425 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M386.042,0l-212.5,211.268l38.958,38.732l212.5,-211.268l-38.958,-38.732Z" style="fill:#a2a2a2;"/><path d="M251.458,211.268l-212.5,-211.268l-38.958,38.732l212.5,211.268l38.958,-38.732Z" style="fill:#a2a2a2;"/></svg>';

	CornerstoneResources.icons['ios-close'] = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M278.6,256l68.2-68.2c6.2-6.2,6.2-16.4,0-22.6c-6.2-6.2-16.4-6.2-22.6,0L256,233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6,0 c-3.1,3.1-4.7,7.2-4.7,11.3c0,4.1,1.6,8.2,4.7,11.3l68.2,68.2l-68.2,68.2c-3.1,3.1-4.7,7.2-4.7,11.3c0,4.1,1.6,8.2,4.7,11.3 c6.2,6.2,16.4,6.2,22.6,0l68.2-68.2l68.2,68.2c6.2,6.2,16.4,6.2,22.6,0c6.2-6.2,6.2-16.4,0-22.6L278.6,256z"/></svg>';

	CornerstoneResources.icons['md-close'] = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g id="Icon_5_"><g><polygon points="405,136.798 375.202,107 256,226.202 136.798,107 107,136.798 226.202,256 107,375.202 136.798,405 256,285.798 375.202,405 405,375.202 285.798,256 "/></g></g></svg>';

	global.CornerstoneResources = CornerstoneResources;

})(this);