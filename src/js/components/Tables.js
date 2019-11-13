(function(CS) {
	var component = CS.BaseComponent.extend({
		Name: 'Table'
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				breakpoint: 'sm'
			};
			this.$el.addClass('cs-table-' + this.instanceId);
			if (this.$el.hasClass('cs-table-responsive')) {
				this.initResponsive();
			}
			if (this.$el.hasClass('cs-table-fixed')) {
				this.initFixed();
			}
			return this;
		},
		initResponsive: function() {
			// this.populateResponsiveHeaders();
			CS.BreakPoint.on('change', function(e) {

			});
		},
		populateResponsiveHeaders: function() {
			var _self = this;
			this.$el.find('thead tr th').each(function(index) {
				var $this = jQuery(this);
				console.log('tbody tr td:nth-child(' + (index + 1) + ')');
				_self.$el.find('tbody tr td:nth-child(' + (index + 1) + ')').each(function() {
					var $td = jQuery(this);
					$td.html('<span>' + $this.html() + $td.html() + '</span>');
				});
			});

		},
		initFixedHeader: function() {
		},
		initFixedFooter: function() {
		}
	}, {});
	CS.Table = component;
	CS.autoload.Table = CS.autoload.factory(component, '[data-cs-table]', 'data-cs-table', [
		'breakpoint'
	]);
})(Cornerstone);