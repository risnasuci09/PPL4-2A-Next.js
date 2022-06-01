import logo from './logo.svg';
import './App.css';
import Header from './master/Header';
import Sidebar from './master/Sidebar';
import Footer from './master/Footer';
import Dashboard from './page/dashboard/Dashboard';
import DataPeserta from './page/master/DataPeserta';
import DataPenguji from './page/master/DataPenguji';
import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Link, sw, Routes
} from "react-router-dom";
import PenilaianFitProper from './page/fit-proper/PenilaianFitProper';
import PendaftaranFitProper from './page/fit-proper/PendaftaranFitProper';
import PendaftaranWawancara from './page/fit-proper/PendaftaranWawancara';
import PenilaianWawancara from './page/fit-proper/PenilaianWawancara';
import PenilaianFitProperById from './page/fit-proper/PenilaianFitProperById';
import PenilaianWawancaraById from './page/fit-proper/PenilaianWawancaraById';
import AddPeserta from './page/master/AddPeserta';
import AddPenguji from './page/master/AddPenguji';
import HasilNilaiFitProper from './page/reports/HasilNilaiFitProper';

function App() {
	return (
		<Router>
			<div className="wrapper">
				<Header />
				<Sidebar />
				<div className="content-wrapper">
					<div className="content-header">
						<div className="container-fluid">
							<Routes>
								<Route path='/dashboard' element={<Dashboard />} />
								<Route path='/master/dataPeserta' element={<DataPeserta />} />
								<Route path='/master/dataPeserta/add' element={<AddPeserta />} />
								<Route path='/master/dataPenguji' element={<DataPenguji />} />
								<Route path='/master/dataPenguji/add' element={<AddPenguji />} />
								<Route path='/fit-proper/pendaftaran' element={<PendaftaranFitProper />} />
								<Route path='/fit-proper/penilaian' element={<PenilaianFitProper />} />
								<Route path='/wawancara/pendaftaran' element={<PendaftaranWawancara />} />
								<Route path='/wawancara/penilaian' element={<PenilaianWawancara />} />
								<Route path='/wawancara/penilaian/:id' element={<PenilaianWawancaraById />} />
								<Route path='/fit-proper/penilaian/:id' element={<PenilaianFitProperById />} />
								<Route path='/reports/hasil-fit-proper' element={<HasilNilaiFitProper/>}/>
							</Routes>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
