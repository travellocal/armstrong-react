"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var icon_1 = require("./icon");
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        return _super.apply(this, arguments) || this;
    }
    Dialog.prototype.closeClicked = function () {
        this.close();
    };
    Dialog.prototype.xClicked = function () {
        if (this.props.onXClicked) {
            this.props.onXClicked();
        }
        else {
            this.close();
        }
    };
    Dialog.prototype.close = function () {
        this.props.onClose();
        this.unmountPortalNode();
    };
    Dialog.prototype.scrollToTop = function () {
        this.dialogContentElement.scrollTop = 0;
    };
    Dialog.prototype.componentDidMount = function () {
        this.dialogContentElement = document.getElementById("dialog-content");
        this.appNode = document.getElementById(this.props.bodyId || "host");
        if (this.props.isOpen) {
            this.renderToPortal(this.renderDialog(this.props));
        }
    };
    Dialog.prototype.componentWillReceiveProps = function (newProps) {
        var open = newProps.isOpen;
        if (open && open != this.props.isOpen && this.props.onOpen) {
            this.props.onOpen();
        }
        if (open) {
            this.renderToPortal(this.renderDialog(newProps));
        }
        if (!open && this.props.isOpen) {
            if (this.props.onClose) {
                this.props.onClose();
            }
            this.unmountPortalNode();
        }
    };
    Dialog.prototype.renderToPortal = function (element) {
        var node = this.portalNode;
        if (node == null) {
            this.portalNode = node = document.createElement('div');
            this.portalNode.classList.add('dialog-layer');
            if (this.props.layerClass) {
                this.portalNode.classList.add(this.props.layerClass);
            }
            node.id = this.dialogId || "dialog-layer-" + Math.random();
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
    };
    Dialog.prototype.componentWillUnmount = function () {
        this.unmountPortalNode();
    };
    Dialog.prototype.unmountPortalNode = function () {
        if (!this.portalNode) {
            return;
        }
        var unmounted = ReactDOM.unmountComponentAtNode(this.portalNode);
        if (unmounted) {
            var body = document.getElementById(this.props.bodyId || "host");
            if (body && this.portalNode) {
                body.removeChild(this.portalNode);
            }
        }
        if (this.portalNode) {
            delete this.portalNode;
        }
        return unmounted;
    };
    Dialog.prototype.renderDialog = function (newProps) {
        var _this = this;
        var style = { width: this.props.width || "500px", height: this.props.height || "auto" };
        return (React.createElement("div", { className: "dialog" + (this.props.className ? " " + this.props.className : ''), style: style, id: this.dialogId },
            !this.props.title &&
                React.createElement("div", { className: "dialog-close-button", onClick: function () { return _this.xClicked(); } },
                    React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross })),
            this.props.title &&
                React.createElement("div", { className: "dialog-header" },
                    this.props.title,
                    React.createElement("div", { className: "dialog-close-button", onClick: function () { return _this.xClicked(); } },
                        React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross }))),
            React.createElement("div", { className: "dialog-content", id: "dialog-content" }, newProps.children),
            newProps.footerContent && React.createElement("div", { className: "dialog-footer" }, newProps.footerContent)));
    };
    Dialog.prototype.render = function () {
        return (React.createElement("noscript", null));
    };
    return Dialog;
}(React.Component));
exports.Dialog = Dialog;
