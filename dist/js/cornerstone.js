(function (root, factory) {
	var noConflict = root.Cornerstone_NoConflict !== 'undefined' && root.Cornerstone_NoConflict;
    if (typeof define === 'function' && define.amd) {
        define(['bglib'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('bglib'));
    } else {
        root.Cornerstone = factory(root.bglib);
        if (!noConflict) {
            root.CS = root.Cornerstone;
        }
    }
}(global = typeof self !== 'undefined' ? self : this, function (_bglib) {
var Sortable = global.Sortable !== 'undefined' ? global.Sortable : null;
var jQuery = global.jQuery !== 'undefined' ? global.jQuery : null;
/*! @license
 *
 * bglib v1.0
 * https://github.com/pudge330/bglib
 *
 * Copyright 2019
 * Released under the MIT license
 * https://github.com/pudge330/bglib/blob/master/LICENSE
 */

/*! @license
 * 
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 * https://github.com/js-cookie/js-cookie/blob/master/LICENSE
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
    	var oldObject = root.bglib;
        var lib = root.bglib = factory();
        lib.noConflict = function() {
        	root.bglib = oldObject;
        	return lib;
        };
    }
}(window, function () {
var jQuery = window.jQuery !== 'undefined' ? window.jQuery : null;
var _bglib = {
    name: 'bglib'
    ,version: '1.0'
    ,modules: {}
};

var bglib = function() {};

bglib.fn = {};

bglib.getName = function() {
    return _bglib.name;
};

bglib.getVersion = function() {
    return _bglib.version;
};

bglib.fn.call = function(f, a) {
    return f.apply(null, a);
};

//--Date
if (!Date.getMonthName) {
	Date.label = {
		month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
		,day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	};
	Date.label.month.abbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	Date.label.day.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	Date.getMonthName = function(index, abbr){
		abbr = abbr || false;
		if (index > 12) index = 12;
		else if (index < 1) index = 1;
		index = index -1;
		return abbr ? Date.label.month.abbr[index] : Date.label.month[index];
	};
}
if (!Date.getMonthIndex) {
	Date.getMonthIndex = function(name){
		name = name.toLowerCase().uppercaseFirst();
		var index = Date.label.month.indexOf(name);
		if (index === -1) {
			index = Date.label.month.abbr.indexOf(name);
		}
		return (index !== -1 ? index + 1 : null);
	};
}
if (!Date.getDayName) {
	Date.getDayName = function(index, abbr){
		abbr = abbr || false;
		if (index > 7) index = 7;
		else if (index < 1) index = 1;
		index = index -1;
		return abbr ? Date.label.day.abbr[index] : Date.label.day[index];
	};
}
if (!Date.getDayIndex) {
	Date.getDayIndex = function(name){
		name = name.toLowerCase().uppercaseFirst();
		var index = Date.label.day.indexOf(name);
		if (index === -1) {
			index = Date.label.day.abbr.indexOf(name);
		}
		return (index !== -1 ? index + 1 : null);
	};
}
//--String
if (!String.prototype.trim) {
	String.prototype.trim = function(){
		return this.replace(/^\s+|\s+$/g, '');
	};
}
if (!String.prototype.uppercaseFirst) {
	String.prototype.uppercaseFirst = function(){
		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}
if (!String.prototype.lowercaseFirst) {
	String.prototype.lowercaseFirst = function(){
		return this.charAt(0).toLowerCase() + this.slice(1);
	};
}
//--Array
if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Array.prototype.concatUnique) {
	Array.prototype.concatUnique = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			if (this.indexOf(arr[i]) === -1) {
				this.push(arr[i]);
			}
		}
		return this;
	};
}
if (!Array.prototype.pushUnique) {
	Array.prototype.pushUnique = function(val) {
		if (this.indexOf(val) === -1) {
			this.push(val);
		}
		return this;
	};
}
//--Object
if (!window.isObject) {
	window.isObject = function(val) {
		if (val === null) { return false; }
		return ( (typeof val === 'function') || (typeof val === 'object') );
	};
}
if (!Object.isObject) {
	Object.isObject = window.isObject;
}
if (!Object.copy) {
	Object.copy = function(o) {
		if (null === o || "object" != typeof o)
			return o;
		var c = o.constructor();
		return Object.assign(c, o);
	};
}
if (!Object.copyMerge) {
	Object.copyMerge = function(o1, o2) {
		return Object.assign(
			Object.copy(o1)
			,o2
		);
	};
}
if (!Object.deepMerge) {
	Object.deepMerge = function() {
		var args = Array.prototype.slice.call(arguments);
		if (args.length === 0)
			return {};
		var clone = false;
		if (args.length > 2 && args[args.length - 1] === true) {
			clone = true;
			args.pop();
		}
		var merged = clone ? Object.assign({}, args.shift()) : args.shift();
		for (var i = 0; i < args.length; i++) {
			for (var key in args[i]) {
				if (args[i].hasOwnProperty(key)) {
					if (Object.isObject(args[i][key]) && !Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Object.isObject(merged[key]))
						merged[key] = Object.deepMerge(merged[key], args[i][key], true);
					else if (Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Array.isArray(merged[key]))
						merged[key] = merged[key].concat(args[i][key]);
					else {
						if (Object.isObject(args[i][key]))
							args[i][key] = Object.assign({}, args[i][key]);
						merged[key] = args[i][key];
					}
				}
			}
		}
		return merged;
	};
}
if (!Object.deepCopyMerge) {
	Object.deepCopyMerge = function() {
		var args = Array.prototype.slice.call(arguments);
		if (args.length === 0)
			return {};
		var merged = Object.assign({}, args.shift());
		for (var i = 0; i < args.length; i++) {
			for (var key in args[i]) {
				if (args[i].hasOwnProperty(key)) {
					if (Object.isObject(args[i][key]) && !Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Object.isObject(merged[key]))
						merged[key] = Object.deepCopyMerge(merged[key], args[i][key]);
					else if (Array.isArray(args[i][key]) && merged.hasOwnProperty(key) && Array.isArray(merged[key]))
						merged[key] = merged[key].concat(args[i][key]);
					else {
						if (Object.isObject(args[i][key]))
							args[i][key] = Object.assign({}, args[i][key]);
						merged[key] = args[i][key];
					}
				}
			}
		}
		return merged;
	};
}
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'constructor'
			],
			dontEnumsLength = dontEnums.length;
		return function(obj) {
			if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
				throw new TypeError('Object.keys called on non-object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i = 0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}
if (typeof Object.assign != 'function') {
	// Must be writable: true, enumerable: false, configurable: true
	Object.defineProperty(Object, "assign", {
		value: function assign(target, varArgs) { // .length of function is 2
			'use strict';
			if (target == null) { // TypeError if undefined or null
				throw new TypeError('Cannot convert undefined or null to object');
			}
			var to = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var nextSource = arguments[index];
				if (nextSource != null) { // Skip over if undefined or null
					for (var nextKey in nextSource) {
						// Avoid bugs when hasOwnProperty is shadowed
						if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
							to[nextKey] = nextSource[nextKey];
						}
					}
				}
			}
			return to;
		},
		writable: true,
		configurable: true
	});
}
//--Object watch/unwatch polyfill
//--@ https://gist.github.com/eligrey/384583
if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		enumerable: false
		,configurable: true
		,writable: false
		,value: function (prop, handler) {
			var oldval = this[prop]
				,newval = oldval
				,getter = function () {
					return newval;
				}
				,setter = function (val) {
					oldval = newval;
					return newval = handler.call(this, prop, oldval, val);
				}
			;
			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}
// object.unwatch
if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		 enumerable: false
		,configurable: true
		,writable: false
		,value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}
//--JSON
if (!JSON.safeParse) {
	JSON.safeParse = function(_json, _d) {
		_d = typeof _d !== 'undefined' ? _d : null;
		if (_json === null) { return null; }
		try {
			_json = JSON.parse(_json);
		} catch(e) {
			_json = null;
		}
		return _json;
	};
}
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
//--@https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		var ancestor = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (ancestor.matches(s)) return ancestor;
			ancestor = ancestor.parentElement;
		} while (ancestor !== null);
		return null;
	};
}
// Does not work with `new funcA.bind(thisArg, args)`
if (!Function.prototype.bind) (function(){
  var ArrayPrototypeSlice = Array.prototype.slice;
  Function.prototype.bind = function() {
    var thatFunc = this, thatArg = arguments[0];
    var args = ArrayPrototypeSlice.call(arguments, 1);
    if (typeof thatFunc !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - ' +
             'what is trying to be bound is not callable');
    }
    return function(){
      args.push.apply(args, arguments);
      return thatFunc.apply(thatArg, args);
    };
  };
})();
bglib.create = function(p, s, t) {
    p = p || {};
    s = s || {};
    t = t || 'Base';
    if (!_bglib.modules.hasOwnProperty(t)) {
        t = 'Base';
    }
    if (_bglib.modules.hasOwnProperty(t)) {
        return _bglib.modules[t].extend(p, s);
    }
};
bglib.noop = function() {};
bglib.setRegisteredModule = function(n, m) {
    _bglib.modules[n] = m;
};
bglib.fn.debounce = function(func, delay) {
	var timer;
	return function() {
		var context = this,
			args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function() {
			func.apply(context, args);
		}, delay);
	};
};
//--@https://github.com/jfriend00/docReady
//--MIT License
(function(funcName, baseObj) {
    "use strict";
    // The public function name defaults to window.docReady
    // but you can modify the last line of this function to pass in a different object or method name
    // if you want to put them in a different namespace and those will be used instead of 
    // window.docReady(...)
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;
    
    // call this when the document is ready
    // this function protects itself against being called more than once
    function ready() {
        if (!readyFired) {
            // this must be set to true before we start calling callbacks
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                // if a callback here happens to add new ready handlers,
                // the docReady() function will see that it already fired
                // and will schedule the callback to run right after
                // this event loop finishes so all handlers will still execute
                // in order and no new ones will be added to the readyList
                // while we are processing the list
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            // allow any closures held by these functions to free
            readyList = [];
        }
    }
    
    function readyStateChange() {
        if ( document.readyState === "complete" ) {
            ready();
        }
    }
    
    // This is the one public interface
    // docReady(fn, context);
    // the context argument is optional - if present, it will be passed
    // as an argument to the callback
    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }
        // if ready has already fired, then just schedule the callback
        // to fire asynchronously, but right away
        if (readyFired) {
            setTimeout(function() {callback(context);}, 1);
            return;
        } else {
            // add the function and context to the list
            readyList.push({fn: callback, ctx: context});
        }
        // if document already ready to go, schedule the ready function to run
        // IE only safe when readyState is "complete", others safe when readyState is "interactive"
        if (document.readyState === "complete" || (!document.attachEvent && document.readyState === "interactive")) {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            // otherwise if we don't have event handlers installed, install them
            if (document.addEventListener) {
                // first choice is DOMContentLoaded event
                document.addEventListener("DOMContentLoaded", ready, false);
                // backup is window load event
                window.addEventListener("load", ready, false);
            } else {
                // must be IE
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("documentReady", bglib.fn);
bglib.fn.toEm = function(val, scope) {
	scope = scope || document.querySelector('body');
	val = parseInt(val, 10);
	var test = document.createElement('div');
	test.innerHTML = '&nbsp;';
	bglib.El.css(test, {
		"font-size": '1em'
		,"margin": 0
		,"padding": 0
		,"height": 'auto'
		,"line-height": 1
		,"border": 0
	});
	scope.appendChild(test);
	var testVal = parseFloat(bglib.El.css(test, 'height'));
	bglib.El.remove(test);
	return (val / testVal).toFixed(8) + 'em';
};
bglib.fn.toPx = function(val, scope) {
	scope = scope || document.querySelector('body');
	val = parseFloat(val);
	var test = document.createElement('div');
	test.innerHTML = '&nbsp;';
	bglib.El.css(test, {
		"font-size": '1em'
		,"margin": 0
		,"padding": 0
		,"height": 'auto'
		,"line-height": 1
		,"border": 0
	});
	scope.appendChild(test);
	var testVal = parseFloat(bglib.El.css(test, 'height'));
	bglib.El.remove(test);
	return Math.round(val * testVal) + 'px';
};
bglib.fn.formatDecimal = function(amount, pos) {
    pos = pos || 2;
    if(!amount || amount === '0'){
        amount = 0;
    }
    if(typeof amount === 'string'){
        amount = amount.replace(/[^\d\.]/g, '');
    }
    //-@ http://stackoverflow.com/a/6134070
    return parseFloat(Math.round(amount * 100) / 100).toFixed(pos);
};
bglib.fn.formatPrice = function(amount) {
    return bglib.fn.formatDecimal(amount, 2);
};
bglib.fn.htmlEntities = function(s) {
    return s.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
};
bglib.fn.interpolate = function(tpl, data) {
    for (var key in data) {
        tpl = tpl.replace(new RegExp('{{' + key + '}}', 'gm'), data[key]);
    }
    return tpl;
};
bglib.fn.iosVersion = function(max) {
    //--@ https://stackoverflow.com/questions/8348139/detect-ios-version-less-than-5-with-javascript
	if (/iP(hone|od|ad)/.test(navigator.platform)) {
		// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
		var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	}
	else {
		return null;
	}
};
bglib.fn.rand = function(max) {
    max = max || 100000000;
    return Math.floor((Math.random() * max) + 1);
};
bglib.fn.request = function(url, cb, data, type) {
    data = data || {};
    type = type || 'GET';
    var sendData = (type !== 'GET');
    cb = cb || bglib.noop;
    cb = bglib.DT.isFunction(cb)
        ? {success: cb, error: bglib.noop}
        : Object.assign({success: bglib.noop, error: bglib.noop}, cb)
    ;
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.addEventListener("readystatechange", function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cb.success(xhr.responseText, xhr, data);
        }
        else {
            cb.error(xhr.responseText, xhr, data);
        }
    }, false);
    if (sendData) {
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
    }
    else {
        xhr.send();
    }
};
bglib.fn.toCamelCase = function(str) {
    var parts = str.split('-');
    var final = parts.shift();
    while (parts.length) {
        final += parts[0].uppercaseFirst();
        parts.shift();
    }
    return final;
};
bglib.fn.toProperCase = function(str) {
    return bglib.fn.toCamelCase(str).uppercaseFirst();
};
(function(bglib) {
	var module = function () {};
	module.extend = function(prototypeProperties, staticProperties) {
		prototypeProperties = prototypeProperties || {};
		staticProperties = staticProperties || {};
		var parent = this;
		var child;
		if (prototypeProperties && prototypeProperties.hasOwnProperty('constructor')) {
			child = prototypeProperties.constructor;
		}
		else {
			child = function () { return parent.apply(this, arguments); };
		}
		child = Object.assign(child, parent);
		child = Object.assign(child, staticProperties);
		child.prototype = Object.create(parent.prototype, {
			constructor: {
				value: child
				,enumerable: false
				,writable: true
				,configurable: true
			}
		});
		Object.assign(child.prototype, prototypeProperties);
		child.__parent = parent;
	    return child;
	};
	bglib.BaseModule = module.extend({
		constructor: function() {
			var _self = this;
			module.apply(_self, arguments);
			if (this.init) {
				this.init.apply(_self, arguments);
			}
		}
	});
	bglib.setRegisteredModule('Base', bglib.BaseModule);
})(bglib);
bglib.AppRouter = bglib.BaseModule.extend({
	routes: undefined
	,init: function(_routes) {
		this.routes = {};
		if (typeof _routes !== 'undefined') {
			var copy = Object.deepCopyMerge({}, _routes);
			//--changes to copy seems to affect the original object
			this.setRoutes(copy);
		}
	}
	,processRoute: function(route) {
		if (typeof route.defaults == 'undefined')
			route.defaults = {};
		if (typeof route.requirements == 'undefined')
			route.requirements = {};
		route.defaultSlugs = {keys: [], obj: {}, arr: []};
		route.pattern = route.pattern.replace(/\/+$/, '');
		if (route.pattern == '') {
			route.pattern = '/';
		}
		route.compiledRegex = this.compileRoute(route, route.pattern, route.defaults, route.requirements);
		return route;
	}
	,compileRoute: function(route, pattern, defaults, requirements) {
		var slugMatches = pattern.match(/({([^\/{}]+)})/g);
		var regexes = {};
		if (slugMatches) {
			for (var i = 0; i < slugMatches.length; i++) {
				var slugMatch = slugMatches[i];
				slugMatches[i] = slugMatches[i].replace(/^({)|(})$/g, '');
				var _tmpRegex = '([^\\/?#]+)';
				if (typeof requirements[slugMatches[i]] != 'undefined') {
					_tmpRegex = '(' + requirements[slugMatches[i]] + ')';
				}
				slugMatch = '\\{' + slugMatches[i] + '\\}';
				route.defaultSlugs.keys.push(slugMatches[i]);
				if (typeof defaults[slugMatches[i]] != 'undefined') {
					route.defaultSlugs.obj[slugMatches[i]] = defaults[slugMatches[i]];
					route.defaultSlugs.arr.push(defaults[slugMatches[i]]);
					if (i == slugMatches.length - 1) {
						_tmpRegex = '(?:\\/' + _tmpRegex + '|\\/)?';
						slugMatch = '\\/' + slugMatch;
					}
					delete route.defaults[slugMatches[i]];
				}
				else {
					route.defaultSlugs.obj[slugMatches[i]] = undefined;
					route.defaultSlugs.arr.push(undefined);
				}
				regexes[slugMatch] = _tmpRegex;
			}
		}
		pattern = this.regexEscape(pattern);
		for (var _slug in regexes) {
			if (regexes.hasOwnProperty(_slug)) {
				pattern = pattern.replace(_slug, regexes[_slug]);
			}
		}
		pattern = '^' + pattern + '$';
		return new RegExp(pattern);
	}
	,regexEscape: function(str) {
		return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	}
	,setRoutes: function(routes) {
		this.routes = routes;
		for (var _name in this.routes) {
			if (this.routes.hasOwnProperty(_name)) {
				this.routes[_name] = this.processRoute(this.routes[_name]);
			}
		}
	}
	,addRoute: function(name, opts, action) {
		this.routes[name] = opts;
		if (typeof action != 'undefined') {
			this.routes[name].action = action;
		}
		this.routes[name] = this.processRoute(this.routes[name]);
	}
	,addRoutes: function(routes) {
		for (var _name in routes) {
			if (routes.hasOwnProperty(_name)) {
				this.routes[_name] = routes[_name];
				this.routes[_name] = this.processRoute(this.routes[_name]);
			}
		}
	}
	,match: function(url) {
		url = url.replace(/\/+$/, '');
		if (url == '') {
			url = '/';
		}
		for (var _name in this.routes) {
			if (this.routes.hasOwnProperty(_name)) {
				var urlMatches = url.match(this.routes[_name].compiledRegex);
				if (urlMatches) {
					var _slugs = {
						obj: Object.copy(this.routes[_name].defaultSlugs.obj)
						,arr: this.routes[_name].defaultSlugs.arr.slice()
					};
					for (var i = 0; i < _slugs.arr.length; i++) {
						if (typeof urlMatches[i + 1] != 'undefined') {
							_slugs.obj[this.routes[_name].defaultSlugs.keys[i]] = urlMatches[i + 1];
							_slugs.arr[i] = urlMatches[i + 1];
						}
					}
					return {
						action: this.routes[_name].action
						,slugs: _slugs
						,defaults: Object.copy(this.routes[_name].defaults)
					};
				}
			}
		}
		return null;
	}
});
(function(bglib) {
	var BaseModule = bglib.BaseModule;
	var module = BaseModule.extend({
		__propagationStopped: undefined
		,__defaultPrevented: undefined
		,__eventProps: undefined
		,data: undefined
		,name: undefined
		,constructor: function(name, event, data, original) {
			BaseModule.apply(this, arguments);
			this.__propagationStopped = false;
			this.__defaultPrevented = false;
			this.name = name || 'UnsetEventName';
			this.data = data || {};
			event = event || {};
			this.__eventProps = event;
			for (var key in event) {
				if (event.hasOwnProperty(key)) {
					this[key] = event[key];
				}
			}
			if (original) {
				this.originalEvent = original;
			}
		}
		,getEventProps: function() {
			return this.__eventProps;
		}
		,stopPropagation: function() {
			this.__propagationStopped = true;
		}
		,isPropagationStopped: function() {
			return this.__propagationStopped;
		}
		,preventDefault: function() {
			if (typeof this.originalEvent !== 'undefined') {
				this.originalEvent.preventDefault();
			}
			else {
				this.__defaultPrevented = true;
			}
		}
		,isDefaultPrevented: function() {
			if (typeof this.originalEvent !== 'undefined') {
				return this.originalEvent.defaultPrevented;
			}
			else {
				return this.__defaultPrevented;
			}
		}
	});
	bglib.Event = module;
})(bglib);
(function(bglib) {
	var BaseModule = bglib.BaseModule;
	var Event = bglib.Event;
	var module = BaseModule.extend({
		__moduleEvents: undefined
		,constructor: function() {
			var _self = this;
			_self.__moduleEvents = {};
			BaseModule.apply(_self, arguments);
		}
		,on: function(/* names[, data, cb] */) {
			var _self = this;
            var names, data, callback;
            var args = this.resolveArguments('on', arguments);
            names = args[0]; data = args[1]; callback = args[2];
            names = names != '' ? names.split(' ') : [];
            for (var i = 0; i < names.length; i++) {
            	var name  = names[i].trim();
            	if (!this.__moduleEvents.hasOwnProperty(name)) {
            		this.__moduleEvents[name] = {
            			name: name
            			,fn: function() {}
            			,handlers: new Map()
            			,data: new Map()
            		};
            		this.__moduleEvents[name].fn = (function(attached, evt) {
                        attached.handlers.forEach(function (status, key) {
                            if (evt.isPropagationStopped()) { return; }
                            if (status) {
                                var d = attached.data.get(key);
                                d = d || {};
                                var _evt = new Event(key.name, evt.getEventProps(), d);
                                var cb = key.callback.bind(_self);
                                cb(_evt);
                                if (_evt.isPropagationStopped()) {
                                    evt.stopPropagation();
                                }
                                if (_evt.isDefaultPrevented()) {
                                	evt.preventDefault();
                                }
                            }
                        });
                        return evt.isDefaultPrevented();
                    }).bind(this, this.__moduleEvents[name]);
            	}
            	var mapKey = {
                    name: name
                    ,callback: callback
                };
                this.__moduleEvents[name].handlers.set(mapKey, true);
                this.__moduleEvents[name].data.set(mapKey, data);
            }
		}
		,off: function(/* names[, cb, cache] */) {
			var names, callback, cache;
            var args = this.resolveArguments('off', arguments);
            names = args[0]; callback = args[1], cache = args[2];
            names = names != '' ? names.split(' ') : [];
            for (var i = 0; i < names.length; i++) {
            	var name = names[i];
                var mapKey = {
                    name: name
                    ,callback: callback
                };
                var found;
                this.__moduleEvents[name].handlers.forEach(function(value, key) {
                    if (!found && (mapKey.name == key.name && mapKey.callback == key.callback)) {
                        found = key;
                    }
                });
                if (found) {
                	if (cache) {
                    	this.__moduleEvents[name].handlers.set(found, false);
                    }
                    else {
                    	this.__moduleEvents[name].handlers.delete(found);
                    	this.__moduleEvents[name].data.delete(found);
                    }
                }
            }
		}
		,trigger: function(name, event) {
			if (!(event instanceof Event)) {
				event = new Event(name, event);
			}
			if (name in this.__moduleEvents) {
				var cnf = this.__moduleEvents[name];
				return cnf.fn(event);
			}
			return false;
		}
        ,hasHandlers: function(name) {
            if (this.__moduleEvents.hasOwnProperty(name)) {
                if (this.__moduleEvents[name].handlers.size) {
                    return true;
                }
            }
            return false;
        }
		,resolveArguments: function(type, arguments) {
			var args = [].slice.call(arguments);
            var names, data, callback, cache;
            names = args.shift();
            if (type === 'on') {
                switch (args.length) {
                    case 2:
                        data = args[0];
                        callback = args[1];
                    break;
                    case 1:
                        if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                        }
                    break;
                }
            }
            else {
            	switch (args.length) {
                    case 2:
                        cache = args[0];
                        callback = args[1];
                    break;
                    case 1:
                        if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                        }
                    break;
                }
            	if (bglib.DT.isFunction(args[0])) {
	                 callback = args[0];
	            }
            }
            data = data || data;
            callback = callback || function() {};
            cache = typeof cache !== 'undefined' ? cache : false;
            names = names.trim();
            names = names ? names.replace(/(\s{2,})/, ' ') : '';
            if (type === 'on') {
                return [names, data, callback];
            }
            else {
                return [names, callback, cache];
            }
		}
	});
	bglib.EventModule = module;
	bglib.setRegisteredModule('Event', module);
})(bglib);
(function(bglib) {
	var EventModule = bglib.EventModule;
	var module = EventModule.extend({
		dataSet: undefined
		,dataSetState: undefined
		,constructor: function () {
			EventModule.apply(this, arguments);
			var opts = arguments[0] || [];
			if (opts.onChange) {
				this.on('change', opts.onChange);
			}
			if (opts.data && Array.isArray(opts.data)) {
				var clone = opts.clone || false;
				this.dataSet = clone ? opts.data.slice(0) : opts.data;
			}
			else {
				this.dataSet = [];
			}
			this.dataSetState = (new Array(this.dataSet.length).fill(true));
			this.triggerChange('set');
		}
		,getData: function() {
			var _self = this;
			return this.dataSet.filter(function(value, index) {
				if (_self.dataSetState[index])
					return true;
				else
					return false;
			});
		}
		,triggerChange: function(type) {
			var _self = this;
			this.trigger('change', {
				caller: _self
				,dataSet: _self.getData()
				,type: type
			});
		}
		,setData: function(data, clone) {
			clone = clone || false;
			this.dataSet = clone ? data.slice(0) : data;
			this.dataSetState = (new Array(this.dataSet.length).fill(true));
			return this;
		}
		,determineSort: function(order) {
			var _self = this;
			order = order.toLowerCase();
			if (Array.isArray(order))
				return order;
			else if (['desc', '>'].indexOf(order) !== -1)
				return 'desc';
			else // asc <
				return 'asc';
		}
		,sort: function(sorts) {
			var _self = this;
			var sortsCopy = [];
			for (var i = 0; i < sorts.length; i++) {
				var name = null, direction = null;
				if (typeof sorts[i] === 'string') {
					name = sorts[i];
					direction = 'asc';
				}
				else if (Array.isArray(sorts[i])) {
					name = sorts[i][0];
					direction = this.determineSort(sorts[i][1]);
				}
				else if (Object.isObject(sorts[i])) {
					name = sorts[i].name;
					direction = sorts[i].dir;
					direction = this.determineSort(direction);
				}
				if (name) {
					sortsCopy.push({name: name, dir: direction});
				}
			}
			var arr = this.dataSet;
			arr.sort(function(value1, value2) {
				for (var i = 0; i < sortsCopy.length; i++) {
					var s = sortsCopy[i];
					if (Array.isArray(s.dir)) {
						var returned = s.dir(value1[s.name], value2[s.name]);
						if ([-1, 1].indexOf(returned) !== -1) {
							return returned;
						}
					}
					else {
						if (value1[s.name] > value2[s.name]) return (s.dir === 'asc' ? 1 : -1);
						if (value1[s.name] < value2[s.name]) return (s.dir === 'asc' ? -1 : 1);
					}
				}
				return 0;
			});
			this.triggerChange('sort');
			return this;
		}
		,detemineFilterType: function(type) {
			type = type.toLowerCase();
			if (['equals', 'equal', '='].indexOf(type) !== 1)
				return 'equals';
			else if (['!equals', '!equal', '!=', '<>'].indexOf(type) !== 1)
				return 'not-equals';
			else if (['contains', 'contain', 'has'].indexOf(type) !== 1)
				return 'contains';
			else if (['!contains', '!contain', '!has'].indexOf(type) !== 1)
				return 'not-contains';
			else if (['<', 'less-than', 'lessthan', 'less'].indexOf(type) !== 1)
				return 'less-than';
			else if (['>', 'greater-than', 'greaterthan', 'greater'].indexOf(type) !== 1)
				return 'greater-than';
			else if (['starts-with', 'starts', '^'].indexOf(type) !== 1)
				return 'starts-with';
			else if (['ends-with', 'ends', '$'].indexOf(type) !== 1)
				return 'ends-with';
			else if (['regex'].indexOf(type) !== 1)
				return 'ends-with';
			else if (['function', 'func'].indexOf(type) !== 1)
				return 'ends-with';
			else
				return 'equals';
			//--todo: add 'regex' and 'func' type
		}
		,detemineFilterGlue: function(glue) {
			glue = glue.toLowerCase();
			if (['and', '&'].indexOf(glue) !== 1)
				return 'and';
			else if (['or', '||', '|'].indexOf(glue) !== 1)
				return 'or';
			else
				return 'and';
		}
		,filter: function(filters, returnFiltered) {
			returnFiltered = returnFiltered || false;
			var _self = this;
			_self.reset();
			var filtersCopy = {and: [], or: []};
			for (var i = 0; i < filters.length; i++) {
				var name = null, value = null, type = null, glue = null;
				if (Array.isArray(filters[i])) {
					switch (filters[i].length) {
						case 4:
							name = filters[i][0];
							value = filters[i][1];
							type = this.determineFilterType(filters[i][2]);
							glue = this.detemineFilterGlue(filters[i][3]);
						break;
						case 3:
							name = filters[i][0];
							value = filters[i][1];
							type = this.determineFilterType(filters[i][2]);
							glue = 'and';
						break;
						case 2:
						default:
							name = filters[i][0];
							value = filters[i][1];
							type = 'equals';
							glue = 'and';
						break;
					}
				}
				else if (Object.isObject(filters[i])) {
					name = filters[i].name;
					value = filters[i].value;
					type = filters[i].type || 'equals';
					glue = filters[i].glue || 'and';
				}
				if (name) {
					if (glue == 'or') {
						filtersCopy.or.push({name: name, value: value, type: type, glue: glue});
					}
					else {
						filtersCopy.and.push({name: name, value: value, type: type, glue: glue});
					}
				}
			}
			var filtered = this.dataSet.filter(function(value, index) {
				var passedFilter = true;
				var test;
				for (var key in filtersCopy) {
					if (filtersCopy.hasOwnProperty(key)) {
						for (var i = 0; i < filtersCopy[key].length; i++) {
							var f = filtersCopy[key][i];
							switch (f.type) {
								case 'not-equals':
									if (value[f.name] == f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'contains':
									if (value[f.name].indexOf(f.value) === -1) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'not-contains':
									if (value[f.name].indexOf(f.value) !== -1) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'less-than':
									if (value[f.name] < f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'greater-than':
									if (value[f.name] > f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'starts-width':
									test = value[f.name].substring(0, f.value.length);
									if (test != f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'ends-with':
									test = value[f.name].substring(value[f.name] - f.value.length, value[f.name].length);
									if (test != f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'regex':
									var regexFlags = f.flags || '';
									var regex = new RegExp(f.value, regexFlags);
									if (!value[f.name].match(regex)) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'func':
									if (!Array.isArray(f.value) || f.value(value[f.name]) === false) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
								case 'equals':
								default:
									if (value[f.name] != f.value) {
										passedFilter = false;
										if (key == 'and') {
											i = filtersCopy[key].length;
										}
									}
								break;
							}
						}
					}
				}
				if (!passedFilter) {
					_self.dataSetState[index] = false;
				}
				return passedFilter;
			});
			this.triggerChange('filter');
			return (returnFiltered ? filtered : this);
		}
		,reset: function() {
			this.dataSetState = (new Array(this.dataSet.length).fill(true));
			this.triggerChange('reset');
			return this;
		}
	}, {
		sort: function(data, sorts) {
			return (new module({ data: data, clone: true })).sort(sorts).getData();
		}
		,filter: function(data, filters) {
			return (new module({ data: data, clone: true })).filter(filters, true);
		}
		,filterSort: function(data, filters, sorts) {
			var ds = new module({ data: data, clone: true });
			return ds.setData(ds.filter(filters, true)).sort(sorts).getData();
		}
	});
	bglib.DatasetModule = module;
	bglib.setRegisteredModule('Dataset', module);

	module.extend({
		getFoo: function() {
			return 'foo';
		}
	}, {
		getFooStatic: function() {
			return 'foo';
		}
	});

})(bglib);
bglib.DT = {
	isString: function(value) {
		return typeof value === 'string' || value instanceof String;
	}
	,isFinite: function(value) {
		if (typeof isFinite !== 'undefined') {
			return isFinite(value);
		}
		else
			return typeof value === 'number';
	}
	,isNumber: function(value) {
		return typeof value === 'number' && (this.isFinite(value));
	}
	,isArray: function(value) {
		return Object.prototype.toString.call(value) === '[object Array]';
	}
	,isFunction: function(value) {
		return typeof value === 'function';
	}
	,isObject: function(value) {
		return (value !== false && (typeof value === 'function' || typeof value === 'object'));
		// return value && typeof value === 'object' && value.constructor === Object;
	}
	,isNull: function(value) {
		return value === null;
	}
	,isUndefined: function(value) {
		return typeof value === 'undefined';
	}
	,isBool: function(value) {
		return typeof value === 'boolean';
	}
	,isRegExp: function(value) {
		return value && typeof value === 'object' && value.constructor === RegExp;
	}
	,isError: function (value) {
		return value instanceof Error && typeof value.message !== 'undefined';
	}
	,isDate: function(value) {
		return value instanceof Date;
	}
};
//--@https://stackoverflow.com/questions/12949590/how-to-detach-event-in-ie-6-7-8-9-using-javascript
bglib.EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    }
};
(function(bglib) {
    var Event = bglib.Event;
    var EventUtil = bglib.EventUtil;
    bglib.EventManager = bglib.create({
        target: undefined
        ,attached: undefined
        ,init: function(target) {
            this.target = target;
            this.attached = {};
        }
        ,resolveArguments: function(type, arguments) {
            var args = [].slice.call(arguments);
            var names, selector, data, callback;
            names = args.shift();
            if (type === 'on') {
                switch (args.length) {
                    case 3:
                        selector = args[0];
                        data = args[1];
                        callback = args[2];
                    break;
                    case 2:
                        if (bglib.DT.isString(args[0])) {
                            selector = args[0];
                        }
                        else {
                            data = args[0];
                        }
                        callback = args[1];
                    break;
                    case 1:
                        if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                        }
                    break;
                }
            }
            else {
                switch (args.length) {
                    case 3:
                        selector = args[0];
                        callback = args[1];
                        cache = args[2];
                    break;
                    case 2:
                        if (bglib.DT.isString(args[0])) {
                            selector = args[0];
                            callback = args[1];
                        }
                        else if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                            cache = args[1];
                        }
                    break;
                    case 1:
                        if (bglib.DT.isFunction(args[0])) {
                            callback = args[0];
                        }
                    break;
                }
            }
            selector = selector || null;
            data = data || data;
            callback = callback || function() {};
            cache = typeof cache !== 'undefined' ? cache : false;
            names = names.trim();
            names = names ? names.replace(/(\s{2,})/, ' ') : '';
            if (type === 'on') {
                return [names, selector, data, callback];
            }
            else {
                return [names, selector, callback, cache];
            }
        }
        ,on: function(/* names[, selector, data, cb] */) {
            var _self = this;
            var names, selector, data, callback;
            var args = this.resolveArguments('on', arguments);
            names = args[0]; selector = args[1]; data = args[2]; callback = args[3];
            names = names != '' ? names.split(' ') : [];
            for (var i = 0; i < names.length; i++) {
                var name = names[i].trim();
                //--make sure parent event handler is created
                if (!this.attached.hasOwnProperty(name)) {
                    this.attached[name] = {
                        name: name
                        ,fn: function() {}
                        ,handlers: new Map()
                        ,data: new Map()
                    };
                    this.attached[name].fn = (function(attached, originalEvent) {
                        var evt = new Event(name, { target: _self.target }, {}, originalEvent);
                        // var evt = _self.newEvent({}, originalEvent);
                        attached.handlers.forEach(function (status, key) {
                            if (evt.isPropagationStopped()) { return; }
                            if (status) {
                                var d = attached.data.get(key);
                                d = d || {};
                                var _evt = new Event(name, { target: _self.target }, d, evt.originalEvent);
                                // var _evt = _self.newEvent(d, evt.originalEvent);
                                if (key.selector) {
                                    var closest;
                                    if (_evt.originalEvent.target.matches(key.selector)) {
                                        var cb = key.callback.bind(_evt.originalEvent.target);
                                        cb(_evt);
                                        if (_evt.isPropagationStopped()) {
                                            evt.stopPropagation();
                                        }
                                    }
                                    else if (closest = _evt.originalEvent.target.closest(key.selector)) {
                                        var cb = key.callback.bind(closest);
                                        cb(_evt);
                                        if (_evt.isPropagationStopped()) {
                                            evt.stopPropagation();
                                        }
                                    }
                                }
                                else {
                                    var cb = key.callback.bind(_self.target);
                                    cb(_evt);
                                    if (_evt.isPropagationStopped()) {
                                        evt.stopPropagation();
                                    }
                                }
                            }
                        });
                    }).bind(this.target, this.attached[name]);
                    EventUtil.addHandler(this.target, name, this.attached[name].fn);
                }
                var mapKey = {
                    name: name
                    ,selector: selector
                    ,callback: callback
                };
                this.attached[name].handlers.set(mapKey, true);
                this.attached[name].data.set(mapKey, data);
            }
        }
        ,off: function(/* names[, selector, cb, cache] */) {
            var names, selector, callback, cache;
            var args = this.resolveArguments('off', arguments);
            names = args[0]; selector = args[1]; callback = args[2], cache = args[3];
            names = names != '' ? names.split(' ') : [];
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                var mapKey = {
                    name: name
                    ,selector: selector
                    ,callback: callback
                };
                var found;
                this.attached[name].handlers.forEach(function(value, key) {
                    if (!found && (
                        mapKey.name == key.name && mapKey.selector == key.selector && mapKey.callback == key.callback
                    )) {
                        found = key;
                    }
                });
                if (found) {
                    if (cache) {
                        this.attached[name].handlers.set(found, false);
                    }
                    else {
                        this.attached[name].handlers.delete(found);
                        this.attached[name].data.delete(found);
                    }
                }
            }
        }
        ,hasHandlers: function(name) {
            if (this.attached.hasOwnProperty(name)) {
                if (this.attached[name].handlers.size) {
                    return true;
                }
            }
            return false;
        }
    });
})(bglib);
(function(bglib) {
	//--add debounce/delay for certain events
	var isLoaded = false, isReady = false;
	if (document.readyState === 'complete') {
		isLoaded = true;
	}
	else {
		bglib.EventUtil.addHandler(window, 'load', function(e) {
			isLoaded = true;
		});
	}
	bglib.fn.documentReady(function(e) {
		isReady = true;
	});
	var EventManager = bglib.EventManager;
	var Event = bglib.Event;
	var module = EventManager.extend({
		isDocument: undefined
		,isWindow: undefined
		,init: function() {
			EventManager.prototype.init.apply(this, arguments);
			this.isWindow = (this.target === window);
			this.isDocument = (this.target === document);
		}
		,on: function() {
			var _self = this;
			var names, selector, data, callback;
            var args = this.resolveArguments('on', arguments);
            names = args[0]; selector = args[1]; data = args[2]; callback = args[3];
            var tmpNames = ' ' + names + ' ';
            if (this.isWindow && isLoaded && tmpNames.indexOf(' load ') !== -1) {
            	var evt = new Event('load', { target: _self.target }, data);
            	callback(evt);
            	names = (' ' + names + ' ').replace(' load ', '');
            }
            if (this.isDocument && isReady && tmpNames.indexOf(' ready ') !== -1) {
            	var evt = new Event('ready', { target: _self.target }, data);
            	callback(evt);
            	names = (' ' + names + ' ').replace(' ready ', '');
            }
            //--the ready event is intended for the document
            var tmpNames = ' ' + names + ' ';
            if (this.isDocument && tmpNames.indexOf(' ready ') !== -1) {
            	bglib.fn.documentReady((function(data, callback, e) {
					var evt = new Event('ready', { target: _self.target }, data, e);
            		callback(evt);
				}).bind(_self, data, callback));
				names = (' ' + names + ' ').replace(' ready ', '');
            }
            args[0] = names;
			EventManager.prototype.on.apply(this, args);
		}
	});
	bglib.DomEvents = {
		window: new module(window)
		,document: new module(document)
	};
})(bglib);
(function(bglib) {
	var m = function() {
		this.storage = new WeakMap();
	};
	m.prototype.set = function (element, key, obj) {
		if (!this.storage.has(element)) {
			this.storage.set(element, new Map());
		}
		this.storage.get(element).set(key, obj);
	};
	m.prototype.get = function (element, key) {
		return this.has(element, key) ? this.storage.get(element).get(key) : undefined;
	};
	m.prototype.has = function (element, key) {
		return this.hasBase(element) ? this.storage.get(element).has(key) : false;
	};
	m.prototype.hasBase = function (element) {
		return this.storage.has(element);
	};
	m.prototype.remove = function (element, key) {
		var result = false;
		if (this.has(element, key)) {
			result = this.storage.get(element).delete(key);	
		}
		if (this.hasBase(element)) {
			if (this.storage.get(element).size === 0) {
				this.storage.delete(element);
			}
		}
		return result;
	};
	m.prototype.reset = function(element) {
		if (this.hasBase(element)) {
			this.storage.delete(element);
		}
	};
	bglib.ElementalData = m;
})(bglib);
(function(bglib) {
	var EventManager = bglib.EventManager;
	var elData = new bglib.ElementalData();
	var elEventMap = new WeakMap();
	var m = {};
	m.getAttributes = function(e) {
	    var a = {};
	    var el = null;
	    e = m.element(e);
	    if (e) {
	        for (var i = 0, atts = e.attributes, n = atts.length; i < n; i++){
	            a[atts[i].nodeName] = atts[i].value;
	        }
	    }
	    return a;
	};
	m.text = function(e) {
		if (e) {
			return e.innerText || e.textContent;
		}
		return '';
	};
	m.addClass = function(e, cls) {
	    if (!m.hasClass(e, cls)) {
	        if (e.className != '')
	            cls = ' ' + cls;
	        e.className = e.className.trim() + ' ' + cls.trim();
	    }
	};
	m.removeClass = function(e, cls) {
	    if (m.hasClass(e, cls)) {
	        cls = ' ' + cls + ' ';
	        var clsName = (" " + e.className + " ").replace(/[\n\t\r]/g, " ");
	        clsName = clsName.replace(cls, '');
	        e.className = clsName.trim();
	    }
	};
	m.toggleClass = function(e, cls) {
	    if (!m.hasClass(e, cls))
	        m.addClass(e, cls);
	    else
	        m.removeClass(e, cls);
	};
	m.hasClass = function(e, cls) {
	    cls = ' ' + cls + ' ';
	    if ((" " + e.className + " ").replace(/[\n\t\r]/g, " ").indexOf(cls) > -1)
	        return true;
	    else
	        return false;
	};
	m.css = function(e, prop, val){
	    if (typeof val === 'undefined') {
	        var b = (window.navigator.userAgent).toLowerCase();
	        var s;
	        if(/msie|opera/.test(b)){
	            s = e.currentStyle;
	        }else if(/gecko/.test(b)){
	            s = document.defaultView.getComputedStyle(e, null);
	        }
	        if (bglib.DT.isObject(prop)) {
	        	for (var key in prop) {
	        		if (prop.hasOwnProperty(key)) {
	        			m.css(e, key, prop[key]);
	        		}
	        	}
	        }
	        else {
		        if(s[prop]!=undefined){
		            return s[prop];
		        }
		        return e.style[prop];
		    }
	    }
	    else if(prop){
	        e.style[prop]=val;
	    }
	};
	m.data = function(e, key, val) {
	    if (arguments.length > 2) {
	        m.data.set(e, key, val);
	    }
	    else {
	        return m.data.get(e, key);
	    }
	};
	m.data.get = function(e, key) {
	    return elData.get(e, key);
	};
	m.data.set = function(e, key, val) {
	    elData.set(e, key, val);
	};
	m.data.has = function(e, key) {
	    return elData.has(e, key);
	};
	m.data.remove = function(e, key) {
	    elData.remove(e, key);
	};
	m.element = function(e) {
	    var elements = m.elements(e);
	    return elements.length ? elements[0] : null;
	};
	m.elements = function() {
	    var elms = [];
	    for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i];
	        if (bglib.DT.isString(arg)) {
	            arg = [arg];
	        }
	        else if ((jQuery && arg instanceof jQuery)
	            || (bglib.jLyte && arg instanceof bglib.jLyte)) {
	            arg = arg.toArray();
	        }
	        else if (arg instanceof NodeList) {
	        	arg = [].slice.call(arg);
	        }
	        else if (arg instanceof DocumentFragment) {
	        	arg = arg.childNodes
	        }
	        else if (!bglib.DT.isArray(arg)) {
	            arg = [arg];
	        }
	        for (var j = 0; j < arg.length; j++) {
	            if (bglib.DT.isString(arg[j])) {
	                elms = elms.concat(m.resolveElements(arg[j]));
	            }
	            else if ((jQuery && arg[j] instanceof jQuery)
	                || (bglib.jLyte && arg[j] instanceof bglib.jLyte)) {
	                elms = elms.concat(arg[j].toArray());
	            }
	            else {
	            	if (bglib.DT.isArray(arg[j])) {
	                	elms.concat(arg[j]);
	            	}
	            	else {
	            		elms.push(arg[j]);
	            	}
	            }
	        }
	    }
	    return elms;
	};
	m.resolveElements = function(str) {
	    var fastRegex = /^(?:(<[\w\W]+>)|\#([\w-]+)|\.([\w-]+))$/; //--matches html string, simple id or class
	    var selectorRegex = /([^\r\n,{}]+)(\s?,(?=[^}]*{)|\s*{)/; //--matches any other selector
	    //--table decendant tags have trouble getting created outside the context of a table
	    var tableChildRegex = /^(<\s*(thead|tbody|tfoot|tr|td|th)[^>]*>)(.*)<\s*\/\s*(thead|tbody|tfoot|tr|td|th)\s*>$/; 
	    str = str.trim();
	    if (!str || str == '') { return []; }
	    var elements = [];
	    var match = str.match(fastRegex);
	    if (match) {
	        //--matches HTML String, id selector or class selector
	        if (match[1]) {
	            match = str.match(tableChildRegex);
	            if (match) {
	                //--starting and ending node must match
	                if (match[2] == match[4]) {
	                    var parent = 'table';
	                    if (match[2] == 'tr') {
	                        parent = 'thead';
	                    }
	                    else if (['td', 'th'].indexOf(match[2]) !== -1) {
	                        parent = 'tr';
	                    }
	                    var parent = document.createElement(parent);
	                    parent.innerHTML = str;
	                    elements = parent.childNodes;
	                }
	                else {
	                    elements = [document.createTextNode(str)];
	                }
	            }
	            else {
	                //--possibly need to find better method than this, may not support IE 9, but also maybe doesn't need to
	                elements = document.createRange().createContextualFragment(str).childNodes;
	            }
	        }
	        else if (match[2]) {
	            var tmp = document.getElementById(match[2]);
	            elements = tmp ? [tmp] : [];
	        }
	        else {
	            elements = document.querySelectorAll('.' + match[3]);
	        }
	    }
	    else {
	        match = (str.replace(/[\s,{]+$/gm, '').concat(' {')).match(selectorRegex);
	        if (match && !str.match(/^(text\#|txt\#)/)) {
	            //--matches any css selector, still may benefit from using sizzle instead of default querySelector methods
	            elements = document.querySelectorAll(str.replace(/[\s,{]+$/gm, ''));
	        }
	        else {
	            //--standard text node
	            str = str.replace(/^(text\#|txt\#)/, '');
	            elements = [document.createTextNode(str)];
	        }
	    }
	    return [].slice.call(elements);
	};
	m.offset = function(e) {
	    var rect = e.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}
	m.remove = function(e) {
	    if (e instanceof Element) {
	        e.parentElement.removeChild(e);
	    }
	    else if (e instanceof NodeList || e instanceof HTMLCollection || bglib.DT.isArray(e)) {
	        for(var i = e.length - 1; i >= 0; i--) {
	            if(e[i] && e[i].parentElement) {
	                e[i].parentElement.removeChild(e[i]);
	            }
	        }
	    }
	};
	m.on = function(/* element[, names, selector, data, cb] */) {
		var args = [].slice.call(arguments);
		var element = args.shift();
		if (element) {
			if (!elEventMap.has(element)) {
				elEventMap.set(element, new EventManager(element));
			}
			var em = elEventMap.get(element);
			EventManager.prototype.on.apply(em, args);
		}
	};
	m.off = function(/* element[, names, selector, cb] */) {
		var args = [].slice.call(arguments);
		var element = args.shift();
		if (element && elEventMap.has(element)) {
			var em = elEventMap.get(element);
			EventManager.prototype.off.apply(em, args);
		}
	};
	bglib.El = m;
})(bglib);
(function(bglib) {
	var _hasLoaded = false;
	var _onloadCallbacks = [];
	bglib.DomEvents.document.on('ready', function() {
		for (var i = 0; i < _onloadCallbacks.length; i++) {
			(_onloadCallbacks[i])();
		}
		_onloadCallbacks = [];
		_hasLoaded = true;
	});
	var module = function (arg, init) {
		//--if function handle as onload event
		if (bglib.DT.isFunction(arg)) {
			if (_hasLoaded) {
				arg();
			}
			else {
				_onloadCallbacks.push(arg);
			}
			return;
		}
		if (init) {
			if (!bglib.DT.isArray(arg) && !bglib.DT.isString(arg)) {
				arg = [arg];
			}
			var elements = bglib.El.elements(arg);
			for (var i = 0; i < elements.length; i++) {
				this[i] = elements[i];
			}
			this.length = elements.length;
			//--load data- attributes
			for (var i = 0; i < this.length; i++) {
				if (this[i].nodeType != 3) {
                    var attrs = bglib.El.getAttributes(this[i]);
                    for (var attrKey in attrs) {
                        if (attrs.hasOwnProperty(attrKey)) {
                            if (attrKey.match(/^data-/)) {
                                var key = attrKey.replace(/^data-/, '');
                                key = bglib.fn.toCamelCase(key);
                                bglib.El.data.set(this[i], key, attrs[attrKey]);
                            }
                        }
                    }
                }
			}
		}
		else {
			return new module(arg, true);
		}
	};

	module.prototype.each = function(cb) {
		var _self = this;
		for (var i = 0; i < _self.length; i++) {
			var tmp = cb.bind(_self[i]);
			tmp(i, _self[i]);
		}
		return this;
	};	

	module.prototype.toArray = function() {
		var arr = [];
		for (var i = 0; i < this.length; i++) {
			arr.push(this[i]);
		}
		return arr;
	};

	module.prototype.addClass = function(cls) {
		for (var i = 0; i < this.length; i++) {
			bglib.El.addClass(this[i], cls);
		}
		return this;
	};

	module.prototype.removeClass = function(cls) {
		for (var i = 0; i < this.length; i++) {
			bglib.El.removeClass(this[i], cls);
		}
		return this;
	};

	module.prototype.toggleClass = function(cls) {
		for (var i = 0; i < this.length; i++) {
			bglib.El.toggleClass(this[i], cls);
		}
		return this;
	};

	module.prototype.hasClass = function(cls) {
		var hasClass = true;
		for (var i = 0; i < this.length; i++) {
			if (!bglib.El.hasClass(this[i], cls)) {
				hasClass = false;
				i = this.length;
			}
		}
		return hasClass;
	};

	module.prototype.find = function(sel) {
		var elms = [];
		this.each(function() {
			elms = elms.concatUnique(Array.prototype.slice.call(this.querySelectorAll(sel)));
		});
		return module(elms);
	};

	module.prototype.parent = function() {
		var parents = [];
		this.each(function() {
			parents = parents.concatUnique([this.parentElement]);
		});
		return module(parents);
	};

	module.prototype.children = function() {
		var children = [];
		this.each(function() {
			children = children.concatUnique(this.childNodes);
		});
		return module(children);
	};

	module.prototype.attr = function(k, v) {
		if (arguments.length > 1) {
			this.each(function() {
				this.setAttribute(k, v);
			});
			return this;
		}
		else {
			var val;
			if (this.length) {
				val = this[0].getAttribute(k);
			}
			return val;
		}
	};

	module.prototype.removeAttr = function(k) {
		this.each(function() {
			this.removeAttribute(k);
		});
		return this;
	};

	module.prototype.data = function(key, value) {
    	if (arguments.length > 1) {
    		this.each(function() {
    			bglib.El.data.set(this, key, value);
    		});
    		return this;
    	}
    	else {
    		var val;
			if (this.length) {
				val = bglib.El.data.get(this[0], key);
			}
    		return val;
    	}
    };

    module.prototype.removeData = function(k) {
    	this.each(function() {
			bglib.El.data.remove(this, key);
		});
		return this;
    };

    module.prototype.closest = function(sel) {
    	var parents = [];
    	this.each(function() {
	    	var tmp = this.closest(sel);
	    	if (tmp) {
	    		if (parents.indexOf(tmp) === -1) {
	    			parents.pushUnique(tmp);
	    		}
	    	}
    	});
    	return module(parents);
    };

    module.prototype.remove = function() {
    	this.each(function() {
    		bglib.El.data.remove(this);
    		bglib.El.remove(this);
    	});
    	this.length = 0;
    	return this;
    };

    module.prototype.css = function(attr, value) {
    	if (arguments.length > 1) {
    		this.each(function() {
    			bglib.El.css(this, attr, value);
    		});
    		return this;
    	}
    	else {
    		if (bglib.DT.isObject(attr)) {
    			for (var key in attr) {
    				if (attr.hasOwnProperty(key)) {
    					this.css(key, attr[key]);
    				}
    			}
    			return this;
    		}
    		var val = undefined;
    		if (this.length) {
    			val = bglib.El.css(this[0], attr);
    		}
    		return val;
    	}
    };

    module.prototype.on = function(/* names[, selector, data, cb] */) {
    	var args = [].slice.call(arguments);
        args.unshift(null);
        this.each(function() {
            args[0] = this;
            bglib.El.on.apply(null, args);
        });
	};

    module.prototype.off = function(/* names[, selector, cb] */) {
        var args = [].slice.call(arguments);
        args.unshift(null);
        this.each(function() {
            args[0] = this;
            bglib.El.off.apply(null, args);
        });
    };

    module.prototype.val = function(value) {
    	if (typeof value === 'undefined') {
    		var val;
    		if (this.length) {
    			val = this[0].value;
    		}
    		return val;
    	}
    	else {
    		this.each(function() {
    			this.value = value;
    		});
    		return this;
    	}
    };

    module.prototype.append = function() {
    	for (var i = 0; i < arguments.length; i++) {
    		var arg = arguments[i];
    		var _this = this;
    		this.each(function() {
    			if (!bglib.DT.isArray(arg) && !(arg instanceof NodeList)) {
    				if (arg instanceof module) {
    					arg = arg.toArray();
    				}
    				else {
    					arg = [arg];
    				}
    			}
    			for (var j = 0; j < arg.length; j++) {
    				var nodes = bglib.El.elements(arg[j]);
    				for (var nc = 0; nc < nodes.length; nc++) {
    					if (this != nodes[nc]) {
                            this.appendChild(nodes[nc]);
                        }
    				}
    			}
    		});
    	}
    };

    module.prototype.prepend = function() {
    	var args = [].slice.call(arguments).reverse();
    	for (var i = 0; i < args.length; i++) {
    		var arg = args[i];
    		var _this = this;
    		if (!bglib.DT.isArray(arg) && !(arg instanceof NodeList)) {
				if (arg instanceof module) {
					arg = arg.toArray();
				}
				else {
					arg = [arg];
				}
			}
    		arg = arg.reverse();
    		this.each(function() {
    			for (var j = 0; j < arg.length; j++) {
    				//--needs to check if not function for newer jquery compliance, same with append
    				var nodes = bglib.El.elements(arg[j]);
    				for (var nc = nodes.length - 1; nc >= 0; nc--) {
    					this.prepend(nodes[nc]);
    				}
    			}
    		});
    	}
    };

    module.prototype.appendTo = function(target) {
    	target = bglib.El.elements(target);
    	for (var i = 0; i < target.length; i++) {
    		this.each(function() {
    			target[i].appendChild(this);
    		});
    	}
    };

    module.prototype.prependTo = function(target) {
    	target = bglib.El.elements(target);
    	for (var i = 0; i < target.length; i++) {
    		this.each(function() {
    			target[i].prepend(this);
    		});
    	}
    };

    module.prototype.insertBefore = function(target) {
    	target = bglib.El.elements(target);
    	for (var i = 0; i < target.length; i++) {
    		this.each(function() {
    			target[i].parentElement.insertBefore(this, target[i]);
    		});
    	}
    };

    module.prototype.insertAfter = function(target) {
    	target = bglib.El.elements(target);
    	for (var i = 0; i < target.length; i++) {
    		this.each(function() {
    			var nextNode = target[i].nextSibling;
    			if (nextNode) {
    				target[i].parentElement.insertBefore(this, nextNode);
    			}
    			else {
    				target[i].parentElement.appendChild(this);
    			}
    		});
    	}
    };

    module.prototype.html = function(html) {
    	if (typeof html === 'undefined') {
    		var val;
    		if (this.length) {
    			val = this[0].innerHTML;
    		}
    		return val;
    	}
    	else {
    		this.each(function() {
                if (bglib.DT.isObject(html)) {
    			    this.innerHTML = '';
                    var elements = bglib.El.elements(html);
                    for (var i = 0; i < elements.length; i++) {
                        this.appendChild(elements[i]);
                    }
                }
                else {
                    this.innerHTML = html;
                }
    		});
    		return this;
    	}
    };

    module.prototype.outerHtml = function() {
        var val;
        if (this.length) {
            val = this[0].outerHtml;
        }
        return val;
    };

    module.prototype.text = function(text) {
        if (typeof text === 'undefined') {
            var val;
            if (this.length) {
                val = bglib.El.text(this[0]);
                val = val.replace(/\r\n|\n/g, ' ').replace(/ +(?= )/g, '');
            }
            return val;
        }
        else {
            this.each(function() {
                this.innerHTML = bglib.fn.htmlEntities(text);
            });
            return this;
        }
    };

    module.prototype.val = function(value) {
        if (typeof value === 'undefined') {
            var val;
            if (this.length) {
                val = this[0].value;
                //--need to handle selects (single + multiple[])
            }
            return val;
        }
        else {
            value = bglib.DT.isArray(value) ? value : [value];
            this.each(function() {
                var $this = jLyte(this);
                var tagName = this.tagName.toLowerCase();
                if (tagName === 'select') {
                    value = this.multiple && value.length ? [value.pop()] : value;
                    $this.find('option').each(function() {
                        this.selected = "false";
                        if (this.value && value.indexOf(this.value) !== -1) {
                            this.selected = "true";
                        }
                    });
                }
                else if (tagName === 'input') {
                    var type = this.type;
                    if (['checkbox', 'radio'].indexOf(type) !== -1) {
                        this.checked = false;
                        if (this.value && value.indexOf(this.value) !== -1) {
                            this.checked = true;
                        }
                    }
                    else {
                        this.value = value[0];
                    }
                }
                else {
                    this.value = value[0];
                }
            });
            return this;
        }
    };

    //--static
    module.each = function(data, handler) {
    	if (data instanceof module) {
    		data.each(function(i, el) {
    			handler(i, jLyte(el));
    		});
    	}
    	else if (bglib.DT.isObject(data)) {
    		var index = -1;
    		for (var key in data) {
    			if (data.hasOwnProperty(key)) {
    				index++;
    				handler(key, data[key], index);
    			}
    		}
    	}
    	else {
    		for (var i = 0; i < data.length; i++) {
    			handler(i, data[i]);
    		}
    	}
    };

	bglib.jLyte = module;
})(bglib);
//--removed UMD from library since it was embedded and not needed
bglib.JSCookie = (function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
})();
bglib.TagLoader = {
	getJson: function(elm) {
		return JSON.safeParse(this.getText(elm));
	}
	,setJson: function(elm, obj, parent) {
		this.setText(elm, JSON.stringify(obj), parent);
	}
	,getText: function(elm) {
		var text = null;
		if (typeof jQuery != 'undefined' && elm instanceof jQuery)
			text = elm.text() || elm.html();
		else if (isObject(elm))
			text = elm.innerHTML;
		else {
			elm = document.getElementById(elm.replace(/^#/, ''));
			if (elm !== null)
				text = elm.innerText;
		}
		return this.removeWrap(text);
	}
	,setText: function(elm, text, parent) {
		text = this.applyWrap(text);
		if (typeof jQuery != 'undefined' && elm instanceof jQuery)
			elm.html(text);
		else if (isObject(elm))
			elm.innerHTML = text;
		else {
			var _orgElm = elm;
			elm = document.getElementById(elm.replace(/^#/, ''));
			if (elm !== null)
				elm.innerHTML = text;
			else {
				var script = document.createElement( 'script' );
				script.type = 'application/json';
				script.id = _orgElm.replace(/^#/, '');
				script.innerHTML = text;
				parent = parent || document.body;
				parent.appendChild(script);
			}
		}
	}
	,applyWrap: function(text) {
		return '<!--' + text.trim() + '-->';
	}
	,removeWrap: function(text) {
		if (typeof text == 'string')
			return text.trim().replace(/(\r\n|\n|\r)/gm, ' ').replace(/\t+/gm, ' ').replace(/^<\!\-\-(.+)\-\->$/, '$1');
		return null;
	}
};
(function(bglib) {
	var TagLoader = bglib.TagLoader;
	bglib.Storage = function() {
		var _exports = {};
		var _currentTime = function() {
			return Math.floor((new Date()).getTime() / 1000);
		};
		var _storageObject = function(_s) {
			this.storage = _s;
		};
		_storageObject.prototype = {
			supported: function() {
				if (this.storage)
					return true;
				else
					return false;
			}
			,set: function(_k, _v, _e) {
				if (this.supported()) {
					_v = JSON.stringify(_v);
					this.storage.setItem(_k, _v);
					if (_e)
						this.storage.setItem(_k + '_exp', _currentTime() + _e);
				}
			}
			,get: function(_k) {
				if (this.supported()) {
					if (this.storage.getItem(_k + '_exp')) {
						if (_currentTime() >= parseInt(this.storage.getItem(_k + '_exp'))) {
							if (this.storage.getItem(_k))
								this.storage.removeItem(_k);
							this.storage.removeItem(_k + '_exp');
							return null;
						}
					}
					return JSON.parse(this.storage.getItem(_k));
				}
				else
					return null;
			}
			,remove: function(_k) {
				if (this.supported()) {
					this.storage.removeItem(_k);
					this.storage.removeItem(_k + '_exp');
				}
			}
			,clear: function() {
				if (this.supported())
					this.storage.clear();
			}
			,length: function() {
				if (this.supported()) {
					var _count = 0;
					for (var key in localStorage){
						if (!key.endsWith('_exp'))
							_count++;
					}
					return _count;
				}
				else
					return 0;
			}
			,totalLength: function() {
				if (this.supported()) {
					var _count = 0;
					for (var key in localStorage){
						_count++;
					}
					return _count;
				}
				else
					return 0;
			}
		};
		var _pageStorage = function() {
			this.instanceClass = this.itemClass + '_' + bglib.fn.rand();
			this.itemIndex = {};
		};
		_pageStorage.prototype = {
			itemClass: 'appStorageItem'
			,parent: undefined
			,supported: function() {
				if (typeof TagLoader != 'undefined' && TagLoader)
					return true;
				else
					return false;
			}
			,set: function(_k, _v, _e) {
				if (this.supported()) {
					if (!this.itemIndex[_k])
						this.itemIndex[_k] = '#' + this.itemClass + '_' + bglib.fn.rand();
					if (!this.parent) {
						var div = document.createElement('div');
						div.id = this.instanceClass;
						div.style.display = 'none';
						this.parent = div;
						document.body.appendChild(div);
					}
					TagLoader.setJson(this.itemIndex[_k], _v, this.parent);
					var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
					bglib.El.addClass(_item, this.itemClass);
					bglib.El.addClass(_item, this.instanceClass);
					if (_e)
						_item.setAttribute('data-exp', _currentTime() + _e);
				}
			}
			,get: function(_k) {
				if (this.supported() && this.itemIndex[_k]) {
					var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
					if (_item) {
						if (_item.getAttribute('data-exp')) {
							if (_currentTime() >= parseInt(_item.getAttribute('data-exp'))) {
								bglib.El.remove(_item);
								delete this.itemIndex[_k];
								return null;
							}
						}
						return TagLoader.getJson(_item);
					}
					else
						return null;
				}
			}
			,remove: function(_k) {
				if (this.supported() && this.itemIndex[_k]) {
					var _item = document.getElementById(this.itemIndex[_k].replace(/^#/, ''));
					if (_item) {
						bglib.El.remove(_item);
						delete this.itemIndex[_k];
					}
				}
			}
			,clear: function() {
				if (this.supported()) {
					var _items = document.getElementsByClassName(this.instanceClass);
					if (_items.length > 0) {
						bglib.El.remove(_items);
						this.itemIndex = {};
					}
				}
			}
			,length: function() {
				if (this.supported()) {
					return document.getElementsByClassName(this.instanceClass).length;
				}
				return 0;
			}
			,totalLength: function() {
				if (this.supported()) {
					return document.getElementsByClassName(this.itemClass).length;
				}
				return 0;
			}
		};
		_exports.local = new _storageObject(window.localStorage);
		_exports.session = new _storageObject(window.sessionStorage);
		_exports.page = new _pageStorage();
		return _exports;
	};
})(bglib);
bglib.Timeout = function(_opts) {
	if (typeof _opts == 'undefined')
		_opts = {};
	var _expTime = _opts.time || 1800; // 30 minutes
	var _expCallback = _opts.callback || function() { 
		alert('Session Expired');
		location.reload();
	};
	var _idleCounter = 0;
	var _isRunning = _opts.autostart || true;
	var _restartTimeout = function() {
		_idleCounter = 0;
		_isRunning = true;
	};
	var _stopTimeout = function() {
		_idleCounter = 0;
		_isRunning = false;
	};
	var _resetCounter = function() {
		_idleCounter = 0;
		// clog('reset counter');
	};
	var _checkIdleTime = function() {
		if (_isRunning) {
			_idleCounter++;
			if (_idleCounter >= _expTime) {
				_isRunning = false;
				_expCallback();
			}
		}
	};
	var _triggerCallback = function() {
		_expCallback();
	};
	if (typeof _opts.manualHandlers === 'undefined' || !_opts.manualHandlers) {
		document.onclick = _resetCounter;
		document.onmousemove = _resetCounter;
		document.onkeypress = _resetCounter;
		//--possibly need to add listeners to cover touch devices
	}
	window.setInterval(_checkIdleTime, 1000); // runs every second
	var _exports = {
		expTime: _expTime
		,isRunning: function() {return _isRunning;}
		,restart: _restartTimeout
		,stop: _stopTimeout
		,counter: {
			get: function() {return _idleCounter;}
			,reset: _resetCounter
		}
		,check: _checkIdleTime
		,triggerCallback: _triggerCallback
	};
	return _exports;
};
bglib.UrlParser = {
	regexes: {
		scheme: /^([a-zA-Z0-9]+):\/\/|^\/\//
		,username_password: /^([a-zA-Z0-9_-]+)?:([a-zA-Z0-9_-]+)?@/
		,host: /^((?:(?:[a-zA-Z0-9_-]+)\.)+(?:[a-zA-Z0-9_-]+){1})/
		,port: /^(?::([0-9]+))/
		,path: /^((?!\/\/)(?:\/|\.\/|\.\.\/)(?:[^?#]+)?)/
		,query: /^(?:\?([^#]+)*)/
		,fragment: /^(?:#(.+)*)/
	}
	,parse: function(_url, _path) {
		_path = typeof _path != 'undefined' ? _path : '';
		var _tmpUrl = _url;
		var _urlParts = this.urlParts();
		var _had = {};
		_urlParts.url = _url;
		for (var key in this.regexes) {
			if (this.regexes.hasOwnProperty(key)) {
				var _matches = _tmpUrl.match(this.regexes[key]);
				_had[key] = false;
				if (_matches) {
					_had[key] = true;
					var keys = key.split('_');
					_tmpUrl = _tmpUrl.substring(_matches[0].length, _tmpUrl.length);
					for (var  i = 0; i < keys.length; i++) {
						if (typeof _matches[i + 1] != 'undefined') {
							_urlParts[keys[i]] = _matches[i + 1];
						}
					}
				}
			}
		}
		var _pass = false;
		for (var key in _urlParts) {
			if (_urlParts.hasOwnProperty(key)) {
				if (_urlParts[key] != '') {
					_pass = true;
				}
			}
		}
		if (_urlParts.host == '' && _had.scheme) {
			_pass = false;
		}
		else if (_urlParts.host == '') {
			if (_urlParts.path == '') {
				_pass = false;
			}
			else {
				if (_urlParts.scheme != '' || _urlParts.username != '' || _urlParts.password != '' || _urlParts.host || _urlParts.port) { //--maybe don't need port
					_pass = false;
				}
			}
		}
		else if (_urlParts.path == '') {
			_urlParts.path = _path;
		}
		if (_pass) {
			if (_urlParts.host != '') {
				var _hostBits = _urlParts.host.split('.');
				if (_hostBits.length > 2) {
					_urlParts.domain = _hostBits[_hostBits.length - 2] + '.' + _hostBits[_hostBits.length - 1];
					_hostBits.pop();_hostBits.pop();
					_urlParts.subdomain = _hostBits.join('.');
				}
				else {
					_urlParts.domain = _urlParts.host;
				}
			}
			var _tmpPath = _urlParts.path.replace(/^\/+|\/+$/g, '');
			if (_tmpPath != '') {
				_urlParts.pathParts = _tmpPath.split('/');
			}
			else if (_urlParts.path != '') {
				_urlParts.pathParts = ['/'];
			}
			_urlParts.queryString = _urlParts.path + (_urlParts.query != '' ? '?' + _urlParts.query : '');
			if (_urlParts.query != '') {
				var _queryVariables = _urlParts.query.split('&');
				for (var i = 0; i < _queryVariables.length; i++) {
					var _variablePair = _queryVariables[i].split('=');
					if (_variablePair.length < 2)
						_variablePair.push('');
					_urlParts.queryVariables[_variablePair[0]] = decodeURIComponent(_variablePair[1]);
				}
			}
			return _urlParts;
		}
		else {
			return null;
		}
	}
	,build: function(_p) {
		var _parts = this.cloneObject(_p);
		if (typeof _parts.scheme == 'undefined') { _parts.scheme = ''; }
		if (typeof _parts.username == 'undefined') { _parts.username = ''; }
		if (typeof _parts.password == 'undefined') { _parts.password = ''; }
		if (typeof _parts.subdomain == 'undefined') { _parts.subdomain = ''; }
		if (typeof _parts.domain == 'undefined') { _parts.domain = ''; }
		if (typeof _parts.host == 'undefined') { _parts.host = ''; }
		if (typeof _parts.port == 'undefined') { _parts.port = ''; }
		if (typeof _parts.path == 'undefined') { _parts.path = ''; }
		if (typeof _parts.query == 'undefined') { _parts.query = ''; }
		if (typeof _parts.fragment == 'undefined') { _parts.fragment = ''; }
		if (_parts.scheme != '') {
			_parts.scheme = _parts.scheme + '://';
		}
		if (_parts.host == '') {
			if (_parts.subdomain != '' && _parts.domain != '') {
				_parts.host = _parts.subdomain + '.' + _parts.domain;
			}
			else if (_parts.domain != '') {
				_parts.host = _parts.domain;
			}
		}
		_parts.auth = '';
		if (_parts.username != '' || _parts.password != '') {
			_parts.auth = _parts.username + ':' + _parts.password + '@';
		}
		if (_parts.port != '') {
			_parts.port = ':' + _parts.pprt;
		}
		if (_parts.query != '') {
			_parts.query = '?' + _parts.query;
		}
		if (_parts.fragment != '') {
			_parts.fragment = '#' + _parts.fragment;
		}
		if (_parts.path.match(/^\./) && _parts.host != '') {
			_parts.path = '/' + _parts.path;
		}
		if(_parts.host) {
			return _parts.scheme + _parts.auth + _parts.host + _parts.port + _parts.path + _parts.query + _parts.fragment;
		}
		else {
			if (_parts.path == '') {
				_parts.path = '/';
			}
			return _parts.path + _parts.query + _parts.fragment;
		}
	}
	,urlParts: function() {
		return {
			url: '', scheme: '', username: '', password: '', subdomain: '', domain: '', host: '', port: '', path: '', query: '', fragment: '', queryString: '', pathParts: [], queryVariables: {}
		};
	}
	,cloneObject: function(_obj) {
		if (null == _obj || "object" != typeof _obj)
			return _obj;
		var copy = _obj.constructor();
		for (var attr in _obj) {
			if (_obj.hasOwnProperty(attr))
				copy[attr] = _obj[attr];
		}
		return copy;
	}
};
bglib.UserAutoExpire = bglib.create({
	el: undefined
	,modelId: undefined
	,modelTimer: undefined
	,keepAliveTimer: undefined
	,exp: undefined
	,warningDuration: undefined
	,warningTimeout: undefined
	,expireUrl: undefined
	,renewUrl: undefined
	,init: function(opts) {
		var _self = this;
		opts = opts || {};
		opts = Object.deepCopyMerge({
			exp: 1800 //--30 minutes
			,warningDuration: 60
			,expireUrl: '/logout'
			,renewUrl: '/api/keep-session-alive'
		}, opts);
		_self.exp = opts.exp;
		_self.warningDuration = opts.warningDuration;
		_self.expireUrl = opts.expireUrl;
		_self.renewUrl = opts.renewUrl;
		_self.el = {
			model: undefined
			,timer: undefined
		};
		_self.modelId = 'userAutoExpire' + bglib.fn.rand();
		_self.el.model = _self.attachModel(_self.modelId);
		_self.el.timer = _self.el.model.querySelector('#' + _self.modelId + '_timer');
		bglib.EventUtil.addHandler(_self.el.model.querySelector('.userAutoExpire_End'), 'click', function() {
			_self.endSession();
		});
		bglib.EventUtil.addHandler(_self.el.model.querySelector('.userAutoExpire_Keep'), 'click', function() {
			_self.continueSession();
		});
		_self.warningTimeout = new bglib.Timeout({
			time: _self.exp - _self.warningDuration
			,callback: function() {
				_self.promtUser();
			}
		});
		//--every 1/3 of the expTime, just to keep the session alive when no requests are made
		_self.keepAliveTimer = setInterval(function() {
			_self.keepAliveHandler();
		}, 1000 * parseInt(_self.exp / 3));
	}
	,promtUser: function() {
		var _self = this;
		this.el.timer.innerHTML = this.warningDuration + 's';
		this.revealModel();
		this.modelTimer = setInterval(function() {
			_self.countdownTimer();
		}, 1000);
	}
	,countdownTimer: function() {
		var left = parseInt(this.el.timer.innerHTML.replace('s', ''));
		if (left > 0) {
			this.el.timer.innerHTML = (left - 1) + 's';
		}
		else {
			this.endSession();
		}
	}
	,endSession: function() {
		this.hideModel();
		clearInterval(this.modelTimer);
		window.location = this.expireUrl;
	}
	,continueSession: function() {
		this.hideModel();
		this.el.timer.innerHTML = '--';
		clearInterval(this.modelTimer);
		this.modelTimer = null;
		this.warningTimeout.restart();
	}
	,keepAliveHandler: function() {
		bglib.fn.request(this.renewUrl);
	}
	,hideModel: function() {
		bglib.El.removeClass(this.el.model, 'opened');
		bglib.El.addClass(this.el.model, 'closed');
	}
	,revealModel: function() {
		bglib.El.removeClass(this.el.model, 'closed');
		bglib.El.addClass(this.el.model, 'opened');
	}
	,attachModel: function(id) {
		//--build/attach style tag here
		var css = "\
.userAutoExpire_container {\
position: fixed;\
top: 0;\
left: 0;\
right: 0;\
bottom: 0;\
background-color: rgba(0, 0, 0, 0.20);\
z-index: 10000;\
}\
.userAutoExpire_container.closed {\
display: none;\
}\
.userAutoExpire_container p {\
margin: 0;\
margin-bottom: 2rem;\
}\
.userAutoExpire_container p:last-child {\
margin: 0;\
}\
.userAutoExpire_wrap {\
height: 100%;\
}\
.userAutoExpire {\
width: 300px;\
background: #e9e9e9;\
position: relative;\
top: 50%;\
transform: translateY(-50%);\
margin: 0 auto;\
padding: 1rem;\
box-shadow:0 4px 5px 0 rgba(0,0,0,0.14),0 1px 10px 0 rgba(0,0,0,0.12),0 2px 4px -1px rgba(0,0,0,0.3);\
}\
.userAutoExpire_button {\
-webkit-appearance: none;\
-moz-appearance: none;\
line-height: 1;\
display: inline-block;\
text-align: center;\
cursor: pointer;\
transition: background-color 0.25s ease-out, color 0.25s ease-out;\
vertical-align: middle;\
border: 1px solid #222;\
border-radius: 0;\
padding: 0.8em 1em 0.7695em 1em;\
margin: 0;\
font-size: 0.9rem;\
background-color: #e9e9e9;\
color: #222;\
}\
.userAutoExpire_End {\
border-color: transparent;\
}\
.userAutoExpire_button:hover, .userAutoExpire_button:focus {\
text-decoration: underline;\
}\
.userAutoExpire_Keep:hover, .userAutoExpire_Keep:focus {\
color: #e9e9e9;\
background-color: #222;\
text-decoration: none;\
}\
.userAutoExpire_links {\
text-align: right;\
}\
";
		var style = document.createElement('style');
		style.type = "text/css";
		style.innerHTML = css;
		document.querySelector('head').appendChild(style);
		var body = document.querySelector('body');
		var node = bglib.El.element("" +
"<div id=\""+id+"_container\" class=\"userAutoExpire_container closed\" style=\"\">" +
"	<div id=\""+id+"_wrap\" class=\"userAutoExpire_wrap\">" +
"		<div id=\""+id+"\" class=\"userAutoExpire\">" +
"			<div id=\""+id+"_content\" class=\"userAutoExpire_content\">" +
"				<p class=\"userAutoExpire_message\">Session will expire in:&nbsp;<span id=\""+id+"_timer\" class=\"userAutoExpire_timer\">--</span></p>" +
"				<p class=\"userAutoExpire_links\"><button class=\"userAutoExpire_button userAutoExpire_End\">End Now</button>&nbsp;&nbsp;<button class=\"userAutoExpire_button userAutoExpire_Keep\">Keep Alive</button></p>" +
"			</div>" +
"		</div>" +
"	</div>" +
"</div>"
		);
		body.appendChild(node);
		return node;
	}
});
(function(bglib) {
	var __priv = {
		hasAsked: undefined
		,hasGranted: undefined
		,hasDenied: undefined
	};
	var __this = {
		supported: function() {
			return ("Notification" in window);
		}
		,hasAsked: function() {
			return __priv.hasAsked;
		}
		,hasGranted: function() {
			return __priv.hasGranted;
		}
		,hasDenied: function() {
			return __priv.hasDenied;
		}
		,notify: function(msg, opts) {
			opts = opts || {};
			var _autoClose = opts.autoClose || false;
			var _autoCloseTime = opts.autoCloseTime || 5000;
			delete opts.autoClose;
			delete opts.autoCloseTime;
			if (__priv.hasGranted) {
				var n = new Notification(msg, opts);
				if (_autoClose) {
					setTimeout(n.close.bind(n), _autoCloseTime);
				}
			}
			else if (!__priv.hasAsked) {
				__this.request(function(permission) {
					if (permission) {
						var n = new Notification(msg, opts);
						if (_autoClose) {
							setTimeout(n.close.bind(n), _autoCloseTime);
						}
					}
				});
			}
		}
		,request: function(cb) {
			cb = cb || function() {};
			Notification.requestPermission(function(perm) {
				__priv.hasAsked = true;
				if (perm == "granted") {
					__priv.hasGranted = true;
					cb(true);
				}
				else {
					__priv.hasDenied = true;
					cb(false);
				}
			});
		}
	};
	if (__this.supported()) {
		__priv.hasGranted = Notification.permission === "granted";
		__priv.hasDenied = Notification.permission === "denied";
		__priv.hasAsked = Notification.permission !== "denied" && Notification.permission !== "granted";
		//--I think this should be the follow snippet, has Asked should just check if Notification.permission
		//--equals either one which would indicate it had already asked
		//
		//__priv.hasAsked = Notification.permission !== "denied" && Notification.permission !== "granted";
		//
	}
	bglib.Webify = __this
})(bglib);
return bglib;}));
if (typeof bglib === "undefined") {
	bglib = _bglib;
}
var _cornerstone = {
    name: 'Cornerstone UI'
    ,version: '1.0'
    ,__onLoadHandlers: []
    ,__hasLoaded: false
};
var Cornerstone = function() {
};
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
	console.log('Cornerstone:inited');
};
Cornerstone.onLoad = function(cb) {
	if (!_cornerstone.__hasLoaded) {
		if (bglib.DT.isFunction(cb)) {
			_cornerstone.__onLoadHandlers.push(cb);
		}
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
			this.$el = bglib.jLyte(element);
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
(function(CS) {
	var DomEvents = bglib.DomEvents;
	var jLyte = bglib.jLyte;
	var module = CS.BaseModule.extend({
		Name: 'Accordion'
		,breakpoints: undefined
		,breakpointsPx: undefined
		,current: undefined
		,$html: undefined
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				breakpoints: [
					['sm', '40em']
					,['md', '64em']
					,['lg', '90em']
					,['xlg', '105em']
					// ,['xlg', '120em']
				]
			};
			this.breakpoints = this.getOption('breakpoints');
			this.breakpointsPx = [];
			DomEvents.document.on('ready', function() {
				var $tmp = jLyte('<div class="cornerstone-bp"></div>');
				$tmp.css({
					position: 'fixed'
					,top: '-999px'
					,left: '-999px'
					,width: '0'
					,height: '0'
				});
				$tmp.appendTo('body');
				var bps = $tmp.css('content');
				var match = bps ? bps.match(/sm:(\w+);md:(\w+);lg:(\w+);xlg:(\w+)/) : null;
				$tmp.remove();
				if (match) {
					_self.breakpoints = [
						['sm', match[1]]
						,['md', match[2]]
						,['lg', match[3]]
						,['xlg', match[4]]
					];
				}
				for (var i = 0; i < _self.breakpoints.length; i++) {
					var point = _self.breakpoints[i][0], pointValue = _self.breakpoints[i][1];
					if (!pointValue.match(/\d+px/)) {
						_self.breakpointsPx.push([point, parseInt(bglib.fn.toPx(pointValue), 10)]);
					}
					else {
						_self.breakpointsPx.push([point, parseInt(pointValue, 10)]);
					}
				}
				_self.$html = jLyte('html');
				_self.current = _self.determineBreakPoint();
				_self.$html.addClass('cs-bp-' + _self.current);
				_self.trigger('load', {
					caller: _self
					,current: _self.current
				});
			});
			bglib.EventUtil.addHandler(window, 'resize', function(e) {
				var bp = _self.determineBreakPoint();
				if (bp != _self.current) {
					if (typeof _self.current === 'undefined') {
						_self.current = bp;
					}
					_self.handleBreakpointChange(bp);
					_self.current = bp;
				}
			});
			this.on('change', function(e) {
				if (e.old) {
					_self.$html.removeClass('cs-bp-' + e.old);
					_self.$html.addClass('cs-bp-' + e.current);
				}
			});
		}
		,handleBreakpointChange: function(bp) {
			this.trigger('change', {
				caller: this
				,old: this.current
				,current: bp
			});
		}
		,getBreakPoint: function(refresh) {
			var breakpoint;
			if(refresh || !this.current){
				breakpoint = this.determineBreakPoint();
				if(this.current !== breakpoint) {
					if (typeof _self.current === 'undefined') {
						this.current = bp;
					}
					this.handleBreakpointChange(breakpoint);
					this.current = breakpoint;
				}
			}
			return this.current;
		}
		,determineBreakPoint: function() {
			var windowWidth = window.innerWidth, maxPoint = null;
			for (var i = 0; i < this.breakpointsPx.length; i++) {
				var point = this.breakpointsPx[i][0], pointValue = this.breakpointsPx[i][1];
				if (windowWidth >= pointValue) {
					maxPoint = point;
				}
			}
			if (!maxPoint) {
				maxPoint = 'tn';
			}
			return maxPoint;
		}
	}, {});
	CS.BreakPoint = new module();
})(Cornerstone);
(function(CS) {
	var jLyte = bglib.jLyte;
	var component = CS.BaseComponent.extend({
		Name: 'Accordion'
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				childSelector: '.accordion-item'
				,multipleOpen: false
				,allClosed: true
			};
			this.$el.addClass('cs-accordion-' + this.instanceId);
			var $children = this.getChildren();
			$children.each(function() {
				var $item = jLyte(this);
				var $wrap = $item.find('.content-wrap');
				if (!$wrap.length) {
					$wrap = jLyte('<div class="content-wrap"></div>');
					$wrap.append($item.find('.accordion-content').children());
					$item.find('.accordion-content').append($wrap);
				}
			});
			$children.each(function() {
				var $this = jLyte(this);
				_self.setHeight($this);
				if ($this.hasClass('pre-opened')) {
					$this.removeClass('pre-opened');
					_self.openItem($this);
				}
			});
			this.$el.on('click', '.accordion-item .accordion-title', function(evt) {
				var $target = jLyte(this);
				if (!$target.hasClass('accordion-item')) {
					$target = $target.closest('.accordion-item');
				}
				_self.toggleItem($target);
				evt.preventDefault();
			});
			bglib.DomEvents.window.on('resize', function() {
				_self.getChildren().each(function() {
					var $child = jLyte(this);
					if ($child.hasClass('opened-item')) {
						_self.setHeight($child);
					}
				});
			});
			return this;
		}
		,getChildren: function($item) {
			return this.$el.find(this.getOption('childSelector'));
		}
		,closeAll: function($item) {
			var _self = this;
			if ($item && !($item instanceof jLyte)) { $item = jLyte($item); }
			this.getChildren().each(function() {
				var $this = jLyte(this);
				if (this != $item[0] && $this.hasClass('opened-item')) {
					_self.closeItem($this);
				}
			});
		}
		,setHeight: function($item) {
			var $content = $item.find('.accordion-content');
			$content.css('height', $content.find('.content-wrap').css('height'));
		}
		,toggleItem: function($item) {
			if (!($item instanceof jLyte)) { $item = jLyte($item); }
			if ($item.hasClass('opened-item')) {
				if (!this.getOption('allClosed')) {
					var anotherOpened = false;
					this.getChildren().each(function() {
						var $this = jLyte(this);
						if (!anotherOpened && this != $item[0] && $this.hasClass('opened-item')) {
							anotherOpened = true;
						}
					});
					if (anotherOpened) {
						this.closeItem($item);
					}
				}
				else {
					this.closeItem($item);
				}
			}
			else {
				if (!this.getOption('multipleOpen')) {
					this.closeAll($item);
				}
				this.openItem($item);
			}
		}
		,openItem: function($item) {
			if (!($item instanceof jLyte)) { $item = jLyte($item); }
			var preventDefault = this.trigger('beforeOpen', {
				item: $item
			});
			if (!preventDefault) {
				this.setHeight($item);
				$item.addClass('opened-item');
				this.trigger('opened', {
					item: $item
				});
			}
		}
		,closeItem: function($item) {
			if (!($item instanceof jLyte)) { $item = jLyte($item); }
			var preventDefault = this.trigger('beforeClose', {
				item: $item
			});
			if (!preventDefault) {
				$item.removeClass('opened-item');
				this.trigger('closed', {
					item: $item
				});
			}
		}
	}, {});
	CS.Accordion = component;
	CS.autoload.Accordion = CS.autoload.factory(component, '[data-accordion]', 'data-accordion');
})(Cornerstone);
(function(CS) {
	var jLyte = bglib.jLyte;
	jLyte(function() {
		jLyte('body').on('click', '.cs-close', function(evt) {
			var $this = jLyte(this);
			var $target = $this.attr('data-close-target') || null;
			if (!$target) {
				$target = $this.closest('[data-cs-instance]');
			}
			else {
				$target = jLyte($target);
			}
			$target.each(function() {
				var $tgt = jLyte(this);
				var instanceType = $tgt.attr('data-cs-instance'), instance = null;
				if (instanceType && instanceType.trim() != '') {
					instance = CS.getInstance($tgt[0], instanceType);
					if (instance && instance.handleCloseAction) {
						instance.handleCloseAction();
						evt.preventDefault();
					}
				}
			});
		});
	});
})(Cornerstone);
(function(CS) {
	var jLyte = bglib.jLyte;
	var component = CS.BaseComponent.extend({
		Name: 'Modal'
		,scrollPreventor: undefined
		,pageOffset: undefined
		,init: function() {
			var _self = this;
			this.scrollPreventor = function(evt) {
				if (_self.isParentBody) {
					global.scrollTo(_self.pageOffset.x, _self.pageOffset.y);
				}
				evt.preventDefault();
				evt.stopPropagation();
			};
			this.defaultOptions = {
				parent: 'window'
			};
			this.$el.addClass('cs-modal-' + this.instanceId);
			//--create wrap and append to parent
			var $parent;
			var isParentBody = false;
			if (this.getOption('parent') == 'window') {
				$parent = jLyte(document.querySelector('body'));
				isParentBody = true;
			}
			else {
				$parent = jLyte(this.getOption('parent'));
			}
			this.id = this.$el.attr('id') ? this.$el.attr('id') + '-wrap' : 'cs-modal-wrap-' + bglib.fn.rand();
			var $wrap = jLyte('<div class="cs-modal-wrap"></div>');
			$wrap.attr('id', this.id);
			$wrap.appendTo($parent);
			$wrap.append(this.$el);
			$wrap.attr('data-parent', isParentBody ? 'window' : 'element');
			$wrap.attr('data-state', 'closed');
			if (!this.$el.find('.modal-header').length) {
				this.$el.prepend('<div class="modal-header"></div>');
			}
			if (!this.$el.find('.modal-content').length) {
				jLyte('<div class="modal-content"></div>').insertAfter(this.$el.find('.modal-header'));
			}
			if (!this.$el.find('.modal-footer').length) {
				jLyte('<div class="modal-footer"></div>').insertAfter(this.$el.find('.modal-content'));
			}
			this.$wrap = $wrap;
			var isFixedHeader = this.$el.hasClass('modal-fixed-header'),
				isFixedFooter = this.$el.hasClass('modal-fixed-footer'),
				isAlwaysFull = this.$el.hasClass('modal-fill');
			if (isFixedHeader && isFixedFooter) {
				this.$wrap.addClass('modal-fixed-header');
				this.$wrap.addClass('modal-fixed-footer');
				var $fixedWrap = jLyte('<div class="modal-fixed-wrap"></div>');
				var $content = this.$el.find('.modal-content');
				if ($content.length) {
					$fixedWrap.insertBefore($content);
				}
				else {
					$fixedWrap.prependTo($content);
				}
				$fixedWrap.append(this.$el.find('.modal-content'));
			}
			else if (isFixedHeader) {
				this.$wrap.addClass('modal-fixed-header');
				var $fixedWrap = jLyte('<div class="modal-fixed-wrap"></div>');
				$fixedWrap.appendTo(this.$el);
				$fixedWrap.append(this.$el.find('.modal-content'));
				$fixedWrap.append(this.$el.find('.modal-footer'));
			}
			else if (isFixedFooter) {
				this.$wrap.addClass('modal-fixed-footer');
				var $fixedWrap = jLyte('<div class="modal-fixed-wrap"></div>');
				$fixedWrap.prependTo(this.$el);
				$fixedWrap.append(this.$el.find('.modal-header'));
				$fixedWrap.append(this.$el.find('.modal-content'));
			}
			if (isAlwaysFull) {
				this.$wrap.addClass('modal-fill');
			}
			this.$el.attr('tabindex', '0');
			bglib.DomEvents.window.on('keyup', function(evt) {
				if (evt.originalEvent.key == 'Escape' && _self.isOpen() && _self.isFocused()) {
					_self.close();
				}
			});
			$wrap.on('click', function(evt) {
				var $target = jLyte(evt.originalEvent.target);
				if ($target.hasClass('cs-modal-wrap') && _self.isOpen()) {
					_self.close();
				}
			});
			this.isParentBody = isParentBody;
			return this;
		}
		,isFocused: function() {
			var tmp = document.activeElement;
			if (tmp) {
				var $tmp = jLyte(tmp);
				if ($tmp.hasClass('.cs-modal')) {
					return true;
				}
				var $closest = $tmp.closest('.cs-modal');
				if ($closest.length && this.$el[0] === $closest[0]) {
					return true;
				}
			}
			return false;
		}
		,isOpen: function() {
			return (this.$wrap.attr('data-state') == 'opened');
		}
		,open: function() {
			var preventDefault = this.trigger('beforeOpen', {
				model: this.$el
			});
			if (!preventDefault) {
				this.$wrap.attr('data-state', 'opened');
				this.$el[0].focus();
				if (this.isParentBody) {
					this.pageOffset = {
						x: global.pageXOffset
						,y: global.pageYOffset
					};
					bglib.EventUtil.addHandler(window, 'scroll', this.scrollPreventor);
					jLyte(document.querySelector('body')).addClass('cs-modal-open');
				}
				this.trigger('opened', {
					model: this.$el
				});
			}
		}
		,close: function() {
			var preventDefault = this.trigger('beforeClose', {
				model: this.$el
			});
			if (!preventDefault) {
				this.$wrap.attr('data-state', 'closed');
				if (this.isParentBody) {
					bglib.EventUtil.removeHandler(window, 'scroll', this.scrollPreventor);
					jLyte(document.querySelector('body')).removeClass('cs-modal-open');
				}
				this.trigger('closed', {
					model: this.$el
				});
			}
		}
		,getHeader: function() {
			return this.$el.find('.modal-header')[0];
		}
		,setHeader: function(html) {
			html = html || '';
			this.$el.find('.modal-header').html(html);
		}
		,getContent: function() {
			return this.$el.find('.modal-content')[0];
		}
		,setContent: function(html) {
			html = html || '';
			this.$el.find('.modal-content').html(html);
		}
		,getFooter: function() {
			return this.$el.find('.modal-footer')[0];
		}
		,setFooter: function(html) {
			html = html || '';
			this.$el.find('.modal-footer').html(html);
		}
		,getScrollObject: function() {
			if (this.$el.find('.modal-fixed-wrap').length)
				return this.$el.find('.modal-fixed-wrap')[0];
			else
				return this.$wrap[0];
		}
		,scrollToTop: function() {
			var scrollable = this.getScrollObject();
			scrollable.scrollTop = 0;
		}
		,scrollToBottom: function() {
			var scrollable = this.getScrollObject();
			scrollable.scrollTop = scrollable.scrollHeight;
		}
		,scrollTo: function(to) {
			var scrollable = this.getScrollObject();
			to = to ? parseInt(to, 10) : 0;
			if (to < 0)
				to = 0;
			else if (to > scrollable.scrollHeight)
				to = scrollable.scrollHeight;
			scrollable.scrollTop = to;
		}
		,handleCloseAction: function() {
			if (this.isOpen()) {
				this.close();
			}
		}
	}, {});
	CS.Modal = component;
	CS.autoload.Modal = CS.autoload.factory(component, '[data-modal]', 'data-modal');
	jLyte(function() {
		jLyte('button[data-modal-target]').each(function() {
			var $this = jLyte(this);
			$this.on('click', function() {
				var $modal = jLyte($this.attr('data-modal-target'));
				if ($modal.length) {
					var instance = CS.getInstance($modal[0], 'Modal');
					if (instance) {
						instance.open();
					}
				}
			});
		});
	});
})(Cornerstone);
(function(CS) {
	var jLyte = bglib.jLyte;
	var DomEvents = bglib.DomEvents;
	var component = CS.BaseComponent.extend({
		Name: 'Dropdown'
		,$action: undefined
		,$content: undefined
		,init: function() {
			var _self = this;
			this.$el.addClass('cs-dropdown-' + this.instanceId);
			this.defaultOptions = {
				action: 'click'
				,anchor: 'bottom-left'
			};
			this.$action = this.$el.find('.dropdown-action');
			this.$content = this.$el.find('.dropdown-content');
			var bottomMargin = this.$action.css('margin-bottom');
			this.$action.css('margin-bottom', 0);
			if (this.$el.attr('data-anchor')) {
				this.setOption('anchor', this.$el.attr('data-anchor'));
			}
			else {
				this.$el.attr('data-anchor', this.getOption('anchor'));
			}
			if (bottomMargin) {
				this.$el.css('margin-bottom', bottomMargin);
			}
			if (this.getOption('action') == 'hover' || this.$el.hasClass('dropdown-hover')) {
				this.$action.on('mouseover', function(evt) {
					if (!_self.isOpen()) {
						_self.open();
					}
				});
				this.$el.on('mouseleave', bglib.fn.debounce(function(evt) {
					if (_self.isOpen()) {
						_self.close();
					}
				}, 10));
			}
			else {
				this.$action.on('click', function(evt) {
					if (!_self.isOpen()) {
						_self.open();
					}
					else {
						_self.close();
					}
				});
				DomEvents.window.on('click', function(e) {
					var $this = jLyte(e.originalEvent.target);
					var target = e.originalEvent.target;
					var shouldClose = false,
						iclass = 'cs-dropdown-' + _self.instanceId;
					if (!$this.hasClass(iclass)) {
						shouldClose = ($this.closest('.' + iclass).length == 0);
					}
					if (_self.isOpen() && shouldClose) {
						_self.close();
					}
				});
			}
			bglib.DomEvents.window.on('resize', bglib.fn.debounce(function() {
				if (_self.isOpen()) {
					_self.updateHeight();
				}
			}, 50));
			this.$el.attr('data-state', 'closed');
			return this;
		}
		,isOpen: function() {
			return (this.$el.attr('data-state') == 'opened');
		}
		,open: function() {
			var pos = this.determinePosition();
			var preventDefault = this.trigger('beforeOpen', {
				dropdown: this.$el
			});
			if (!preventDefault) {
				this.updateHeight();
				this.$el.attr('data-state', 'opened');
				this.trigger('opened', {
					dropdown: this.$el
				});
			}
		}
		,close: function() {
			var preventDefault = this.trigger('beforeClose', {
				dropdown: this.$el
			});
			if (!preventDefault) {
				this.$el.attr('data-state', 'closed');
				this.trigger('close', {
					dropdown: this.$el
				});
			}
		}
		,updateHeight: function() {
			this.$content.css(
				'height'
				,this.$content.find('.dropdown-content-wrap').css('height')
			);
		}
		,determinePosition: function() {
			//--make sure dropdown fits within page boundaries
			var anchor = this.getOption('anchor');
			var buttonRect = this.$el[0].getBoundingClientRect();
		}
		,handleCloseAction: function() {
			if (this.isOpen()) {
				this.close();
			}
		}
	}, {});
	CS.Dropdown = component;
	CS.autoload.Dropdown = CS.autoload.factory(component, '[data-dropdown]', 'data-dropdown');
})(Cornerstone);
(function(CS) {
/*
	- add special css class to hold the current BP name ? maybe not needed
	- add responsive handler to cornerstone with events
	- work on responsiveness of the modal component for all sizes
	- work on adding proper events to widgets

	Bugs:

*/
	var jLyte = bglib.jLyte;
	var DomEvents = bglib.DomEvents;
	var component = CS.BaseComponent.extend({
		Name: 'PriorityPlus'
		,dropdown: undefined
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				action: 'click'
				,anchor: 'bottom-left'
			};
			this.$el.addClass('cs-priority-plus-' + this.instanceId);
			var $dropdownEl = jLyte('\
				<li class="item overflow-toggle-item cs-dropdown">\
					<button class="cs-button dropdown-action button-primary"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g id="Icon_7_"><g><path d="M416,277.333H277.333V416h-42.666V277.333H96v-42.666h138.667V96h42.666v138.667H416V277.333z"/></g></g></svg></button>\
					<div class="dropdown-content"><ul class="dropdown-content-wrap"></ul></div>\
				</li>\
			');
			$dropdownEl.appendTo(this.$el.find('.priority-plus-items'));
			this.dropdown = new CS.Dropdown($dropdownEl[0], {
				anchor: 'bottom-right'
			});
			_self.handleResize();
			DomEvents.window.on('resize', bglib.fn.debounce(function() {
				_self.handleResize();
			}, 1));
			return this;
		}
		,handleResize: function() {
			var _self = this;
			this.resetItems();
			var parentRect = this.$el.find('.priority-plus-items')[0].getBoundingClientRect();
			var dropdownRect = this.dropdown.$el[0].getBoundingClientRect();
			var availableWidth = parentRect.width - dropdownRect.width;
			var $items = this.getItems();
			var hitMaxWidth = false;
			for (var i = 0; i < $items.length; i++) {
				var $this = jLyte($items[i]);
				var currentRect = $this[0].getBoundingClientRect();
				var currentX = (currentRect.x - parentRect.x + currentRect.width);
				if (currentX > availableWidth || hitMaxWidth) {
					_self.dropdown.$el.find('.dropdown-content-wrap').append($this);
					if (!hitMaxWidth) {
						hitMaxWidth = true;
					}
				}
			}
			this.toggleAction();
			this.trigger('reflow', {
				priorityPlus: this.$el
				,items: this.getItems()
				,overflow: _self.dropdown.$el.find('.dropdown-content-wrap > .item')
			});
		}
		,toggleAction: function() {
			if (this.dropdown.$el.find('.dropdown-content-wrap').find('.item').length) {
				this.dropdown.$el.css('visibility', 'visible');
			}
			else {
				this.dropdown.$el.css('visibility', 'hidden');
			}
		}
		,resetItems: function() {
			var _self = this;
			var $itemsWrap = this.$el.find('.priority-plus-items');
			this.dropdown.$el.find('.dropdown-content-wrap').find('.item').each(function() {
				$itemsWrap.append(this);
			});
			this.dropdown.$el.css('visibility', 'hidden');
			this.trigger('reset', {
				priorityPlus: this.$el
				,items: this.getItems()
			});
		}
		,getItems: function() {
			return this.$el.find('.priority-plus-items > .item:not(.overflow-toggle-item)');
		}
	}, {});
	CS.PriorityPlus = component;
	CS.autoload.PriorityPlus = CS.autoload.factory(component, '[data-priority-plus]', 'data-priority-plus');
})(Cornerstone);
(function(CS) {
	var jLyte = bglib.jLyte;
	var component = CS.BaseComponent.extend({
		Name: 'Pagination'
		,$ellipsis: undefined
		,$gotoTextbox: undefined
		,initEllipsis: function($ellipsis) {
			if (!$ellipsis.hasClass('ellipsis')) {
				$ellipsis.addClass('ellipsis');
			}
			var $ellipsisTextbox = jLyte(
				'<div class="ellipsis-input" data-showing="false"><input class="cs-input" type="text"></div>'
			);
			$ellipsisTextbox.appendTo($ellipsis);
		}
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				startPad: 2
				,endPad: 2
				,delta: 2
				,currentPage: 1
				,maxPages: 1
				,ellipsisTop: false
			};
			this.$el.addClass('cs-pagination-' + this.instanceId);
			this.$ellipsis = this.$el.find('li.ellipsis:not(.no-popup)');
			this.$ellipsis.each(function() {
				_self.initEllipsis(jLyte(this));
			});
			this.$el.on('click', 'li.ellipsis:not(.no-popup)', function(evt) {
				var $this = jLyte(this);
				var $inputWrap = jLyte(evt.originalEvent.target);
				if (!$inputWrap.hasClass('ellipsis-input')) {
					$inputWrap = $inputWrap.closest('.ellipsis-input');
				}
				if (!$inputWrap.length) {
					_self.toggleEllipsisTextbox($this.find('.ellipsis-input'));
				}
			});
			bglib.DomEvents.window.on('click', function(evt) {
				if (_self.isEllipsisTextboxShowing()) {
					var $inputWrap = jLyte(evt.originalEvent.target);
					if (!$inputWrap.hasClass('ellipsis')) {
						$inputWrap = $inputWrap.closest('.ellipsis');
					}
					_self.$ellipsis.each(function() {
						var $this = jLyte(this);
						var $wrap = $this.find('.ellipsis-input')
						if ($wrap.attr('data-showing') == 'true') {
							if (!$inputWrap.length || ($inputWrap.length && $inputWrap[0] != $this[0])) {
								_self.hideEllipsisTextbox($wrap);
							}
						}
					});
				}
			});
			this.$el.on('keydown', '.ellipsis-input input', function (evt){
				_this = this;
				if (evt.originalEvent.keyCode == 13 && _this.value.trim() != '') {
					_self.trigger('jumpTo', {
						target: _this
						,caller: _self
						,page: _this.value
					});
				}
			});
			this.$el.on('click', 'li > a', function(evt) {
				var _this = this,
					$this = jLyte(this),
					$li = $this.closest('li');
				if (!$li.hasClass('disabled') && !$li.hasClass('current') && !$li.hasClass('ellipsis')) {
					var preventDefault = _self.trigger('itemClick', {
						target: _this
						,caller: _self
						,originalEvent: evt.originalEvent
					});
					if (preventDefault) {
						evt.preventDefault();
					}
				}
			});
			this.on('renderItem', function(evt) {
				_self.renderItem(evt);
			});
			window['m' + this.instanceId] = this;
		}
		,render: function(current, maxPages) {
			var _self = this;
			/* needs tested */
			maxPages = maxPages || this.getOption('maxPages');
			current = current < 0 ? 0 : current;
			current = current > maxPages ? maxPages : current;
			this.setOption('maxPages', maxPages);
			this.setOption('currentPage', current);
			var arr = this.getPagination(
				current, maxPages,
				this.getOption('delta'), this.getOption('startPad'), this.getOption('endPad')
			);
			arr.unshift('prev');
			arr.push('next');
			var prevDisabled = (current < 2);
			var nextDisabled = (current == maxPages);
			this.$el.find('li:not(.cs-template)').remove();
			console.log(arr);
			for (var i = 0; i < arr.length; i++) {
				var $item = jLyte('<li></li>');
				if (arr[i] == '...') {
					this.initEllipsis($item);
				}
				else {
					var type = 'page',
						disabled = false;
					if (arr[i] == 'prev') {
						type = arr[i];
						disabled = (current < 2);
					}
					else if (arr[i] == 'next') {
						type = arr[i];
						disabled = (current == maxPages);
					}
					type = arr[i] == 'prev' ? 'prev' : type;
					type = arr[i] == 'next' ? 'next' : type;
					this.trigger('renderItem', {
						caller: _self
						,el: $item[0]
						,current: current
						,item: {
							value: arr[i]
							,type: type
							,disabled: disabled
							,current: (current == arr[i])
						}
					});
				}
				this.$el.append($item);
			}
		}
		,renderItem: function(evt) {
			var item = evt.item, inner = '';
			if (item.type == 'page') {
				if (!item.disabled) {
					inner = '<a href="?page={{page}}">{{page}}</a>';
				}
				else {
					inner = '<span data-page="{{page}}">{{page}}</span>';
				}
			}
			else if (evt.type == 'prev') {
				if (!item.disabled) {
					inner = '<a href="?page=' + (evt.current - 1) + '">Previous</a>';
				}
				else {
					inner = '<span data-page="previous">Previous</span>';
				}
			}
			else if (evt.type == 'next') {
				if (!item.disabled) {
					inner = '<a href="?page=' + (evt.current + 1) + '">Next</a>';
				}
				else {
					inner = '<span data-page="next">Next</span>';
				}
			}
			evt.el.innerHTML = inner;
			if (item.disabled) {
				bglib.El.addClass(evt.el, 'disabled');
			}
		}
		,isEllipsisTextboxShowing: function() {
			var isOpen = false;
			this.$ellipsis.each(function() {
				if (jLyte(this).find('.ellipsis-input').attr('data-showing') == 'true') {
					isOpen = true;
				}
			});
			return isOpen;
		}
		,toggleEllipsisTextbox: function($input) {
			if ($input.attr('data-showing') == 'true') {
				this.hideEllipsisTextbox($input);
			}
			else {
				this.showEllipsisTextbox($input);
			}
		}
		,showEllipsisTextbox: function($input) {
			var _self = this;
			$input.attr('data-showing', 'true');
			$input.find('input')[0].value = '';
			$input.find('input')[0].focus();
		}
		,hideEllipsisTextbox: function($input) {
			$input.attr('data-showing', 'false');
		}
		,getPagination: function(current, last, delta, start, end) {
			var start = start || 1,
				end = end || 1,
				delta = delta || 2,
				left = current - delta,
				right = current + delta + 1,
				range = [],
				rangeWithDots = [],
				l = -1;
			for (var i = 1; i <= last; i++) {
				var startTest = (i <= start),
					endTest = (i >= (last - (end - 1))),
					rangeTest = (i >= left && i < right);
				if (startTest || endTest || rangeTest) {
					range.push(i);
				}
			}
			for (var i = 0; i < range.length; i++) {
				if (l != -1) {
					if (range[i] - l === 2) {
						rangeWithDots.push(i + 1);
					}
					else if (range[i] - l !== 1) {
						rangeWithDots.push('...');
					}
				}
				rangeWithDots.push(range[i]);
				l = range[i];
			}
			return rangeWithDots;
		}
	}, {
		handleDataAttr: function(key, opt) {
			switch (key) {
				case 'max-pages':
				case 'current-page':
					opt = parseInt(opt, 10);
				break;
			}
			return opt;
		}
	});
	CS.Pagination = component;
	CS.autoload.Pagination = CS.autoload.factory(component, '[data-pagination]', 'data-pagination', [
		'max-pages', 'current-page', 'start-pad', 'end-pad', 'delta', 'ellipsis-top'
	]);
})(Cornerstone);
(function(CS) {
	var jLyte = bglib.jLyte;
	var component = CS.BaseComponent.extend({
		Name: 'Tabs'
		,init: function() {
			var _self = this;
			this.defaultOptions = {
			};
			this.$el.addClass('cs-tabs-' + this.instanceId);

			this.selector = '.cs-tabs-' + this.instanceId + ' > ul li a, .cs-tabs-' + this.instanceId + ' > li a';
			jLyte(document.querySelector('body')).on('click', this.selector, function(evt) {
				evt.preventDefault();
				// console.log('tab clicked');
				_self.openTab(jLyte(this).closest('li')[0]);
			});

			var $active = this.$el.find('li.active');
			var displayStyle = this.$el.hasClass('vertical-tabs') ? 'inline-block' : 'block';
			jLyte(this.selector).each(function(i) {
				var $this = jLyte(this);
				var $li = $this.closest('li');
				var noActiveSet = (!$active.length && i == 0);
				if ($li[0] !== $active[0] && !noActiveSet) {
					jLyte($this.attr('href')).css('display', 'none');
				}
				else {
					jLyte($this.attr('href')).css('display', displayStyle);
					$li.addClass('active');
				}
			});

			return this;
		}
		,openTab: function(tab) {
			var $active = this.$el.find('li.active');
			var displayStyle = this.$el.hasClass('vertical-tabs') ? 'inline-block' : 'block';
			jLyte(this.selector).each(function(i) {
				var $this = jLyte(this);
				var $li = $this.closest('li');
				if ($li[0] !== tab) {
					jLyte($this.attr('href')).css('display', 'none');
					$li.removeClass('active');
				}
				else {
					jLyte($this.attr('href')).css('display', displayStyle);
					$li.addClass('active');
				}
			});			
		}
	}, {});
	CS.Tabs = component;
	CS.autoload.Tabs = CS.autoload.factory(component, '[data-tabs]', 'data-tabs');
})(Cornerstone);
(function(CS) {
	/*
		To Do:
			- Add close button functionality
			- Add swipe to close functionality
			- Add different positions
				- left | center
	*/
	var jLyte = bglib.jLyte;
	var component = CS.JsComponent.extend({
		Name: 'Toast'
		,$container: undefined
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				html: 'This is a toast.'
				,displayLength: 4000 //--milliseconds
				,class: null
				,closeCallback: null
				,position: 'right' //--left,center,right
			};
			this.$el = jLyte('<div></div>');
			this.$el.addClass('cs-toast');
			this.$el.addClass('cs-toast-' + this.instanceId);
			this.$el.append('<div class="cs-toast-content">' + this.getOption('html') + '</div>');
			if (this.getOption('class')) {
				this.$el.addClass(this.getOption('class'));
			}
			//--check if toast container is present if not add it
			this.$container = jLyte('body').find('.cs-toast-container');
			if (!this.$container.length) {
				this.$container = jLyte('<div class="cs-toast-container"></div>');
				jLyte('body').append(this.$container);
			}
			this.$container.append(this.$el);
			var _self = this;
			setTimeout(function() {
				if (typeof anime !== 'undefined') {
					console.log('anime exists');
					var animate = anime({
						targets: _self.$el[0]
						,duration: 2000
						,translateY: -50
						,opacity: 0
						,update: function() {
							_self.$el.addClass('removing');
							_self.$el.css('position', 'absolute');
						}
					});
					animate.finished.then(function() {
						_self.$el.remove();
						if (_self.getOption('closeCallback')) {
							(_self.getOption('closeCallback'))();
						}
					});
				}
				else {
					_self.$el.remove();
					if (_self.getOption('closeCallback')) {
						(_self.getOption('closeCallback'))();
					}
				}
			}, this.getOption('displayLength'));
			return this;
		}
	}, {});
	CS.Toast = component;
})(Cornerstone);
(function(CS) {
	/*
		Few issue needs to be worked out with the left/right positioning but overall it works fairley well.
		 - top position in some instances of the right-pos overlaps the item that gets hovered
	*/
	var jLyte = bglib.jLyte;
	var DomEvents = bglib.DomEvents;
	var component = CS.BaseComponent.extend({
		Name: 'Tooltip'
		,tooltip: undefined
		,$tooltip: undefined
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				'html': null,
				'position': 'top' //--top|bottom|left|right
			};
			if (this.dataValue) {
				this.tooltip = this.dataValue;
			}
			else if (this.$el.attr('title')) {
				this.tooltip = this.$el.attr('title');
				this.$el.removeAttr('title');
			}
			if (this.tooltip) {
				this.$el.on('mouseenter', function() {
					_self.showTooltip();
				});
				this.$el.on('mouseleave', function() {
					_self.hideTooltip();
				});
			}
			DomEvents.window.on('resize', function() {
				if (_self.$tooltip) {
					var pos = _self.determinePosition();
					_self.$tooltip.css(_self.calculatePosition(pos));
				}
			});
			console.log('tooltip-item-position', this.$el[0].getBoundingClientRect());
			return this;
		}
		,calculatePosition: function($tooltip, pos) {
			var _self = this;
			var itemPos = _self.$el[0].getBoundingClientRect();
			var tooltipCss = { left: itemPos.x + 'px', top: itemPos.y + 'px' };
			console.log(pos);
			var calcPositionTop = function() {
				var css = {};
				css.top = (itemPos.y - _self.$tooltip[0].clientHeight) + 'px';
				var left = itemPos.x;
				if (_self.$el.clientWidth < _self.$tooltip[0].clientWidth) {
					left = left - ((_self.$tooltip[0].getBoundingClientRect().width - (_self.$el[0].getBoundingClientRect().width / 2)) / 2);
				}
				else {
					left = left + ((_self.$el[0].clientWidth - _self.$tooltip[0].clientWidth) / 2);
				}
				if (left < 0 || left + _self.$tooltip.clientWidth > window.innerWidth) {
					left = 4;
				}
				css.left = left + 'px';
				return css;
			};
			var calcPositionBottom = function() {
				var css = {};
				css.top = (itemPos.y + _self.$el[0].clientHeight) + 'px';
				var left = itemPos.x;
				if (_self.$el.clientWidth < _self.$tooltip[0].clientWidth) {
					left = left - ((_self.$tooltip[0].clientWidth - _self.$el[0].clientWidth) / 2);
				}
				else {
					left = left + ((_self.$el[0].clientWidth - _self.$tooltip[0].clientWidth) / 2);
				}
				if (left < 0 || left + _self.$tooltip.clientWidth > window.innerWidth) {
					left = 4;
				}
				css.left = left + 'px';
				return css;
			};
			switch (pos) {
				case 'top':
					tooltipCss = Object.assign(tooltipCss, calcPositionTop());
				break;
				case 'bottom':
					tooltipCss = Object.assign(tooltipCss, calcPositionBottom());
				break;
				case 'left':
					var maxWidth = itemPos.x - 8;
					if (maxWidth < 150 && $tooltip[0].clientWidth > maxWidth) {
						console.log(1);
						tooltipCss = Object.assign(tooltipCss, calcPositionTop());
					}
					else {
						$tooltip.css('max-width', maxWidth + 'px');
						var top;
						if (_self.$el.clientHeight < $tooltip[0].clientHeight) {
							top = itemPos.y - (Math.ceil($tooltip[0].clientHeight - _self.$el[0].clientHeight) / 2);
						}
						else {
							top = itemPos.y + (Math.ceil(_self.$el[0].clientHeight - $tooltip[0].clientHeight) / 2);
						}
						tooltipCss.top = top + 'px';
						tooltipCss.left = itemPos.x - 4 - $tooltip[0].clientWidth;
						tooltipCss.left = tooltipCss.left + 'px';
					}
				break;
				case 'right':
					var maxWidth = window.innerWidth - itemPos.x - this.$el[0].clientWidth - 8;
					if (maxWidth < 150 && $tooltip[0].clientWidth > maxWidth) {
						console.log(1);
						tooltipCss = Object.assign(tooltipCss, calcPositionTop());
					}
					else {
						console.log(2);
						$tooltip.css('max-width', maxWidth + 'px');
						var top;
						if (_self.$el.clientHeight < $tooltip[0].clientHeight) {
							top = itemPos.y - (Math.ceil($tooltip[0].clientHeight - _self.$el[0].clientHeight) / 2);
						}
						else {
							top = itemPos.y + (Math.ceil(_self.$el[0].clientHeight - $tooltip[0].clientHeight) / 2);
						}
						tooltipCss.top = top + 'px';
						tooltipCss.left = itemPos.x + this.$el[0].clientWidth + 4;
						tooltipCss.left = tooltipCss.left + 'px';
					}
				break;
			}
			return tooltipCss;
		}
		,showTooltip: function() {
			if (!this.$tooltip) {
				this.$tooltip = jLyte('<div class="cs-tooltip"></div>');
				this.$tooltip.addClass('cs-tooltip-' + this.instanceId);
				this.$tooltip.append('<div class="tooltipContent">' + this.tooltip + '</div>');
				var pos = this.determinePosition();
				this.$tooltip.attr('data-position', pos);
				jLyte('body').append(this.$tooltip);
				this.$tooltip.css(this.calculatePosition(this.$tooltip, pos));
			}
		}
		,hideTooltip: function() {
			this.$tooltip.remove();
			this.$tooltip = null;
		}
		,determinePosition: function() {
			var pos = this.getOption('position');
			if (this.$el.attr('data-position')) {
				pos = this.$el.attr('data-position');
			}
			return pos;
		}
	}, {});
	CS.Tooltip = component;
	CS.autoload.Tooltip = CS.autoload.factory(component, '[data-tooltip]', 'data-tooltip');
})(Cornerstone);
return Cornerstone;}));