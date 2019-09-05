(function (root, factory) {
	var noConflict = root.Cornerstone_NoConflict !== 'undefined' && root.Cornerstone_NoConflict;
    if (typeof define === 'function' && define.amd) {
        define(['bglib', 'jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('bglib'), require('jquery'));
    } else {
        root.Cornerstone = factory(root.bglib);
        if (!noConflict) {
            root.CS = root.Cornerstone;
        }
    }
}(global = typeof self !== 'undefined' ? self : this, function (_bglib) {
var Sortable = global.Sortable !== 'undefined' ? global.Sortable : null;
var jQuery = global.jQuery !== 'undefined' ? global.jQuery : null;