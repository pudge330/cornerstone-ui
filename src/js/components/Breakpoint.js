(function(CS) {
	var DomEvents = bglib.DomEvents;
	var jLyte = bglib.jLyte;
	var module = CS.BaseModule.extend({
		Name: 'Accordion'
		,__breakpoints: undefined
		,init: function() {
			var _self = this;
			this.defaultOptions = {
				breakpoints: {
					sm: '40em'
					,md: '64em'
					,lg: '90em'
					,xlg: '120em'
				}
			};
			this.__breakpoints = this.getOption('breakpoints');
			DomEvents.document.on('ready', function() {
				var $tmp = jLyte('<div class="cornerstone-bp"></div>');
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
					_self.__breakpoints = {
						sm: match[1]
						,md: match[2]
						,lg: match[3]
						,xlg: match[4]
					};
				}
			});
			DomEvents.window.on('resize', function() {

			});
		}
		,handleResize: function(evt) {
			
		}
		,handleBreakpointChange: function(evt) {
			
		}
	}, {});
	CS.Breakpoint = new module();
})(Cornerstone);