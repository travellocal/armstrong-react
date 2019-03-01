"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var icon_1 = require("./../display/icon");
var icons_1 = require("./../../utilities/icons");
var BurgerMenu = (function (_super) {
    __extends(BurgerMenu, _super);
    function BurgerMenu() {
        var _this = _super.call(this) || this;
        _this.menuId = "burger-menu" + Math.random();
        return _this;
    }
    BurgerMenu.prototype.toggleMenu = function () {
        if (!this.isOpen) {
            this.openMenu();
        }
        else {
            this.closeMenu();
        }
    };
    BurgerMenu.prototype.closeMenu = function () {
        var mode = this.props.mode || "push";
        if (mode === "push") {
            this.appNode.classList.remove("menu-open");
            this.appNode.classList.remove("menu-push");
        }
        else {
            this.appNode.classList.remove("menu-open");
            this.appNode.classList.remove("menu-slide");
        }
        this.isOpen = false;
        if (this.props.onMenuToggle) {
            this.props.onMenuToggle(this);
        }
    };
    BurgerMenu.prototype.openMenu = function () {
        var mode = this.props.mode || "push";
        if (mode === "push") {
            this.appNode.classList.add("menu-open");
            this.appNode.classList.add("menu-push");
        }
        else {
            this.appNode.classList.add("menu-open");
            this.appNode.classList.add("menu-slide");
        }
        this.isOpen = true;
        if (this.props.onMenuToggle) {
            this.props.onMenuToggle(this);
        }
    };
    BurgerMenu.prototype.componentWillUnmount = function () {
        this.unmountPortalNode();
    };
    BurgerMenu.prototype.componentWillReceiveProps = function (newProps) {
        this.renderToPortal(this.renderNav(newProps.children));
    };
    BurgerMenu.prototype.componentDidMount = function () {
        var appNode = document.getElementById(this.props.bodyId || "host");
        if (!appNode) {
            throw new Error("Cannot find document node of " + (this.props.bodyId || "host"));
        }
        this.appNode = appNode;
        this.renderToPortal(this.renderNav(this.props.children));
    };
    BurgerMenu.prototype.renderToPortal = function (element) {
        var node = this.portalNode;
        if (node == null) {
            this.portalNode = node = document.createElement('nav');
            this.portalNode.classList.add('burger-menu');
            node.id = this.menuId;
            this.appNode.insertBefore(node, this.appNode.firstChild);
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
    BurgerMenu.prototype.unmountPortalNode = function () {
        var unmounted = ReactDOM.unmountComponentAtNode(this.portalNode);
        if (unmounted) {
            this.appNode.removeChild(this.portalNode);
        }
        delete this.portalNode;
        return unmounted;
    };
    BurgerMenu.prototype.closeNav = function (e, handler) {
        // There is a probably a nicer way to do this, but CBA right now
        if (this.props.closeOnNavigate) {
            handler();
        }
    };
    BurgerMenu.prototype.renderNav = function (children) {
        var _this = this;
        return (React.createElement("div", null,
            this.props.mode === "slide" &&
                React.createElement("div", { className: "burger-blocker", onClick: function () { return _this.closeMenu(); } }),
            React.createElement("ul", { className: "burger-menu-list", role: "menu", "aria-activedescendant": true, "aria-expanded": this.isOpen, "aria-hidden": !this.isOpen }, React.Children.map(children, function (c, index) {
                return React.createElement("li", { onClick: function (e) { return _this.closeNav(e, function () { return _this.closeMenu(); }); }, key: "nav_item_" + index }, c);
            }))));
    };
    BurgerMenu.prototype.render = function () {
        var _this = this;
        return (React.createElement("button", { className: "burger-menu-button" + (this.props.burgerButtonHidden ? " hidden" : ""), onClick: function () { return _this.toggleMenu(); } }, this.props.buttonIcon && React.createElement(icon_1.Icon, { icon: this.props.buttonIcon })));
    };
    return BurgerMenu;
}(React.Component));
BurgerMenu.Icomoon = icons_1.Icons.Icomoon;
exports.BurgerMenu = BurgerMenu;
var BurgerMenuItem = (function (_super) {
    __extends(BurgerMenuItem, _super);
    function BurgerMenuItem() {
        return _super.apply(this, arguments) || this;
    }
    BurgerMenuItem.prototype.handleClick = function (handler) {
        if (this.props.delayActionMs) {
            window.setTimeout(function () {
                handler();
            }, this.props.delayActionMs);
        }
        else {
            handler();
        }
    };
    BurgerMenuItem.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { role: "menuitem", className: "burger-menu-item" + (this.props.active ? ' active' : ''), style: this.props.style, "aria-selected": this.props.active || false, onClick: function () { return _this.props.onClick ? _this.handleClick(_this.props.onClick) : null; } },
            this.props.icon && React.createElement(icon_1.Icon, { icon: this.props.icon }),
            this.props.title);
    };
    return BurgerMenuItem;
}(React.Component));
exports.BurgerMenuItem = BurgerMenuItem;
