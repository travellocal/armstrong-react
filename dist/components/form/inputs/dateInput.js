"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var classNames = require("classnames");
var _ = require("underscore");
var form_1 = require("../form");
var grid_1 = require("../../layout/grid");
var dateHelpers_1 = require("../../../utilities/dateHelpers");
var options_1 = require("./options");
var formatting_1 = require("../../../utilities/formatting");
var DateInput = (function (_super) {
    __extends(DateInput, _super);
    function DateInput(props) {
        var _this = _super.call(this, props) || this;
        _this.cId = "di_" + Math.random();
        _this.handleDataChanged = function (d) {
            var date = dateHelpers_1.DateHelpers.toDateFormat(d);
            var day = _this.props.datePartOrder.indexOf("day") === -1 ? { day: 1 } : undefined;
            var year = _this.props.datePartOrder.indexOf("year") === -1 ? { year: 2000 } : undefined;
            _this.setState(_.extend({}, d, { date: date }, day, year), function () {
                if (_this.props.onChange && date) {
                    _this.props.onChange(date);
                }
            });
        };
        _this.validateProps(props);
        _this.state = { day: null, month: null, year: null, date: null };
        return _this;
    }
    DateInput.prototype.getDaysArrayByMonth = function () {
        return dateHelpers_1.DateHelpers.getDaysArrayByMonth(this.state.month, this.state.year);
    };
    DateInput.prototype.componentWillMount = function () {
        if (this.props.date) {
            this.setState(dateHelpers_1.DateHelpers.getDateParts(this.props.date));
        }
    };
    DateInput.prototype.validateProps = function (props) {
        if (props.datePartOrder.indexOf("month") === -1) {
            console.error("A DateInput must include `month` in the datePartOrder");
        }
    };
    DateInput.prototype.componentWillReceiveProps = function (newProps) {
        this.validateProps(newProps);
        if (newProps.date !== this.props.date) {
            if (newProps.date) {
                this.setState(dateHelpers_1.DateHelpers.getDateParts(newProps.date, true));
            }
            else {
                this.setState({ day: null, month: null, year: null, date: null });
            }
        }
    };
    DateInput.prototype.render = function () {
        var _this = this;
        var options = {
            "day": options_1.buildOptions(this.props.dayLabel, this.getDaysArrayByMonth(), function (v) { return v; }, function (v) { return formatting_1.Formatting.twoDigitNumber(parseInt(v)); }),
            "month": options_1.buildOptions(this.props.monthLabel, dateHelpers_1.DateHelpers.getMonthValues(), function (v) { return v.value; }, function (v) { return v.label; }),
            "year": options_1.buildOptions(this.props.yearLabel, dateHelpers_1.DateHelpers.getYearValues(this.props.futureDates, this.props.yearsFromNow), function (v) { return v; }, function (v) { return v.toString(); })
        };
        return (React.createElement(form_1.Form, { className: classNames("date-input", this.props.className, this.props.disabled ? "input-disabled" : null), onDataChanged: this.handleDataChanged, dataBinder: form_1.Form.jsonDataBinder(this.state) },
            React.createElement(grid_1.Grid, null,
                React.createElement(grid_1.Row, null, this.props.datePartOrder.map(function (key, idx) {
                    return (React.createElement(grid_1.Col, { key: idx },
                        React.createElement("select", __assign({ tabIndex: _this.props.tabIndex }, form_1.Form.Bind.selectNumeric(key), { disabled: _this.props.disabled }), options[key])));
                })))));
    };
    return DateInput;
}(React.Component));
DateInput.defaultProps = {
    yearLabel: "Year",
    monthLabel: "Month",
    dayLabel: "Day",
    datePartOrder: ["day", "month", "year"]
};
exports.DateInput = DateInput;
