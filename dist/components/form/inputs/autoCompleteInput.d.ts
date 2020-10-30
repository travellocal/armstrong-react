import * as React from "react";
export interface IAutoCompleteOption {
    id: number | string;
    name: string;
    data?: any;
    className?: string;
}
export interface IAutoCompleteInputProps extends React.Props<AutoCompleteInput> {
    /** (string) CSS classname property */
    className?: string;
    /** (IAutoCompleteOption | IAutoCompleteOption[]) The current/returned value or values if multi select */
    value?: IAutoCompleteOption | IAutoCompleteOption[];
    /** (number) No query will get executed until this is met. Defaults to 1 */
    minimumLength?: number;
    /** (string) The text to use a placeholder when no value is present */
    placeholder?: string;
    /** (string) The text show when no results were found */
    noResultsMessage?: string;
    /** (IAutoCompleteOption[]) If you are using local rather than remote options, specify them here */
    options?: IAutoCompleteOption[];
    /** (number) How long to wait after every key press before executing a remote query */
    remoteThrottle?: number;
    /** ((string) => Promise<IAutoCompleteOption[]>) A promise and mapping to IAutoCompleteOption to handle querying remote data */
    remoteQuery?: (query: string) => Promise<IAutoCompleteOption[]>;
    /** (boolean) If set to true, a blank query will be executed as soon as the control is focused */
    remoteQueryOnOpen?: boolean;
    /** (boolean) If set to true, a button will appear along side the box which selects the currently hilighted option on click */
    hasGoButton?: boolean;
    /** (React.ReactElement<any> | string) The content of the go button. Can be text or any element */
    goButtonContent?: React.ReactElement<any> | string;
    /** ((IAutoCompleteOption | IAutoCompleteOption[]) => void) Fires when the selection is changed. Returns a single value or an array dependent on multiselect */
    onSelected?: (selectedOption: IAutoCompleteOption | IAutoCompleteOption[]) => void;
    /** (number) How many items to show before scrolling. Defaults to 3 */
    visibleItems?: number;
    /** (boolean) If true, shows an X icon to clear selection */
    canClear?: boolean;
    /** (boolean) Wether the control is disabled */
    disabled?: boolean;
    /** (boolean) Wether the control should function like a tagging control, returning an array of options or a single select, returning one option */
    multiSelect?: boolean;
    /** (boolean) wether or not to strip diacritical marks */
    ignoreDiacritics?: boolean;
}
export interface IAutoCompleteInputState {
    filteredOptions?: IAutoCompleteOption[];
    query?: string;
    open?: boolean;
    selectedValue?: IAutoCompleteOption | IAutoCompleteOption[];
    selectedIndex?: number;
    remoteSearching?: boolean;
    offsetIndex?: number;
    showOnTop?: boolean;
    topOffset?: number;
}
export declare class AutoCompleteInput extends React.Component<IAutoCompleteInputProps, IAutoCompleteInputState> {
    private timer;
    private diacriticsStripper;
    private itemHeight;
    static defaultProps: {
        remoteThrottle: number;
        minimumLength: number;
    };
    constructor(props: IAutoCompleteInputProps);
    filterRemote(query: string, immediate?: boolean): void;
    filter(query: string): void;
    match(value1: string, value2: string): boolean;
    focusInput(e: React.MouseEvent<any>): void;
    handleEvent(e: Event): void;
    componentWillUnmount(): void;
    componentWillMount(): void;
    componentWillReceiveProps(newProps: IAutoCompleteInputProps): void;
    shouldShowOnTop(): boolean;
    checkKey(e: any): boolean;
    constrainIndex(): void;
    private isArray;
    handleSelection(options: IAutoCompleteOption | IAutoCompleteOption[]): void;
    buttonClick(): void;
    private prevFilter;
    checkToFilter(query: string): void;
    render(): JSX.Element;
}
