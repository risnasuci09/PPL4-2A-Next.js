import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert';

export default function PenilaianWawancaraById() {
    const { id } = useParams();
    const [dataWawancara, setDataWawancara] = useState({
        penguji: [],
        nilai: "",
        nama: "",
        nip: "",
        idnilai: ""
    });
    const [statusNilai,setStatusNilai] = useState("");

    const getDataWawancara = () => {
        axios
            .get(
                `http://localhost:1337/api/wawancaras/${id}?populate=*&populate=pengujis.pegawai&populate=peserta.pegawai&populate=nilai_wawancara`
            )
            .then((res) => {
                let uji = []
                res.data.data.attributes.pengujis.data.map((U, index) => {
                    uji.push(U.attributes.pegawai.data.attributes.nama_pegawai);
                    console.log("push uji");
                });
                setDataWawancara({
                    ...dataWawancara,
                    penguji: uji,
                    nilai: res.data.data.attributes.nilai_wawancara.data.attributes.total_nilai_wawancara,
                    idnilai: res.data.data.attributes.nilai_wawancara.data.id,
                    nama: res.data.data.attributes.peserta.data.attributes.pegawai.data.attributes.nama_pegawai,
                    nip: res.data.data.attributes.peserta.data.attributes.pegawai.data.attributes.nip,
                })
            })
            .catch((err) => {
                console.log("fail get Data For Admin");
            });
    }

    const updateNilaiWawancara = () => {
        const data = {
            total_nilai_wawancara: dataWawancara.nilai
        }
        axios
            .put(`http://localhost:1337/api/nilai-wawancaras/${dataWawancara.idnilai}`, { data })
            .then((res) => {
                swal("Berhasil!", "berhasil update nilai.", "success");
                console.log("success update", res.data);
            })
            .catch((err) => {
                console.log("fail", err);
                swal("Gagal!", "gagal update nilai.", "error");
            });
    }

    const changeStatusEdit = () => {
        const data = {
            status_edit: 0
        }
        axios.put(`http://localhost:1337/api/wawancaras/${id}`, { data })
            .then((res) => {
                console.log("berhasil change status edit!!");
                setStatusNilai("final");
            })
            .catch((err) => {
                console.log("gagal change status edit");
            });
    }

    useEffect(() => {
        if (dataWawancara.nama.length === 0) {
            getDataWawancara();
        }
        if(statusNilai === "final"){
            swal("Kamu Berhasil Menilai Peserta Ini!",{icon: "success"})
                .then((value) => {
                    window.history.back();
                });
        }
        console.log("isi data wawancara", dataWawancara);
    })

    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Penilaian Wawancara By ID : {id}</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Wawancara</a></li>
                    <li className="breadcrumb-item"><a href="#">Penilaian</a></li>
                    <li className="breadcrumb-item active">Id</li>
                </ol>
            </div>
            <div className='col-12'>
                <br></br>
            </div>
            <div className='col-12'>
                <div className="card p-2">
                    <div className="card-header">
                        <div className='row'>
                            <h5 className="col-10">Tabel Penilaian Wawancara</h5>
                            <button className='col-2 btn bg-danger' onClick={changeStatusEdit}>Final</button>
                        </div>
                        <div>
                            <p className='card-subtitle'>Nama &emsp;: {dataWawancara.nama} <br />
                                NIP&emsp;&emsp;&nbsp;: {dataWawancara.nip} </p>
                        </div>
                    </div>

                    <div className="card-body table-responsive p-0">
                        <table className="table table-striped table-bordered table-hover text-nowrap">
                            <thead>
                                <tr className='text-center'>
                                    <th >No</th>
                                    <th >Penguji</th>
                                    <th >Nilai Wawancara</th>
                                    <th >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td >1</td>
                                    <td >  {dataWawancara.penguji.join(', ')}</td>
                                    <td > <input
                                        type="number"
                                        className='form-control col-5 m-auto'
                                        min={0}
                                        max={100}
                                        placeholder={dataWawancara.nilai}
                                        onChange={(e) => {
                                            setDataWawancara({ ...dataWawancara, nilai: e.target.value });
                                        }}
                                    /> </td>
                                    <td className='text-center' ><a className="btn btn-success" onClick={() => updateNilaiWawancara()}>Submit Nilai</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}
