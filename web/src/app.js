var React = require("React");

var App = React.createClass({
    render: function() {
        return React.DOM.div(null, process.env.NODE_ENV);
    }
});

React.render(React.createElement(App), document.getElementById("App"));
