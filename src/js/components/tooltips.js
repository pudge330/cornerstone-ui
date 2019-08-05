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