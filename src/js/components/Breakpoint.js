(function(CS) {
	var DomEvents = bglib.DomEvents;
	var module = CS.BaseModule.extend({
		Name: 'Breakpoint'
		,breakpoints: undefined
		,breakpointsPx: undefined
		,current: undefined
		,$html: undefined
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				breakpoints: [
					['sm', '40em']
					,['md', '64em']
					,['lg', '90em']
					,['xlg', '105em']
					// ,['xlg', '120em']
				]
			};
			this.breakpoints = this.getOption('breakpoints');
			this.breakpointsPx = [];
			DomEvents.document.on('ready', function() {
				_self.$html = jQuery('html');
				var $tmp = jQuery('<div class="cornerstone-breakpoints"></div>');
				$tmp.css({
					position: 'fixed'
					,top: '-999px'
					,left: '-999px'
					,width: '0'
					,height: '0'
				});
				$tmp.appendTo('body');
				var bps = $tmp.css('content');
				var match = bps ? bps.match(/sm:(\w+);md:(\w+);lg:(\w+);xlg:(\w+)/) : null;
				$tmp.remove();
				if (match) {
					_self.breakpoints = [
						['sm', match[1]]
						,['md', match[2]]
						,['lg', match[3]]
						,['xlg', match[4]]
					];
				}
				for (var i = 0; i < _self.breakpoints.length; i++) {
					var point = _self.breakpoints[i][0], pointValue = _self.breakpoints[i][1];
					if (!pointValue.match(/\d+px/)) {
						_self.breakpointsPx.push([point, parseInt(bglib.fn.toPx(pointValue), 10)]);
					}
					else {
						_self.breakpointsPx.push([point, parseInt(pointValue, 10)]);
					}
				}
				_self.current = _self.determineBreakPoint();
				_self.$html.addClass('cs-bp-' + _self.current);
				_self.trigger('load', {
					caller: _self
					,current: _self.current
				});
			});
			bglib.EventUtil.addHandler(window, 'resize', function(e) {
				var bp = _self.determineBreakPoint();
				if (bp != _self.current) {
					if (typeof _self.current === 'undefined') {
						_self.current = bp;
					}
					_self.handleBreakpointChange(bp);
					_self.current = bp;
				}
			});
			this.on('change', function(e) {
				if (e.old) {
					_self.$html.removeClass('cs-bp-' + e.old);
					_self.$html.addClass('cs-bp-' + e.current);
				}
			});
		}
		,handleBreakpointChange: function(bp) {
			this.trigger('change', {
				caller: this
				,old: this.current
				,current: bp
			});
		}
		,getBreakPoint: function(refresh) {
			var breakpoint;
			if(refresh || !this.current){
				breakpoint = this.determineBreakPoint();
				if(this.current !== breakpoint) {
					if (typeof _self.current === 'undefined') {
						this.current = bp;
					}
					this.handleBreakpointChange(breakpoint);
					this.current = breakpoint;
				}
			}
			return this.current;
		}
		,determineBreakPoint: function() {
			var windowWidth = window.innerWidth, maxPoint = null;
			for (var i = 0; i < this.breakpointsPx.length; i++) {
				var point = this.breakpointsPx[i][0], pointValue = this.breakpointsPx[i][1];
				if (windowWidth >= pointValue) {
					maxPoint = point;
				}
			}
			if (!maxPoint) {
				maxPoint = 'tn';
			}
			return maxPoint;
		}
	}, {});
	CS.BreakPoint = new module();
})(Cornerstone);