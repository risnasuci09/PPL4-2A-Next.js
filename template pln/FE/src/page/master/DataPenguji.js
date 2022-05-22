import { useEffect, useState } from "react";
import Api from "../../api/Api";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

export default function DataPenguji() {

    const [dataPegawai, setDataPegawai] = useState([]);

    useEffect(() => {
        if (dataPegawai.length === 0) {
            Api.getDataPegawai().then((response) => {
                setDataPegawai(response.data.data);
            });
        }
        $(document).ready(function () {
            setTimeout(function () {
                $('.dttable').DataTable();
            }, 2000);
        });
    });

    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Data Penguji</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Master</a></li>
                    <li className="breadcrumb-item active">Data Penguji</li>
                </ol>
            </div>
            <div className="col-12">
                <br></br>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <a href="#" className="btn btn-sm bg-primary mb-3"><i
                            className="fas fa-plus-circle">Tambah
                            Data Penguji</i></a>
                        <div className="dt-responsive table-responsive">
                            <table className="table table-striped table-bordered nowrap dttable">
                                <thead>
                                    <tr>
                                        <th>Nama</th>
                                        <th>NIP</th>
                                        <th>Jabatan</th>
                                        <th>Grade</th>
                                        <th>Jenjang</th>
                                        <th>Role</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPegawai.map((data, index) => {
                                        if (data.attributes.role == 'Penguji') {
                                            return (
                                                <tr key={index}>
                                                    <td>{data.attributes.namaPegawai}</td>
                                                    <td>{data.attributes.NIP}</td>
                                                    <td>{data.attributes.jabatan.data.attributes.namaJabatan}</td>
                                                    <td>{data.attributes.grade}</td>
                                                    <td>{data.attributes.jenjang}</td>
                                                    <td>{data.attributes.role}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <a href="#">
                                                                <button type="button" className="btn bg-teal btn-xs" title="Edit" id="btnEdit">
                                                                    <i className="fas fa-pen"></i>
                                                                </button>
                                                            </a>
                                                            <a href="#delModal" data-id="" data-toggle="modal">
                                                                <button type="button" className="btn bg-pink btn-xs" title="Hapus">
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}