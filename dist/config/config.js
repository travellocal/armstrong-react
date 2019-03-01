"use strict";
var moment = require("moment");
var localeSet = false;
exports.setLocale = function (locale) {
    if (localeSet) {
        var previousLocal = moment.locale();
        console.warn("Armstrong locale has already been set to " + previousLocal + ", you probably only want to set it once!");
    }
    moment.locale(locale);
    localeSet = true;
};
exports.isLocaleSet = function () { return localeSet; };
