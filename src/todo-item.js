import React from "react";

const todoItem = {
    display: "grid",
    gridTemplateColumns: "10% 80% 10%",
    cursor: "pointer",
};
const div = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
};
const deleteButton = {
    color: "red",
    background: "none",
    border: "none",
    outline: "none",
    cursor: "pointer",
};

export default class TodoItem extends React.Component{
    complete = id => {
        this.props.list[id].state = this.props.list[id].state === "active" ? "complete" : "active";

        this.setState({ list: [...this.props.list] });
    };

    update = text => {
        this.props.list[this.props.id].text = text;

        this.setState({ list: [...this.props.list] });
    };

    rewrite = ({ target }) => {
        target.innerHTML = "";
        
        const rewriteInput = document.createElement("input");
        rewriteInput.value = this.props.item.text;
        rewriteInput.addEventListener("keyup", ({ target, key }) => key === "Enter" ? this.update(target.value) : false );
        rewriteInput.addEventListener("blur", ({ target }) => this.update(target.value));
        
        target.append(rewriteInput);
        rewriteInput.focus();
    };

    render() {
        return (
            <div className="todo-item" key={this.props.id} style={todoItem}>
                <input type="checkbox" onChange={() => this.complete(this.props.id)} checked={this.props.item.state === "complete" ? "cheked" : ""} />
                <div onDoubleClick={this.rewrite} style={div}>{this.props.item.text}</div>
                <button onClick={() => this.props.deleteItem(this.props.id)} style={deleteButton}>X</button>
            </div>
        );
    };
};