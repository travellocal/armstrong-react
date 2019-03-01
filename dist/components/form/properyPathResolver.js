"use strict";
var _ = require("underscore");
/**
Get and Set values in JSON data objects
Uses dot notation to access members of the object graph
e.g.
const name = PropertyPathResolver.getValue(person, "name")
const firstAddressTitle = PropertyPathResolver.getValue(person, "addresses.0.title")
*/
var PropertyPathResolver = (function () {
    function PropertyPathResolver() {
    }
    /**
    Get values in JSON data objects using dot notation to access members of the object graph
    e.g.
    const name = PropertyPathResolver.getValue(person, "name")
    const firstAddressTitle = PropertyPathResolver.getValue(person, "addresses.0.title")
    */
    PropertyPathResolver.getValue = function (data, dataName) {
        var parts = dataName.split(".");
        return _.reduce(parts, function (result, p, index) {
            if (!result || !p) {
                throw new Error(dataName + " not found in data - failed on '" + p + "' (part: " + index + ")");
            }
            return result[p];
        }, data);
    };
    /**
    Set values in JSON data objects using dot notation to access members of the object graph
    e.g.
    PropertyPathResolver.setValue(person, "name", "Dave")
    PropertyPathResolver.setValue(person, "addresses.0.title", "home")
    */
    PropertyPathResolver.setValue = function (data, dataName, value) {
        var parts = dataName.split(".");
        var lastIndex = parts.length - 1;
        _.each(parts, function (p, index) {
            if (!data || !p) {
                throw new Error(dataName + " not found in data - failed on '" + p + "' (part: " + index + ")");
            }
            if (index === lastIndex) {
                data[p] = value;
                return;
            }
            data = data[p];
        });
    };
    return PropertyPathResolver;
}());
exports.PropertyPathResolver = PropertyPathResolver;
