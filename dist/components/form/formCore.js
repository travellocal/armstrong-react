"use strict";
var FormBinderInjectorKey = "data-form-binder";
function getFormBinderFromInjector(injector) {
    return injector[FormBinderInjectorKey];
}
exports.getFormBinderFromInjector = getFormBinderFromInjector;
function updateFormBinderInjector(target, formBinder) {
    target[FormBinderInjectorKey] = formBinder;
    return target;
}
exports.updateFormBinderInjector = updateFormBinderInjector;
function getEventTargetAs(evt) {
    return evt.target;
}
exports.getEventTargetAs = getEventTargetAs;
