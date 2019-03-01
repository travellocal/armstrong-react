"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("underscore");
var moment = require("moment");
var classNames = require("classnames");
var grid_1 = require("../../layout/grid");
var icons_1 = require("../../../utilities/icons");
var icon_1 = require("../../display/icon");
var config_1 = require("../../../config/config");
var isoFormat = "YYYY-MM-DD";
var CalendarInput = (function (_super) {
    __extends(CalendarInput, _super);
    function CalendarInput(props) {
        var _this = _super.call(this, props) || this;
        if (!config_1.isLocaleSet()) {
            console.warn("Using CalendarInput without setting the global Armstrong locale is not recommended. See https://github.com/Rocketmakers/armstrong-react#form---calendar--datepickers");
        }
        _this.format = _this.props.nativeInput ? isoFormat : props.format;
        var initialDate = props.date ? moment(props.date, isoFormat, true) : null;
        var inputValue = "";
        var selectedMonthStart = moment().startOf('month');
        if (initialDate) {
            inputValue = initialDate.format(_this.format);
            selectedMonthStart = initialDate.clone().startOf('month');
        }
        _this.state = { inputValue: inputValue, pickerBodyVisible: false, showOnTop: false, calendarOffset: 0, selectedMonthStart: selectedMonthStart };
        return _this;
    }
    CalendarInput.prototype.onDaySelected = function (date) {
        if (!this.fallsWithinRange(date)) {
            return;
        }
        var newDate = date.clone();
        this.setState({ pickerBodyVisible: false, inputValue: newDate.format(this.format) });
        if (this.props.onDateChanged) {
            this.props.onDateChanged(newDate.format(isoFormat));
        }
    };
    CalendarInput.prototype.isEndOfMonth = function (date) {
        var endOfMonth = date.clone().endOf('month');
        return endOfMonth.isSame(date, 'day');
    };
    CalendarInput.prototype.fallsWithinRange = function (date) {
        if (this.props.min && date.isBefore(moment(this.props.min, isoFormat, true), 'day')) {
            return false;
        }
        if (this.props.max && date.isAfter(moment(this.props.max, isoFormat, true), 'day')) {
            return false;
        }
        return true;
    };
    CalendarInput.prototype.calcTop = function () {
        if (this.inputElement) {
            var bounds = this.inputElement.getBoundingClientRect();
            this.setState({ calendarOffset: bounds.bottom });
        }
    };
    CalendarInput.prototype.getDaysInMonth = function () {
        var days = [];
        var a = this.state.selectedMonthStart.clone().startOf('month').startOf('day');
        var b = a.clone().endOf('month');
        var firstDay = false;
        for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
            if (!firstDay) {
                firstDay = true;
                var firstDayIndex = m.weekday();
                for (var i = firstDayIndex; i > 0; i--) {
                    days.push(this.getDayComponent(true, this.onDaySelected.bind(this), m.clone().subtract(i, 'days')));
                }
            }
            days.push(this.getDayComponent(false, this.onDaySelected.bind(this), m.clone()));
            if (this.isEndOfMonth(m)) {
                var lastDayIndex = m.weekday();
                for (var i = 1; i < 7 - lastDayIndex; i++) {
                    days.push(this.getDayComponent(true, this.onDaySelected.bind(this), m.clone().add(i, 'days')));
                }
            }
        }
        return days;
    };
    CalendarInput.prototype.getDayComponent = function (notInCurrentMonth, dayClicked, date) {
        var d = date.clone();
        var dateWithinRange = this.fallsWithinRange(d);
        var isSelected = d.format(isoFormat) === this.props.date;
        var isToday = d.clone().startOf('day').isSame(moment().startOf('day'));
        return React.createElement(CalendarDay, { key: "Calendar_day_" + date.format('DDMMYYYY'), selected: isSelected, isToday: isToday, withinRange: dateWithinRange, notInCurrentMonth: notInCurrentMonth, dayClicked: dayClicked, date: d });
    };
    CalendarInput.prototype.changeMonth = function (increment) {
        var _this = this;
        this.setState({ selectedMonthStart: this.state.selectedMonthStart.clone().add(increment, 'months') }, function () {
            _this.shouldShowOnTop();
        });
    };
    CalendarInput.prototype.checkDate = function (dateString) {
        if (dateString === this.state.inputValue) {
            return;
        }
        var m = moment(dateString, this.format, false);
        if (m.isValid() && this.fallsWithinRange(m)) {
            var formattedDate = m.format(this.format);
            if (this.props.onDateChanged) {
                this.props.onDateChanged(m.format(isoFormat));
            }
        }
        else {
            this.resetState(this.props);
        }
    };
    CalendarInput.prototype.componentWillUnmount = function () {
        var f;
        if (!this.props.nativeInput) {
            window.removeEventListener('mousedown', this);
        }
    };
    CalendarInput.prototype.componentDidMount = function () {
        if (!this.props.nativeInput) {
            window.addEventListener('mousedown', this);
        }
    };
    CalendarInput.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.props.date !== nextProps.date) {
            this.resetState(nextProps);
        }
    };
    CalendarInput.prototype.handleEvent = function (e) {
        var domNode = ReactDOM.findDOMNode(this);
        if (domNode.contains(e.target) && e.type !== "mousewheel" && e.type !== "keydown") {
            return;
        }
        if (e.type === "keydown" && e["keyCode"] !== 9) {
            return;
        }
        document.removeEventListener("mousewheel", this, false);
        if (!this.state.inputValue) {
            this.resetState(this.props);
        }
        else {
            this.setState({ pickerBodyVisible: false });
        }
    };
    CalendarInput.prototype.resetState = function (props) {
        var selectedDate = props.date ? moment(props.date, isoFormat, true) : null;
        if (selectedDate) {
            this.setState({
                pickerBodyVisible: false,
                inputValue: selectedDate.format(this.format),
                selectedMonthStart: selectedDate.clone().startOf('month')
            });
        }
        else {
            this.setState({
                pickerBodyVisible: false,
                inputValue: "",
                selectedMonthStart: moment().startOf('month')
            });
        }
    };
    CalendarInput.prototype.onInputFocus = function () {
        var _this = this;
        document.addEventListener("mousewheel", this, false);
        this.calcTop();
        this.setState({ pickerBodyVisible: true }, function () {
            _this.shouldShowOnTop();
        });
    };
    CalendarInput.prototype.shouldShowOnTop = function () {
        if (this.props.nativeInput || !this.inputElement) {
            return;
        }
        var height = this.bodyElement.clientHeight + 50;
        var visibleBottom = (window.innerHeight + window.scrollY);
        var inputRect = this.inputElement.getBoundingClientRect();
        var remainingSpace = window.innerHeight - inputRect.bottom;
        if (remainingSpace < height) {
            this.setState({ showOnTop: true });
            return true;
        }
        else {
            this.setState({ showOnTop: false });
            return false;
        }
    };
    CalendarInput.prototype.propsDateAsMoment = function () {
        return moment(this.props.date, isoFormat, true);
    };
    CalendarInput.prototype.render = function () {
        var _this = this;
        var weekdays = _.range(0, 7).map(function (n) { return React.createElement("div", { className: "date-picker-week-day", key: "day_name_" + n }, moment().startOf('week').add(n, 'days').format('dd')); });
        var days = this.getDaysInMonth();
        var currentDisplayDate = this.state.selectedMonthStart.format("MMMM - YYYY");
        var classes = classNames("date-picker-body", {
            "date-picker-body-visible": this.state.pickerBodyVisible && !this.props.alwaysShowCalendar,
            "date-picker-top": this.state.showOnTop,
            "always-show-calendar": this.props.alwaysShowCalendar
        });
        var rootClasses = classNames("date-picker", this.props.className, {
            "has-icon": this.props.icon !== null,
            "disabled": this.props.disabled
        });
        if (this.props.nativeInput) {
            return (React.createElement("div", { className: rootClasses },
                this.props.icon && React.createElement(icon_1.Icon, { icon: this.props.icon }),
                React.createElement("input", { ref: function (i) { return _this.inputElement = i; }, type: "date", min: this.props.min || '', max: this.props.max || '', onChange: function (e) { return _this.checkDate(e.target["value"]); }, value: this.propsDateAsMoment().format(this.format) })));
        }
        return (React.createElement("div", { className: rootClasses },
            React.createElement(icon_1.Icon, { icon: this.props.icon || icons_1.Icons.Icomoon.calendar2 }),
            !this.props.alwaysShowCalendar &&
                React.createElement("input", { className: "cal-input", ref: function (i) { return _this.inputElement = i; }, disabled: this.props.disabled, type: "text", value: this.state.inputValue, onKeyDown: function (e) { return _this.handleEvent(e.nativeEvent); }, onFocus: function (e) { return _this.onInputFocus(); } }),
            !this.props.alwaysShowCalendar && this.props.date && !this.props.disableClear &&
                React.createElement("div", { className: "clear-date-button", onClick: function () { return _this.props.onDateChanged(null); } },
                    React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross })),
            React.createElement("div", { ref: function (b) { return _this.bodyElement = b; }, className: classes, style: { top: this.state.calendarOffset + "px" } },
                React.createElement("div", { className: "date-picker-body-wrapper" },
                    React.createElement(grid_1.Grid, { className: "date-picker-header" },
                        React.createElement(grid_1.Row, null,
                            React.createElement(grid_1.Col, { onClick: function () { return _this.changeMonth(-1); }, width: "auto" }, "<"),
                            React.createElement(grid_1.Col, null, currentDisplayDate),
                            React.createElement(grid_1.Col, { onClick: function () { return _this.changeMonth(1); }, width: "auto" }, ">"))),
                    React.createElement("div", { className: "date-picker-days" },
                        weekdays,
                        days)))));
    };
    return CalendarInput;
}(React.Component));
CalendarInput.Icomoon = icons_1.Icons.Icomoon;
CalendarInput.defaultProps = {
    format: 'L'
};
exports.CalendarInput = CalendarInput;
var CalendarDay = (function (_super) {
    __extends(CalendarDay, _super);
    function CalendarDay() {
        return _super.apply(this, arguments) || this;
    }
    CalendarDay.prototype.render = function () {
        var _this = this;
        var classes = classNames({
            "not-in-month": this.props.notInCurrentMonth,
            "selected-day": this.props.selected,
            "is-today": this.props.isToday,
            "day-disabled": !this.props.withinRange
        });
        return React.createElement("div", { className: classes, onClick: function () { return _this.props.dayClicked(_this.props.date); } }, this.props.date.format('DD'));
    };
    return CalendarDay;
}(React.Component));
