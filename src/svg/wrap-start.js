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
