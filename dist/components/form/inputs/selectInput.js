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
var _ = require("underscore");
var React = require("react");
var options_1 = require("./options");
var SelectInput = (function (_super) {
    __extends(SelectInput, _super);
    function SelectInput() {
        var _this = _super.apply(this, arguments) || this;
        _this.change = function (e) {
            _this.props.change && _this.props.change(_this.props.options[e.target["selectedIndex"]]);
            _this.props.onChange && _this.props.onChange(e);
        };
        return _this;
    }
    SelectInput.prototype.focus = function () {
        if (this.select) {
            this.select.focus();
        }
    };
    SelectInput.prototype.blur = function () {
        if (this.select) {
            this.select.blur();
        }
    };
    SelectInput.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "select-input" },
            React.createElement("select", __assign({ ref: function (r) { return _this.select = r; } }, _.omit(this.props, "options", "change", "onChange", "optionLabel"), { onChange: this.change }), options_1.buildOptions(this.props.optionLabel, this.props.options, function (o) { return o.id; }, function (o) { return o.name; }))));
    };
    return SelectInput;
}(React.Component));
SelectInput.defaultProps = {
    optionLabel: "[Select]"
};
exports.SelectInput = SelectInput;
