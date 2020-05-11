import React from "react";
import {Link} from "react-router-dom";

class NewMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actors: '',
            boxOffice: '',
            created_at: '',
            updated_at: '',
            directorr: '',
            genre: '',
            id: '',
            imdbId: '',
            plot: '',
            poster: '',
            rated: '',
            released: '',
            runtime: '',
            title: '',
            year: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }

    stripHtmlEntities(str) {
        return String(str)
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const {title} = this.state;

        if (title.length == 0)
            return;

        // If user created movie, get details from API
        var newUrl = 'http://www.omdbapi.com?apikey=3c5fc75b&t=' + title
        fetch(newUrl)
            .then(data => {
                return data.json()
            })
            .then(res => {
                const body = {
                    plot: res.Plot,
                    title: res.Title,
                    actors: res.Actors.replace(/\n/g, "<br> <br>"),
                    poster: res.Poster,
                    boxOffice: res.BoxOffice,
                    director: res.Director,
                    genre: res.Genre,
                    imdbId: res.imdbID,
                    rated: res.Rated,
                    released: res.Released,
                    runtime: res.Runtime,
                    year: res.Year
                }
                this.createMovie(body)
            })
            .catch(error => {
                console.log('unable to find movie')
                console.log(error)
            })
    }

    createMovie(body) {
        const url = "/api/v1/movies/create";
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: "POST",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => this.props.history.push(`/movie/${response.id}`))
            .catch(error => console.log(error.message));
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Add a new movie to our awesome movie collection.
                        </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Movie name</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>

                            <button type="submit" className="btn custom-button mt-3">
                                Create Movie
                            </button>
                            <Link to="/movies" className="btn btn-link mt-3">
                                Back to movies
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewMovie;