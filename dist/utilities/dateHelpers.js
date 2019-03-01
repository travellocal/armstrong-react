"use strict";
var moment = require("moment");
var _ = require("underscore");
var formatting_1 = require("./formatting");
function range1to(to) {
    return _.range(1, to + 1).map(function (d) { return d.toString(); });
}
var DateHelpers = (function () {
    function DateHelpers() {
    }
    // Date helpers
    DateHelpers.getDaysArrayByMonth = function (month, year) {
        if (formatting_1.Formatting.isNullOrUndefined(month)) {
            return range1to(31);
        }
        if (formatting_1.Formatting.isNullOrUndefined(year)) {
            year = 2000;
        }
        var activeMoment = moment([year, month - 1, 1]);
        if (!activeMoment.isValid()) {
            return range1to(31);
        }
        return range1to(activeMoment.daysInMonth());
    };
    DateHelpers.getDateParts = function (date, includeDate) {
        if (includeDate === void 0) { includeDate = false; }
        var d = moment(date, "YYYY-MM-DD", true);
        var parts = { day: d.date(), month: d.month() + 1, year: d.year() };
        if (includeDate) {
            parts["date"] = date;
        }
        return parts;
    };
    DateHelpers.areSame = function (d1, d2) {
        return moment(d1).isSame(moment(d2));
    };
    DateHelpers.getMonthValues = function () {
        return _.range(0, 12).map(function (i) {
            var month = moment().month(i);
            return { value: month.format("M"), label: month.format("MMMM") };
        });
    };
    DateHelpers.isBefore = function (date1, date2, granularity) {
        var d1 = moment(date1, "YYYY-MM-DD", true);
        var d2 = moment(date2, "YYYY-MM-DD", true);
        return d1.isBefore(d2);
    };
    DateHelpers.isAfter = function (date1, date2, granularity) {
        var d1 = moment(date1, "YYYY-MM-DD", true);
        var d2 = moment(date2, "YYYY-MM-DD", true);
        return d1.isBefore(d2);
    };
    DateHelpers.isEndOfMonth = function (date) {
        var endOfMonth = moment(date).endOf('month');
        return endOfMonth.isSame(date, 'day');
    };
    DateHelpers.getYearValues = function (futureDates, yearsFromNow) {
        if (yearsFromNow === void 0) { yearsFromNow = 110; }
        return _.range(0, yearsFromNow).map(function (i) { return futureDates ? moment().add(i, 'years').year() : moment().subtract(i, 'years').year(); });
    };
    DateHelpers.toDateFormat = function (s) {
        if (s.day && s.month && s.year) {
            var mom = moment([s.year, s.month - 1, s.day]);
            if (mom.isValid()) {
                return mom.format("YYYY-MM-DD");
            }
        }
    };
    // Time helpers
    DateHelpers.getTimeParts = function (time) {
        var d = moment(time, "HH:mm", false);
        return { hours: d.hour(), minutes: d.minute() };
    };
    return DateHelpers;
}());
exports.DateHelpers = DateHelpers;
