"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactDOM = require("react-dom");
var _ = require("underscore");
var classNames = require("classnames");
var icon_1 = require("./../../display/icon");
var grid_1 = require("./../../layout/grid");
var button_1 = require("./../../interaction/button");
var diacriticsStripper_1 = require("../../../utilities/diacriticsStripper");
var formCore_1 = require("../formCore");
var AutoCompleteInput = (function (_super) {
    __extends(AutoCompleteInput, _super);
    function AutoCompleteInput(props) {
        var _this = _super.call(this, props) || this;
        // drive this through css ideally. Currently fixed height plus border (50 + 2px)
        _this.itemHeight = 52;
        _this.state = {
            filteredOptions: [],
            query: "",
            open: false,
            selectedValue: props.multiSelect ? [] : null,
            selectedIndex: 0,
            remoteSearching: false,
            offsetIndex: 0,
            showOnTop: false,
            topOffset: -35
        };
        _this.diacriticsStripper = new diacriticsStripper_1.DiacriticsStripper();
        return _this;
    }
    AutoCompleteInput.prototype.filterRemote = function (query, immediate) {
        var _this = this;
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        this.timer = window.setTimeout(function () {
            _this.setState({ remoteSearching: true });
            _this.props.remoteQuery(query).then(function (filteredOptions) {
                _this.setState({ filteredOptions: filteredOptions, remoteSearching: false });
            });
        }, immediate ? 0 : this.props.remoteThrottle);
    };
    AutoCompleteInput.prototype.filter = function (query) {
        var _this = this;
        var q = query.toLowerCase();
        if (this.props.remoteQuery) {
            this.filterRemote(query);
        }
        else {
            if (query.length < this.props.minimumLength) {
                this.setState({ filteredOptions: this.props.options, query: query }, function () { return _this.constrainIndex(); });
            }
            else {
                this.setState({ filteredOptions: _.reject(this.props.options, function (o) { return _this.match(o.name, q); }), query: query }, function () { return _this.constrainIndex(); });
                ;
            }
        }
    };
    AutoCompleteInput.prototype.match = function (value1, value2) {
        value1 = value1.toLowerCase();
        value2 = value2.toLowerCase();
        if (this.props.ignoreDiacritics) {
            value1 = this.diacriticsStripper.removeDiacritics(value1);
        }
        return value1.toLowerCase().indexOf(value2) === -1;
        // if (this.props.stripDiacritics){
        // }
    };
    AutoCompleteInput.prototype.focusInput = function (e) {
        var _this = this;
        if (!this.state.open && !formCore_1.getEventTargetAs(e).classList.contains("clear-selected")) {
            this.setState({ open: true, showOnTop: this.shouldShowOnTop() }, function () {
                ReactDOM.findDOMNode(_this).querySelector("input").focus();
                document.addEventListener("click", _this, false);
                if (_this.props.remoteQueryOnOpen) {
                    _this.filterRemote("", true);
                }
            });
        }
    };
    AutoCompleteInput.prototype.handleEvent = function (e) {
        // The second or check here is to allow for handling of deletion clicks on multi-select items after they have been removed from the dom
        if (ReactDOM.findDOMNode(this).contains(e.target) || e.target.classList.contains("multi-select-item-part")) {
            return;
        }
        this.setState({ open: false, query: "", filteredOptions: this.props.options || [] });
        document.removeEventListener("click", this, false);
    };
    AutoCompleteInput.prototype.componentWillUnmount = function () {
        document.removeEventListener("click", this, false);
    };
    AutoCompleteInput.prototype.componentWillMount = function () {
        var selectedValue = this.props.multiSelect ? [] : null;
        if (this.props.value) {
            if (this.props.multiSelect) {
                if (_.isArray(this.props.value)) {
                    selectedValue = this.props.value;
                }
                else {
                    selectedValue = [this.props.value];
                }
            }
            else {
                selectedValue = this.props.value;
            }
        }
        this.setState({ filteredOptions: this.props.options || [], selectedValue: selectedValue });
    };
    AutoCompleteInput.prototype.componentWillReceiveProps = function (newProps) {
        if (this.props.multiSelect) {
            var newMultiValue = newProps.value;
            var oldMultiValue = this.state.selectedValue;
            if (oldMultiValue.length === 0 || !_.isEqual(newMultiValue.map(function (v) { return v.id; }), oldMultiValue.map(function (v) { return v.id; }))) {
                this.setState({ selectedValue: newMultiValue || [] });
            }
        }
        else {
            var newSingleValue = newProps.value;
            var oldSingleValue = this.state.selectedValue;
            if (!newSingleValue) {
                if (oldSingleValue != newSingleValue) {
                    this.setState({ selectedValue: null });
                }
            }
            else if (!oldSingleValue || newSingleValue.id !== oldSingleValue.id) {
                this.setState({ selectedValue: newSingleValue });
            }
        }
    };
    AutoCompleteInput.prototype.shouldShowOnTop = function () {
        var height = (this.itemHeight * 3) + 50;
        var inputRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        var remainingSpace = window.innerHeight - inputRect.bottom;
        var shouldShowOnTop = false;
        if (remainingSpace < height) {
            shouldShowOnTop = true;
        }
        else {
            shouldShowOnTop = false;
        }
        var offset = this.props.multiSelect ? -inputRect.height * 2 : -inputRect.height;
        var additionalOffset = 0;
        if (this.props.multiSelect && !shouldShowOnTop) {
            additionalOffset = inputRect.height;
        }
        this.setState({ topOffset: shouldShowOnTop ? offset : additionalOffset });
        return shouldShowOnTop;
    };
    AutoCompleteInput.prototype.checkKey = function (e) {
        var currentIndex = this.state.selectedIndex;
        if (e.keyCode === 27) {
            this.setState({ open: false, query: "", filteredOptions: this.props.options || [] });
        }
        if (e.keyCode === 40 && this.state.filteredOptions.length !== 0) {
            // DOWN ARROW
            var offsetIndex = Math.min((this.props.visibleItems || 3) - 1, this.state.offsetIndex + 1);
            var selectedIndex = Math.min(this.state.selectedIndex + 1, this.state.filteredOptions.length - 1);
            var listElement = ReactDOM.findDOMNode(this).querySelector(".autocomplete-select-list");
            this.setState({ offsetIndex: offsetIndex });
            if (offsetIndex >= 2) {
                listElement.scrollTop = (selectedIndex - 2) * this.itemHeight;
            }
            var selectedItem = this.state.filteredOptions[selectedIndex];
            this.setState({ selectedIndex: selectedIndex, query: selectedItem.name });
            e.preventDefault();
            return false;
        }
        if (e.keyCode === 38 && this.state.filteredOptions.length !== 0) {
            // UP ARROW
            var offsetIndex = Math.max(this.state.offsetIndex - 1, 0);
            var selectedIndex = Math.max(this.state.selectedIndex - 1, 0);
            var listElement = ReactDOM.findDOMNode(this).querySelector(".autocomplete-select-list");
            this.setState({ offsetIndex: offsetIndex });
            if (offsetIndex === 0) {
                listElement.scrollTop = (selectedIndex) * this.itemHeight;
            }
            var selectedItem = this.state.filteredOptions[selectedIndex];
            this.setState({ selectedIndex: selectedIndex, query: selectedItem.name });
            e.preventDefault();
            return false;
        }
        if (e.keyCode === 13 && this.state.filteredOptions.length !== 0) {
            // ENTER
            var selectedValue = this.state.filteredOptions[this.state.selectedIndex];
            this.handleSelection(selectedValue);
            e.preventDefault();
            return false;
        }
    };
    AutoCompleteInput.prototype.constrainIndex = function () {
        if (this.state.selectedIndex > this.state.filteredOptions.length - 1) {
            this.setState({ selectedIndex: Math.max(this.state.filteredOptions.length - 1, 0) });
        }
    };
    AutoCompleteInput.prototype.isArray = function (itemOrArray) {
        return _.isArray(itemOrArray);
    };
    AutoCompleteInput.prototype.handleSelection = function (options) {
        if (this.props.multiSelect) {
            // Handle multiple selection
            var items = this.isArray(options) ? options : [options];
            var ddOptions = this.state.selectedValue;
            items.forEach(function (option) {
                if (ddOptions.length !== 0 && _.some(ddOptions, function (ddo) { return ddo.id === option.id; })) {
                    // Remove
                    ddOptions = _.reject(ddOptions, function (ddo) { return ddo.id === option.id; });
                }
                else {
                    // Add
                    ddOptions.push(option);
                }
            });
            this.setState({ selectedValue: ddOptions });
            if (this.props.onSelected) {
                this.props.onSelected(ddOptions);
            }
            var input = ReactDOM.findDOMNode(this).querySelector("input");
            if (input) {
                input.focus();
            }
        }
        else {
            var option = options;
            // Handle single selection
            this.setState({ selectedValue: option, open: false, query: "", filteredOptions: this.props.options || [], offsetIndex: 0 });
            if (this.props.onSelected) {
                this.props.onSelected(option);
            }
            document.removeEventListener("click", this, false);
        }
    };
    AutoCompleteInput.prototype.buttonClick = function () {
        if (this.state.filteredOptions.length !== 0) {
            var selectedValue = this.state.filteredOptions[this.state.selectedIndex];
            if (selectedValue) {
                this.handleSelection(selectedValue);
            }
        }
    };
    AutoCompleteInput.prototype.checkToFilter = function (query) {
        var _this = this;
        this.setState({ query: query }, function () {
            if (_this.state.query !== _this.prevFilter) {
                _this.prevFilter = _this.state.query;
                _this.filter(_this.state.query);
            }
        });
    };
    AutoCompleteInput.prototype.render = function () {
        var _this = this;
        return (React.createElement(grid_1.Grid, { onClick: function (e) { return _this.focusInput(e); }, className: "autocomplete-select" + (this.props.className ? " " + this.props.className : '') + (this.props.disabled ? ' disabled' : '') + (this.props.hasGoButton && !this.props.multiSelect ? ' has-go-button' : '') + (this.props.multiSelect && this.state.selectedValue.length !== 0 ? ' has-multiple-options' : '') },
            React.createElement(grid_1.Row, null,
                React.createElement(grid_1.Col, { className: "drop-down-controls" },
                    (!this.state.open || this.props.multiSelect) && React.createElement(grid_1.Grid, { className: "autocomplete-value-display" },
                        React.createElement(grid_1.Row, null,
                            React.createElement(grid_1.Col, null,
                                this.state.selectedValue &&
                                    React.createElement("div", { className: "selected-value-wrapper" }, this.state.selectedValue && this.props.multiSelect ? this.state.selectedValue.map(function (ddo) {
                                        return React.createElement("div", { key: "multi-select-item-" + ddo.id, className: "multi-select-item multi-select-item-part" + (ddo.className ? " " + ddo.className : ''), onClick: function () { return _this.handleSelection(ddo); } },
                                            ddo.name,
                                            React.createElement(icon_1.Icon, { className: "multi-select-item-part", icon: icon_1.Icon.Icomoon.cross }));
                                    }) : this.state.selectedValue.name),
                                (this.props.multiSelect && this.state.selectedValue.length === 0) &&
                                    React.createElement("div", { className: "placeholder" },
                                        "\u00A0",
                                        React.createElement("div", { className: "placeholder-value" }, !this.state.open && (this.props.placeholder || "start typing to filter results..."))),
                                !this.props.multiSelect && this.state.selectedValue === null &&
                                    React.createElement("div", { className: "placeholder" },
                                        "\u00A0",
                                        React.createElement("div", { className: "placeholder-value" }, this.props.placeholder || "start typing to filter results..."))),
                            !this.props.multiSelect && this.state.selectedValue && this.props.canClear &&
                                React.createElement(grid_1.Col, { width: "auto", className: "clear-selected p-right-xsmall", onClick: function () { return _this.setState({ selectedValue: _this.props.multiSelect ? [] : null, open: false, query: "", filteredOptions: _this.props.options || [] }); } },
                                    React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross })),
                            this.props.multiSelect && this.state.selectedValue.length !== 0 && this.props.canClear &&
                                React.createElement(grid_1.Col, { width: "auto", className: "clear-selected p-right-xsmall", onClick: function () { return _this.setState({ selectedValue: _this.props.multiSelect ? [] : null, open: false, query: "", filteredOptions: _this.props.options || [] }); } },
                                    React.createElement(icon_1.Icon, { icon: icon_1.Icon.Icomoon.cross })))),
                    this.state.open &&
                        React.createElement("div", { className: classNames("autocomplete-select-list-wrapper", this.props.multiSelect ? 'multi-select' : '') },
                            React.createElement("input", { type: "text", style: { marginTop: "" + (this.props.multiSelect && this.state.showOnTop && this.state.topOffset + "px") }, value: this.state.query, onKeyUp: function (e) { return _this.checkKey(e); }, onChange: function (e) { return _this.checkToFilter(formCore_1.getEventTargetAs(e).value); }, placeholder: this.props.placeholder || "start typing to filter results..." }),
                            this.state.remoteSearching && React.createElement(icon_1.Icon, { className: "spinner fg-info", icon: icon_1.Icon.Icomoon.spinner2 }),
                            React.createElement("div", { "data-id": "autocomplete-select-list", className: "autocomplete-select-list" + (this.state.showOnTop ? ' on-top' : ''), style: { maxHeight: (this.props.visibleItems || 3) * this.itemHeight + "px", marginTop: this.state.topOffset + "px" } },
                                this.state.filteredOptions && this.state.filteredOptions.map(function (o, i) {
                                    return React.createElement("div", { "data-index": i, key: "dd-item-" + i, className: "dd-list-item" + (i === _this.state.selectedIndex ? ' selected' : '') + ((_this.props.multiSelect && _.some(_this.state.selectedValue, function (ddo) { return ddo.id === o.id; })) ? ' in-selected-list' : ''), onClick: function () { return _this.handleSelection(o); } }, o.name);
                                }),
                                this.state.filteredOptions.length === 0 && this.state.query && React.createElement("div", { className: "dd-list-item-no-select" }, this.props.noResultsMessage || "No results...")))),
                this.props.hasGoButton && !this.props.multiSelect && React.createElement(grid_1.Col, { width: "auto" },
                    React.createElement(button_1.Button, { className: "bg-positive", onClick: function () { return _this.buttonClick(); } }, this.props.goButtonContent || "Go")))));
    };
    return AutoCompleteInput;
}(React.Component));
AutoCompleteInput.defaultProps = {
    remoteThrottle: 500,
    minimumLength: 1
};
exports.AutoCompleteInput = AutoCompleteInput;
