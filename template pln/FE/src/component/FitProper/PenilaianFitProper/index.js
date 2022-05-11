import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import { Table } from "react-bootstrap";
import './penilaianfitproper.css';

function Index() {
  const [data,setData] = useState(
    {
      enthuasiasthic:0,
      creative:0,
      building:0,
      strategic:0,
      customer:0,
      driving:0,
      visionary:0,
      developing:0,
      keandalan:0,
      kecepatan:0,
      manajemen:0,
      konstribusi:0,
      internal:0,
      eksternal:0
    }
  );
  useEffect(()=>{
    console.log("data", data);
  })
  return (
    <div>
      <Table className="mb-5">
        <thead>
          <th>12345678-MUCHSIN AKUBA GANI</th>
          <th>Jabatan Proyeksi: MANAJER AREA PENGATUR BEBAN</th>
          <th>04 February 22</th>
        </thead>
      </Table>
      <h4>Penilaian Fit-Proper</h4>
      <Table className="tabel-nilai" responsive bordered hover variant={"dark"}>
        <thead>
          <tr>
            <th rowSpan={2}>#</th>
            <th colSpan={8}>Nilai Key Competencies</th>
            <th colSpan={4}>Nilai Proyeksi Jabatan</th>
            <th colSpan={2}>Nilai Personal Endurance</th>
          </tr>
          <tr>
            <th>Enthuasiasthic for challenge</th>
            <th>Creative innovative</th>
            <th>Building business patnership</th>
            <th>Strategic orientation</th>
            <th>Customer focus oriented</th>
            <th>Driving execution</th>
            <th>Visionary leadership</th>
            <th>Developing other</th>

            <th>Keandalan sistem</th>
            <th>Kecepatan recovery</th>
            <th>Manajemen aset</th>
            <th>Konstribusi KPI</th>

            <th>Internal readliness</th>
            <th>Eksternal readliness</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,enthuasiasthic:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,creative:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,building:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,strategic:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,customer:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,driving:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,visionary:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,developing:e.target.value})} /></th>

            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,keandalan:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,kecepatan:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,manajemen:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,konstribusi:e.target.value})} /></th>

            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,internal:e.target.value})} /></th>
            <th><input type='number' min={0} max={100} onChange={(e)=>setData({...data,eksternal:e.target.value})} /></th>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Index;
