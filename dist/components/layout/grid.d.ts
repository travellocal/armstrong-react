import * as React from "react";
import { MarginClass, PaddingClass, BgColorClass, FgColorClass, VerticalAlignment, HorizontalAlignment } from "./../../utilities/uiHelpers";
export interface IGrid extends React.HTMLProps<Grid> {
    /** (boolean) Wether to render borders around grid parts */
    debugMode?: boolean;
    /** (boolean) ADVANCED: Turns of automatic fix of safari6 compat wrapper */
    disableFlexOverride?: boolean;
    /** (string) CSS classname property */
    className?: string | MarginClass | PaddingClass | BgColorClass | FgColorClass;
    /** (boolean) Render the first row to simulate a table header */
    table?: boolean;
    /** (boolean) Wether the table should expand and divide to fill its container */
    fillContainer?: boolean;
    /** (Row[]) A grid must contain one or many <Row/> elements */
    children?: Row[] | Row;
}
export declare class Grid extends React.Component<IGrid, {}> {
    render(): JSX.Element;
    componentDidMount(): void;
}
export interface IRow extends React.HTMLProps<Row> {
    /** (number | string) Sets a fixed height for the row, or 'auto' to grow to fit its content */
    height?: number | string;
    /** (string) CSS classname property */
    className?: string | MarginClass | PaddingClass | BgColorClass | FgColorClass;
    /** (Col[]) A row must contain one or many <Col/> elements */
    children?: Col[] | Col;
}
export declare class Row extends React.Component<IRow, any> {
    needsFixed(): boolean;
    render(): JSX.Element;
}
export interface ICol extends React.HTMLProps<Col> {
    /** (HorizontalAlignment(string)) How to align content horizontally in this column */
    horizontalAlignment?: HorizontalAlignment;
    /** (HorizontalAlignment(string)) How to align content vertically in this column */
    verticalAlignment?: VerticalAlignment;
    /** (number | string) Sets a fixed width for the column, or 'auto' to grow to fit its content */
    width?: number | string;
    /** (string) CSS classname property */
    className?: string | MarginClass | PaddingClass | BgColorClass | FgColorClass;
}
export declare class Col extends React.Component<ICol, {}> {
    needsFixed(): boolean;
    render(): JSX.Element;
}
