(function (root, factory) {
    var dependencies = Object.assign(
        { amd: {}, common: {} },
        typeof root.Cornerstone_Dependencies !== 'undefined'
            ? root.Cornerstone_Dependencies
            : {}
    );
    dependencies.amd = Object.assign({ bglib: 'bglib', jquery: 'jquery' }, dependencies.amd);
    dependencies.common = Object.assign({ bglib: 'bglib', jquery: 'jquery' }, dependencies.common);
    if (typeof define === 'function' && define.amd) {
        define([dependencies.amd.bglib, dependencies.amd.jquery], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require(dependencies.common.bglib), require(dependencies.common.jquery));
    } else {
        root.Cornerstone = factory(root.bglib, root.jQuery);
        if (!noConflict) {
            root.CS = root.Cornerstone;
        }
    }
}(global = typeof self !== 'undefined' ? self : this, function (_bglib, jQuery) {
var Sortable = global.Sortable !== 'undefined' ? global.Sortable : null;
var jQuery = global.jQuery !== 'undefined' ? global.jQuery : null;