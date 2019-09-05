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