import React, { useEffect, useRef, useState } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf'
import { Button } from 'react-bootstrap';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import axios from "axios";
import swal from "sweetalert";
import "./reports.scss";

export default function CetakNilaiFitProper() {
    const [dataProyeksi, setDataProyeksi] = useState([]);

    const getDataProyeksi = () => {
        axios.get(`http://localhost:1337/api/proyeksis?populate=*`)
            .then((res) => {
                console.log("getDataProyeksi", res.data.data);
                setDataProyeksi(res.data.data);
            })
    }

    useEffect(() => {
        if (dataProyeksi.length === 0) {
            getDataProyeksi();
        }
        $(document).ready(function () {
            setTimeout(function () {
                $('.dttable').DataTable();
            }, 2000);
        });
    })
    return (
        <>
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Cetak Nilai Fit & Proper</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Reports</a></li>
                        <li className="breadcrumb-item active">Cetak Nilai Fit Proper</li>
                    </ol>
                </div>
                <div className="col-12">
                    <br></br>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className='card-header'>
                            <h4>Daftar Proyeksi</h4>
                        </div>
                        <div className="card-body">
                            <div className="dt-responsive table-responsive">
                                <table className="table table-striped table-bordered nowrap dttable">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Proyeksi Jabatan</th>
                                            <th>Unit</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataProyeksi.map((value, index) => {
                                                console.log("value",value);
                                                return (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{value.attributes.jabatan.data.attributes.nama_jabatan}</td>
                                                            <td>{value.attributes.unit.data.attributes.nama_unit}</td>
                                                            <td>
                                                                <a href={'cetak-nilai-fit-proper/export/'+value.id} className='btn bg-warning'>Cetak</a>
                                                            </td>
                                                        </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
