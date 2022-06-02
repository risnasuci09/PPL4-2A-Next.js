import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function CetakFitProperById() {
    const { id } = useParams();
    const [dateFilter, setDateFilter] = useState({
        from: "",
        to: ""
    })
    const [dataProyeksi, setDataProyeksi] = useState([]);
    const [dataFitProper, setDataFitProper] = useState([]);
    const [status, setStatus] = useState("null");

    const getDataFilter = (valueFrom, valueTo) => {
        axios.get(`http://localhost:1337/api/proyeksis/${id}?populate[fit_propers][filters][jadwal][$gte]=${valueFrom}&populate[fit_propers][filters][jadwal][$lte]=${valueTo}`)
            .then((res) => {
                console.log("getDataFilter", res.data.data);
                setDataFitProper(res.data.data.attributes.fit_propers.data);
                if(res.data.data.attributes.fit_propers.data.length === 0){
                    setStatus("fill");
                }else{
                    setStatus("null");
                }
            })
    }

    const getDataProyeksi = () => {
        axios.get(`http://localhost:1337/api/proyeksis/${id}?populate=*`)
            .then((res) => {
                console.log("getDataProyeksi", res.data.data);
                if (res.data.data.attributes.fit_propers.data.length !== 0) {
                    setStatus("notNull");
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
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="row mb-3">
                                        <label className="form-label col-sm-3 col-form-label text-right mr-1">from</label>
                                        <div className="col-sm-8">
                                            <input type="month" className="form-control" onChange={(e) => setDateFilter({ ...dateFilter, from: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="row mb-3">
                                        <label className="form-label col-sm-3 col-form-label text-right mr-1">to</label>
                                        <div className="col-sm-8">
                                            <input type="month" className="form-control" onChange={(e) => setDateFilter({ ...dateFilter, to: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-9'></div>
                                <div className='col-sm-3 text-right'>
                                    <button onClick={() => getDataFilter(dateFilter.from, dateFilter.to)} className='btn bg-primary align-right' >cari</button>
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
                                        <h5>Tidak ada Fit Proper</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='col-sm-12' >
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row text-center'>
                                    <h5>Lakukan filter terlebih dahulu</h5>
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