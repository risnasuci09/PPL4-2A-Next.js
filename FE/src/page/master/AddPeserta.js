import axios from 'axios'
import React, { useEffect, useState } from 'react'
import swal from 'sweetalert';

export default function AddPeserta() {
    const [onSubmit, setOnSubmit] = useState(false);
    const [onDisable, setOnDisable] = useState(true);
    const [dataDiri, setDataDiri] = useState({
        nip: "",
        nama: "",
        jabatan: "",
        grade: "",
        id: "",
        status: "",
        idgrade: "",
        idjabatan: "",
        idjenjang: "",
        idunit: ""
    })
    const getDataButton = (value) => {
        console.log("entry");
        let status = [];
        axios
            .get(`http://localhost:1337/api/pegawais?filters[nip][$eq]=${value}&populate=jabatan&populate=grade&populate=pesertas.fit_proper&populate=jenjang&populate=unit`)
            .then((res) => {
                if (res.data.data.length !== 0) {
                    console.log(res.data);
                    res.data.data[0].attributes.pesertas.data.map((temp) => {
                        console.log("status",temp.id);
                        if (temp.attributes.fit_proper.data !== null) {
                            if (temp.attributes.fit_proper.data.attributes.status < 1) {
                                console.log("test 1");
                                status.push(0);
                            } else {
                                if(!temp.attributes.fit_proper.data.attributes.status_edit){
                                    status.push(1);
                                    console.log("test 2",temp.attributes.fit_proper.data.attributes.status_edit);
                                }else{
                                    status.push(0);
                                }
                            }
                        } else {
                            status.push(0);
                            console.log("test 3");
                        }
                    });
                    let tempStatus = 1;
                    status.forEach((P)=>{
                        if(P===0){
                            tempStatus = 0;
                        }
                    })
                    // console.log(status);
                    setDataDiri({
                        ...dataDiri,
                        nip: res.data.data[0].attributes.nip,
                        nama: res.data.data[0].attributes.nama_pegawai,
                        jabatan: res.data.data[0].attributes.jabatan.data.attributes.nama_jabatan,
                        grade: res.data.data[0].attributes.grade.data.attributes.kode_grade,
                        id: res.data.data[0].id,
                        status: tempStatus,
                        idgrade: res.data.data[0].attributes.grade.data.id,
                        idjabatan: res.data.data[0].attributes.jabatan.data.id,
                        idjenjang: res.data.data[0].attributes.jenjang.data.id,
                        idunit: res.data.data[0].attributes.unit.data.id
                    })
                    setOnDisable(false);
                    swal("Berhasil", "berhasil ditemukan.", "success");
                } else {
                    swal("Gagal", "tidak ditemukan pegawai dengan nip : " + value, "error");
                }
            })
    }
    const tambahPeserta = () => {
        const data = {
            pegawai: dataDiri.id,
            grade: dataDiri.idgrade,
            jabatan: dataDiri.idjabatan,
            jenjang: dataDiri.idjenjang,
            unit: dataDiri.idunit
        };
        axios
            .post(`http://localhost:1337/api/pesertas`, { data })
            .then((res) => {
                setDataDiri({
                    nip: "",
                    nama: "",
                    jabatan: "",
                    grade: "",
                    id: "",
                    status: "",
                    idgrade: "",
                    idjabatan: "",
                    idjenjang: "",
                    idunit: ""
                });
                setOnDisable(true);
                swal("Berhasil!", "berhasil tambah peserta.", "success");
            })
            .catch((err) => { });
    }
    useEffect(() => {
        console.log("datadiri", dataDiri);
        if (dataDiri.status === 0) {
            swal("Warning", "tidak bisa mendaftarkan pegawai yang sudah menjadi peserta", "warning");
            setOnDisable(true);
        }
    })

    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Tambah Peserta</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Master</a></li>
                    <li className="breadcrumb-item"><a href="#">Data Peserta</a></li>
                    <li className="breadcrumb-item active">Add</li>
                </ol>
            </div>
            <div className='col-12' >
                <br></br>
            </div>
            <div className='col-12' >
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='card-title'>Form Tambah Peserta</h2>
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
                                <input type="button" value="Tambah" className="btn btn-success" onClick={() => tambahPeserta()} disabled={onDisable} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
