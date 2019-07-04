(function(CS) {
	var jLyte = bglib.jLyte;
	var component = CS.BaseComponent.extend({
		Name: 'Tabs'
		,init: function() {
			var _self = this;
			this.defaultOptions = {
			};
			this.$el.addClass('cs-tabs-' + this.instanceId);

			this.selector = '.cs-tabs-' + this.instanceId + ' > ul li a, .cs-tabs-' + this.instanceId + ' > li a';
			jLyte(document.querySelector('body')).on('click', this.selector, function(evt) {
				evt.preventDefault();
				// console.log('tab clicked');
				_self.openTab(jLyte(this).closest('li')[0]);
			});

			var $active = this.$el.find('li.active');
			var displayStyle = this.$el.hasClass('vertical-tabs') ? 'inline-block' : 'block';
			jLyte(this.selector).each(function(i) {
				var $this = jLyte(this);
				var $li = $this.closest('li');
				var noActiveSet = (!$active.length && i == 0);
				if ($li[0] !== $active[0] && !noActiveSet) {
					jLyte($this.attr('href')).css('display', 'none');
				}
				else {
					jLyte($this.attr('href')).css('display', displayStyle);
					$li.addClass('active');
				}
			});

			return this;
		}
		,openTab: function(tab) {
			var $active = this.$el.find('li.active');
			var displayStyle = this.$el.hasClass('vertical-tabs') ? 'inline-block' : 'block';
			jLyte(this.selector).each(function(i) {
				var $this = jLyte(this);
				var $li = $this.closest('li');
				if ($li[0] !== tab) {
					jLyte($this.attr('href')).css('display', 'none');
					$li.removeClass('active');
				}
				else {
					jLyte($this.attr('href')).css('display', displayStyle);
					$li.addClass('active');
				}
			});			
		}
	}, {});
	CS.Tabs = component;
	CS.autoload.Tabs = CS.autoload.factory(component, '[data-tabs]', 'data-tabs');
})(Cornerstone);