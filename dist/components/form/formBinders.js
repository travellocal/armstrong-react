"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _ = require("underscore");
var formCore_1 = require("./formCore");
var formValueConverters_1 = require("./formValueConverters");
var formBinderBase_1 = require("./formBinderBase");
var formatting_1 = require("../../utilities/formatting");
/** An input FormBinder that sets native 'value' and 'onChange: (e) => void' properties */
var InputFormBinder = (function (_super) {
    __extends(InputFormBinder, _super);
    function InputFormBinder() {
        return _super.apply(this, arguments) || this;
    }
    InputFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        _super.prototype.setElementProperty.call(this, props, dataBinder);
        var v = props[this.propertySet];
        if (formatting_1.Formatting.isNullOrUndefined(v)) {
            props[this.propertySet] = this.getDefaultInputValue();
        }
    };
    InputFormBinder.prototype.getDefaultInputValue = function () {
        return "";
    };
    InputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onChange = function (e) {
            _this.onChanged(dataBinder, e.currentTarget[_this.propertyGet], notifyChanged);
        };
    };
    return InputFormBinder;
}(formBinderBase_1.FormBinderBase));
exports.InputFormBinder = InputFormBinder;
var SelectMultipleFormBinder = (function (_super) {
    __extends(SelectMultipleFormBinder, _super);
    function SelectMultipleFormBinder(dataPath, valueConverter) {
        return _super.call(this, dataPath, "value", valueConverter) || this;
    }
    SelectMultipleFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        _super.prototype.setElementProperty.call(this, props, dataBinder);
        props["multiple"] = true;
    };
    SelectMultipleFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onChange = function (e) {
            _this.onChanged(dataBinder, _this.getSelectValues(e.currentTarget), notifyChanged);
        };
    };
    SelectMultipleFormBinder.prototype.getSelectValues = function (select) {
        var result = [];
        var options = select && select.options;
        if (!options) {
            return result;
        }
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            if (opt.selected) {
                result.push(opt.value);
            }
        }
        return result;
    };
    return SelectMultipleFormBinder;
}(InputFormBinder));
exports.SelectMultipleFormBinder = SelectMultipleFormBinder;
var CheckboxFormBinder = (function (_super) {
    __extends(CheckboxFormBinder, _super);
    function CheckboxFormBinder(dataPath, valueConverter) {
        return _super.call(this, dataPath, "checked", valueConverter) || this;
    }
    CheckboxFormBinder.prototype.getDefaultInputValue = function () {
        return false;
    };
    return CheckboxFormBinder;
}(InputFormBinder));
exports.CheckboxFormBinder = CheckboxFormBinder;
/** A radio input FormBinder */
var RadioFormBinder = (function (_super) {
    __extends(RadioFormBinder, _super);
    function RadioFormBinder() {
        return _super.apply(this, arguments) || this;
    }
    RadioFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        props["name"] = this.dataPath;
        props[this.propertySet] = this.convert(dataBinder.getValue(this.dataPath)) === props[this.propertyGet];
    };
    return RadioFormBinder;
}(InputFormBinder));
exports.RadioFormBinder = RadioFormBinder;
var DateInputFormBinder = (function (_super) {
    __extends(DateInputFormBinder, _super);
    function DateInputFormBinder(dataPath) {
        return _super.call(this, dataPath, "date") || this;
    }
    DateInputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onChange = function (e) {
            _this.onChanged(dataBinder, e, notifyChanged);
        };
    };
    return DateInputFormBinder;
}(formBinderBase_1.FormBinderBase));
exports.DateInputFormBinder = DateInputFormBinder;
var TimeInputFormBinder = (function (_super) {
    __extends(TimeInputFormBinder, _super);
    function TimeInputFormBinder(dataPath) {
        return _super.call(this, dataPath, "time") || this;
    }
    TimeInputFormBinder.customValue = function (dataName) {
        return new TimeInputFormBinder(dataName);
    };
    TimeInputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onChange = function (e) {
            _this.onChanged(dataBinder, e, notifyChanged);
        };
    };
    return TimeInputFormBinder;
}(formBinderBase_1.FormBinderBase));
exports.TimeInputFormBinder = TimeInputFormBinder;
var CalendarInputFormBinder = (function (_super) {
    __extends(CalendarInputFormBinder, _super);
    function CalendarInputFormBinder(dataPath) {
        return _super.call(this, dataPath, "date") || this;
    }
    CalendarInputFormBinder.customValue = function (dataName) {
        return new CalendarInputFormBinder(dataName);
    };
    CalendarInputFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onDateChanged = function (e) { return _this.onChanged(dataBinder, e, notifyChanged); };
    };
    return CalendarInputFormBinder;
}(formBinderBase_1.FormBinderBase));
exports.CalendarInputFormBinder = CalendarInputFormBinder;
var AutoCompleteFormBinder = (function () {
    function AutoCompleteFormBinder(dataPath) {
        this.dataPath = dataPath;
    }
    AutoCompleteFormBinder.prototype.setElementProperty = function (props, dataBinder) {
        var value = dataBinder.getValue(this.dataPath);
        if (_.isArray(value)) {
            props.value = props.options ? props.options.filter(function (o) { return value.indexOf(o.id) > -1; }) : [];
            return;
        }
        props.value = props.options && props.options.filter(function (o) { return value === o.id; })[0];
    };
    AutoCompleteFormBinder.prototype.handleValueChanged = function (props, dataBinder, notifyChanged) {
        var _this = this;
        props.onSelected = function (c) {
            if (_.isArray(c)) {
                dataBinder.setValue(_this.dataPath, c.map(function (cc) { return cc.id; }));
            }
            else {
                dataBinder.setValue(_this.dataPath, c.id);
            }
            notifyChanged();
        };
    };
    return AutoCompleteFormBinder;
}());
exports.AutoCompleteFormBinder = AutoCompleteFormBinder;
/** Form Binder helpers */
var FormBinder = (function () {
    function FormBinder() {
    }
    /** bind a custom form binder */
    FormBinder.custom = function (formBinder) {
        return formCore_1.updateFormBinderInjector({}, formBinder);
    };
    /** bind to a 'hidden' input */
    FormBinder.hidden = function (dataName, valueConverter) {
        return this.defaultInputFormBinder(dataName, "hidden", valueConverter);
    };
    /** bind a string property to a 'password' input */
    FormBinder.password = function (dataName, valueConverter) {
        return this.defaultInputFormBinder(dataName, "password", valueConverter);
    };
    /** bind a string property to a 'text' input */
    FormBinder.text = function (dataName, valueConverter) {
        return this.defaultInputFormBinder(dataName, "text", valueConverter);
    };
    /** bind a string property to a 'email' input */
    FormBinder.textEmail = function (dataName, valueConverter) {
        return this.defaultInputFormBinder(dataName, "email", valueConverter);
    };
    FormBinder.autoCompleteInput = function (dataName) {
        return FormBinder.custom(new AutoCompleteFormBinder(dataName));
    };
    /** bind a 'date' string property to a CalendarInput (e.g. YYYY-MM-DD) */
    FormBinder.calendarInput = function (dataName) {
        return FormBinder.custom(new CalendarInputFormBinder(dataName));
    };
    /** bind a 'date' string property to a DateInput (e.g. YYYY-MM-DD) */
    FormBinder.dateInput = function (dataName) {
        return FormBinder.custom(new DateInputFormBinder(dataName));
    };
    /** bind a 'time' string property to a TimeInput (e.g. HH:MM) */
    FormBinder.timeInput = function (dataName) {
        return FormBinder.custom(new TimeInputFormBinder(dataName));
    };
    FormBinder.defaultInputFormBinder = function (dataName, type, valueConverter, propertySet) {
        if (propertySet === void 0) { propertySet = "value"; }
        var adaptorInjector = FormBinder.custom(new InputFormBinder(dataName, propertySet, valueConverter));
        adaptorInjector["type"] = type;
        return adaptorInjector;
    };
    /** bind a number property to a range */
    FormBinder.range = function (dataName, options) {
        var adaptorInjector = FormBinder.custom(new InputFormBinder(dataName, "value"));
        if (options) {
            adaptorInjector["min"] = options.min;
            adaptorInjector["max"] = options.max;
            adaptorInjector["step"] = options.step || 1;
        }
        return adaptorInjector;
    };
    /** uncontroller text input */
    FormBinder.defaultText = function (dataName, valueConverter) {
        return FormBinder.custom(new InputFormBinder(dataName, "defaultValue", valueConverter, "value"));
    };
    /** bind a number property to a 'text' input */
    FormBinder.textNumeric = function (dataName, options) {
        var converter = options ? new formValueConverters_1.NumericValueConverter(options) : formValueConverters_1.NumericValueConverter.instance;
        var adaptorInjector = this.defaultInputFormBinder(dataName, "text", converter);
        if (options) {
            adaptorInjector["min"] = options.min;
            adaptorInjector["max"] = options.max;
        }
        formCore_1.getFormBinderFromInjector(adaptorInjector).extender = function (props, ea, nc) {
            props.onKeyPress = function (e) { return KeyboardHelper.numericKeyPress(e, options); };
            props.onBlur = function (e) {
                e.currentTarget["value"] = converter.convert(ea.getValue(dataName));
            };
        };
        return adaptorInjector;
    };
    /** bind a TDataPropValue property to a select */
    FormBinder.selectCustom = function (dataName, valueConverter) {
        return FormBinder.custom(new InputFormBinder(dataName, "value", valueConverter));
    };
    /** bind a string property to a select */
    FormBinder.select = function (dataName) {
        return FormBinder.selectCustom(dataName, formValueConverters_1.DefaultValueConverter.instance);
    };
    /** bind a number property to a select */
    FormBinder.selectNumeric = function (dataName) {
        return FormBinder.selectCustom(dataName, formValueConverters_1.NumericValueConverter.instance);
    };
    /** bind a TDataPropValue[] property to a multi select */
    FormBinder.selectMultipleCustom = function (dataName, valueConverter) {
        return FormBinder.custom(new SelectMultipleFormBinder(dataName, valueConverter));
    };
    /** bind a string[] property to a multi select */
    FormBinder.selectMultiple = function (dataName) {
        return FormBinder.selectMultipleCustom(dataName);
    };
    /** bind a number[] property to a multi select */
    FormBinder.selectMultipleNumeric = function (dataName) {
        return FormBinder.selectMultipleCustom(dataName, formValueConverters_1.MultipleNumericValueConverter.instance);
    };
    /** bind a TDataPropValue property to a 'checkbox' input */
    FormBinder.checkboxCustom = function (/** helooo */ dataName, valueConverter) {
        var adaptorInjector = FormBinder.custom(new CheckboxFormBinder(dataName, valueConverter));
        adaptorInjector["type"] = "checkbox";
        return adaptorInjector;
        //return this.defaultInputFormBinder(dataName, "checkbox", valueConverter, "checked")
    };
    /** bind a boolean property to a 'checkbox' input */
    FormBinder.checkbox = function (dataName) {
        return FormBinder.checkboxCustom(dataName);
    };
    /** bind a TDataPropValue property to a 'radio' input, using trueValue and falseValue equality testing */
    FormBinder.checkboxConvert = function (dataName, trueValue, falseValue) {
        return FormBinder.checkboxCustom(dataName, new formValueConverters_1.CheckboxValueConverter(trueValue, falseValue));
    };
    /** bind a TDataPropValue property to a 'radio' input */
    FormBinder.radioCustom = function (dataName, value, valueConverter) {
        var adaptorInjector = FormBinder.custom(new RadioFormBinder(dataName, "checked", valueConverter, "value"));
        adaptorInjector["type"] = "radio";
        adaptorInjector["value"] = value;
        return adaptorInjector;
    };
    /** bind a string property to a 'radio' input */
    FormBinder.radio = function (dataName, value) {
        return FormBinder.radioCustom(dataName, value, formValueConverters_1.DefaultValueConverter.instance);
    };
    /** bind a number property to a 'radio' input */
    FormBinder.radioNumeric = function (dataName, value) {
        return FormBinder.radioCustom(dataName, value.toString(), formValueConverters_1.NumericValueConverter.instance);
    };
    return FormBinder;
}());
exports.FormBinder = FormBinder;
var KeyboardHelper = (function () {
    function KeyboardHelper() {
    }
    KeyboardHelper.getNumericRegEx = function (options) {
        if (options) {
            if (options.allowNegative) {
                if (options.decimals) {
                    return /[\d\.\-]/;
                }
                return /[\d\-]/;
            }
            if (options.decimals) {
                return /[\d\.]/;
            }
        }
        return /\d/;
    };
    KeyboardHelper.numericKeyPress = function (e, options) {
        var regEx = KeyboardHelper.getNumericRegEx(options);
        var m = e.key.match(regEx);
        if (!m) {
            e.preventDefault();
            return;
        }
        if (options) {
            var element = e.currentTarget;
            var selectionStart = element.selectionStart;
            var selectionEnd = element.selectionEnd;
            if (options.allowNegative) {
                var indexOfNegative = element.value.indexOf("-");
                var negativeWillRemove = indexOfNegative >= selectionStart && indexOfNegative < selectionEnd;
                if (m[0] === "-") {
                    if (negativeWillRemove) {
                        return;
                    }
                    if (indexOfNegative > -1 || selectionStart > 0) {
                        e.preventDefault();
                        return;
                    }
                }
                else if (!negativeWillRemove && selectionStart <= indexOfNegative) {
                    e.preventDefault();
                    return;
                }
            }
            if (options.decimals) {
                var indexOfDecimal = element.value.indexOf(".");
                var decimalWillRemove = indexOfDecimal >= selectionStart && indexOfDecimal < selectionEnd;
                if (m[0] === ".") {
                    if (decimalWillRemove) {
                        return;
                    }
                    if (indexOfDecimal > -1) {
                        e.preventDefault();
                        return;
                    }
                }
            }
        }
    };
    return KeyboardHelper;
}());
