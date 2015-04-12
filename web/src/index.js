var $ = require("jquery");
var React = require("react");
var Router = require("react-router");

var App = require("./app/App");

$(document).ready(function() {
    Router.run(App.routes(), Router.HistoryLocation, function(Handler) {
        React.render(React.createElement(Handler), document.body);
    });
});
