import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavbar from './Component/SideNavbar/SideNavbar';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Products from './pages/Products';
import DafMaha from './Component/Home/Home';
import PostTeam from './Component/PostTeam/PostTeam';
import AllTeam from './Component/AllTeam/AllTeam';
import PutTeam from './Component/PutTeam/PutTeam';
import DelTeam from './Component/DelTeam/DelTeam';

function App() {
  return (
    <>
      <Router>
        <SideNavbar />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/reports' element={<Reports/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/team' element={<DafMaha/>} />
          <Route path='/addteam' element={<PostTeam/>} />
          <Route path='/allteam' element={<AllTeam/>} />
          <Route path='/putteam' element={<PutTeam/>} />
          <Route path='/delteam' element={<DelTeam/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;