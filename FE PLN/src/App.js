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
import DataPeserta from "./component/Master/DataPeserta/Index";
import AddPenguji from "./component/Master/DataPenguji/add";
import AddPeserta from "./component/Master/DataPeserta/Add";
import PendaftaranFitProper from "./component/FitProper/PendaftaranFitProper";
import PendaftaranWawancara from "./component/FitProper/PendaftaranWawancara";
import PenilaianFitProper from "./component/FitProper/PenilaianFitProper";
import PenilaianWawancara from "./component/FitProper/PenilaianWawancara";

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
        <div class={leftActive ? "main active" : "main"}>
          
          <Router>
            <Routes>
              <Route path="/" exact element={<Dash />} />
              <Route path="/master/data-peserta" element={<DataPeserta />} />
              <Route path="/master/data-penguji" element={<DataPenguji />} />
              <Route path="/master/data-penguji/add" element={<AddPenguji />} />
              <Route path="/master/data-peserta/Add" element={<AddPeserta />} />
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
            </Routes>
          </Router>
        </div></div>
      </div>
    </>
  );
}

export default App;