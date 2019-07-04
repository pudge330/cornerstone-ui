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
				if (evt.originalEvent.keyCode == 13) {
					_self.trigger('jumpTo', {
						target: _this
						,caller: _self
						,page: _this.value || ''
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
			window['getPagination'] = this.getPagination;
		}
		,render: function(current, maxPages) {
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
					_self.trigger('renderItem', {
						caller: _self
						,el: $item[0]
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
					inner = '<a href="?page=previous">Previous</a>';
				}
				else {
					inner = '<span data-page="previous">Previous</span>';
				}
			}
			else if (evt.type == 'next') {
				if (!item.disabled) {
					inner = '<a href="?page=next">Next</a>';
				}
				else {
					inner = '<span data-page="next">Next</span>';
				}
			}
			el.innerHTML = inner;
			if (item.disabled) {
				bglib.El.addClass(el, 'disabled');
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