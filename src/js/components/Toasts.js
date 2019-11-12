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
				if (this.active) {
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