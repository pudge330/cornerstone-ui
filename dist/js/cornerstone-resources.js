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

	global.CornerstoneResources = CornerstoneResources;

})(this);