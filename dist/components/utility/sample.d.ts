import * as React from "react";
export interface IPropInfo {
    name: string;
    type: string;
    value: string;
}
export interface ISampleProps extends React.Props<Sample> {
    component: JSX.Element;
    title: string;
    description?: string;
    showHtml?: boolean;
}
export declare class Sample extends React.Component<ISampleProps, {}> {
    getProps(): IPropInfo[];
    getPropInfo(props: any): IPropInfo[];
    render(): JSX.Element;
}
