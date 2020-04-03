import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { sidebarmenu_data, datatable_data } from './data';
import Sidebarmenu from "./sidebarmenu";
import Carousel from "./carousel";
import Datatable from "./datatable";

import Barchart from './barchart';

const Main = (props) => {
    const [data, setData] = useState([50, 100, 150, 200, 250, 130, 210, 30, 170]);
    useEffect(() => {
        setTimeout(() => {
            setData(data => data.map(d => d + 1))
        }, 1000);
    }, [])
    return (
        <div className="wrapper">
            <section className="content-wrapper">
                <section className="content">
                    <Datatable {...datatable_data} />
                    <Barchart data={data} />
                    <Carousel />
                </section>
            </section>
            <Sidebarmenu {...sidebarmenu_data} />
        </div>
    );
}
ReactDOM.render(<Main />, document.querySelector("#main"))