import * as React from "react";
import { IDataBinder } from "./formCore";
import { FormBinder } from "./formBinders";
export interface IFormValidationResult {
    /** The attribute (dataPath) of the invalid entry */
    attribute: string;
    /** The validation message */
    message: string;
}
export interface IFormProps extends React.HTMLProps<Form> {
    /** The forms data binder instance, this contains the data that is used by bound form elements*/
    dataBinder: IDataBinder<any>;
    /** Called when bound form data changes: NOTE, this is called on every key stroke/interaction on any of the bound fields */
    onDataChanged?: (data?: any) => void;
    /** Called when bound form data changes: NOTE, this is called on every key stroke/interaction on any of the bound fields */
    onDataBinderChange?: (dataBinder: IDataBinder<any>) => void;
    /** An optional array of validation results - bound controls whose dataBinder dataPath matches an attribute will be annotated with a 'data-validation-message' property */
    validationResults?: IFormValidationResult[];
}
export interface IFormContext {
    /** The dataBinder of the Form */
    dataBinder: IDataBinder<any>;
    /** If the Form is nested inside another Form, the IFormContext of the parent Form */
    parent: IFormContext;
}
/**
A stateless data bindable form - state is held within the 'dataBinder' property
NOTE: This is designed to render all elements in the form on every change. This allows other participating elements to react to these changes
NOTE: This element provides a react context, this can be used to get access to the Forms dataBinder (or any parent Form dataBinder when nested)
*/
export declare class Form extends React.Component<IFormProps, {}> {
    static getFormContext(context: any): IFormContext;
    getChildContext(): {
        form: IFormContext;
    };
    static Bind: typeof FormBinder;
    static jsonDataBinder<T>(data: T): IDataBinder<T>;
    static jsonDataBinderWithClone<T>(data: T): IDataBinder<T>;
    private preventDefault;
    render(): React.DOMElement<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | React.DOMElement<React.HTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    private processChildren;
    private notifyChange;
}
