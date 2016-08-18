import * as _ from "underscore";
import * as React from "react";
import * as classNames from "classnames";
import { Form } from "../form";
import { Icon } from "./../../display/icon";
import { Icons } from "./../../../utilities/icons";

export interface ITextInputProps extends React.HTMLProps<TextInput> {
  multiLine?: boolean;
  rightOverlayText?: string;
  leftOverlayText?: string;
  leftIcon?: string;
  rightIcon?: string;
}

export class TextInput extends React.Component<ITextInputProps, {}> {
  static Icomoon = Icons.Icomoon;

  static defaultProps = {
    type: "text"
  };

  render() {
    var classes = classNames(
      "text-input",
      this.props.className,
      {
        "text-input-disabled": this.props.disabled,
        "has-text-overlay-left": !!this.props.leftOverlayText,
        "has-text-overlay-right": !!this.props.rightOverlayText,
        "text-input-icon-left": !!this.props.leftIcon,
        "text-input-icon-right": !!this.props.rightIcon
      }
    );
    const other = _.omit(this.props, "className", "rightOverlayText", "leftOverlayText", "type", "leftIcon", "rightIcon", "multiLine")
    return (
        <div className={classes}>
            { this.props.leftIcon && <Icon className="left-icon" icon={this.props.leftIcon}/>}
            { this.props.leftOverlayText && <div className="input-overlay-text-left">{this.props.leftOverlayText}</div> }
            { !this.props.multiLine && <input {...other} type={this.props.type} />}
            { this.props.multiLine && <textarea {...other} />}
            { this.props.rightOverlayText && <div className="input-overlay-text-right">{this.props.rightOverlayText}</div> }
            { this.props.rightIcon && <Icon className="right-icon" icon={this.props.rightIcon}/>}
        </div>
    );
  }
}
