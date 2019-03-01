"use strict";
var formatting_1 = require("../../utilities/formatting");
/**
The (abstract) FormBinder, derive from this class to create your own custom FormBinder
TComponentProps: The type of the props required on the component being placed inside the form
TDataPropValue: The type of the data property being bound
TComponentPropValue: The type of the target property being bound on the component
*/
var FormBinderBase = (function () {
    function FormBinderBase(
        /** The name of the data property being bound  */
        dataPath, 
        /** The name of the component property being bound  */
        propertySet, 
        /** The converter required to convert 'dataName' to 'propertySet' (TDataPropValue to TComponentPropValue) */
        valueConverter, 
        /** The name of the property being read from the change event currentTarget */
        propertyGet) {
        if (propertyGet === void 0) { propertyGet = propertySet; }
        this.dataPath = dataPath;
        this.propertySet = propertySet;
        this.valueConverter = valueConverter;
        this.propertyGet = propertyGet;
    }
    /** Sets the React elements properties required in binding */
    FormBinderBase.prototype.setElementProperty = function (props, dataBinder) {
        props["name"] = this.dataPath;
        props[this.propertySet] = this.convert(dataBinder.getValue(this.dataPath));
    };
    /** convert the value from element to data, set the dataBinder, and notify if changed */
    FormBinderBase.prototype.onChanged = function (dataBinder, newValue, notifyChanged) {
        var value = this.convertBack(newValue);
        if (formatting_1.Formatting.isNullOrUndefined(value)) {
            return;
        }
        dataBinder.setValue(this.dataPath, value);
        notifyChanged();
    };
    ;
    /** convert from data value to element property value */
    FormBinderBase.prototype.convert = function (data) {
        if (this.valueConverter && this.valueConverter.convert) {
            return this.valueConverter.convert(data);
        }
        return data;
    };
    /** convert from element property value to data value */
    FormBinderBase.prototype.convertBack = function (value) {
        if (this.valueConverter && this.valueConverter.convertBack) {
            return this.valueConverter.convertBack(value);
        }
        return value;
    };
    return FormBinderBase;
}());
exports.FormBinderBase = FormBinderBase;
