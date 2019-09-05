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
			};
			this.$el = jQuery('<div></div>');
			this.$el.addClass('toast');
			this.$el.addClass('toast-' + this.instanceId);
			this.$el.append('<div class="toast-content">' + this.getOption('html') + '</div>');
			if (this.getOption('class')) {
				this.$el.addClass(this.getOption('class'));
			}
			//--check if toast container is present if not add it
			this.$container = jQuery('body').find('.toast-container');
			if (!this.$container.length) {
				this.$container = jQuery('<div class="toast-container"></div>');
				jQuery('body').append(this.$container);
			}
			this.$container.append(this.$el);
			var _self = this;
			setTimeout(function() {
				_self.$el.animate({
					top: -50,
					opacity: 0
				}, {
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
			}, this.getOption('displayLength'));
			return this;
		}
	}, {});
	CS.Toast = component;
})(Cornerstone);