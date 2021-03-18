import React from "react";
import ShowCarusel from "../components/home/Carusel";
import Show from "../components/home/Show";
import ShowAbout from "../components/home/About";
import HowFixShow from "../components/home/HowFixShow";

function HomePage() {
  return (
    <div className="main">
      <ShowCarusel />
      <Show />
      <HowFixShow />
      <ShowAbout />
    </div>
  );
}

export default HomePage;
