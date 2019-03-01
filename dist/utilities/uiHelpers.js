"use strict";
var classNames = require("classnames");
var LayoutHelpers = (function () {
    function LayoutHelpers() {
    }
    LayoutHelpers.GetAlignmentClasses = function (vertical, horizontal) {
        var classes = [];
        if (vertical) {
            classes.push("align-con-v-" + vertical);
        }
        if (horizontal) {
            classes.push("align-con-h-" + horizontal);
        }
        return classNames(classes);
    };
    return LayoutHelpers;
}());
exports.LayoutHelpers = LayoutHelpers;
