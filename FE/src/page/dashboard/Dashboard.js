import Logo from "../../images/plnLogo.png";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Dashboard() {
    const [dataPLN, setDataPLN] = useState({
        penguji: "",
        pegawai: "",
        peserta: "",
        lulus: "",
        fitproper:""
    })
    const getCountPenguji = () => {
        axios.get("http://localhost:1337/api/pengujis")
            .then((res) => {
                console.log("penguji", res.data.data);
                setDataPLN({ ...dataPLN, penguji: res.data.data.length });
            })
    }
    const getCountPeserta = () => {
        axios.get("http://localhost:1337/api/pesertas?populate=fit_proper")
            .then((res) => {
                let count = 0;
                let countLulus = 0;
                console.log("peserta", res.data.data);
                res.data.data.map((val, index) => {
                    console.log("value peserta" + index);
                    if (val.attributes.fit_proper.data !== null) {
                        if (val.attributes.fit_proper.data.attributes.status > 0 && !val.attributes.fit_proper.data.attributes.status_edit) {
                            if (val.attributes.fit_proper.data.attributes.status === 1) {
                                countLulus++;
                            }

                        } else {
                            count++;
                        }
                    } else {
                        // console.log("test 3");
                        // peserta blm daftar fit proper
                        count++;
                    }
                })
                console.log("count", count);
                setDataPLN({ ...dataPLN, peserta: count,lulus: countLulus});
            })
    }
    const getCountPegawai = () => {
        axios.get("http://localhost:1337/api/pegawais")
            .then((res) => {
                console.log("pegawais", res.data.data.length);
                setDataPLN({ ...dataPLN, pegawai: res.data.data.length });
            })
    }
    const getCountFitProper = ()=>{
        axios.get("http://localhost:1337/api/fit-propers")
        .then((res)=>{
            console.log("fitproper",res.data.data);
            let count = 0;
            res.data.data.forEach(val => {
                if(val.attributes.status_edit){
                    count++;
                }
            });
            setDataPLN({...dataPLN,fitproper: count});
        })
    }

    useEffect(() => {
        // console.log("dataPLN", dataPLN.peserta.length);
        if (dataPLN.fitproper.length === 0) {
            getCountFitProper();
        } else if (dataPLN.penguji.length === 0) {
            getCountPenguji();
        } else if (dataPLN.peserta.length === 0) {
            getCountPeserta();
        }
        
    })
    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>Dashboard</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
            </div>
            <div className="col-sm-12">
                <br></br>
            </div>
            <div className="col-sm-12">
                <div className="row">
                    
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-warning">
                            <div className="inner">
                                <h3>{dataPLN.peserta.length === 0 ? 0 : dataPLN.peserta} </h3>
                                <p>Peserta</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-user-nurse"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-danger">
                            <div className="inner">
                                <h3>{dataPLN.penguji.length === 0 ? 0 : dataPLN.penguji} </h3>
                                <p>Penguji</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-user-secret"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-info">
                            <div className="inner">
                                <h3>{dataPLN.fitproper.length === 0 ? 0 : dataPLN.fitproper} </h3>
                                <p>Fit & Proper</p>
                            </div>
                            <div className="icon">
                                <i className="far fa-newspaper"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-6">
                        <div className="small-box bg-success">
                            <div className="inner">
                                <h3>{dataPLN.lulus.length === 0 ? 0 : dataPLN.lulus} </h3>
                                <p>Peserta Lulus</p>
                            </div>
                            <div className="icon">
                                <i className="fas fa-user-graduate"></i>
                            </div>
                            <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}