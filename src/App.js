import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Plot from "react-plotly.js";
import "./App.css";
import React from 'react';
import Navbar from './navbar.js';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function App() {
  const [data, setData] = useState({ x: [], voltage: [], preassure: [], latitude: [], longitude: [], altitude: [],});
  const [i, setI] = useState(0);

  // Inisialisasi koordinat marker
  const fixedCoordinates = { latitude: -7.765698, longitude: 110.371153 };

  const [coordinates] = useState(fixedCoordinates);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulasi data dalam plot
      setData((prevData) => {
        const newVoltage = Math.random() * 20; 
        const newPreassure = Math.random() * 30 + 10; 
        const newLatitude = Math.random() * (0.01) + (-7.765679330440511 - 0.005); 
        const newLongitude = Math.random() * (0.02) + (110.36);  
        const newAltitude = Math.random() * 1000 + 100; 

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

    return () => clearInterval(interval); 
  }, [i]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-5">
      <Navbar />
      <h2>GPS</h2>
      <div className="flex flex-col w-[100%] p-2 gap-2">
        {/* Map Section */}
        <div className="map-container" style={{ width: "100%", height: "700px" }}>
        <MapContainer
          center={[fixedCoordinates.latitude, fixedCoordinates.longitude]} // Use fixed coordinates for center
          zoom={13}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            <Marker position={[fixedCoordinates.latitude, fixedCoordinates.longitude]}> 
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