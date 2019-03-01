"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var _ = require("underscore");
var classNames = require("classnames");
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        var _this = _super.call(this) || this;
        _this.state = { source: "" };
        return _this;
    }
    Image.prototype.getRandomUser = function () {
        var _this = this;
        var url = "http://api.randomuser.me/?exc=login,name,location,email,registered,dob,phone,cell,id,nat" + (this.props.sampleUserSeed ? "&seed=" + this.props.sampleUserSeed : '');
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var response = JSON.parse(xmlHttp.responseText);
                var pictureUrl = response.results[0].picture.large;
                _this.setState({ source: pictureUrl });
            }
        };
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    };
    Image.prototype.componentDidMount = function () {
        var height = this.props.height;
        var width = this.props.width;
        if (!this.props.height && this.props.width) {
            height = this.props.width;
        }
        if (!this.props.width && this.props.height) {
            width = this.props.height;
        }
        var source;
        if (this.props.source) {
            this.setState({ source: this.props.source });
        }
        else if (this.props.sampleUser) {
            this.getRandomUser();
        }
        else if (!this.props.noPlaceholder && !this.props.sampleUser) {
            this.setState({ source: "http://dummyimage.com/" + height + "x" + width + "/4f5c69/ffffff.png" });
        }
    };
    Image.prototype.render = function () {
        var attrs = _.omit(this.props, "height", "width", "noPlaceholder", "sampleUserSeed", "sampleUser", "source", "className", "rounded");
        return (React.createElement("img", __assign({ src: this.state.source }, attrs, { height: this.props.height, width: this.props.width, className: classNames(this.props.className, { "rounded": this.props.rounded }) })));
    };
    return Image;
}(React.Component));
exports.Image = Image;
