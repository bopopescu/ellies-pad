var _ = require("lodash");
var React = require("react");
var radium = require("radium");

var ViewMixin = {
    mixins: [radium.StyleResolverMixin],

    propTypes: {
        style: React.PropTypes.shape({
            width: React.PropTypes.oneOfType([
                React.PropTypes.number,
                React.PropTypes.string
            ]),
            height: React.PropTypes.oneOfType([
                React.PropTypes.number,
                React.PropTypes.string
            ])
        })
    },

    // getBaseStyles returns the default styles for every view in Ellie's Pad.
    _getBaseStyles: function() {
        return {
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
            color: "#000000",
            display: "flex",
            fontSize: 14,
            fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, sans-serif",
            listStyleType: "none",
            margin: 0,
            padding: 0,
            textDecoration: "none"
        };
    },

    // getBuiltStyles returns the radium built object representing:
    // - the default view styles merged with
    // - the component's declared styles merged with
    // - the styles provided by the parent through props
    // TODO @daniel Use inheritance and call everything `getStyles` once React supports it.
    getBuiltStyles: function() {
        var styles = _.merge({}, this._getBaseStyles(), this._getDefinedStyles(), this._getPropsStyles());
        return this.buildStyles(styles);
    },

    _getDefinedStyles: function() {
        return this.getStyles ? this.getStyles() : {};
    },

    _getPropsStyles: function() {
        return this.props.style || {};
    }
};

module.exports = ViewMixin;
