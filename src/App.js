import React from "react";
import employees from "./employees.json";
import Searchbar from "./components/searchbar";
import Title from "./components/title/index";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";

// compare names and sort appropriately
const sortTypes = {
    up: {
        class: "sort-up",
        fn: (a, b) => a.name.localeCompare(b.name)
    },
    down: {
        class: "sort-down",
        fn: (a, b) => b.name.localeCompare(a.name)
    },
    default: {
        class: "sort",
        fn: (a, b) => a
    }
};

class App extends React.Component {
    state = {
        currentSort: "default",
        search: "",
        results: employees
    };

    // method called when label name is clicked
    onSortChange = () => {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === "down") nextSort = "default";
        else if (currentSort === "up") nextSort = "down";
        else if (currentSort === "default") nextSort = "up";

        this.setState({
            currentSort: nextSort
        });
    };

    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    render() {
        const data = employees;
        const { currentSort } = this.state;
        return (
            data.length > 0 && (
                <div>
                    <Title></Title>
                    <div className="container">
                        <div className="row search-bar-row">
                            <div className="col s4"></div>
                            <div className="col s4">
                                <Searchbar
                                    value={this.state.search}
                                    handleInputChange={this.handleInputChange}
                                />
                            </div>
                            <div className="col s4"></div>
                        </div>
                        <div className="row final-table-row">
                            <div className="col s12">
                                <table className="text-left">
                                    <thead>
                                        <tr>
                                            <th>Employee ID</th>
                                            <th>Photo</th>
                                            <th>
                                                Name
                                                <button
                                                    className="btn-flat"
                                                    id="arrow-btn"
                                                    onClick={this.onSortChange}
                                                ></button>
                                            </th>
                                            <th>Position</th>
                                            <th>Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...data]
                                            .sort(sortTypes[currentSort].fn)
                                            .filter(p =>
                                                p.key.includes(
                                                    this.state.search
                                                )
                                            )
                                            .map(p => (
                                                <tr>
                                                    <td>{p.id}</td>
                                                    <td>
                                                        <img
                                                            src={p.image}
                                                            alt="employee"
                                                        />
                                                    </td>
                                                    <td>{p.name}</td>
                                                    <td>{p.occupation}</td>
                                                    <td>{p.location}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default App;
