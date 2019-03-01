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
var RadioInput = (function (_super) {
    __extends(RadioInput, _super);
    function RadioInput() {
        return _super.apply(this, arguments) || this;
    }
    RadioInput.prototype.render = function () {
        var id = "radio_" + Math.random();
        return (React.createElement("div", { className: "radio" },
            React.createElement("input", __assign({ id: id }, _.omit(this.props, "labelContent"), { type: "radio" })),
            React.createElement("label", { htmlFor: id }),
            React.createElement("label", { className: "radio-label", htmlFor: id }, this.props.labelContent)));
    };
    return RadioInput;
}(React.Component));
exports.RadioInput = RadioInput;
