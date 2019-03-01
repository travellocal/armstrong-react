import * as React from "react";
export interface IRadioInputProps extends React.HTMLProps<RadioInput> {
    labelContent: string | React.ReactElement<any>;
}
export declare class RadioInput extends React.Component<IRadioInputProps, {}> {
    render(): JSX.Element;
}
