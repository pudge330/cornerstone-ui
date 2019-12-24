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
bglib.fn.iosVersion = function() {
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
bglib.fn.compileTemplate = function(tpl) {
	var str = tpl;
	str = str.replace(/\{\{/g, "' + ");
	str = str.replace(/\}\}/g, " + '");
	str = str.replace(/\<\%/g, "'; ");
	str = str.replace(/\%\>/g, " __bglib_template__ += '");
	str = str.replace(/\<\*/g, "'; /*");
	str = str.replace(/\*\>/g, "*/ __bglib_template__ += '");
	str = str.replace(/\\\{\\\{/g, "{{");
	str = str.replace(/\\\}\\\}/g, "}}");
	str = str.replace(/\r\n/g, "\n");
	str = str.replace(/\n/g, "\\\n");
	return 'var __bglib_template__ = \'' + str + '\';';
};
bglib.fn.renderTemplate = function(tpl, data) {
	var helpers = bglib.fn.renderTemplate.helpers,
		format = bglib.fn.renderTemplate.format;
	tpl = tpl.match(/^var __bglib_template__ = \'/) ? tpl : bglib.fn.compileTemplate(tpl);
	return function() {
		return eval(tpl);
	}.call(data);
};
bglib.fn.renderTemplate.helpers = {};
bglib.fn.renderTemplate.helpers.htmlEntities = bglib.fn.htmlEntities;
bglib.fn.renderTemplate.helpers.rand = bglib.fn.rand;
bglib.fn.renderTemplate.helpers.toEm = bglib.fn.toEm;
bglib.fn.renderTemplate.helpers.toPx = bglib.fn.toPx;
bglib.fn.renderTemplate.helpers.dt = bglib.DT;
bglib.fn.renderTemplate.format = {};
bglib.fn.renderTemplate.format.camelCase = bglib.fn.toCamelCase;
bglib.fn.renderTemplate.format.properCase = bglib.fn.toProperCase;
bglib.fn.renderTemplate.format.decimal = bglib.fn.formatDecimal;
bglib.fn.renderTemplate.format.price = bglib.fn.formatPrice;
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