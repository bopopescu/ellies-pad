var color = require("color");
var React = require("react");

var CreateTask = require("./task/CreateTask");

var App = React.createClass({
    render: function() {
        return React.DOM.div({},
            // process.env.NODE_ENV,
            React.createElement(CreateTask, {
                color: color("#663399").clone().lighten(1)
            }));
    }
});

React.render(React.createElement(App), document.getElementById("App"));
