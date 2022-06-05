import { PDFExport } from '@progress/kendo-react-pdf';
import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import swal from "sweetalert";
import "./reports.scss";
import Logo from "../../images/plnLogo.png";
import LogoBUMN from "../../images/BUMN.png";

function CetakFitProperById() {
    const { id } = useParams();
    const [dateFilter, setDateFilter] = useState({
        from: "",
        to: ""
    })
    const [dataProyeksi, setDataProyeksi] = useState([]);
    const [dataFitProper, setDataFitProper] = useState([]);
    const [status, setStatus] = useState("null");
    const pdfExportComponent = useRef(null);
    const [layoutSelection, setLayoutSelection] = useState({
        text: "A4",
        value: "size-a4"
    });
    const [onDisable, setOnDisable] = useState(false);
    const handleExportWithComponent = event => {
        pdfExportComponent.current.save();
    };

    const getDataFilter = (valueFrom, valueTo) => {
        axios.get(`http://localhost:1337/api/proyeksis/${id}?populate=fit_propers.peserta.pegawai`)
            .then((res) => {
                console.log("getDataFilter", res.data.data);
                let arr = [];
                res.data.data.attributes.fit_propers.data.map((data, index) => {
                    // console.log("loop",data.attributes.jadwal.substring(0,7));
                    if (valueFrom <= data.attributes.jadwal.substring(0, 7) && valueTo >= data.attributes.jadwal.substring(0, 7)) {
                        arr.push(data);
                    }
                })
                setDataFitProper(arr);
                if (arr.length === 0) {
                    swal("Not Find", "Tidak ditemukan filter yang dipilih!", "error");
                    setStatus("noData");
                } else {
                    setStatus("notNull");
                }

            })
    }

    const getDataProyeksi = () => {
        axios.get(`http://localhost:1337/api/proyeksis/${id}?populate=*`)
            .then((res) => {
                console.log("getDataProyeksi", res.data.data);
                if (res.data.data.attributes.fit_propers.data.length !== 0) {
                    setStatus("noData");
                } else {
                    setStatus("x");
                    setOnDisable(true);
                }
                setDataProyeksi(res.data.data);
            })
    }

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
    useEffect(() => {
        if (dataProyeksi.length === 0) {
            getDataProyeksi();
        }
        console.log("status", status);

    })
    return (
        <>
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Cetak Proyeksi</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Reports</a></li>
                        <li className="breadcrumb-item"><a href="#">Cetak Nilai Fit Proper</a></li>
                        <li className="breadcrumb-item active">Export</li>
                    </ol>
                </div>
                <div className='col-sm-12' >
                    <br></br>
                </div>
                <div className='col-sm-12' >
                    <div className='card'>
                        <div className='card-header'>
                            <span className='card-title font-weight-bold'>Filter Tanggal</span>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="row mb-3">
                                        <label className="form-label col-sm-3 col-form-label text-right mr-1">from</label>
                                        <div className="col-sm-8">
                                            <input type="month" className="form-control" onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })} disabled={onDisable} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="row mb-3">
                                        <label className="form-label col-sm-3 col-form-label text-right mr-1">to</label>
                                        <div className="col-sm-8">
                                            <input type="month" className="form-control" onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })} disabled={onDisable} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-11'></div>
                                <div className='col-sm-1 '>
                                    <button onClick={() => getDataFilter(dateFilter.from, dateFilter.to)} className='btn bg-primary align-right' disabled={onDisable}>Cari</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    status === "null" ?
                        <div className='col-sm-12' >
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='row text-center'>
                                        <h5 className='m-auto'>Tidak ada Fit Proper</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        status === "notNull" ?
                            <div className='col-sm-12' >
                                <div className='card'>
                                    <div className='card-body'>
                                        <button className='btn bg-primary ml-3' onClick={handleExportWithComponent}>Export</button>
                                        <div className='row'>
                                            <div className="page-container hidden-on-narrow m-auto">
                                                <PDFExport ref={pdfExportComponent}>
                                                    <div className="pdf-page size-a4">
                                                        <div className='row' >
                                                            <div className='col-sm-12' >
                                                                {/* KOP Surat */}
                                                                <div className='row m-auto text-center'>
                                                                    <div className='col-sm-3'>
                                                                        <img src={Logo} className="kop-image" />
                                                                    </div>
                                                                    <div className='col-sm-6 text-center'>
                                                                        <div className='row'>
                                                                            <div className='col'> <h6 className='mb-0 font-weight-bold'> PT. PLN(PERSERO)</h6></div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col'><span className='kop'>Jl. Cinta Blok M No.123 Kebanyolan Baru,</span></div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className='col'><span className='kop'>Jakarta 54430, Indonesia</span></div>
                                                                        </div>

                                                                    </div>
                                                                    <div className='col-sm-3'>
                                                                        <img src={LogoBUMN} className="bumn" />
                                                                    </div>
                                                                </div>
                                                                <div className='m-auto '>
                                                                    <hr className='line'></hr>
                                                                </div>
                                                                {/* Akhir Kop Surat */}
                                                                <div className='font-weight-bold text-center'>
                                                                    <h7>PENGUMUMAN</h7>
                                                                </div>
                                                                <div className='text-justify text mt-2 mb-3'>&emsp;&emsp;Bedasarkan hasil test Fit & Proper Bulan {dateFilter.from} sampai {dateFilter.to} untuk Proyeksi Jabatan <span className='text-lowercase font-weight-bold'>{dataProyeksi.attributes.jabatan.data.attributes.nama_jabatan}</span>, maka diberitahukan hasil keputusan akhir sebagai berikut: </div>
                                                                <table className="table text-center table-striped table-bordered table-hover text-nowrap table-pdf">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No</th>
                                                                            <th>NIP</th>
                                                                            <th>Nama Pegawai</th>
                                                                            <th>Jabatan Proyeksi</th>
                                                                            <th>Tanggal Test</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            dataFitProper.map((val, index) => {
                                                                                console.log("val", val);
                                                                                return (
                                                                                    <tr>
                                                                                        <td>{index + 1} </td>
                                                                                        <td>{val.attributes.peserta.data.attributes.pegawai.data.attributes.nip}</td>
                                                                                        <td>{val.attributes.peserta.data.attributes.pegawai.data.attributes.nama_pegawai} </td>
                                                                                        <td>{dataProyeksi.attributes.jabatan.data.attributes.nama_jabatan} </td>
                                                                                        <td>{val.attributes.jadwal.substring(0, 10)}</td>
                                                                                        <td>{val.attributes.total_penilaian_akhir_fit_proper < 70 ? "Gagal" : "Lulus"}</td>
                                                                                    </tr>
                                                                                )
                                                                            })
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                                <div className='text-justify text mt-2 mb-3'>&emsp;&emsp;Demikianlah pengumuman ini kami sampaikan. Selamat kepada para peserta yang telah lulus. Terimakasih atas perhatian dan kerjasama dari seluruh peserta.</div>
                                                                <div className='row text mt-4'>
                                                                    <div className='col-sm-3 '></div>
                                                                    <div className='col-sm-4 '></div>
                                                                    <div className='col-sm-5 text-center'>
                                                                        <div className='row'><div className='col'> Hormat Kami,</div></div>
                                                                        <div className='row mb-4 mt-4'><div className='col'></div></div>
                                                                        <div className='row '><div className='col'> Direktur Sumber Daya Manusia</div></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </PDFExport>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            status === "noData" ?
                                <div className='col-sm-12' >
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='row '>
                                                <h5 className='m-auto'>Lakukan filter terlebih dahulu</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className='col-sm-12' >
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <h5 className='m-auto'>Tidak Ada data fit-proper pada proyeksi ini</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                }


            </div>
        </>
    )
}

export default CetakFitProperById