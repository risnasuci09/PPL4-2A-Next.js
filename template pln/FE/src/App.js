import React, { useState } from "react";
// import logo from "./logo.svg";
// import { Button, Row, Col, Modal, Container, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SideNav from "./component/SideNav/SideNav";
// import Nav from "./component/Nav/Nav";
import Dash from "./component/Dashboard";
import DataPenguji from "./component/Master/DataPenguji";
import DataPeserta from "./component/Master/DataPeserta";
import PendaftaranFitProper from "./component/FitProper/PendaftaranFitProper/index";
import PendaftaranWawancara from "./component/FitProper/PendaftaranWawancara/index";
import PenilaianFitProper from "./component/FitProper/PenilaianFitProper";
import PenilaianWawancara from "./component/FitProper/PenilaianWawancara";
import JadwalFitProper from "./component/FitProper/JadwalFitProper/Index";

function App() {
  const [leftActive, setLeftActive] = useState(false);
  return (
    <>
      
      <div>
        <SideNav
          onLeft={leftActive}
          onSide={() => setLeftActive(!leftActive)}
        />
        <div className="container1">
        <div className={leftActive ? "main active" : "main"}>
          
          <Router>
            <Routes>
              <Route path="/" exact element={<Dash />} />
              {/* Master */}
                <Route path="/master/data-peserta" element={<DataPeserta />} />
                <Route path="/master/data-penguji" element={<DataPenguji />} />
              {/* Fit Proper */}
                <Route
                  path="/fit-proper/pendaftaran-fit-proper"
                  element={<PendaftaranFitProper />}
                />
                <Route
                  path="/fit-proper/pendaftaran-wawancara"
                  element={<PendaftaranWawancara />}
                />
                <Route
                  path="/fit-proper/penilaian-wawancara"
                  element={<PenilaianWawancara />}
                />
                <Route
                  path="/fit-proper/penilaian-fit-proper"
                  element={<PenilaianFitProper />}
                />
                <Route
                  path="/fit-proper/jadwal"
                  element={<JadwalFitProper />}
                />
            </Routes>
          </Router>
        </div></div>
      </div>
    </>
  );
}

export default App;