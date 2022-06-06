import React, { useEffect, useState } from 'react';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import axios from 'axios';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function HasilNilaiWawancara() {
    const [dataWawancara, setDataWawancara] = useState([]);
    const [status, setStatus] = useState("first");
    function newDate(value) {
        let date = new Date(value);
        let result;

        if ((date.getMonth() + 1) > 9) {
            if ((date.getMonth() + 1) === 12) {
                result = `${date.getFullYear() + 1}-01`;
            } else {
                result = `${date.getFullYear()}-${date.getMonth() + 2}`;
            }
        } else {
            result = `${date.getFullYear()}-0${date.getMonth() + 2}`;
        }
        return result;
    }
    const filterBulan = (value) => {
        console.log("value", value);
        axios.get(`http://localhost:1337/api/wawancaras?populate=peserta.pegawai&filters[jadwal_wawancara][$gte]=${value}&filters[jadwal_wawancara][$lte]=${newDate(value)}&populate=peserta.jabatan&populate=pengujis.pegawai&populate=nilai_wawancara`)
            .then((res) => {
                console.log("res", res.data.data);
                let count = 0;
                // let temp = []

                setDataWawancara(res.data.data);

                setStatus("notFirst");
                // console.log("temp",temp);
            })
    }

    function formatDate(string) {
        var options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        return new Date(string).toLocaleDateString([], options);
    }

    useEffect(() => {
        if (dataWawancara.length === 0 && status === "first") {
            console.log("test");
            let today = new Date();
            filterBulan(newDate(today.getFullYear() + '-' + (today.getMonth())));
        }
        $(document).ready(function () {
            setTimeout(function () {
                $('.dttable').DataTable();
            }, 2000);
        });
    })
    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Hasil Nilai Wawancara</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Reports</a></li>
                    <li className="breadcrumb-item"><a href="#">Wawancara</a></li>
                    <li className="breadcrumb-item active">Hasil</li>
                </ol>
            </div>
            <div className="col-12">
                <br></br>
            </div>
            <div className='col-12'>
                <div class="card card-default color-palette-box">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="far fa-calendar mr-3"></i>
                            Pick Month
                        </h3>
                    </div>
                    <div class="card-body">
                        <div className='col-4'>
                            <input class="form-control" type="month" onChange={(e) => filterBulan(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="dt-responsive table-responsive">
                            <table className="table table-striped table-bordered nowrap dttable text-center">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIP</th>
                                        <th>Nama</th>
                                        <th>Proyeksi</th>
                                        <th>Tanggal</th>
                                        <th>Penguji</th>
                                        <th>Total Nilai</th>
                                        <th>Cetak</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataWawancara.length !== 0 ?
                                            dataWawancara.map((val, index) => {
                                                console.log("val", val);
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{val.attributes.peserta.data.attributes.pegawai.data.attributes.nip} </td>
                                                        <td>{val.attributes.peserta.data.attributes.pegawai.data.attributes.nama_pegawai} </td>
                                                        <td>{val.attributes.proyeksi_jabatan_wawancara} </td>
                                                        <td>{formatDate(val.attributes.jadwal_wawancara)}</td>
                                                        <td>
                                                            <DropdownButton title={<i class="fas fa-user-alt"></i>} className='drop'>
                                                                {val.attributes.pengujis.data.map((temp, i) => {
                                                                    return (
                                                                        <Dropdown.Item >{temp.attributes.pegawai.data.attributes.nama_pegawai} </Dropdown.Item>
                                                                    );

                                                                })}
                                                            </DropdownButton>
                                                        </td>
                                                        <td>{val.attributes.nilai_wawancara.data.attributes.total_nilai_wawancara}</td>
                                                        <td><a className='btn bg-warning' href={'cetak-nilai-wawancara/export/'+val.id}>Cetak</a> </td>
                                                    </tr>
                                                );
                                            }) :
                                            <tr class="odd"><td valign="top" colspan="8" class="dataTables_empty">No data available in table</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
