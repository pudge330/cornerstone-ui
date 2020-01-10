(function(CS) {
	var component = CS.BaseComponent.extend({
		Name: 'Tabs'
		,init: function() {
			var _self = this;
			this.defaultOptions = {
			};
			this.$el.addClass('tabs-' + this.instanceId);

			this.selector = '.tabs-' + this.instanceId + ' > ul li a, .tabs-' + this.instanceId + ' > li a';
			jQuery(document.querySelector('body')).on('click', this.selector, function(evt) {
				evt.preventDefault();
				_self.openTab(jQuery(this).closest('li')[0]);
			});

			var $active = this.$el.find('li.active');
			var displayStyle = this.$el.hasClass('vertical-tabs') ? 'inline-block' : 'block';
			if (displayStyle == 'block' && this.$el.hasClass('flex-tabs')) {
				displayStyle = 'flex';
			}
			jQuery(this.selector).each(function(i) {
				var $this = jQuery(this);
				var $li = $this.closest('li');
				var noActiveSet = (!$active.length && i == 0);
				if ($li[0] !== $active[0] && !noActiveSet) {
					jQuery($this.attr('href')).css('display', 'none');
				}
				else {
					jQuery($this.attr('href')).css('display', displayStyle);
					$li.addClass('active');
				}
			});

			return this;
		}
		,openTab: function(tab) {
			var $active = this.$el.find('li.active');
			var displayStyle = this.$el.hasClass('vertical-tabs') ? 'inline-block' : 'block';
			if (displayStyle == 'block' && this.$el.hasClass('flex-tabs')) {
				displayStyle = 'flex';
			}
			jQuery(this.selector).each(function(i) {
				var $this = jQuery(this);
				var $li = $this.closest('li');
				if ($li[0] !== tab) {
					jQuery($this.attr('href')).css('display', 'none');
					$li.removeClass('active');
				}
				else {
					jQuery($this.attr('href')).css('display', displayStyle);
					$li.addClass('active');
				}
			});			
		}
	}, {});
	CS.Tabs = component;
	CS.autoload.Tabs = CS.autoload.factory(component, '[data-tabs]', 'data-tabs');
})(Cornerstone);