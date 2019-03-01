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
var ReactDOM = require("react-dom");
var _ = require("underscore");
var classNames = require("classnames");
var uiHelpers_1 = require("./../../utilities/uiHelpers");
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super.apply(this, arguments) || this;
    }
    Grid.prototype.render = function () {
        var originalClassName = this.props.className;
        var attrs = _.omit(this.props, "className", "debugMode", "disableFlexOverride", "table", "fillContainer");
        var classes = classNames(originalClassName, "grid", {
            "fill-container": this.props.fillContainer,
            "grid-debug": this.props.debugMode,
            "table-grid": this.props.table
        });
        if (this.props.fillContainer && !this.props.disableFlexOverride) {
            return (React.createElement("div", { className: "flex-override" },
                React.createElement("div", __assign({}, attrs, { className: classes }))));
        }
        else {
            return (React.createElement("div", __assign({}, attrs, { className: classes })));
        }
    };
    Grid.prototype.componentDidMount = function () {
        if (this.props.fillContainer && !this.props.disableFlexOverride) {
            ReactDOM.findDOMNode(this).parentElement.style.position = "relative";
        }
    };
    return Grid;
}(React.Component));
exports.Grid = Grid;
var Row = (function (_super) {
    __extends(Row, _super);
    function Row() {
        return _super.apply(this, arguments) || this;
    }
    Row.prototype.needsFixed = function () {
        if (!this.props.height) {
            return false;
        }
        if (typeof this.props.height === "number") {
            return true;
        }
        else {
            if (this.props.height === "auto") {
                return true;
            }
        }
        return false;
    };
    Row.prototype.render = function () {
        var attrs = _.omit(this.props, "className", "height");
        var classes = classNames(this.props.className, "row", this.needsFixed() ? "no-flex" : "");
        var styles = this.props.style;
        var colStyles;
        if (this.props.height) {
            if (typeof this.props.height === "number") {
                styles = _.extend({ height: this.props.height + "px" }, styles);
            }
            else {
                var hString = this.props.height;
                var starIndex = hString.indexOf('*');
                if (this.props.height === "auto") {
                }
                else if (starIndex !== -1 && parseFloat(hString)) {
                    var hString_1 = this.props.height;
                    var spans = hString_1.substr(0, starIndex);
                    styles = _.extend({ flex: "" + spans }, styles);
                }
                else {
                    throw new Error("Unsupported height property '" + this.props.height + "' on Grid Row. If you are using a string, make sure it is either 'auto' or follows the pattern '[number]*'");
                }
            }
        }
        return React.createElement("div", __assign({}, attrs, { className: classes, style: styles }), React.Children.map(this.props.children, function (c) {
            return c ? React.cloneElement(c, { style: colStyles ? _.extend(colStyles, c.props.style) : c.props.style }) : null;
        }));
    };
    return Row;
}(React.Component));
exports.Row = Row;
var Col = (function (_super) {
    __extends(Col, _super);
    function Col() {
        return _super.apply(this, arguments) || this;
    }
    Col.prototype.needsFixed = function () {
        if (!this.props.width) {
            return false;
        }
        if (typeof this.props.width === "number") {
            return true;
        }
        else {
            if (this.props.width === "auto") {
                return true;
            }
        }
        return false;
    };
    Col.prototype.render = function () {
        var alignmentClasses = uiHelpers_1.LayoutHelpers.GetAlignmentClasses(this.props.verticalAlignment, this.props.horizontalAlignment);
        var classes = classNames("col", this.props.className, alignmentClasses, {
            "no-flex": this.needsFixed(),
        });
        var attrs = _.omit(this.props, "className", "width", "horizontalAlignment", "verticalAlignment");
        var styles = this.props.style;
        if (this.props.width) {
            if (typeof this.props.width === "number") {
                styles = _.extend({ maxwidth: this.props.width + "px", width: "100%" }, styles);
            }
            else {
                var wString = this.props.width;
                var starIndex = wString.indexOf('*');
                if (this.props.width === "auto") {
                }
                else if (starIndex !== -1 && parseFloat(wString)) {
                    var spans = wString.substr(0, starIndex);
                    styles = _.extend({ flex: "" + spans }, styles);
                }
                else {
                    throw new Error("Unsupported width property '" + this.props.width + "' on Grid > Row > Col. If you are using a string, make sure it is either 'auto' or follows the pattern '[number]*'");
                }
            }
        }
        if (typeof this.props.width === "number") {
            styles = _.extend({ maxWidth: this.props.width + "px", width: "100%" }, styles);
        }
        return React.createElement("div", __assign({}, attrs, { className: classes, style: styles }));
    };
    return Col;
}(React.Component));
exports.Col = Col;
