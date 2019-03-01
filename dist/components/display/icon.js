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
var icons_1 = require("./../../utilities/icons");
var Icon = (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        return _super.apply(this, arguments) || this;
    }
    Icon.prototype.render = function () {
        var attrs = _.omit(this.props, "icon", "className");
        return (React.createElement("i", __assign({}, attrs, { className: classNames(this.props.className, "icon", this.props.icon) })));
    };
    return Icon;
}(React.Component));
Icon.Icomoon = icons_1.Icons.Icomoon;
exports.Icon = Icon;
