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
var icon_1 = require("./../display/icon");
var TabControl = (function (_super) {
    __extends(TabControl, _super);
    function TabControl() {
        var _this = _super.call(this) || this;
        _this.state = { selectedTabIndex: 0 };
        return _this;
    }
    TabControl.prototype.changeTab = function (newIndex) {
        var _this = this;
        this.setState({ selectedTabIndex: newIndex }, function () {
            if (_this.props.onTabChanged) {
                _this.props.onTabChanged(newIndex);
            }
        });
    };
    TabControl.prototype.componentWillMount = function () {
        if (this.props.defaultSelectedIndex !== undefined) {
            this.setState({ selectedTabIndex: this.props.defaultSelectedIndex });
        }
    };
    TabControl.prototype.render = function () {
        var _this = this;
        var attrs = _.omit(this.props, "className");
        var tabAlignment = this.props.tabAlignment;
        if (!tabAlignment) {
            tabAlignment = "left";
        }
        var classes = classNames(this.props.className, "tab-control", {
            "tabs-right": tabAlignment == "right",
            "tabs-left": tabAlignment == "left"
        });
        return (React.createElement("div", __assign({}, attrs, { className: classes }),
            React.createElement("div", { className: "tab-control-header" }, React.Children.map(this.props.children, function (c, i) {
                return React.createElement("div", { className: "tab-item-header" + (_this.state.selectedTabIndex === i ? ' selected' : ''), onClick: function () { return _this.changeTab(i); } },
                    c.props.icon ? React.createElement(icon_1.Icon, { className: "m-right-xsmall", icon: c.props.icon }) : null,
                    c.props.title);
            })),
            this.props.children[this.state.selectedTabIndex]));
    };
    return TabControl;
}(React.Component));
exports.TabControl = TabControl;
var TabItem = (function (_super) {
    __extends(TabItem, _super);
    function TabItem() {
        return _super.apply(this, arguments) || this;
    }
    TabItem.prototype.render = function () {
        var attrs = _.omit(this.props, "className", "title");
        return React.createElement("div", __assign({}, attrs, { className: "tab-content" + (this.props.className ? " " + this.props.className : '') }), this.props.children);
    };
    return TabItem;
}(React.Component));
TabItem.Icomoon = icons_1.Icons.Icomoon;
exports.TabItem = TabItem;
