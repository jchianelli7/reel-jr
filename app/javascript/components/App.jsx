import React from "react";
import Routes from "../routes/Index";

// Exports a component that renders the routes within fragments. This component will be rendered at the entry point of the aplication, thereby making the routes available whenever the application is loaded.
export default props => <>{Routes}</>;