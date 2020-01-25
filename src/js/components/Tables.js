(function(CS) {
	var component = CS.BaseComponent.extend({
		Name: 'Table'
		,cachedElms: undefined 
		,init: function() {
			var _self = this;
			this.cachedElms = {};
			this.defaultOptions = {
				breakpoint: 'sm'
			};
			this.$el.addClass('cs-table-' + this.instanceId);
			if (this.$el.hasClass('cs-table-responsive')) {
				this.initResponsive();
			}
			else if (this.$el.hasClass('cs-table-fixed')) {
				this.initFixedHeader();
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
				_self.$el.find('tbody tr td:nth-child(' + (index + 1) + ')').each(function() {
					var $td = jQuery(this);
					$td.html('<span>' + $this.html() + $td.html() + '</span>');
				});
			});
		},
		updateFixedHeaderWidths: function() {
			var _self = this;
			// var $fixedHeader = _self.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap thead tr th');
			if (typeof _self.cachedElms.header == 'undefined' || _self.cachedElms.header.length) {
				this.cachedElms = {header: [], body: []};
				_self.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap thead tr th').each(function() {
					_self.cachedElms.header.push(jQuery(this));
				});
				this.$el.find('tbody tr:first-child td').each(function() {
					_self.cachedElms.body.push(jQuery(this));
				});
			}
			var total = 0;
			for (var i = 0; i < _self.cachedElms.body.length; i++) {
				var width = _self.cachedElms.body[i].width();
				jQuery(_self.cachedElms.header[i]).width(width + 'px');
				total += width;
			}
			// _self.cachedElms.body.each(function(index) {
			// 	var $td = jQuery(this);
			// 	jQuery(_self.cachedElms.header[index]).width($td.width() + 'px');
			// 	total += $td.width();
			// });
			this.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap table').width(total + 'px');
		},
		initFixedHeader: function() {
			var _self = this;
			var $fixedWrap = jQuery('<div class="cs-table-fixedwrap"></div>');
			var $fixedHeader = jQuery('<table><thead><tr></tr></thead></table>');
			this.$el.find('thead tr th').each(function() {
				var $th = jQuery(this);
				var $copy = jQuery('<th>' + $th.html() + '</th>');
				$fixedHeader.find('tr').append($copy);
			});
			$fixedWrap.append($fixedHeader);
			$fixedWrap.attr('aria-hidden', 'true');

			//--if table is not wrapped, wrap it
			var $tableWrap;
			if (!this.$el.parent().hasClass('table-wrap')) {
				$tableWrap = jQuery('<div class="table-wrap table-fixed-wrap"></div>');
				$tableWrap.insertBefore(this.$el);
				$tableWrap.append(this.$el);
			}
			else {
				$tableWrap = this.$el.parent();
				$tableWrap.addClass('table-fixed-wrap');
			}

			//--add fixed header
			this.$el.find('thead').addClass('sr-only');
			$fixedWrap.insertBefore(this.$el);

			//--wrap table in another wrap, this one is scrolled
			$tableWrap = jQuery('<div class="table-wrap table-scroll-wrap"></div>');
			$tableWrap.insertBefore(this.$el);
			$tableWrap.append(this.$el);

			$tableWrap.on('scroll', function(e) {
				$fixedWrap.scrollLeft($tableWrap.scrollLeft());
			});

			this.updateFixedHeaderWidths();

			// window.addEventListener('resize', bglib.fn.debounce(function() {
			// 	_self.updateFixedHeaderWidths();
			// }, 10));

			window.addEventListener('resize', function() {
				_self.updateFixedHeaderWidths();
			});
		},
		initFixedFooter: function() {
		}
	}, {});
	CS.Table = component;
	CS.autoload.Table = CS.autoload.factory(component, '[data-cs-table]', 'data-cs-table', [
		'breakpoint'
	]);
})(Cornerstone);