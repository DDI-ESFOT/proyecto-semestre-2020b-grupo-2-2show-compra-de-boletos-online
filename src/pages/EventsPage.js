import React from "react";
import { useEffect } from "react";
import { db } from "../firebase";

import ShowEvent from "../components/ShowEvent";
import CarucelEvents from "../components/events/CarucelEvents";

function EventsPage() {
  return (
    <div className="main">
      <CarucelEvents />
      <ShowEvent />
    </div>
  );
}
export default EventsPage;
