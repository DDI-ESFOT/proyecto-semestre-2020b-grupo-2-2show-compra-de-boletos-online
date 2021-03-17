import { Button, Content } from "antd";
import React, { useState } from "react";
import "../../css/EventoEnVivo.css";

export default function EventoEnVivo() {
  const [loading, setLoading] = useState("false");
  const [urlEvento, setUrlEvento] = useState(
    "https://www.youtube.com/embed/bgZHX_olZeI"
  );
  const [enterEvent, setEnterEvent] = useState(false);

  return (
    <div>
      <div className="blockEvento">
        <div className="videoBlock">
          {enterEvent ? (
            <div>
              <iframe
                width="100%"
                height="570px"
                src="https://www.youtube.com/embed/Rg3_vTMFc8I"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
                       picture-in-picture"
                title="Evento en Vivo"
                showinfo="0"
              ></iframe>
              <div className="btnBar">
                <Button
                className="btnEvent"
                >Donar</Button>
                <Button
                className="btnEvent"
                >Pase Gold</Button>
                <Button
                className="btnEvent"
                >Salir</Button>

              </div>
            </div>
          ) : (
            <div>
              <h1>Bienvenido al Evento</h1>
              <Button
                type="dashed"
                onClick={(event) => setEnterEvent(true)}
                className="btnIngresar"
              >
                Ingresar Evento
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
