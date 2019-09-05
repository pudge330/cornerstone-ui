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
				this.$tooltip = jQuery('<div class="tooltip"></div>');
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