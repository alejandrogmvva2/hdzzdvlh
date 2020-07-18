import React, { useState } from "react";
import { useEmitEvent, useSocketDispatch } from "react-socket-io-hooks";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Particles from "react-particles-js";
import logo from "../../assets/logo.png";
import "./StreamerInput.scss";

const StreamerInput = () => {
  const [streamer, setStreamer] = useState("");
  const submitStreamer = useEmitEvent("STREAMER");
  const dispatch = useSocketDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    submitStreamer(streamer);
    dispatch({ type: "SET_STREAMER", payload: streamer });
    history.push("/requests");
  };

  const handleChange = ({ target }) => {
    setStreamer(target.value);
  };

  return (
    <section className="StreamerInput">
      <div className="streamer-input-content ">
        <img src={logo} />
        <div>
          <h2>
            Permite fácilmente a los espectadores solicitar videos de YouTube, directamente desde su
            chat de Twitch.
          </h2>
          <h3>
            ¡Introduce tu nombre de usuario de Twitch y empieza a escuchar las canciones que le mandan sus espectadores!
          </h3>
        </div>
      </div>

      <div className="form-container">
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="streamer-form"
        >
          <p>Entra tu nombre de Twitch:</p>
          <input
            className="form-input"
            onChange={handleChange}
            value={streamer}
            placeholder="Ejemplo: Tursky"
            required
          />
          <button type="submit" className="form-button">
            ENTRAR
          </button>
        </form>
      </div>
      
    </section>
  );
};

export default StreamerInput;
