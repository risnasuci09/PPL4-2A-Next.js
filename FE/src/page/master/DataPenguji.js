import { useEffect, useState } from "react";
import Api from "../../api/Api";
import axios from "axios";
import swal from "sweetalert";
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import { Button, Modal } from "react-bootstrap";

export default function DataPenguji() {

    const [dataPegawai, setDataPegawai] = useState([]);
    const [show, setShow] = useState({
        nama: "",
        id: "",
        status: false
    });

    const getDataPegawai = () => {
        axios
            .get('http://localhost:1337/api/pengujis?populate=pegawai.jabatan&populate=pegawai.jenjang&populate=pegawai.grade')
            .then((res) => {
                console.log(res.data);
                setDataPegawai(res.data.data);
            })
            .catch((err) => {
                console.log("err getDataPegawai", err);
            })
    }

    const deletePenguji = (value) => {
        axios
            .delete(`http://localhost:1337/api/pengujis/${value}`)
            .then(() => {
                swal("Berhasil!", "berhasil menghapus penguji.", "success");
                getDataPegawai();
            }).catch(()=>{
                swal("Gagal!", "terjadi error saat mendelete.", "error");
            })
            setShow({
                nama: "",
                id: "",
                status: false
            })
    }

    useEffect(() => {
        console.log(dataPegawai);
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
                            <a href="dataPenguji/add" className="btn btn-sm bg-primary mb-4">
                                <i className="fa fa-user-plus mr-2"></i> Tambah Data Penguji</a>
                            <div className="dt-responsive table-responsive">
                                <table className="table table-striped table-bordered nowrap dttable">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama</th>
                                            <th>NIP</th>
                                            <th>Jabatan</th>
                                            <th>Grade</th>
                                            <th>Jenjang</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPegawai.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1} </td>
                                                    <td>{data.attributes.pegawai.data.attributes.nama_pegawai}</td>
                                                    <td>{data.attributes.pegawai.data.attributes.nip}</td>
                                                    <td>{data.attributes.pegawai.data.attributes.jabatan.data.attributes.nama_jabatan}</td>
                                                    <td>{data.attributes.pegawai.data.attributes.grade.data.attributes.kode_grade}</td>
                                                    <td>{data.attributes.pegawai.data.attributes.jenjang.data.attributes.nama_jenjang}</td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <a href="#delModal" data-id="" data-toggle="modal">
                                                                <button type="button" className="btn bg-pink btn-xs" title="Hapus" onClick={()=>setShow({ ...show, status: true, id: data.id, nama: data.attributes.pegawai.data.attributes.nama_pegawai})}>
                                                                    <i className="fas fa-trash"></i>
                                                                </button>
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );

                                        })}
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
                    <Modal.Title>Delete Penguji</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    yakin akan delete penguji
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow({ ...show, status: false })}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => deletePenguji(show.id)}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}