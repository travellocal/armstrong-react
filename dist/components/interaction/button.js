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
var icon_1 = require("./../display/icon");
var icons_1 = require("./../../utilities/icons");
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super.apply(this, arguments) || this;
    }
    Button.prototype.handleClick = function (e) {
        if (this.props.onClick && !this.props.pending && !this.props.disabled) {
            this.props.onClick(e);
        }
    };
    Button.prototype.render = function () {
        var _this = this;
        var attrs = _.omit(this.props, "onClick", "leftIcon", "rightIcon", "className", "rounded", "context", "pending", "disabled");
        var classes = classNames("btn", this.props.className, {
            "rounded": this.props.rounded,
            "icon-button-left": this.props.leftIcon !== undefined,
            "icon-button-right": this.props.rightIcon !== undefined,
            "pending": this.props.pending
        });
        return (React.createElement("button", __assign({ disabled: this.props.pending || this.props.disabled, type: this.props.type || 'button', onClick: function (e) { return _this.handleClick(e); } }, attrs, { className: classes }),
            this.props.leftIcon && React.createElement(icon_1.Icon, { className: "left-icon", icon: this.props.leftIcon }),
            this.props.children,
            this.props.rightIcon && React.createElement(icon_1.Icon, { className: "right-icon", icon: this.props.rightIcon })));
    };
    return Button;
}(React.Component));
Button.Icomoon = icons_1.Icons.Icomoon;
exports.Button = Button;
