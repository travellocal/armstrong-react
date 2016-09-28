import * as React from "react";
import * as ReactDOM from "react-dom";
import { Icon } from "./icon";
import { Grid, Row, Col } from './../layout/grid';

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
  onClose?: () => void;
  /** (()=> void) Event to fire when the dialog is opened */
  onOpen?: () => void;
  /** (()=> void) Event to fire when the x button is clicked. Use this to confirm (double dialogs) */
  onXClicked?: () => void;
  /** (React.ReactElement<any>) A collection of elements, normally buttons, to put in the footer */
  footerContent?: React.ReactElement<any>;
}

export class Dialog extends React.Component<IDialogProps, {}>{
  private dialogContentElement;

  private appNode: HTMLElement;
  private portalNode: HTMLElement;
  private dialogId: string;

  public closeClicked() {
    if (this.props.onClose) {
      this.props.onClose();
    }
    this.unmountPortalNode();
  }

  public scrollToTop() {
    this.dialogContentElement.scrollTop = 0;
  }

  componentDidMount() {
    this.dialogContentElement = document.getElementById("dialog-content");
    let appNode = document.getElementById(this.props.bodyId || "host");
    if(!appNode){
      throw new Error(`Cannot find document node of ${this.props.bodyId || "host"}`)
    }
    this.appNode = appNode;
    if (this.props.isOpen) {
      this.renderToPortal(this.renderDialog(this.props))
    }
  }

  componentWillReceiveProps(newProps: IDialogProps) {
    var open = newProps.isOpen;
    if (open && open != this.props.isOpen && this.props.onOpen) {
      this.props.onOpen();
    }
    if (open) {
      this.renderToPortal(this.renderDialog(newProps))
    }
    if (!open && this.props.isOpen) {
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.unmountPortalNode();
    }
  }

  renderToPortal(element) {
    let node = this.portalNode;

    if (node == null) {
      this.portalNode = node = document.createElement('div');
      this.portalNode.classList.add('dialog-layer');
      if (this.props.layerClass) {
        this.portalNode.classList.add(this.props.layerClass);
      }
      node.id = this.dialogId || `dialog-layer-${Math.random()}`;
      this.appNode.appendChild(node);
    }

    // Renders can return null, but ReactDOM.render() doesn't like being asked
    // to render null. If "element" is `null`, just render a noscript element,
    // like React does when an element's render returns null.
    if (element === null) {
      element = React.DOM.noscript();
    }

    // use ReactDOM.unstable_renderSubtreeIntoContainer function instead of
    // render. This allows use to retain "this.context" for the "element"
    ReactDOM.unstable_renderSubtreeIntoContainer(this, element, node);
  }

  componentWillUnmount() {
    this.unmountPortalNode();
  }

  unmountPortalNode() {
    if (!this.portalNode) {
      return;
    }
    const unmounted = ReactDOM.unmountComponentAtNode(this.portalNode);
    if (unmounted) {
      this.appNode.removeChild(this.portalNode);
    }
    delete this.portalNode;
    return unmounted;
  }

  renderDialog(props : IDialogProps) {
    var style = { width: props.width || "500px", height: props.height || "auto" }
    return (
      <div className={`dialog${props.className ? ` ${props.className}` : ''}`} style={style} id={this.dialogId}>
        {!props.title &&
          <div className="dialog-close-button" onClick={() => props.onXClicked ? props.onXClicked() : this.closeClicked() }>
            <Icon icon={Icon.Icomoon.cross}/>
          </div>
        }
        {props.title &&
          <div className="dialog-header">
            {props.title}
            <div className="dialog-close-button" onClick={() => props.onXClicked ? props.onXClicked() : this.closeClicked() }>
              <Icon icon={Icon.Icomoon.cross}/>
            </div>
          </div>
        }
        <div className="dialog-content" id="dialog-content">
          {props.children}
        </div>
        {props.footerContent && <div className="dialog-footer">{props.footerContent}</div> }
      </div>
    )
  }

  render() {
    return (
      <noscript/>
    );
  }
}
