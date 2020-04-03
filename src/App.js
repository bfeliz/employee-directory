import React from "react";
import API from "./utils/API";
import Searchbar from "./components/searchbar";
import Title from "./components/title/index";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";

// compare names for sort function
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
        results: []
    };

    // API call and reorganization of data
    componentDidMount() {
        API.getUsers()
            .then(json =>
                json.data.results.map(result => ({
                    name: `${result.name.first} ${result.name.last}`,
                    searchName: `${result.name.first}${result.name.last}`,
                    id: result.registered.date,
                    photo: result.picture.thumbnail,
                    email: result.email,
                    phone: result.phone
                }))
            )
            .then(newData => this.setState({ results: newData }))
            .catch(error => alert(error));
    }

    // function when sort button is clicked
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

    // listen for change in search bar
    handleInputChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    };

    render() {
        const data = this.state.results;
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
                                            <th>
                                                Name
                                                <button
                                                    className="btn-flat"
                                                    id="arrow-btn"
                                                    onClick={this.onSortChange}
                                                ></button>
                                            </th>
                                            <th>Photo</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...data]
                                            .sort(sortTypes[currentSort].fn)
                                            .filter(p =>
                                                p.searchName
                                                    .toLowerCase()
                                                    .includes(this.state.search)
                                            )
                                            .map(p => (
                                                <tr>
                                                    <td>{p.name}</td>
                                                    <td>
                                                        <img
                                                            src={p.photo}
                                                            alt="employee"
                                                        />
                                                    </td>
                                                    <td>{p.email}</td>
                                                    <td>{p.phone}</td>
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
