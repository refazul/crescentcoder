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
        setInterval(() => {
            setData(data => data.map((d, i) => (i == Math.floor(Math.random() * 9)) ? d + (Math.floor(Math.random() * 2) == 0 ? 1 : -1) : d))
        }, 100);
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