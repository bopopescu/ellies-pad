var $ = require("jquery");
var React = require("react");

var App = require("./app/App");

$(document).ready(function() {
    React.render(React.createElement(App), document.body);
});
