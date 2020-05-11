import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../components/Home";
import Movies from "../components/Movies";
import Movie from "../components/Movie";
import NewMovie from "../components/NewMovie";

// imported Home component, which will be rendered whenever a request matches the root (/) route.
export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/movies" exact component={Movies} />
            <Route path="/movie/:id" exact component={Movie} />
            <Route path="/movie" exact component={NewMovie} />
        </Switch>
    </Router>
);