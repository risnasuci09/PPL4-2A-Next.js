import axios from 'axios';
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export default function AddPenguji() {
    const [onSubmit, setOnSubmit] = useState(false);
    const [onDisable, setOnDisable] = useState(true);
    const [dataDiri, setDataDiri] = useState({
        nip: "",
        nama: "",
        jabatan: "",
        grade: "",
        id: "",
        status: ""
    });
    const getDataButton = (value) => {
        console.log("entry");
        axios
            .get(`http://localhost:1337/api/pegawais?filters[nip][$eq]=${value}&populate=jabatan&populate=grade&populate=penguji`)
            .then((res) => {
                console.log(res.data.data);
                if (res.data.data.length > 0) {
                    if (res.data.data[0].attributes.penguji.data === null) {
                        setDataDiri({
                            ...dataDiri,
                            grade: res.data.data[0].attributes.grade.data.attributes.kode_grade,
                            id: res.data.data[0].id,
                            nama: res.data.data[0].attributes.nama_pegawai,
                            jabatan: res.data.data[0].attributes.jabatan.data.attributes.nama_jabatan,
                            status: 1,
                        });
                        setOnDisable(false);
                        swal("Berhasil!", "berhasil menemukan pegawai.", "success");
                    } else {
                        setDataDiri({ ...dataDiri, status: 0 });
                        swal("Warning", "tidak bisa mendaftarkan pegawai yang sudah menjadi penguji", "warning");
                        setOnDisable(true);
                    }
                } else {
                    setDataDiri({ ...dataDiri, status: "-1" });
                    setOnDisable(false);
                    swal("Gagal!", "nip yang anda masukan salah", "error");
                }
            })
    }
    const tambahPenguji = () => {
        const data = {
            pegawai: dataDiri.id
        };
        axios
            .post(`http://localhost:1337/api/pengujis`, { data })
            .then((res) => {
                setDataDiri({
                    nip: "",
                    nama: "",
                    jabatan: "",
                    grade: "",
                    id: "",
                    status: ""
                });
                setOnDisable(true);
                swal("Berhasil!", "berhasil tambah peserta.", "success");
            })
            .catch((err) => { });
    }
    useEffect(() => {
        console.log("datadiri", dataDiri);
        // if (dataDiri.status === 0) {
        //     swal("Warning", "tidak bisa mendaftarkan pegawai yang sudah menjadi penguji", "warning");
        //     setOnDisable(true);
        // }
    })
    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Tambah Penguji</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Master</a></li>
                    <li className="breadcrumb-item"><a href="#">Data Penguji</a></li>
                    <li className="breadcrumb-item active">Add</li>
                </ol>
            </div>
            <div className='col-12' >
                <br></br>
            </div>
            <div className='col-12' >
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='card-title'>Form Tambah Penguji</h2>
                    </div>
                    <div className='card-body'>
                        <div className="row">
                            <div className="col-6 mt-3">
                                <div className="row mb-3">
                                    <label className="form-label col-sm-3 col-form-label">NIP</label>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" placeholder="NIP..." value={dataDiri.nip} onChange={(e) => setDataDiri({ ...dataDiri, nip: e.target.value })} onKeyPress={(e) => e.key === "Enter" ? getDataButton(e.target.value) : ""} />
                                    </div>
                                    <div className="col-sm-3">
                                        <input type="submit" className="btn btn-primary" value="Cari" onClick={() => getDataButton(dataDiri.nip)} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6 mt-3'>
                                <div className="row mb-3">
                                    <label className="form-label col-sm-3 col-form-label">Nama</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Nama..." value={dataDiri.nama} disabled />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="form-label col-sm-3 col-form-label">Jabatan</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Jabatan..." value={dataDiri.jabatan} disabled />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label className="form-label col-sm-3 col-form-label">Grade</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Grade..." value={dataDiri.grade} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-11" ></div>
                            <div className="col-1">
                                <input type="button" value="Tambah" className="btn btn-success" onClick={() => tambahPenguji()} disabled={onDisable} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
