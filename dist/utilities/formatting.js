"use strict";
var _ = require("underscore");
var Formatting = (function () {
    function Formatting() {
    }
    Formatting.twoDigitNumber = function (value) {
        return value > 9 ? value.toString() : "0" + value;
    };
    Formatting.isNullOrUndefined = function (value) {
        return _.isNull(value) || _.isUndefined(value);
    };
    return Formatting;
}());
exports.Formatting = Formatting;
