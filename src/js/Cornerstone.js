if (typeof bglib === "undefined") {
	bglib = _bglib;
}
var _cornerstone = {
    name: 'Cornerstone UI'
    ,version: '1.0'
    ,__onLoadHandlers: []
    ,__hasLoaded: false
};
var Cornerstone = {};
// var Cornerstone = function() {
// };
Cornerstone.getName = function() {
    return _this.name;
};
Cornerstone.getVersion = function() {
    return _this.version;
};
Cornerstone.setInstance = function(element, type, instance) {
	bglib.El.data(element, 'CS_' + type, instance);
};
Cornerstone.getInstance = function(element, type) {
	return bglib.El.data(element, 'CS_' + type);	
};
Cornerstone.init = function() {
	var eHtml = document.querySelector('html');
	bglib.El.removeClass(eHtml, 'cs-nojs');
	bglib.El.addClass(eHtml, 'cs-js');
	for (var c in Cornerstone.autoload) {
		if (Cornerstone.autoload.hasOwnProperty(c)) {
			(Cornerstone.autoload[c])();
		}
	}
	_cornerstone.__hasLoaded = true;
	for (var i = 0; i < _cornerstone.__onLoadHandlers.length; i++) {
		_cornerstone.__onLoadHandlers[i]();
	}
	// console.log('Cornerstone:inited');
};
Cornerstone.onLoad = function(cb) {
	if (!_cornerstone.__hasLoaded) {
		if (bglib.DT.isFunction(cb)) {
			_cornerstone.__onLoadHandlers.push(cb);
		}
	}
	else {
		cb();
	}
};
Cornerstone.fn = {};
Cornerstone.autoload = {};
Cornerstone.autoload.factory = function(component, sel, dataAttr, dataAttrOptions) {
	dataAttrOptions = dataAttrOptions || [];
	return function() {
		var elements = document.querySelectorAll(sel);
		for (var i = 0; i < elements.length; i++) {
			var opts = elements[i].getAttribute(dataAttr);
			if (opts && opts.trim() != '') {
				opts = JSON.safeParse(opts.trim());
			}
			else {
				opts = {};
			}
			for (var j = 0; j < dataAttrOptions.length; j++) {
				var key = dataAttrOptions[j];
				var propKey = bglib.fn.toCamelCase(key);
				var opt = elements[i].getAttribute('data-' + key);
				elements[i].removeAttribute('data-' + key);
				if (typeof opt !== "undefined") {
					if (component.handleDataAttr) {
						opt = component.handleDataAttr(key, opt, opts);
						if (bglib.DT.isObject(opt)) {
							opts = Object.deepMerge(opts, opt);
						}
						else if (opt) {
							opts[propKey] = opt;
						}
					}
					else if (opt) {
						opts[propKey] = opt;
					}
				}
			}
			var c = new component(elements[i], opts);
		}
	};
};
bglib.fn.documentReady(function() {
	Cornerstone.init();
});
/*
(function(CS) {
	var module = {};
	CS.mod.ModuleName = module;
})(Cornerstone);
*/
/*
(function(CS) {
    var component = function(element, options) {
    };
    CS.ComponentName = component;
})(Cornerstone);
*/
var EventModule = bglib.EventModule;
var module = EventModule.extend({
	Name: undefined
	,instanceId: undefined
	,$el: undefined
	,dataValue: undefined
	,defaultOptions: undefined
	,options: undefined
	,constructor: function(element, options) {
		if (element) {
			this.$el = jQuery(element);
			element = this.$el[0];
		}
		this.defaultOptions = {};
		this.options = options || {};
		if (!bglib.DT.isObject(options)) {
			this.options = {};
		}
		this.instanceId = bglib.fn.rand();
		if (element) {
			Cornerstone.setInstance(element, this.Name, this);
			this.$el.attr('data-cs-instance', this.Name);
			this.dataValue = this.$el.attr('data-' + this.Name.lowercaseFirst());
			this.$el.removeAttr('data-' + this.Name.lowercaseFirst());
		}
		EventModule.apply(this, arguments);
	}
	,getOption: function(o) {
		if (this.options.hasOwnProperty(o))
			return this.options[o];
		else if (this.defaultOptions.hasOwnProperty(o))
			return this.defaultOptions[o];
		else
			return null;
	}
	,setOption: function(o, v) {
		this.options[o] = v;
	}
});
Cornerstone.BaseComponent = module;
var jsModule = EventModule.extend({
	Name: undefined
	,instanceId: undefined
	,defaultOptions: undefined
	,options: undefined
	,constructor: function(options) {
		this.defaultOptions = {};
		this.options = options || {};
		if (!bglib.DT.isObject(options)) {
			this.options = {};
		}
		this.instanceId = bglib.fn.rand();
		EventModule.apply(this, arguments);
	}
	,getOption: function(o) {
		if (this.options.hasOwnProperty(o))
			return this.options[o];
		else if (this.defaultOptions.hasOwnProperty(o))
			return this.defaultOptions[o];
		else
			return null;
	}
	,setOption: function(o, v) {
		this.options[o] = v;
	}
});
Cornerstone.JsComponent = jsModule;
var module2 = EventModule.extend({
	Name: undefined
	,defaultOptions: undefined
	,options: undefined
	,constructor: function(element, options) {
		this.defaultOptions = {};
		this.options = options || {};
		if (!bglib.DT.isObject(options)) {
			this.options = {};
		}
		EventModule.apply(this, arguments);
	}
	,getOption: function(o) {
		if (this.options.hasOwnProperty(o))
			return this.options[o];
		else if (this.defaultOptions.hasOwnProperty(o))
			return this.defaultOptions[o];
		else
			return null;
	}
	,setOption: function(o, v) {
		this.options[o] = v;
	}
});
Cornerstone.BaseModule = module2;