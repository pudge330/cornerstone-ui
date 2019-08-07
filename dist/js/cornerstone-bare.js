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
				var $wrap = $item.find('.accordion-content-wrap');
				if (!$wrap.length) {
					$wrap = jLyte('<div class="accordion-content-wrap"></div>');
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
			$content.css('height', $content.find('.accordion-content-wrap').css('height'));
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