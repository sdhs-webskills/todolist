import React from "react";
import TodoItem from "./todo-item";

const todoList = {
    width: "50%",
};

export default class TodoList extends React.Component {
    render() {
        return (
            <div id="todo-list" style={todoList}>
                {
                (this.props.type === "all" ? this.props.list : this.props.list.filter(item => item.state === this.props.type))
                .map((item, index) => <TodoItem key={index} id={index} item={item} {...this.props} />)
                }
            </div>
        );
    };
};