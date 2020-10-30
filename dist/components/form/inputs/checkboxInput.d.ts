import * as React from "react";
export interface ICheckboxInputProps extends React.HTMLProps<CheckboxInput> {
    labelContent: string | React.ReactElement<any>;
}
export declare class CheckboxInput extends React.Component<ICheckboxInputProps, {}> {
    render(): JSX.Element;
}
