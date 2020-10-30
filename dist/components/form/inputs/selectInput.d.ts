import * as React from "react";
export interface ISelectInputOption {
    id: number | string;
    name: string;
}
export interface ISelectInputProps extends React.HTMLProps<SelectInput> {
    options: ISelectInputOption[];
    change?: (selected: ISelectInputOption) => void;
    optionLabel?: string;
}
export declare class SelectInput extends React.Component<ISelectInputProps, {}> {
    private select;
    static defaultProps: {
        optionLabel: string;
    };
    private change;
    focus(): void;
    blur(): void;
    render(): JSX.Element;
}
