import React, { useState } from "react";
import Logo from "../../images/plnLogo.png";
import { Collapse } from "react-bootstrap";
import "./SideNav.css";
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as FaIcons from 'react-icons/fa';
// import { Button,Collapse } from "bootstrap";

function SideNav() {
  const [openMaster, setOpenMaster] = useState(false);
  const [openFitProper, setOpenFitProper] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  return (
    <div className="sidenav">
      <div className="title">
        <img alt="" src={Logo} width="40" height="50" />
        <h4>PLN Sucessor</h4>
      </div>
      <div className="kolom">
        <AiIcons.AiFillDashboard style={{  verticalAlign:'middle'  }} size={20}/>
        <a href="/" className="btn">Dashboard</a>
      </div>
      <br></br>

      {/* Dropdown Master */}
      <div
        className="dropdown"
        onClick={() => setOpenMaster(!openMaster)}
        aria-controls="master"
        aria-expanded={openMaster}
      >
        <AiIcons.AiFillEdit style={{verticalAlign:'top'}} size={20}/>
        <p>Master</p>
        <AiIcons.AiOutlineDown style={{verticalAlign:'top',marginLeft:123}} size={20}/>
      </div>
      <Collapse in={openMaster}>
        <div id="master" className="sub-collapse">
          <a href="/master/data-peserta">
            Data Peserta
          </a>
          <a  href="/master/data-penguji">
            Data Penguji
          </a>
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
        <AiIcons.AiFillCalendar style={{verticalAlign:'top'}} size={20}/>
        <p>Fit & Proper</p>
        <AiIcons.AiOutlineDown style={{verticalAlign:'top',marginLeft:88}} size={20}/>
      </div>
      <Collapse in={openFitProper}>
        <div id="fitproper" className="sub-collapse">
        <a   href="/fit-proper/pendaftaran-fit-proper">
          Pendaftaran Fit & Proper
        </a>
        <a   href="/fit-proper/pendaftaran-wawancara">
          Pendaftaran Wawancara
        </a>
        <a   href="/fit-proper/penilaian-fit-proper">
          Penilaian Fit & Proper
        </a>
        <a   href="/fit-proper/penilaian-wawancara">
          Penilaian Wawancara
        </a>
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
        <AiIcons.AiFillCopy style={{verticalAlign:'top'}} size={20}/>
        <p>Report</p>
        <AiIcons.AiOutlineDown style={{verticalAlign:'top',marginLeft:124}} size={20}/>
      </div>
      <Collapse in={openReport}>
        <div id="report" className="sub-collapse">
          <a  href="/">
            Rekap Nilai Fit & Proper
          </a>
          <a  href="/">
            Rekap Manual Fit & Proper
          </a>
          <a  href="/">
            Cetak Nilai Fit & Proper
          </a>
          <a  href="/">
            Rekap Nilai Wawancara
          </a>
          <a  href="/">
            Cetak Nilai Wawancara
          </a>
        </div>
      </Collapse>
      {/* akhir Report */}
      <div className="kolom">
        <MdIcons.MdPersonSearch style={{verticalAlign:'middle'}} size={20}/>
        <a href="#contact" className="btn">Pencarian Fit & Proper</a>
        {/* <AiIcons.AiOutlineDown style={{verticalAlign:'middle'}} size={20}/> */}
      </div>
      <br></br>
      <div className="kolom">
      <FaIcons.FaUsers style={{verticalAlign:'middle'}} size={20}/>
        <a href="#contact" className="btn">Administrasi Users</a>
        {/* <AiIcons.AiOutlineDown style={{verticalAlign:'middle',marginLeft:27}} size={20}/> */}
      </div>
      
      
    </div>
  );
}

export default SideNav;
