import * as React from "react";
export interface IImageProps extends React.HTMLProps<Image> {
    /** (boolean) Should the image be circular? */
    rounded?: boolean;
    /** (string) CSS classname property */
    className?: string;
    /** (string) A file or url path to an image */
    source?: string;
    /** (boolean) Should this image be of a sample user? */
    sampleUser?: boolean;
    /** (string) Any fixed value here will ensure the same sample user is returned */
    sampleUserSeed?: string;
    /** (number) The height in pixels of the image */
    height?: number;
    /** (number) The width in pixels of the image */
    width?: number;
    /** (boolean) Set to true to disable placeholders when no src is provided */
    noPlaceholder?: boolean;
}
export declare class Image extends React.Component<IImageProps, {
    source?: string;
}> {
    constructor();
    getRandomUser(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
