import * as React from "react";
import { IFormBinder, IDataBinder, IFormBinderInjector } from "./formCore";
import { IValueConverter, IInputValueConverter, INumericOptions } from "./formValueConverters";
import { FormBinderBase } from "./formBinderBase";
import { ICalendarInputProps } from "./inputs/calendarInput";
import { IDateInputProps } from "./inputs/dateInput";
import { ITimeInputProps } from "./inputs/timeInput";
import { IAutoCompleteInputProps } from "./inputs/autoCompleteInput";
/** An input FormBinder that sets native 'value' and 'onChange: (e) => void' properties */
export declare class InputFormBinder<TDataPropValue, TComponentPropValue> extends FormBinderBase<React.DOMAttributes<{}>, TDataPropValue, TComponentPropValue> {
    setElementProperty(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>): void;
    protected getDefaultInputValue(): any;
    handleValueChanged(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class SelectMultipleFormBinder<TDataProp> extends InputFormBinder<TDataProp, string[]> {
    constructor(dataPath: string, valueConverter?: IValueConverter<TDataProp, string[]>);
    setElementProperty(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>): void;
    handleValueChanged(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
    private getSelectValues(select);
}
export declare class CheckboxFormBinder<TDataPropValue, TComponentPropValue> extends InputFormBinder<TDataPropValue, TComponentPropValue> {
    constructor(dataPath: string, valueConverter?: IValueConverter<TDataPropValue, TComponentPropValue>);
    protected getDefaultInputValue(): boolean;
}
/** A radio input FormBinder */
export declare class RadioFormBinder<TDataPropValue, TComponentPropValue> extends InputFormBinder<TDataPropValue, TComponentPropValue> {
    setElementProperty(props: React.DOMAttributes<any>, dataBinder: IDataBinder<any>): void;
}
export declare class DateInputFormBinder extends FormBinderBase<IDateInputProps, string, string> {
    constructor(dataPath: string);
    handleValueChanged(props: IDateInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class TimeInputFormBinder extends FormBinderBase<ITimeInputProps, string, string> {
    constructor(dataPath: string);
    static customValue(dataName: string): TimeInputFormBinder;
    handleValueChanged(props: ITimeInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class CalendarInputFormBinder extends FormBinderBase<ICalendarInputProps, string, string> {
    constructor(dataPath: string);
    static customValue(dataName: string): CalendarInputFormBinder;
    handleValueChanged(props: ICalendarInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
export declare class AutoCompleteFormBinder implements IFormBinder<IAutoCompleteInputProps, any> {
    dataPath: string;
    constructor(dataPath: string);
    setElementProperty(props: IAutoCompleteInputProps, dataBinder: IDataBinder<any>): void;
    handleValueChanged(props: IAutoCompleteInputProps, dataBinder: IDataBinder<any>, notifyChanged: () => void): void;
}
/** Form Binder helpers */
export declare class FormBinder {
    /** bind a custom form binder */
    static custom<P>(formBinder: IFormBinder<P, any>): IFormBinderInjector<P>;
    /** bind to a 'hidden' input */
    static hidden<TDataPropValue>(dataName: string, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'password' input */
    static password<TDataPropValue>(dataName: string, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'text' input */
    static text<TDataPropValue>(dataName: string, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'email' input */
    static textEmail<TDataPropValue>(dataName: string, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    static autoCompleteInput(dataName: string): IFormBinderInjector<IAutoCompleteInputProps>;
    /** bind a 'date' string property to a CalendarInput (e.g. YYYY-MM-DD) */
    static calendarInput(dataName: string): IFormBinderInjector<ICalendarInputProps>;
    /** bind a 'date' string property to a DateInput (e.g. YYYY-MM-DD) */
    static dateInput(dataName: string): IFormBinderInjector<IDateInputProps>;
    /** bind a 'time' string property to a TimeInput (e.g. HH:MM) */
    static timeInput(dataName: string): IFormBinderInjector<ITimeInputProps>;
    private static defaultInputFormBinder<TDataPropValue, TTo>(dataName, type, valueConverter?, propertySet?);
    /** bind a number property to a range */
    static range(dataName: string, options?: INumericOptions): IFormBinderInjector<React.DOMAttributes<any>>;
    /** uncontroller text input */
    static defaultText<TDataPropValue>(dataName: string, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number property to a 'text' input */
    static textNumeric(dataName: string, options?: INumericOptions): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a select */
    static selectCustom<TDataPropValue>(dataName: string, valueConverter?: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a select */
    static select(dataName: string): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number property to a select */
    static selectNumeric(dataName: string): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue[] property to a multi select */
    static selectMultipleCustom<TDataPropValue>(dataName: string, valueConverter?: IValueConverter<TDataPropValue, string[]>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string[] property to a multi select */
    static selectMultiple(dataName: string): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number[] property to a multi select */
    static selectMultipleNumeric(dataName: string): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a 'checkbox' input */
    static checkboxCustom<TDataPropValue>(/** helooo */ dataName: string, valueConverter?: IValueConverter<TDataPropValue, boolean>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a boolean property to a 'checkbox' input */
    static checkbox(dataName: string): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a 'radio' input, using trueValue and falseValue equality testing */
    static checkboxConvert<TDataPropValue>(dataName: string, trueValue: TDataPropValue, falseValue: TDataPropValue): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a TDataPropValue property to a 'radio' input */
    static radioCustom<TDataPropValue>(dataName: string, value: string, valueConverter: IInputValueConverter<TDataPropValue>): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a string property to a 'radio' input */
    static radio(dataName: string, value: string): IFormBinderInjector<React.DOMAttributes<any>>;
    /** bind a number property to a 'radio' input */
    static radioNumeric(dataName: string, value: number): IFormBinderInjector<React.DOMAttributes<any>>;
}
