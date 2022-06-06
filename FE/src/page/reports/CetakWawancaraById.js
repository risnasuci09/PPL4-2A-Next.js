import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PDFExport } from '@progress/kendo-react-pdf';
import "./reports.scss";
import Logo from "../../images/plnLogo.png";
import LogoBUMN from "../../images/BUMN.png";
import axios from 'axios';

export default function CetakWawancaraById() {
    const [dataWawancara, setDataWawancara] = useState(null);
    const { id } = useParams();
    const pdfExportComponent = useRef(null);


    const handleExportWithComponent = event => {
        pdfExportComponent.current.save();
    };
    const getDataWawancara = () => {
        axios.get(`http://localhost:1337/api/wawancaras/${id}?populate=peserta.pegawai&populate=nilai_wawancara`)
            .then((res) => {
                console.log("res", res.data.data);
                setDataWawancara(res.data.data);
            })
    };
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
        if (dataWawancara === null) {
            getDataWawancara();
        }
        console.log("dataWawancara", dataWawancara);

    })

    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Cetak Nilai Wawancara : {id}</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Reports</a></li>
                    <li className="breadcrumb-item"><a href="#">Wawancara</a></li>
                    <li className="breadcrumb-item"><a href="#">Hasil</a></li>
                    <li className="breadcrumb-item active">Export</li>
                </ol>
            </div>
            <div className='col-sm-12'>
                <br></br>
            </div>
            {
                dataWawancara !== null ?
                    <div className='col-sm-12'>
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
                                                        <div className='text-justify text mt-2 mb-3'>&emsp;&emsp;Bedasarkan hasil test Wawancara untuk Proyeksi Jabatan <span className='text-lowercase font-weight-bold'>{dataWawancara.attributes.proyeksi_jabatan_wawancara}</span>, maka diberitahukan hasil keputusan akhir sebagai berikut: </div>
                                                        <div className='row'>
                                                            <div className='col'>
                                                                <table className="table text-center table-striped table-bordered table-hover text-nowrap table-pdf m-auto">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>NIP</th>
                                                                            <th>Nama Pegawai</th>
                                                                            <th>Jabatan Proyeksi</th>
                                                                            <th>Tanggal Test</th>
                                                                            <th>Nilai</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        <tr>
                                                                            <td>{dataWawancara.attributes.peserta.data.attributes.pegawai.data.attributes.nip}</td>
                                                                            <td>{dataWawancara.attributes.peserta.data.attributes.pegawai.data.attributes.nama_pegawai}</td>
                                                                            <td>{dataWawancara.attributes.proyeksi_jabatan_wawancara} </td>
                                                                            <td>{formatDate(dataWawancara.attributes.jadwal_wawancara)}</td>
                                                                            <td>{dataWawancara.attributes.nilai_wawancara.data.attributes.total_nilai_wawancara}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
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
                    </div> :
                    ""
            }
        </div>
    )
}
