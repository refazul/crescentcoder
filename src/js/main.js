import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { sidebarmenu_data, datatable_data } from './data';
import Sidebarmenu from "./sidebarmenu";
import Carousel from "./carousel";
import Datatable from "./datatable";


export default class Main extends Component {
    render() {
        return (
            <div className="wrapper">
                <section className="content-wrapper">
                    <section className="content">
                        <Datatable {...datatable_data} />
                        <Carousel />
                    </section>
                </section>
                <Sidebarmenu {...sidebarmenu_data} />
            </div>
        );
    }
}
ReactDOM.render(<Main />, document.querySelector("#main"))