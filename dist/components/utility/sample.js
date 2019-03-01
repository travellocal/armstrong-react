"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var _ = require("underscore");
var JSXToString = require("jsx-to-string");
var ReactServerDOM = require("react-dom/server");
var Sample = (function (_super) {
    __extends(Sample, _super);
    function Sample() {
        return _super.apply(this, arguments) || this;
    }
    Sample.prototype.getProps = function () {
        return this.getPropInfo(this.props.component.props);
    };
    Sample.prototype.getPropInfo = function (props) {
        var ps = [];
        Object.keys(props).forEach(function (k) {
            var p = props[k];
            var t = '(' + typeof (p) + ')';
            if (t === "(object)") {
                t = String(p.$$typeof).replace('Symbol', '');
            }
            if (_.isArray(p)) {
                if (p[0].$$typeof !== undefined) {
                    t = String(p[0].$$typeof).replace('Symbol', '') + '[]';
                }
                else {
                    t = "(object[])";
                }
            }
            ps.push({ name: k, type: t, value: p.toString() });
        });
        return ps;
    };
    Sample.prototype.render = function () {
        return (React.createElement("div", { className: "element-sample" },
            React.createElement("h1", null, this.props.title),
            React.createElement("p", null, this.props.description),
            React.createElement("h2", null, "RESULT"),
            this.props.component,
            React.createElement("h2", null, "PROPS"),
            React.createElement("table", null,
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Name"),
                        React.createElement("th", null, "Type"),
                        React.createElement("th", null, "Value (Example)"))),
                React.createElement("tbody", null, this.getProps().map(function (m, i) {
                    return React.createElement("tr", { key: "p_" + i + "_" + m.name },
                        React.createElement("td", null, m.name),
                        React.createElement("td", null, m.type),
                        React.createElement("td", null, m.value));
                }))),
            React.createElement("h2", null, "JSX"),
            React.createElement("pre", null, JSXToString(this.props.component)),
            this.props.showHtml && React.createElement("h2", null, "HTML"),
            this.props.showHtml && React.createElement("pre", null, ReactServerDOM.renderToStaticMarkup(this.props.component).replace(/</g, '\r\n<').trim())));
    };
    return Sample;
}(React.Component));
exports.Sample = Sample;
