"use strict";
var React = require("react");
function buildOptions(label, items, valueFactory, labelFactory) {
    var options = [React.createElement("option", { key: "blank", value: "", disabled: true }, label)];
    items && items.forEach(function (d, idx) {
        options.push(React.createElement("option", { key: idx, value: valueFactory(d) }, labelFactory(d)));
    });
    return options;
}
exports.buildOptions = buildOptions;
