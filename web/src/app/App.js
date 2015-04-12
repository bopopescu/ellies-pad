//var color = require("color");
var React = require("react");

//var CreateTask = require("../task/CreateTask");
var ViewMixin = require("../common/ViewMixin");

var App = React.createClass({
    mixins: [ViewMixin],

    getStyles: function() {
        return {
            color: "#ff0000"
        };
    },

    render: function() {
        return React.DOM.div({
                style: this.getBuiltStyles()
            },
            "hello");
    }
});

module.exports = App;
