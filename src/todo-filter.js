import React from "react";

const todoFilter = {
    width: "50%",
    display: "flex",
    justifyContent: "center",
};
const button = {
    margin: "20px 8px",
    padding: "0 10px",
    fontSize: "17px",
    border: "none",
    cursor: "pointer",
};

export default class TodoFilter extends React.Component{
    render() {
        return(
            <div id="todo-filter" style={todoFilter}>
                <button onClick={() => this.props.setFilter("all")} style={button}>all</button>
                <button onClick={() => this.props.setFilter("active")} style={button}>active</button>
                <button onClick={() => this.props.setFilter("complete")} style={button}>complete</button>
            </div>
        )
    };
}