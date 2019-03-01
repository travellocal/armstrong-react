import * as React from "react";
export interface ITimeInputProps extends React.Props<TimeInput> {
    /** (string) CSS classname property */
    className?: string;
    /** (number) The tab index of the first select */
    tabIndex?: number;
    /** ((string) => void) Returns the time value when changed */
    onChange?: (time: string) => void;
    /** (string) The time value in HH:mm format */
    time?: string;
    /** (boolean) Should the picker disallow user interaction */
    disabled?: boolean;
    /** (number) Indicates the minute intervals to display */
    minuteStep?: number;
    /** (string) The hour label - default to `HH` */
    hourLabel?: string;
    /** (string) The minute label - default to `MM` */
    minuteLabel?: string;
}
export interface ITimerInputState {
    hours?: number;
    minutes?: number;
}
export declare class TimeInput extends React.Component<ITimeInputProps, ITimerInputState> {
    private static hours;
    static defaultProps: {
        time: string;
        hourLabel: string;
        minuteLabel: string;
    };
    constructor();
    componentWillMount(): void;
    componentWillReceiveProps(newProps: ITimeInputProps): void;
    private handleDataChanged;
    render(): JSX.Element;
}
