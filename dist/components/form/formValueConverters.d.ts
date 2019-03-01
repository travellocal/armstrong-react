/** The core value converter */
export interface IValueConverter<TFrom, TTo> {
    /** convert TFrom to TTo */
    convert?: IOneWayValueConverter<TFrom, TTo>;
    /** convert TTo to TFrom */
    convertBack?: IOneWayValueConverter<TTo, TFrom>;
}
/** The core one way value converter */
export interface IOneWayValueConverter<TFrom, TTo> {
    /** convert TFrom to TTo */
    (from: TFrom): TTo;
}
/** The core 'text' input value converter (always requires a string ) */
export interface IInputValueConverter<TDataPropValue> extends IValueConverter<TDataPropValue, string> {
}
/** The core 'checkbox' input value converter (always requires a boolean) */
export declare class CheckboxValueConverter<TDataPropValue> implements IValueConverter<TDataPropValue, boolean> {
    private trueValue;
    private falseValue;
    constructor(trueValue: TDataPropValue, falseValue: TDataPropValue);
    convert(data: TDataPropValue): boolean;
    convertBack(value: boolean): TDataPropValue;
}
/** The Default pass-through Value converter */
export declare class DefaultValueConverter implements IInputValueConverter<string> {
    convert(data: string): string;
    convertBack(value: string): string;
    static instance: DefaultValueConverter;
}
export interface INumericOptions {
    /** allow negative values? */
    allowNegative?: boolean;
    /** number of decimals */
    decimals?: number;
    /** min value */
    min?: number;
    /** max value */
    max?: number;
    /** range step */
    step?: number;
}
/** A Numeric Value converter to handle converting typed text to a number */
export declare class NumericValueConverter implements IInputValueConverter<number> {
    private options;
    constructor(options?: INumericOptions);
    convert(data: number): string;
    convertBack(value: string): number;
    static instance: NumericValueConverter;
}
export declare class MultipleNumericValueConverter implements IValueConverter<number[], string[]> {
    private static converter;
    convert(data: number[]): string[];
    convertBack(value: string[]): number[];
    static instance: MultipleNumericValueConverter;
}
