"use strict";
var formatting_1 = require("../../utilities/formatting");
/** The core 'checkbox' input value converter (always requires a boolean) */
var CheckboxValueConverter = (function () {
    function CheckboxValueConverter(trueValue, falseValue) {
        this.trueValue = trueValue;
        this.falseValue = falseValue;
    }
    CheckboxValueConverter.prototype.convert = function (data) {
        return data === this.trueValue;
    };
    CheckboxValueConverter.prototype.convertBack = function (value) {
        if (value) {
            return this.trueValue;
        }
        return this.falseValue;
    };
    return CheckboxValueConverter;
}());
exports.CheckboxValueConverter = CheckboxValueConverter;
/** The Default pass-through Value converter */
var DefaultValueConverter = (function () {
    function DefaultValueConverter() {
    }
    DefaultValueConverter.prototype.convert = function (data) {
        return data;
    };
    DefaultValueConverter.prototype.convertBack = function (value) {
        return value;
    };
    return DefaultValueConverter;
}());
DefaultValueConverter.instance = new DefaultValueConverter();
exports.DefaultValueConverter = DefaultValueConverter;
/** A Numeric Value converter to handle converting typed text to a number */
var NumericValueConverter = (function () {
    function NumericValueConverter(options) {
        this.options = options;
    }
    NumericValueConverter.prototype.convert = function (data) {
        return formatting_1.Formatting.isNullOrUndefined(data) || data === "" ? null : data.toFixed(this.options && this.options.decimals);
    };
    NumericValueConverter.prototype.convertBack = function (value) {
        try {
            if (!value.length) {
                return null;
            }
            if (value.length === 1 && value === "-") {
                return 0;
            }
            if (value.length === 2 && value === "-.") {
                return 0;
            }
            var decimals = this.options && this.options.decimals;
            var v = decimals ? parseFloat(value) : parseInt(value);
            if (isNaN(v)) {
                return;
            }
            if (this.options) {
                if (!formatting_1.Formatting.isNullOrUndefined(this.options.max)) {
                    v = Math.min(v, this.options.max);
                }
                if (!formatting_1.Formatting.isNullOrUndefined(this.options.min)) {
                    v = Math.max(v, this.options.min);
                }
            }
            if (decimals) {
                return parseFloat(v.toFixed(decimals));
            }
            return v;
        }
        catch (e) {
        }
    };
    return NumericValueConverter;
}());
NumericValueConverter.instance = new NumericValueConverter();
exports.NumericValueConverter = NumericValueConverter;
var MultipleNumericValueConverter = (function () {
    function MultipleNumericValueConverter() {
    }
    MultipleNumericValueConverter.prototype.convert = function (data) {
        return data.map(function (d) { return MultipleNumericValueConverter.converter.convert(d); });
    };
    MultipleNumericValueConverter.prototype.convertBack = function (value) {
        return value.map(function (d) { return MultipleNumericValueConverter.converter.convertBack(d); });
    };
    return MultipleNumericValueConverter;
}());
MultipleNumericValueConverter.converter = NumericValueConverter.instance;
MultipleNumericValueConverter.instance = new MultipleNumericValueConverter();
exports.MultipleNumericValueConverter = MultipleNumericValueConverter;
