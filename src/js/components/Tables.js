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

/*

			//--need to fix how the table resize columns/headers, not always working, especially with empty columns

			var total = 0;
			this.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap table')[0].style.removeProperty('width');
			this.$el[0].style.removeProperty('width');
			for (var i = 0; i < _self.cachedElms.body.length; i++) {
				_self.cachedElms.header[i][0].style.removeProperty('width');
				_self.cachedElms.body[i][0].style.removeProperty('width');

				var minWidth = 
					parseInt(_self.cachedElms.header[i].css('padding-left')) +
					parseInt(_self.cachedElms.header[i].css('padding-right')) + 
					parseInt(_self.cachedElms.header[i].find('span').css('width'));
				var minWidth2 = 
					parseInt(_self.cachedElms.body[i].css('padding-left')) +
					parseInt(_self.cachedElms.body[i].css('padding-right')) +
					parseInt(_self.cachedElms.body[i].find('span').css('width'));
				var mw = minWidth > minWidth2 ? minWidth : minWidth2;
				console.log(i + '-min: max=' + mw + ', w1=' + minWidth + ', w2=' + minWidth2);

				// var width = _self.cachedElms.header[i].outerWidth(),
				// 	width2 = _self.cachedElms.body[i].outerWidth();
				// var w = width > width2 ? width : width2;
				// w = w > mw ? w : mw;
				w = mw;

				// console.log(i + ': max=' + w + ', w1=' + width + ', w2=' + width2);

				_self.cachedElms.header[i].css('width', w + 'px');
				_self.cachedElms.body[i].css('width', w + 'px');
				total += w;
			}

			// console.log([
			// 	total,
			// 	this.$el.closest('.table-fixed-wrap').width(),
			// 	this.$el.closest('.table-fixed-wrap').width() - total
			// ]);


			if (total < this.$el.closest('.table-fixed-wrap').width()) {
				var w = this.$el.closest('.table-fixed-wrap').width() - total;
				w = w - _self.cachedElms.body[0].width();
				console.log(w);
				_self.cachedElms.header[0].css('width', w + 'px');
				_self.cachedElms.body[0].css('width', w + 'px');
				total = this.$el.closest('.table-fixed-wrap').width();
			}
			
			this.$el.closest('.table-fixed-wrap').find('.cs-table-fixedwrap table')[0].style['width'] = total + 'px';
			this.$el[0].style['width'] = total + 'px';

*/

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