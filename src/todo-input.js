import React from "react";

const todoInput = {
    width: "50%",
    padding: "8px 0",
};

export default class TodoInput extends React.Component {
    inputEvent = event => {
        const { target, key } = event;

        if (key === "Enter") {
            this.props.addItem(target.value);
            target.value = "";
        };
    };

    render() {
        return <input onKeyUp={this.inputEvent} style={todoInput} />
    };
};