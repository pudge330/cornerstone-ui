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
				var $wrap = $item.find('.accordion-content-wrap');
				if (!$wrap.length) {
					$wrap = jQuery('<div class="accordion-content-wrap"></div>');
					$wrap.append($item.find('.accordion-content').children());
					$item.find('.accordion-content').append($wrap);
				}
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
			$content.css('height', $content.find('.accordion-content-wrap').css('height'));
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