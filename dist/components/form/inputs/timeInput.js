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
var _ = require("underscore");
var classNames = require("classnames");
var dateHelpers_1 = require("../../../utilities/dateHelpers");
var form_1 = require("../form");
var grid_1 = require("../../layout/grid");
var options_1 = require("./options");
var formatting_1 = require("../../../utilities/formatting");
var TimeInput = (function (_super) {
    __extends(TimeInput, _super);
    function TimeInput() {
        var _this = _super.call(this) || this;
        _this.handleDataChanged = function (d) {
            _this.setState(d, function () {
                if (!_this.props.onChange || formatting_1.Formatting.isNullOrUndefined(d.hours) || formatting_1.Formatting.isNullOrUndefined(d.minutes)) {
                    return;
                }
                _this.props.onChange(d.hours + ":" + d.minutes);
            });
        };
        _this.state = { hours: null, minutes: null };
        return _this;
    }
    TimeInput.prototype.componentWillMount = function () {
        if (this.props.time) {
            var time = dateHelpers_1.DateHelpers.getTimeParts(this.props.time);
            this.setState({ hours: time.hours, minutes: time.minutes });
        }
    };
    TimeInput.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.time) {
            var newTime = dateHelpers_1.DateHelpers.getTimeParts(newProps.time);
            var hours = this.state.hours;
            var minutes = this.state.minutes;
            var needsUpdate = void 0;
            if (newTime.hours !== hours) {
                hours = newTime.hours;
                needsUpdate = true;
            }
            if (newTime.minutes !== minutes) {
                minutes = newTime.minutes;
                needsUpdate = true;
            }
            if (needsUpdate) {
                this.setState({ hours: hours, minutes: minutes });
            }
        }
        else {
            this.setState({ hours: null, minutes: null });
        }
    };
    TimeInput.prototype.render = function () {
        var minutes = _.range(0, 60, this.props.minuteStep || 1);
        var hourOptions = options_1.buildOptions(this.props.hourLabel, TimeInput.hours, function (v) { return v; }, function (v) { return formatting_1.Formatting.twoDigitNumber(v); });
        var minuteOptions = options_1.buildOptions(this.props.minuteLabel, minutes, function (v) { return v; }, function (v) { return formatting_1.Formatting.twoDigitNumber(v); });
        return (React.createElement(form_1.Form, { className: classNames("time-input", this.props.className, this.props.disabled ? "input-disabled" : null), dataBinder: form_1.Form.jsonDataBinder(this.state), onDataChanged: this.handleDataChanged },
            React.createElement(grid_1.Grid, null,
                React.createElement(grid_1.Row, null,
                    React.createElement(grid_1.Col, null,
                        React.createElement("select", __assign({ tabIndex: this.props.tabIndex }, form_1.Form.Bind.selectNumeric("hours"), { disabled: this.props.disabled }), hourOptions)),
                    React.createElement(grid_1.Col, null,
                        React.createElement("select", __assign({ tabIndex: this.props.tabIndex }, form_1.Form.Bind.selectNumeric("minutes"), { disabled: this.props.disabled }), minuteOptions))))));
    };
    return TimeInput;
}(React.Component));
TimeInput.hours = _.range(0, 24);
TimeInput.defaultProps = {
    time: "",
    hourLabel: "HH",
    minuteLabel: "MM"
};
exports.TimeInput = TimeInput;
