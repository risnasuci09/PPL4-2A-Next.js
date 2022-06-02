import React, { useEffect, useState } from "react";
import Logo from "../images/plnLogo.png"
import "./Sidebar.scss"
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";


export default function Sidebar(props) {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [openMaster, setOpenMaster] = useState(false);
  const [openNavItem,setNavItem] = useState({
    dashboard: false,
    master: false,
    fitproper: false,
    report:false
  })

  const processingNavActive = (key) =>{
    let temp = {
      dashboard: false,
      master: false,
      fitproper: false,
      report: false
    };

    if(key === "dashboard"){
      temp.dashboard = true;
    }else if(key === "master"){
      temp.master = true;
    }else if(key === "fitproper"){
      temp.fitproper = true;
    }else if(key === "report"){
      temp.report = true
    }

    setNavItem(temp);
  }

  useEffect(() => {

  });

  return (
    <aside className="main-sidebar sidebar-dark-warning elevation-4">
      <a href="#" className="brand-link">
        <img src={Logo} className="brand-image" />
        <span className="brand-text font-weight-dark">PLN Successor</span>
      </a>
      <div className="sidebar">
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column metismenu"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li
              className="nav-item"
              onClick={() => processingNavActive("dashboard")}
            >
              <NavLink
                to="/dashboard"
                className={openNavItem.dashboard ? "nav-link active" : "nav-link"}
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li
              className={ openNavItem.master? "nav-item menu-open" : "nav-item"}
              onClick={() => processingNavActive("master")}
            >
              <a
                href="#"
                className={ openNavItem.master ? "nav-link active" : "nav-link"}
              >
                <i className="nav-icon fas fa-edit"></i>
                <p>
                  Master
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview ml-4">
                <li className="nav-item">
                  <NavLink
                    to="/master/dataPeserta"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Data Peserta</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/master/dataPenguji"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Data Penguji</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* ================================ */}
            <li
              className={ openNavItem.fitproper? "nav-item menu-open" : "nav-item"}
              onClick={() => processingNavActive("fitproper")}
            >
              <a
                href="#"
                className={ openNavItem.fitproper ? "nav-link active" : "nav-link"}
              >
                <i className="nav-icon fas fa-chalkboard-teacher"></i>
                <p>
                  Fit & Proper
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview ml-4">
                <li className="nav-item">
                  <NavLink
                    to="/fit-proper/pendaftaran"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Pendaftaran Fit-Proper</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/fit-proper/penilaian"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Penilaian Fit-Proper</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/wawancara/pendaftaran"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Pendaftaran Wawancara</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/wawancara/penilaian"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Penilaian Wawancara</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* =============== */}
            <li
              className={ openNavItem.report? "nav-item menu-open" : "nav-item"}
              onClick={() => processingNavActive("report")}
            >
              <a
                href=""
                className={ openNavItem.report? "nav-link active" : "nav-link"}
              >
                <i className="nav-icon far fa-clipboard"></i>
                <p>
                  Report
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview ml-4">
                <li className="nav-item">
                  <NavLink
                    to="/reports/hasil-fit-proper"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Hasil Nilai Fit & Proper</p>
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink
                    to="/#"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Cetak Nilai Fit & Proper</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/#"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Rekap Nilai Wawancara</p>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/#"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <p>Cetak Nilai Wawancara</p>
                  </NavLink>
                </li> */}
                
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
