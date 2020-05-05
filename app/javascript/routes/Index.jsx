import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "../components/Home";

// imported Home component, which will be rendered whenever a request matches the root (/) route.
export default (
    <Router>
        <Switch>
            <Route path="/" exact component={Home}/>
        </Switch>
    </Router>
);