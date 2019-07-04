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