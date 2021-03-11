import React from 'react';

import ShowCarusel from '../components/home/Carusel';
import Show from "../components/home/Show";
import ShowAbout from "../components/home/About";

function ShowHome() {
    return (
        <div className="main">
            <ShowCarusel/>
            <Show/>
            <ShowAbout/>

        </div>
    );
}

export default ShowHome;