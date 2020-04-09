import React, { Component, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { sidebarmenu_data, datatable_data, flare_data } from './data';
import Sidebarmenu from "./sidebarmenu";
import Carousel from "./carousel";
import Datatable from "./datatable";

import Barchart from './barchart';
import Dendrogram from './dendrogram';
import Radial from './radial';
import Collapsible from './collapsible';

const Main = (props) => {
    const [data, setData] = useState([50, 100, 150, 200, 250, 130, 210, 30, 170, 0, 500]);
    useEffect(() => {
        setInterval(() => {
            setData(data => data.map((d, i) => (i == Math.floor(Math.random() * 9)) ? d + (Math.floor(Math.random() * 2) == 0 ? 1 : -1) : d))
        }, 1000);
    }, [])
    return (
        <div className="wrapper">
            <section className="content-wrapper">
                <section className="content">
                    <Datatable {...datatable_data} />
                    <Barchart data={data} />
                    <Collapsible data={flare_data} />
                    <Radial data={flare_data} />
                    <Dendrogram data={flare_data} />
                </section>
            </section>
            <Sidebarmenu {...sidebarmenu_data} />
        </div>
    );
}
ReactDOM.render(<Main />, document.querySelector("#main"))