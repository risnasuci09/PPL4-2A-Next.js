import { useEffect, useState } from "react";
import Api from "../../api/Api";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import axios from "axios";
import swal from "sweetalert";
import { Button, Modal } from "react-bootstrap";

export default function DataPeserta() {

    const [dataPegawai, setDataPegawai] = useState([]);
    const [show, setShow] = useState({
        nama: "",
        id: "",
        status: false
    });

    const getDataPegawai = () => {
        axios
            .get('http://localhost:1337/api/pesertas?populate=*')
            .then((res) => {
                console.log(res.data);
                setDataPegawai(res.data.data);
            })
            .catch((err) => {
                console.log("err getDataPegawai", err);
            })
    }

    const deletePeserta = (value) => {
        axios
            .delete(`http://localhost:1337/api/pesertas/${value}`)
            .then(() => {
                swal("Berhasil!", "berhasil menghapus peserta.", "success");
                setShow({
                    nama: "",
                    id: "",
                    status: false
                })
                getDataPegawai();
            })
    }

    useEffect(() => {
        console.log("show", show);
        if (dataPegawai.length === 0) {
            // Api.getDataPegawai().then((response) => {
            //     setDataPegawai(response.data.data);
            // });
            getDataPegawai();
        }
        $(document).ready(function () {
            setTimeout(function () {
                $('.dttable').DataTable();
            }, 2000);
        });
    });

    return (
        <>
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Data Peserta</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Master</a></li>
                        <li className="breadcrumb-item active">Data Peserta</li>
                    </ol>
                </div>
                <div className="col-12">
                    <br></br>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <a href="dataPeserta/add" className="btn btn-sm bg-primary mb-4">
                                <i className="fa fa-user-plus mr-2"></i> Tambah Data Peserta</a>
                            <div className="dt-responsive table-responsive">
                                <table className="table table-striped table-bordered nowrap dttable">
                                    <thead>
                                        <tr>
                                            <th>Nama</th>
                                            <th>NIP</th>
                                            <th>Jabatan</th>
                                            <th>Grade</th>
                                            <th>Jenjang</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPegawai.map((data, index) => {
                                            // console.log("data looping",data);
                                            if (data.attributes.fit_proper.data === null || ((data.attributes.fit_proper.data !== null ? data.attributes.fit_proper.data.attributes.status : 1) < 1) && (data.attributes.fit_proper.data !== null?data.attributes.fit_proper.data.attributes.status_edit?true:false:false))  {
                                                return (
                                                    <tr key={index}>
                                                        <td>{data.attributes.pegawai.data.attributes.nama_pegawai}</td>
                                                        <td>{data.attributes.pegawai.data.attributes.nip}</td>
                                                        <td>{data.attributes.jabatan.data.attributes.nama_jabatan}</td>
                                                        <td>{data.attributes.grade.data.attributes.kode_grade}</td>
                                                        <td>{data.attributes.jenjang.data.attributes.nama_jenjang}</td>
                                                        {data.attributes.fit_proper.data !== null ?
                                                            (data.attributes.fit_proper.data.attributes.status < 1 ?
                                                                <td>Masa ujian Fit Proper</td> :
                                                                <td>Selesai Masa Ujian</td>
                                                            ) :
                                                            <td>Belum daftar Fit Proper</td>
                                                        }
                                                        <td>
                                                            <div className="btn-group">
                                                                <button type="button" className="btn bg-red btn-xs" title="Hapus" onClick={() => setShow({ ...show, status: true, id: data.id, nama: data.attributes.pegawai.data.attributes.nama_pegawai })}>
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show.status}
                backdrop="static"
                onHide={() => setShow({ ...show, status: false })}
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Peserta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    yakin akan delete peserta
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow({ ...show, status: false })}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deletePeserta(show.id)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}