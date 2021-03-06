(function (root, factory) {
    var dependencies = Object.assign(
        { amd: {}, common: {} },
        typeof root.Cornerstone_Dependencies !== 'undefined'
            ? root.Cornerstone_Dependencies
            : {}
    );
    dependencies.amd = Object.assign({ bglib: 'bglib', jquery: 'jquery' }, dependencies.amd);
    dependencies.common = Object.assign({ bglib: 'bglib', jquery: 'jquery' }, dependencies.common);
    if (typeof define === 'function' && define.amd) {
        define([dependencies.amd.bglib, dependencies.amd.jquery], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require(dependencies.common.bglib), require(dependencies.common.jquery));
    } else {
        root.Cornerstone = factory(root.bglib, root.jQuery);
    }
}(global = typeof self !== 'undefined' ? self : this, function (_bglib, jQuery) {
var Sortable = global.Sortable !== 'undefined' ? global.Sortable : null;
var jQuery = global.jQuery !== 'undefined' ? global.jQuery : null;
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
(function(CS) {
	var DomEvents = bglib.DomEvents;
	var module = CS.BaseModule.extend({
		Name: 'Breakpoint'
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
				_self.$html = jQuery('html');
				var $tmp = jQuery('<div class="cornerstone-breakpoints"></div>');
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
	var component = CS.BaseComponent.extend({
		Name: 'Accordion'
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				childSelector: '.accordion-item'
				,multipleOpen: false
				,allClosed: true
			};
			this.$el.addClass('accordion-' + this.instanceId);
			var $children = this.getChildren();
			$children.each(function() {
				var $item = jQuery(this);
				// var $wrap = $item.find('.accordion-content-wrap');
				// if (!$wrap.length) {
				// 	$wrap = jQuery('<div class="accordion-content-wrap"></div>');
				// 	$wrap.append($item.find('.accordion-content').children());
				// 	$item.find('.accordion-content').append($wrap);
				// }
				var $indicator = $item.find('.accordion-title .open-indicator');
				if (!$indicator.length) {
					var $indicator = jQuery('<span class="open-indicator"><span>');
					CornerstoneResources.icon('arrow', $indicator);
					$item.find('.accordion-title').append($indicator);
				}
			});
			$children.each(function() {
				var $this = jQuery(this);
				_self.setHeight($this);
				if ($this.hasClass('pre-opened')) {
					$this.removeClass('pre-opened');
					_self.openItem($this);
				}
			});
			this.$el.on('click', '.accordion-item .accordion-title', function(evt) {
				var $target = jQuery(this);
				if (!$target.hasClass('accordion-item')) {
					$target = $target.closest('.accordion-item');
				}
				_self.toggleItem($target);
				evt.preventDefault();
			});
			bglib.DomEvents.window.on('resize', function() {
				_self.getChildren().each(function() {
					var $child = jQuery(this);
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
		,updateHeights: function(isOpened) {
			var _self = this;
			isOpened = isOpened || false;
			this.getChildren().each(function() {
				var $item = jQuery(this);
				if (isOpened && $item.hasClass('opened-item')) {
					_self.setHeight($item);
				}
				else if (!isOpened) {
					_self.setHeight($item);
				}
			});
		}
		,closeAll: function($item) {
			var _self = this;
			if ($item && !($item instanceof jQuery)) { $item = jQuery($item); }
			this.getChildren().each(function() {
				var $this = jQuery(this);
				if (this != $item[0] && $this.hasClass('opened-item')) {
					_self.closeItem($this);
				}
			});
		}
		,setHeight: function($item) {
			var $content = $item.find('.accordion-content');
			var height = 0;
			$content.children().each(function() {
				height += jQuery(this).outerHeight();
			});
			$content.css('height', height + 'px');
		}
		,toggleItem: function($item) {
			if (!($item instanceof jQuery)) { $item = jQuery($item); }
			if ($item.hasClass('opened-item')) {
				if (!this.getOption('allClosed')) {
					var anotherOpened = false;
					this.getChildren().each(function() {
						var $this = jQuery(this);
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
			if (!($item instanceof jQuery)) { $item = jQuery($item); }
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
			if (!($item instanceof jQuery)) { $item = jQuery($item); }
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
	jQuery(function() {
		jQuery('body').on('click', '.cs-close', function(evt) {
			var $this = jQuery(this);
			var $target = $this.attr('data-close-target') || null;
			if (!$target) {
				$target = $this.closest('[data-cs-instance]');
			}
			else {
				$target = jQuery($target);
			}
			$target.each(function() {
				var $tgt = jQuery(this);
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
			this.$el.addClass('modal-' + this.instanceId);
			//--create wrap and append to parent
			var $parent;
			var isParentBody = false;
			if (this.getOption('parent') == 'window') {
				$parent = jQuery(document.querySelector('body'));
				isParentBody = true;
			}
			else {
				$parent = jQuery(this.getOption('parent'));
			}
			this.id = this.$el.attr('id') ? this.$el.attr('id') + '-wrap' : 'modal-wrap-' + bglib.fn.rand();
			var $wrap = jQuery('<div class="modal-wrap"></div>');
			$wrap.attr('id', this.id);
			$wrap.appendTo($parent);
			$wrap.append(this.$el);
			$wrap.attr('data-parent', isParentBody ? 'window' : 'element');
			$wrap.attr('data-state', 'closed');
			if (!this.$el.find('.modal-header').length) {
				this.$el.prepend('<div class="modal-header"></div>');
			}
			if (!this.$el.find('.modal-content').length) {
				jQuery('<div class="modal-content"></div>').insertAfter(this.$el.find('.modal-header'));
			}
			if (!this.$el.find('.modal-footer').length) {
				jQuery('<div class="modal-footer"></div>').insertAfter(this.$el.find('.modal-content'));
			}
			this.$wrap = $wrap;
			var isFixedHeader = this.$el.hasClass('modal-fixed-header'),
				isFixedFooter = this.$el.hasClass('modal-fixed-footer'),
				isAlwaysFull = this.$el.hasClass('modal-fill');
			if (isFixedHeader && isFixedFooter) {
				this.$wrap.addClass('modal-fixed-header');
				this.$wrap.addClass('modal-fixed-footer');
				var $fixedWrap = jQuery('<div class="modal-fixed-wrap"></div>');
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
				var $fixedWrap = jQuery('<div class="modal-fixed-wrap"></div>');
				$fixedWrap.appendTo(this.$el);
				$fixedWrap.append(this.$el.find('.modal-content'));
				$fixedWrap.append(this.$el.find('.modal-footer'));
			}
			else if (isFixedFooter) {
				this.$wrap.addClass('modal-fixed-footer');
				var $fixedWrap = jQuery('<div class="modal-fixed-wrap"></div>');
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
				var $target = jQuery(evt.originalEvent.target);
				if ($target.hasClass('modal-wrap') && _self.isOpen()) {
					_self.close();
				}
			});
			this.isParentBody = isParentBody;
			return this;
		}
		,isFocused: function() {
			var tmp = document.activeElement;
			if (tmp) {
				var $tmp = jQuery(tmp);
				if ($tmp.hasClass('.modal')) {
					return true;
				}
				var $closest = $tmp.closest('.modal');
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
			var _self = this;
			var preventDefault = this.trigger('beforeOpen', {
				model: this.$el
			});
			if (!preventDefault) {
				this.$wrap.animate({
					opacity: 1
				}, {
					queue: false,
					duration: 400,
					start: function() {
						_self.$wrap.attr('data-state', 'opening');
						// var top = _self.$el.css('margin-top');
						// _self.$el.css('margin-top', '0px');
						// _self.$el.animate({
						// 	'margin-top': top
						// }, {
						// 	queue: false,
						// 	duration: 250
						// });
					},
					done: function () {
						_self.$wrap.attr('data-state', 'opened');
						_self.trigger('opened', {
							model: _self.$el
						});
					}
				});
				// this.$wrap.attr('data-state', 'opened');
				this.$el[0].focus();
				if (this.isParentBody) {
					this.pageOffset = {
						x: global.pageXOffset
						,y: global.pageYOffset
					};
					bglib.EventUtil.addHandler(window, 'scroll', this.scrollPreventor);
					jQuery(document.querySelector('body')).addClass('modal-open');
				}
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
					jQuery(document.querySelector('body')).removeClass('modal-open');
				}
				this.$wrap.css('opacity', 0);
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
	jQuery(function() {
		jQuery('button[data-modal-target]').each(function() {
			var $this = jQuery(this);
			$this.on('click', function() {
				var $modal = jQuery($this.attr('data-modal-target'));
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
	var DomEvents = bglib.DomEvents;
	var component = CS.BaseComponent.extend({
		Name: 'Dropdown'
		,$action: undefined
		,$content: undefined
		,init: function() {
			var _self = this;
			this.$el.addClass('dropdown-' + this.instanceId);
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
					var $this = jQuery(e.originalEvent.target);
					var target = e.originalEvent.target;
					var shouldClose = false,
						iclass = 'dropdown-' + _self.instanceId;
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
			console.log(anchor);
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
			this.$el.addClass('priority-plus-' + this.instanceId);
			var $dropdownEl = jQuery('\
				<li class="item overflow-toggle-item dropdown">\
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
				var $this = jQuery($items[i]);
				var currentRect = $this[0].getBoundingClientRect();
				var currentX = (currentRect.x - parentRect.x + currentRect.width);
				if (currentX > availableWidth || hitMaxWidth) {
					_self.dropdown.$el.find('.dropdown-content-wrap').append($this[0]);
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
	var component = CS.BaseComponent.extend({
		Name: 'Pagination'
		,$ellipsis: undefined
		,$gotoTextbox: undefined
		,initEllipsis: function($ellipsis) {
			if (!$ellipsis.hasClass('ellipsis')) {
				$ellipsis.addClass('ellipsis');
			}
			var $ellipsisTextbox = jQuery(
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
			this.$el.addClass('pagination-' + this.instanceId);
			this.$ellipsis = this.$el.find('li.ellipsis:not(.no-popup)');
			this.$ellipsis.each(function() {
				_self.initEllipsis(jQuery(this));
			});
			this.$el.on('click', 'li.ellipsis:not(.no-popup)', function(evt) {
				var $this = jQuery(this);
				var $inputWrap = jQuery(evt.originalEvent.target);
				if (!$inputWrap.hasClass('ellipsis-input')) {
					$inputWrap = $inputWrap.closest('.ellipsis-input');
				}
				if (!$inputWrap.length) {
					_self.toggleEllipsisTextbox($this.find('.ellipsis-input'));
				}
			});
			bglib.DomEvents.window.on('click', function(evt) {
				if (_self.isEllipsisTextboxShowing()) {
					var $inputWrap = jQuery(evt.originalEvent.target);
					if (!$inputWrap.hasClass('ellipsis')) {
						$inputWrap = $inputWrap.closest('.ellipsis');
					}
					_self.$ellipsis.each(function() {
						var $this = jQuery(this);
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
					$this = jQuery(this),
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
			this.$el.find('li:not(.template)').remove();
			for (var i = 0; i < arr.length; i++) {
				var $item = jQuery('<li></li>');
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
				if (jQuery(this).find('.ellipsis-input').attr('data-showing') == 'true') {
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
	var component = CS.BaseComponent.extend({
		Name: 'Tabs'
		,init: function() {
			var _self = this;
			this.defaultOptions = {
			};
			this.$el.addClass('tabs-' + this.instanceId);

			this.selector = '.tabs-' + this.instanceId + ' > ul li a, .tabs-' + this.instanceId + ' > li a';
			jQuery(document.querySelector('body')).on('click', this.selector, function(evt) {
				evt.preventDefault();
				_self.openTab(jQuery(this).closest('li')[0]);
			});

			var $active = this.$el.find('li.active');
			var displayStyle = this.$el.hasClass('vertical-tabs') ? 'inline-block' : 'block';
			if (displayStyle == 'block' && this.$el.hasClass('flex-tabs')) {
				displayStyle = 'flex';
			}
			jQuery(this.selector).each(function(i) {
				var $this = jQuery(this);
				var $li = $this.closest('li');
				var noActiveSet = (!$active.length && i == 0);
				if ($li[0] !== $active[0] && !noActiveSet) {
					jQuery($this.attr('href')).css('display', 'none');
				}
				else {
					jQuery($this.attr('href')).css('display', displayStyle);
					$li.addClass('active');
				}
			});

			return this;
		}
		,openTab: function(tab) {
			var $active = this.$el.find('li.active');
			var displayStyle = this.$el.hasClass('vertical-tabs') ? 'inline-block' : 'block';
			if (displayStyle == 'block' && this.$el.hasClass('flex-tabs')) {
				displayStyle = 'flex';
			}
			jQuery(this.selector).each(function(i) {
				var $this = jQuery(this);
				var $li = $this.closest('li');
				if ($li[0] !== tab) {
					jQuery($this.attr('href')).css('display', 'none');
					$li.removeClass('active');
				}
				else {
					jQuery($this.attr('href')).css('display', displayStyle);
					$li.addClass('active');
				}
			});			
		}
	}, {});
	CS.Tabs = component;
	CS.autoload.Tabs = CS.autoload.factory(component, '[data-tabs]', 'data-tabs');
})(Cornerstone);
(function(CS) {
	var component = CS.BaseComponent.extend({
		Name: 'Table'
		,cachedElms: undefined 
		,init: function() {
			var _self = this;
			this.cachedElms = {};
			this.defaultOptions = {
				breakpoint: 'sm'
			};
			this.$el.addClass('cs-table-' + this.instanceId);
			if (this.$el.hasClass('cs-table-responsive')) {
				this.initResponsive();
			}
			else if (this.$el.hasClass('cs-table-fixed')) {
				this.initFixedHeader();
			}
			return this;
		},
		initResponsive: function() {
			// this.populateResponsiveHeaders();
			CS.BreakPoint.on('change', function(e) {

			});
		},
		populateResponsiveHeaders: function() {
			var _self = this;
			this.$el.find('thead tr th').each(function(index) {
				var $this = jQuery(this);
				_self.$el.find('tbody tr td:nth-child(' + (index + 1) + ')').each(function() {
					var $td = jQuery(this);
					$td.html('<span>' + $this.html() + $td.html() + '</span>');
				});
			});
		},
		updateFixedHeaderWidths: function() {
			var _self = this;
			// var $fixedHeader = _self.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap thead tr th');
			if (typeof _self.cachedElms.header == 'undefined' || _self.cachedElms.header.length) {
				this.cachedElms = {header: [], body: []};
				_self.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap thead tr th').each(function() {
					_self.cachedElms.header.push(jQuery(this));
				});
				this.$el.find('tbody tr:first-child td').each(function() {
					_self.cachedElms.body.push(jQuery(this));
				});
			}

/*

			//--need to fix how the table resize columns/headers, not always working, especially with empty columns

			var total = 0;
			this.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap table')[0].style.removeProperty('width');
			this.$el[0].style.removeProperty('width');
			for (var i = 0; i < _self.cachedElms.body.length; i++) {
				_self.cachedElms.header[i][0].style.removeProperty('width');
				_self.cachedElms.body[i][0].style.removeProperty('width');

				var minWidth = 
					parseInt(_self.cachedElms.header[i].css('padding-left')) +
					parseInt(_self.cachedElms.header[i].css('padding-right')) + 
					parseInt(_self.cachedElms.header[i].find('span').css('width'));
				var minWidth2 = 
					parseInt(_self.cachedElms.body[i].css('padding-left')) +
					parseInt(_self.cachedElms.body[i].css('padding-right')) +
					parseInt(_self.cachedElms.body[i].find('span').css('width'));
				var mw = minWidth > minWidth2 ? minWidth : minWidth2;
				console.log(i + '-min: max=' + mw + ', w1=' + minWidth + ', w2=' + minWidth2);

				// var width = _self.cachedElms.header[i].outerWidth(),
				// 	width2 = _self.cachedElms.body[i].outerWidth();
				// var w = width > width2 ? width : width2;
				// w = w > mw ? w : mw;
				w = mw;

				// console.log(i + ': max=' + w + ', w1=' + width + ', w2=' + width2);

				_self.cachedElms.header[i].css('width', w + 'px');
				_self.cachedElms.body[i].css('width', w + 'px');
				total += w;
			}

			// console.log([
			// 	total,
			// 	this.$el.closest('.table-fixed-wrap').width(),
			// 	this.$el.closest('.table-fixed-wrap').width() - total
			// ]);


			if (total < this.$el.closest('.table-fixed-wrap').width()) {
				var w = this.$el.closest('.table-fixed-wrap').width() - total;
				w = w - _self.cachedElms.body[0].width();
				console.log(w);
				_self.cachedElms.header[0].css('width', w + 'px');
				_self.cachedElms.body[0].css('width', w + 'px');
				total = this.$el.closest('.table-fixed-wrap').width();
			}
			
			this.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap table')[0].style['width'] = total + 'px';
			this.$el[0].style['width'] = total + 'px';

*/

			var total = 0;
			for (var i = 0; i < _self.cachedElms.body.length; i++) {
				var width = _self.cachedElms.body[i].width();
				jQuery(_self.cachedElms.header[i]).width(width + 'px');
				total += width;
			}
			// _self.cachedElms.body.each(function(index) {
			// 	var $td = jQuery(this);
			// 	jQuery(_self.cachedElms.header[index]).width($td.width() + 'px');
			// 	total += $td.width();
			// });
			this.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap table').width(total + 'px');
		},
		initFixedHeader: function() {
			var _self = this;
			var $fixedWrap = jQuery('<div class="cs-table-fixedwrap"></div>');
			var $fixedHeader = jQuery('<table><thead><tr></tr></thead></table>');
			this.$el.find('thead tr th').each(function() {
				var $th = jQuery(this);
				var $copy = jQuery('<th>' + $th.html() + '</th>');
				$fixedHeader.find('tr').append($copy);
			});
			$fixedWrap.append($fixedHeader);
			$fixedWrap.attr('aria-hidden', 'true');

			//--if table is not wrapped, wrap it
			var $tableWrap;
			if (!this.$el.parent().hasClass('table-wrap')) {
				$tableWrap = jQuery('<div class="table-wrap table-fixed-wrap"></div>');
				$tableWrap.insertBefore(this.$el);
				$tableWrap.append(this.$el);
			}
			else {
				$tableWrap = this.$el.parent();
				$tableWrap.addClass('table-fixed-wrap');
			}

			//--add fixed header
			this.$el.find('thead').addClass('sr-only');
			$fixedWrap.insertBefore(this.$el);

			//--wrap table in another wrap, this one is scrolled
			$tableWrap = jQuery('<div class="table-wrap table-scroll-wrap"></div>');
			$tableWrap.insertBefore(this.$el);
			$tableWrap.append(this.$el);

			$tableWrap.on('scroll', function(e) {
				$fixedWrap.scrollLeft($tableWrap.scrollLeft());
			});

			this.updateFixedHeaderWidths();

			// window.addEventListener('resize', bglib.fn.debounce(function() {
			// 	_self.updateFixedHeaderWidths();
			// }, 10));

			window.addEventListener('resize', function() {
				_self.updateFixedHeaderWidths();
			});
		},
		initFixedFooter: function() {
		}
	}, {});
	CS.Table = component;
	CS.autoload.Table = CS.autoload.factory(component, '[data-cs-table]', 'data-cs-table', [
		'breakpoint'
	]);
})(Cornerstone);
(function(CS) {
	/*
		To Do:
			- Add close button functionality
			- Add swipe to close functionality
			- Add different positions
				- left | center
	*/
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
				,closeButton: true
			};
			this.active = false;
			this.$el = jQuery('<div></div>');
			this.$el.addClass('cs-toast');
			this.$el.addClass('cs-toast-' + this.instanceId);
			this.$el.append('<div class="toast-content">' + this.getOption('html') + '</div>');
			if (this.getOption('class')) {
				this.$el.addClass(this.getOption('class'));
			}
			//--check if toast container is present if not add it
			this.$container = jQuery('body').find('.cs-toast-container');
			if (!this.$container.length) {
				this.$container = jQuery('<div class="cs-toast-container"></div>');
				jQuery('body').append(this.$container);
			}
			if (this.getOption('closeButton')) {
				var $close = jQuery('<button class="cs-close cs-button">X</button>');
				this.$el.find('.toast-content').append($close);
				CornerstoneResources.icon('md-close', $close);
			}
			Cornerstone.setInstance(this.$el[0], this.Name, this);
			this.$el.attr('data-cs-instance', this.Name);
			this.$container.append(this.$el);
			this.active = true;
			var _self = this;
			setTimeout(function() {
				if (_self.active) {
					_self.remove();
				}
			}, this.getOption('displayLength'));
			return this;
		},
		remove: function(props) {
			var _self = this;
			props = props || {
				top: -50,
				opacity: 0
			};
			_self.active = false;
			_self.$el.animate(props, {
				queue: false,
				start: function() {
					_self.$el.addClass('removing');
					_self.$el.css('position', 'absolute');
				},
				done: function () {
					_self.$el.remove();
					if (_self.getOption('closeCallback')) {
						(_self.getOption('closeCallback'))();
					}
				}
			});
		},
		handleCloseAction: function() {
			if (this.active) {
				this.remove();
			}
		}
	}, {});
	CS.Toast = component;
})(Cornerstone);
(function(CS) {
	/*
		Few issue needs to be worked out with the left/right positioning but overall it works fairley well.
		 - top position in some instances of the right-pos overlaps the item that gets hovered
	*/
	var DomEvents = bglib.DomEvents;
	var component = CS.BaseComponent.extend({
		Name: 'Tooltip'
		,tooltip: undefined
		,$tooltip: undefined
		,delayTimer: undefined
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				'html': null,
				'position': 'top', //--top|bottom|left|right
				'delay': 100 //--ms
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
					var delay = _self.getOption('delay');
					_self.delayTimer = setTimeout(function() {
						_self.delayTimer = null;
						_self.showTooltip();
					}, delay);
				});
				this.$el.on('mouseleave', function() {
					if (_self.delayTimer) {
						clearTimeout(_self.delayTimer);
					}
					_self.hideTooltip();
				});
			}
			DomEvents.window.on('resize', function() {
				if (_self.$tooltip) {
					var pos = _self.determinePosition();
					_self.$tooltip.css(_self.calculatePosition(pos));
				}
			});
			return this;
		}
		,calculatePosition: function($tooltip, pos) {
			var _self = this;
			var itemOffset = _self.$el[0].getBoundingClientRect();
			itemOffset.top = itemOffset.top - window.scrollY;
			itemOffset.left = itemOffset.top - window.scrollX;
			var tooltipCss = {};
			var calcPositionTop = function() {
				var css = {};
				css.top = (itemOffset.top - _self.$tooltip.outerHeight()) + 'px';
				var left = itemOffset.left;
				if (_self.$el.outerWidth() < _self.$tooltip.outerWidth()) {
					left = left - ((_self.$tooltip.outerWidth() - _self.$el.outerWidth()) / 2);
				}
				else {
					left = left + ((_self.$el.outerWidth() - _self.$tooltip.outerWidth()) / 2);
				}
				if (left < 0 || left + _self.$tooltip.outerWidth() > window.innerWidth) {
					left = 0;
				}
				css.left = left + 'px';
				return css;
			};
			var calcPositionBottom = function() {
				var css = {};
				css.top = (itemOffset.top + _self.$el.outerHeight()) + 'px';
				var left = itemOffset.left;
				if (_self.$el.outerWidth() < _self.$tooltip.outerWidth()) {
					left = left - ((_self.$tooltip.outerWidth() - _self.$el.outerWidth()) / 2);
				}
				else {
					left = left + ((_self.$el.outerWidth() - _self.$tooltip.outerWidth()) / 2);
				}
				if (left < 0 || left + _self.$tooltip.outerWidth() > window.innerWidth) {
					left = 0;
				}
				css.left = left + 'px';
				return css;
			};
			var calcPositionLeft = function() {
				var css = {};
				var maxWidth = itemOffset.left - 8;
				if (maxWidth < 150 && $tooltip.outerWidth() > maxWidth) {
					css = calcPositionTop();
				}
				else {
					$tooltip.css('max-width', maxWidth + 'px');
					var top;
					if (_self.$el.outerHeight() < $tooltip.outerHeight()) {
						top = itemOffset.top - (Math.ceil($tooltip.outerHeight() - _self.$el.outerHeight()) / 2);
					}
					else {
						top = itemOffset.top + (Math.ceil(_self.$el.outerHeight() - $tooltip.outerHeight()) / 2);
					}
					css.top = top + 'px';
					css.left = itemOffset.left - 4 - $tooltip.outerWidth();
					css.left = css.left + 'px';
				}
				return css;
			};
			var calcPositionRight = function() {
				var css = {};
				var maxWidth = window.innerWidth - itemOffset.left - _self.$el.outerWidth() - 8;
				if (maxWidth < 150 && $tooltip.outerWidth() > maxWidth) {
					css = calcPositionTop();
				}
				else {
					$tooltip.css('max-width', maxWidth + 'px');
					var top;
					if (_self.$el.outerHeight() < $tooltip.outerHeight()) {
						top = itemOffset.top - (Math.ceil($tooltip.outerHeight() - _self.$el.outerHeight()) / 2);
					}
					else {
						top = itemOffset.top + (Math.ceil(_self.$el.outerHeight() - $tooltip.outerHeight()) / 2);
					}
					css.top = top + 'px';
					css.left = itemOffset.left + _self.$el.outerWidth() + 4;
					css.left = css.left + 'px';
				}
				if (css.left == '4px') {
					delete css.left;
					css.right = '4px';
				}
				if (css.left == '0px') {
					delete css.left;
					css.right = '0px';
				}
				return css;
			};
			switch (pos) {
				case 'top':
					tooltipCss = calcPositionTop();
				break;
				case 'bottom':
					tooltipCss = calcPositionBottom();
				break;
				case 'left':
					tooltipCss = calcPositionLeft();
				break;
				case 'right':
					tooltipCss = calcPositionRight();
				break;
			}
			return tooltipCss;
		}
		,showTooltip: function() {
			if (!this.$tooltip) {
				this.$tooltip = jQuery('<div class="cs-tooltip"></div>');
				this.$tooltip.addClass('tooltip-' + this.instanceId);
				this.$tooltip.append('<div class="tooltipContent">' + this.tooltip + '</div>');
				var pos = this.determinePosition();
				this.$tooltip.attr('data-position', pos);
				jQuery('body').append(this.$tooltip);
				this.$tooltip.css(this.calculatePosition(this.$tooltip, pos));
			}
		}
		,hideTooltip: function() {
			if (this.$tooltip) {
				this.$tooltip.remove();
				this.$tooltip = null;
			}
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