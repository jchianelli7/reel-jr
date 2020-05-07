import React from "react";
import { Link } from "react-router-dom";

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = { movie: { actors: "" } };

        this.addHtmlEntities = this.addHtmlEntities.bind(this);
    }

    componentDidMount() {
        const {
            match: {
                params: { id }
            }
        } = this.props;

        const url = `/api/v1/show/${id}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.setState({ movie: response }))
            .catch(() => this.props.history.push("/movies"));
    }

    addHtmlEntities(str) {
        return String(str)
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    render() {
        const { movie } = this.state;
        let actorsList = "No actors available";

        if (movie.actors.length > 0) {
            actorsList = movie.actors
                .split(",")
                .map((actor, index) => (
                    <li key={index} className="list-group-item">
                        {actor}
                    </li>
                ));
        }
        const moviePlot = this.addHtmlEntities(movie.plot);

        return (
            <div className="">
                <div className="hero position-relative d-flex align-items-center justify-content-center">
                    <img
                        src={movie.poster}
                        alt={`${movie.title} image`}
                        className="img-fluid position-absolute"
                    />
                    <div className="overlay bg-dark position-absolute" />
                    <h1 className="display-4 position-relative text-white">
                        {movie.title}
                    </h1>
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-sm-12 col-lg-3">
                            <ul className="list-group">
                                <h5 className="mb-2">Actors</h5>
                                {actorsList}
                            </ul>
                        </div>
                        <div className="col-sm-12 col-lg-7">
                            <h5 className="mb-2">Plot</h5>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: `${moviePlot}`
                                }}
                            />
                        </div>
                        <div className="col-sm-12 col-lg-2">
                            <button type="button" className="btn btn-danger">
                                Delete Movie
                            </button>
                        </div>
                    </div>
                    <Link to="/movies" className="btn btn-link">
                        Back to movies
                    </Link>
                </div>
            </div>
        );
    }
}

export default Movie;