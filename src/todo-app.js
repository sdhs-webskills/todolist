import React from "react";
import TodoInput from "./todo-input";
import TodoList from "./todo-list";
import TodoFilter from "./todo-filter";

export default class TodoApp extends React.Component {
    constructor() {
        super();

        this.state = {
            type: "all",
            list: [],
            filteredList: [],
            addItem: this.addItem,
            deleteItem: this.deleteItem,
            setFilter: this.setFilter,
        };
    };

    addItem = text => this.setState({ list: [...this.state.list, { text: text, state: "active" }] });
    deleteItem = id => {
        this.state.list.splice(id, 1);
        this.setState({ list: this.state.list });
    };

    setFilter = type => this.setState({ type: type });

    render() {
        return (
            <>
                <TodoInput addItem={this.state.addItem} />
                <TodoList list={this.state.list} type={this.state.type} deleteItem={this.state.deleteItem} />
                <TodoFilter setFilter={this.state.setFilter} />
            </>
        );
    };
};