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