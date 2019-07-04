(function(CS) {
	var jLyte = bglib.jLyte;
	var component = CS.BaseComponent.extend({
		Name: 'COMPONENT_NAME'
		,init: function() {
			var _self = this;
			this.defaultOptions = {
			};
			this.$el.addClass('cs-COMPONENT-' + this.instanceId);
			return this;
		}
	}, {});
	CS.COMPONENT_NAME = component;
	CS.autoload.COMPONENT_NAME = CS.autoload.factory(component, '[data-COMPONENT]', 'data-COMPONENT');
})(Cornerstone);