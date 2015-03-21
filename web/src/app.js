var React = require("React");

var App = React.createClass({
  render: function() {
    return React.DOM.div(null, "Hello, World!");
  }
});

React.render(React.createElement(App), document.getElementById("App"));
