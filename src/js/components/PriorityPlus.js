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