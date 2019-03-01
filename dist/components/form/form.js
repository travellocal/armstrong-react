"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var _ = require("underscore");
var formCore_1 = require("./formCore");
var formBinders_1 = require("./formBinders");
var properyPathResolver_1 = require("./properyPathResolver");
var classnames = require("classnames");
/** The default Json Entity binder - NOTE, the original instance provided is MUTABLE */
var JsonEntityBinder = (function () {
    function JsonEntityBinder(data) {
        this.data = data;
    }
    JsonEntityBinder.prototype.getValue = function (dataName) {
        return properyPathResolver_1.PropertyPathResolver.getValue(this.data, dataName);
    };
    JsonEntityBinder.prototype.setValue = function (dataName, value) {
        properyPathResolver_1.PropertyPathResolver.setValue(this.data, dataName, value);
    };
    JsonEntityBinder.prototype.toJson = function () {
        return this.data;
    };
    return JsonEntityBinder;
}());
function deepObjectClone(source) {
    var target = {};
    for (var prop in source) {
        if (source.hasOwnProperty(prop)) {
            var value = source[prop];
            if (typeof value === 'object') {
                if (_.isArray(value)) {
                    target[prop] = value.map(function (v) {
                        if (typeof v === 'object') {
                            return deepObjectClone(v);
                        }
                        return v;
                    });
                }
                else {
                    target[prop] = deepObjectClone(value);
                }
            }
            else {
                target[prop] = source[prop];
            }
        }
    }
    return target;
}
/**
A stateless data bindable form - state is held within the 'dataBinder' property
NOTE: This is designed to render all elements in the form on every change. This allows other participating elements to react to these changes
NOTE: This element provides a react context, this can be used to get access to the Forms dataBinder (or any parent Form dataBinder when nested)
*/
var Form = (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super.apply(this, arguments) || this;
        _this.preventDefault = function (e) { e.preventDefault(); return false; };
        _this.notifyChange = function () {
            _this.props.onDataBinderChange && _this.props.onDataBinderChange(_this.props.dataBinder);
            _this.props.onDataChanged && _this.props.onDataChanged(_this.props.dataBinder.toJson());
        };
        return _this;
    }
    Form.getFormContext = function (context) {
        return context["form"];
    };
    Form.prototype.getChildContext = function () {
        return {
            form: {
                dataBinder: this.props.dataBinder,
                parent: this.context["form"]
            }
        };
    };
    Form.jsonDataBinder = function (data) {
        return new JsonEntityBinder(data);
    };
    Form.jsonDataBinderWithClone = function (data) {
        return new JsonEntityBinder(deepObjectClone(data));
    };
    Form.prototype.render = function () {
        var ch = this.processChildren(this.props.children);
        var hasParentForm = !!Form.getFormContext(this.context);
        var className = classnames("form", hasParentForm && "form-nested", this.props.className);
        return hasParentForm ? React.DOM.div({ className: className }, ch) : React.DOM.form({ className: className, onSubmit: this.preventDefault }, ch);
    };
    Form.prototype.processChildren = function (node) {
        var _this = this;
        var validationResults = this.props.validationResults;
        return React.Children.map(node, function (element) {
            if (!element) {
                return;
            }
            if (!element.props) {
                return element;
            }
            var props = _.extend({}, element.props);
            var children = element.props.children;
            var fbi = props;
            var formBinder = formCore_1.getFormBinderFromInjector(fbi);
            if (formBinder) {
                formCore_1.updateFormBinderInjector(fbi, null);
                if (validationResults && validationResults.length) {
                    var vr = _.find(validationResults, function (vr) { return vr.attribute === formBinder.dataPath; });
                    if (vr) {
                        props["data-validation-message"] = vr.message;
                    }
                }
                formBinder.setElementProperty(props, _this.props.dataBinder);
                formBinder.handleValueChanged(props, _this.props.dataBinder, _this.notifyChange);
                if (formBinder.extender) {
                    formBinder.extender(props, _this.props.dataBinder, _this.notifyChange);
                }
            }
            else if (children) {
                children = _this.processChildren(children);
            }
            return React.cloneElement(element, props, children);
        });
    };
    return Form;
}(React.Component));
Form.contextTypes = { "form": React.PropTypes.object };
Form.childContextTypes = {
    form: React.PropTypes.object
};
Form.Bind = formBinders_1.FormBinder;
exports.Form = Form;
