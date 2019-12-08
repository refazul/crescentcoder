import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom";

import { sidebarmenu_data, datatable_data } from './data';
import Sidebarmenu from "./sidebarmenu";
import Carousel from "./carousel";
import Datatable from "./datatable";

export default function App() {
    return (
        <Router>
            <div className="wrapper">
                <nav style={{paddingLeft: '250px'}}>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/carousel">Carousel</Link></li>
                        <li><Link to="/datatable">Datatable</Link></li>
                    </ul>
                </nav>
                <section className="content-wrapper">
                    <section className="content">
                        {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/carousel">
                                <Carousel />
                            </Route>
                            <Route path="/datatable">
                                <Datatable {...datatable_data} />
                            </Route>
                            <Route path="/">
                                Home
                            </Route>
                        </Switch>
                    </section>
                </section>
                <Sidebarmenu {...sidebarmenu_data} />
            </div>
        </Router>
    );
}
ReactDOM.render(<App />, document.querySelector("#main"))