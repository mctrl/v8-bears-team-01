import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchPage extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            query: "",
            isLoading: false
        };
    }
    renderContent() {
        const projects = this.state.projects;
        return (
            <div>
                <h3>Showing Results for: {this.state.query}</h3>
                <div className="row mb-5 justify-content-center">
                    {this.state.projects.length === 0 && (
                        <p>No results found.</p>
                    )}
                    {projects.map(project => (
                        <div
                            className="col-sm-12 col-md-6 col-lg-3 p-3"
                            key={project._id}
                        >
                            <div className="card text-white bg-secondary m-0 mb-4">
                                <Link to={"/project/:" + project._id}>
                                    {" "}
                                    <img
                                        className="card-img-top"
                                        src="https://via.placeholder.com/100"
                                        alt=""
                                    />{" "}
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {!!project.projectName &&
                                            project.projectName}
                                    </h5>
                                    <p class="card-text">
                                        {!!project.description &&
                                            project.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    getResults = () => {
        fetch("/api/search" + this.props.location.search)
            .then(response => response.json())
            .then(data => {
                // window.localStorage.setItem("projectList", JSON.stringify(data.results));
                this.setState({
                    query: data.query,
                    projects: data.results,
                    isLoading: false
                });
            })
            .catch(err => console.log(err));
    };
    componentDidMount() {
        this.setState({ isLoading: true });
        this.getResults();
    }
    render() {
        return (
            <div>
                <div className="projects-list-container container">
                    <div className="text-center mt-5 mb-4">
                        {this.state.isLoading && (
                            <div
                                className="spinner-border"
                                style={{ width: "3rem", height: "3rem" }}
                                role="status"
                            >
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        {!!this.state.query && this.state.query.length > 0 ? (
                            this.renderContent()
                        ) : (
                            <p>Please enter a valid search term</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPage;
