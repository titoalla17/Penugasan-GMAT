import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import Plot from "react-plotly.js";
import "./App.css";

function App() {
  const [data, setData] = useState("kosong");
  useEffect(() => {
    const socketio = io("http://localhost:3000", {
      transport: ["websocket"],
    });

    socketio.on("Connect", () => {
      console.log("CONNECTED");
    });

    socketio.on("message", (message) => {
      setData(message);
    });

  }, []);
  return (
    
    <div className="flex flex-col justify-center items-center w-full h-full p-5">
      {data}
    </div>
  );
}

export default App;