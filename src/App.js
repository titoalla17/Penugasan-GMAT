import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Plot from "react-plotly.js";
import "./App.css";
import React from 'react';
import Navbar from './navbar.js';

function App() {
  const [data, setData] = useState({ x: [], voltage: [], preassure: [], latitude: [], longitude: [], altitude: [],});
  const [i, setI] = useState(0);
  const [coordinates, setCoordinates] = useState({
    latitude: -7.765679330440511,
    longitude: 110.3711746288335,});
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate data update
      setData((prevData) => {
        const newVoltage = Math.random() * 20; // Simulated voltage data
        const newPreassure = Math.random() * 30 + 10; // Simulated temperature data
        const newLatitude = Math.random() * (-7.765679330440511 - (-7.765679330440511)) + (-7.765679330440511); // Simulated latitude data
        const newLongitude = Math.random() * (110.38 - 110.36) + 110.36; // Simulated longitude data
        const newAltitude = Math.random() * 1000 + 100; // Simulated altitude data

        setCoordinates({ latitude: newLatitude, longitude: newLongitude });

        return {
          x: [...prevData.x, i],
          voltage: [...prevData.voltage.slice(-10), newVoltage],
          preassure: [...prevData.preassure.slice(-10), newPreassure],
          latitude: [...prevData.latitude.slice(-10), newLatitude],
          longitude: [...prevData.longitude.slice(-10), newLongitude],
          altitude: [...prevData.altitude.slice(-10), newAltitude],
        };
      });
      setI((prevI) => prevI + 1);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [i]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-5">
      <Navbar />
      <div className="title">GPS</div>
      <div className="flex flex-col w-[50%] p-2 gap-2">
        {/* Map Section */}
        <div className="map-container" style={{ width: "100%", height: "400px" }}>
          <MapContainer
            center={[-7.765679330440511, 110.3711746288335]}
            zoom={13}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-7.765679330440511, 110.3711746288335]}>
              <Popup>Payload Location</Popup>
            </Marker>
            {/* Coordinates Display */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)'
            }}>
              <strong>Coordinates:</strong><br />
              Latitude: {coordinates.latitude.toFixed(6)}<br />
              Longitude: {coordinates.longitude.toFixed(6)}
            </div>
          </MapContainer>
        </div>

      {/* Data Visualization Section */}
      <div className="plot-container">
        <h2>Real-Time Data Visualization</h2>

        {/* Voltage Plot */}
        <Plot
          data={[
            {
              x: data.x,
              y: data.voltage,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "blue" },
              line: { shape: "spline"},
              name: "Voltage"
            },
          ]}
          layout={{ title: "Voltage", width: 700, height: 400, showlegend: true, paper_bgcolor: "#f5f5dc", plot_bgcolor: "#f5f5dc" }}
        />

        {/* Preassure */}
        <Plot
          data={[
            {
              x: data.x,
              y: data.preassure,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
              line: { shape: "spline"},
              name: "Preassure"
            },
          ]}
          layout={{ title: "Preassure", width: 700, height: 400, showlegend: true, paper_bgcolor: "#f5f5dc", plot_bgcolor: "#f5f5dc"}}
          />

          {/* Latitude/Longitude */}
        <Plot
        data={[
          {
            x: data.x,
            y: data.altitude,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "green" },
            name: "Latitude",
            line: { shape: "spline"},
          },
          {            
            x: data.x,
            y: data.longitude,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "purple" },
            name: "Longitude",
            line: { shape: "spline"},
          },
        ]}
        layout={{ title: "Latitude/Longitude", width: 700, height: 400, showlegend: true, paper_bgcolor: "#f5f5dc", plot_bgcolor: "#f5f5dc" }}
        />

        {/* Altitude */}
        <Plot
          data={[
            {
              x: data.x,
              y: data.altitude,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "blue" },
              name: "Altitude",
              line: { shape: "spline"},
            },
          ]}
          layout={{ title: "Altitude", width: 700, height: 400, showlegend: true, paper_bgcolor: "#f5f5dc", plot_bgcolor: "#f5f5dc" }}
        />
        </div>
      </div>
    </div>
  );
}

export default App;
