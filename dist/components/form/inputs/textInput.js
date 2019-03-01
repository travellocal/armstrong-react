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
var classNames = require("classnames");
var icon_1 = require("./../../display/icon");
var icons_1 = require("./../../../utilities/icons");
var TextInput = (function (_super) {
    __extends(TextInput, _super);
    function TextInput() {
        return _super.apply(this, arguments) || this;
    }
    TextInput.prototype.focus = function () {
        if (this.input) {
            this.input.focus();
        }
    };
    TextInput.prototype.blur = function () {
        if (this.input) {
            this.input.blur();
        }
    };
    TextInput.prototype.render = function () {
        var _this = this;
        var classes = classNames("text-input", this.props.className, {
            "text-input-disabled": this.props.disabled,
            "has-text-overlay-right": this.props.rightOverlayText !== undefined,
            "has-text-overlay-left": this.props.leftOverlayText !== undefined,
            "text-input-icon-left": this.props.leftIcon !== undefined,
            "text-input-icon-right": this.props.rightIcon !== undefined
        });
        var ps = _.omit(this.props, "className", "readonly", "rightOverlayText", "leftOverlayText", "type", "leftIcon", "rightIcon", "multiLine");
        return (React.createElement("div", { className: classes },
            this.props.leftIcon && React.createElement(icon_1.Icon, { className: "left-icon", icon: this.props.leftIcon }),
            this.props.leftOverlayText && React.createElement("div", { className: "input-overlay-text-left" }, this.props.leftOverlayText),
            !this.props.multiLine && React.createElement("input", __assign({ ref: function (r) { return _this.input = r; }, type: this.props.type || "text", readOnly: this.props.readonly }, ps, { placeholder: this.props.placeholder, required: this.props.required })),
            this.props.multiLine && React.createElement("textarea", __assign({ ref: function (r) { return _this.input = r; }, readOnly: this.props.readonly }, ps, { placeholder: this.props.placeholder })),
            this.props.rightOverlayText && React.createElement("div", { className: "input-overlay-text-right" }, this.props.rightOverlayText),
            this.props.rightIcon && React.createElement(icon_1.Icon, { className: "right-icon", icon: this.props.rightIcon })));
    };
    return TextInput;
}(React.Component));
TextInput.Icomoon = icons_1.Icons.Icomoon;
exports.TextInput = TextInput;
