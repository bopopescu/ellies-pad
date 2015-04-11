var radium = require("radium");
var React = require("react");

// TODO:
// Pull lightening and darkening colors into a helper.
// When a new tag is added, list should update.
// Creating a new tag should be a typeahead, not a text field.
// Listed tags should (maybe) be links that you can click through on (need to save creation state)
// Do something nicer when the tags overflow.


var TextField = React.createClass({
    mixins: [radium.StyleResolverMixin, radium.BrowserStateMixin],

    getStyles: function() {
        return React.__spread({
            borderRadius: 3,
            border: "none",
            display: "flex",
            textAlign: "center",
            states: [{
                focus: {
                    outline: "none"
                }
            }]
        }, this.props.style);
    },

    render: function() {
        var styles = this.buildStyles(this.getStyles());
        return React.createElement("input", React.__spread({
            placeholder: this.props.placeholder,
            style: styles
        }, this.getBrowserStateEvents()));
    }
});

var AddTags = React.createClass({
    getStyles: function() {
        return React.__spread({
            color: this.props.color.clone().darken(0.5).hexString(),
            display: "flex",
            flexDirection: "column",
            fontSize: 14,
            textAlign: "center"
        }, this.props.style);
    },

    render: function() {
        var tags = this.props.currentTags;

        var addNewTag = React.createElement(TextField, {
            placeholder: "+ Add Tag",
            style: {
                color: this.props.color.clone().darken(0.5).hexString(),
                flexShrink: 0,
                fontSize: 14,
                marginBottom: 5
            }
        });

        var renderedTags = tags.map(function(tagName) {
            return React.DOM.div({
                style: {}
            }, "#" + tagName);
        });

        var styles = this.getStyles();

        return React.DOM.div({
                style: styles
            },
            addNewTag,
            React.DOM.div({
                    style: {
                        overflowY: "scroll"
                    }
                },
                renderedTags));
    }
});

var Button = React.createClass({
    mixins: [radium.StyleResolverMixin, radium.BrowserStateMixin],

    getStyles: function() {
        var pressed = this.props.color.clone().darken(0.5).hexString();
        var unpressed = this.props.color.hexString();

        return React.__spread({
            alignItems: "center",
            backgroundColor: unpressed,
            borderRadius: 3,
            color: "white",
            display: "flex",
            justifyContent: "center",

            states: [{
                hover: {
                    backgroundColor: pressed
                }
            }]
        }, this.props.style);
    },

    render: function() {
        var styles = this.buildStyles(this.getStyles());
        return React.createElement("div", React.__spread({
                style: styles
            },
            this.getBrowserStateEvents()
        ), this.props.text);
    }
});

var CreateTask = React.createClass({
    getStyles: function() {
        return {
            borderRadius: 4,
            boxShadow: "0 22px 70px rgba(0, 0, 0, 0.56)",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Open Sans', 'Helvetica Neue', Helvetica, sans-serif",
            maxHeight: 150,
            padding: 10,
            paddingTop: 20,
            width: 350
        };
    },

    render: function() {
        var styles = this.getStyles();
        var color = this.props.color;

        var taskName = React.createElement(TextField, {
            placeholder: "Task Name",
            style: {
                alignSelf: "center",
                borderBottom: "solid 2px " + color.hexString(),
                color: color.clone().darken(0.5).hexString(),
                flexShrink: 0,
                fontSize: 20,
                marginBottom: 10,
                width: "90%"
            }
        });

        var addTags = React.createElement(AddTags, {
            color: color,
            currentTags: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            style: {
                alignSelf: "center"
            }
        });

        var createTaskButton = React.createElement(Button, {
            color: color.clone(),
            text: "+",
            style: {
                alignSelf: "flex-end",
                flexShrink: 0,
                fontSize: 15,
                fontWeight: "bold",
                height: 30,
                width: 50
            }
        });

        return React.DOM.div({
                style: styles
            },
            taskName,
            addTags,
            createTaskButton);
    }
});


module.exports = CreateTask;
