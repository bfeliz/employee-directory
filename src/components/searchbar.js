import React, { Component } from "react";
import ReactSearchBox from "react-search-box";
import employees from "../employees.json";

export default class App extends Component {
    data = employees;

    render() {
        return (
            <ReactSearchBox
                placeholder="Search"
                data={this.data}
                callback={record => console.log(record)}
            />
        );
    }
}
