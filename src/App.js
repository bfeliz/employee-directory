import React from "react";
import employees from "./employees.json";
import Searchbar from "./components/searchbar";
// import M from "materialize-css";
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
        currentSort: "default"
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

    render() {
        const data = employees;
        const { currentSort } = this.state;

        return (
            data.length > 0 && (
                <div className="container">
                    <Searchbar></Searchbar>
                    <table className="text-left">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Photo</th>
                                <th>
                                    Name
                                    <button
                                        className="btn-flat"
                                        onClick={this.onSortChange}
                                    >
                                        click me
                                    </button>
                                </th>
                                <th>Position</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...data]
                                .sort(sortTypes[currentSort].fn)
                                .map(p => (
                                    <tr>
                                        <td>{p.id}</td>
                                        <td>
                                            <img src={p.image} alt="employee" />
                                        </td>
                                        <td>{p.name}</td>
                                        <td>{p.occupation}</td>
                                        <td>{p.location}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )
        );
    }
}

export default App;
