var React = require("react");
var Router = require("react-router");

var CreateTask = require("../task/CreateTask");
var ViewMixin = require("../common/ViewMixin");

var App = React.createClass({
    mixins: [ViewMixin],

    statics: {
        routes: function() {
            return React.createElement(Router.Route, {
                    name: "/app/App",
                    path: "/",
                    handler: App
                },
                CreateTask.routes()
            );
        }
    },

    getStyles: function() {
        return {
            height: "100%"
        };
    },

    render: function() {
        return React.DOM.div({
                style: this.getBuiltStyles()
            },
            "Ellie's Pad",
            React.createElement(Router.RouteHandler)
        );
    }
});

module.exports = App;
