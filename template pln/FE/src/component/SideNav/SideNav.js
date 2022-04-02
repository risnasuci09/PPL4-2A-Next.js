import React, { useState } from "react";
import Logo from "../../images/plnLogo.png";
import { Collapse, Button, Row, Col } from "react-bootstrap";
import "./SideNav.css";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
// import Nav from "../Nav/Nav";
// import { Button,Collapse } from "bootstrap";

function SideNav(props) {
  // const [sidebar, setSidebar] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);
  const [openFitProper, setOpenFitProper] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  return (
    <>
      <div className={props.onLeft ? "navbar" : "navbar active"}>
        <Button className="btn-secondary" onClick={props.onSide}>
          <AiIcons.AiOutlineMenu />
        </Button>
      </div>
      <div className={props.onLeft ? "sidenav" : "sidenav active"}>
        <div className="title">
          <img alt="" src={Logo} width="40" height="50" />
          <h4>PLN Successor</h4>
        </div>
        <div className="kolom">
          <Row>
            <Col md={{ span: 2 }}>
              <AiIcons.AiFillDashboard
                style={{ verticalAlign: "top" }}
                size={20}
              />
            </Col>
            <Col>
              <a href="/">Dashboard</a>
            </Col>
          </Row>
        </div>

        {/* Dropdown Master */}
        <div
          className="dropdown"
          onClick={() => setOpenMaster(!openMaster)}
          aria-controls="master"
          aria-expanded={openMaster}
        >
          <Row>
            <Col md={{ span: 2 }}>
              <AiIcons.AiFillEdit style={{ verticalAlign: "top" }} size={20} />
            </Col>
            <Col md={{ span: 7 }}>
              <p>Master</p>
            </Col>
            <Col>
              <AiIcons.AiOutlineDown
                style={{ verticalAlign: "top" }}
                size={20}
              />
            </Col>
          </Row>
        </div>
        <Collapse in={openMaster}>
          <div id="master" className="sub-collapse">
            <a href="/master/data-peserta">Data Peserta</a>
            <a href="/master/data-penguji">Data Penguji</a>
          </div>
        </Collapse>
        {/* akhir Dropdown Master */}
        {/* ========================================================================================= */}
        {/* Dropdown Fit & Proper */}
        <div
          className="dropdown"
          onClick={() => setOpenFitProper(!openFitProper)}
          aria-controls="fitproper"
          aria-expanded={openFitProper}
        >
          <Row>
            <Col md={{ span: 2 }}>
              <AiIcons.AiFillCalendar
                style={{ verticalAlign: "top" }}
                size={20}
              />
            </Col>
            <Col md={{ span: 7 }}>
              <p>Fit & Proper</p>
            </Col>
            <Col>
              <AiIcons.AiOutlineDown
                style={{ verticalAlign: "top" }}
                size={20}
              />
            </Col>
          </Row>
        </div>
        <Collapse in={openFitProper}>
          <div id="fitproper" className="sub-collapse">
            <a href="/fit-proper/pendaftaran-fit-proper">
              Pendaftaran Fit & Proper
            </a>
            <a href="/fit-proper/pendaftaran-wawancara">
              Pendaftaran Wawancara
            </a>
            <a href="/fit-proper/penilaian-fit-proper">
              Penilaian Fit & Proper
            </a>
            <a href="/fit-proper/penilaian-wawancara">Penilaian Wawancara</a>
          </div>
        </Collapse>
        {/* akhir Dropdown Fit & Proper */}
        {/* Dropdown Report */}
        <div
          className="dropdown"
          onClick={() => setOpenReport(!openReport)}
          aria-controls="report"
          aria-expanded={openReport}
        >
          <Row>
            <Col md={{ span: 2 }}>
              <AiIcons.AiFillCopy style={{ verticalAlign: "top" }} size={20} />
            </Col>
            <Col md={{ span: 7 }}>
              <p>Report</p>
            </Col>
            <Col>
              <AiIcons.AiOutlineDown
                style={{ verticalAlign: "top" }}
                size={20}
              />
            </Col>
          </Row>
        </div>
        <Collapse in={openReport}>
          <div id="report" className="sub-collapse">
            <a href="/">Rekap Nilai Fit & Proper</a>
            <a href="/">Rekap Manual Fit & Proper</a>
            <a href="/">Cetak Nilai Fit & Proper</a>
            <a href="/">Rekap Nilai Wawancara</a>
            <a href="/">Cetak Nilai Wawancara</a>
          </div>
        </Collapse>
        {/* akhir Report */}
        <div className="kolom">
          <Row>
            <Col md={{ span: 2 }}>
              <MdIcons.MdPersonSearch
                style={{ verticalAlign: "middle" }}
                size={20}
              />
            </Col>
            <Col>
              <a href="#contact">Pencarian Fit & Proper</a>
            </Col>
          </Row>
        </div>
        <div className="kolom">
        <Row>
            <Col md={{ span: 2 }}>
            <FaIcons.FaUsers style={{ verticalAlign: "middle" }} size={20} />
            </Col>
            <Col>
            <a href="#contact">
            Administrasi Users
          </a>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default SideNav;
