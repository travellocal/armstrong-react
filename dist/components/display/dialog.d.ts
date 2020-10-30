import * as React from "react";
export interface IDialogProps extends React.HTMLProps<Dialog> {
    /** (string) default: 'host' - The ID of your sites body element  */
    bodyId?: string;
    /** (string) An additional class for the dialog layer, normally used for forcing higher z-index values  */
    layerClass?: string;
    /** (string) CSS classname property */
    className?: string;
    /** (string) The title to use in the dialogs header */
    title?: string;
    /** (boolean) Setting this to true or false will open or close the dialog */
    isOpen: boolean;
    /** (()=> void) Event to fire when the dialog is closed */
    onClose: () => void;
    /** (()=> void) Event to fire when the dialog is opened */
    onOpen?: () => void;
    /** (()=> void) Event to fire when the x button is clicked. Use this to confirm (double dialogs) */
    onXClicked?: () => void;
    /** (React.ReactElement<any>) A collection of elements, normally buttons, to put in the footer */
    footerContent?: React.ReactElement<any>;
}
export declare class Dialog extends React.Component<IDialogProps, {}> {
    private dialogContentElement;
    private appNode;
    private portalNode;
    private dialogId;
    private closeClicked;
    private xClicked;
    private close;
    private scrollToTop;
    componentDidMount(): void;
    componentWillReceiveProps(newProps: IDialogProps): void;
    renderToPortal(element: any): void;
    componentWillUnmount(): void;
    unmountPortalNode(): boolean;
    renderDialog(newProps: any): JSX.Element;
    render(): JSX.Element;
}
