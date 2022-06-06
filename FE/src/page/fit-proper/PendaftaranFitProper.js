import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import swal from "sweetalert";
// import "../../../node_modules/react-toastify/dist/ReactToastify.css";

export default function PendaftaranFitProper() {
    const [listProyeksi, setListProyeksi] = useState([]);
    const [dataDiri, setDataDiri] = useState({
        nip: "",
        nama: "",
        jabatan: "",
        grade: "",
        id: "",
        jenjang: "",
        jenis: "",
        proyeksi: "",
        date: ""
    });
    const [penguji, setPenguji] = useState([]);
    const [selectJenjang, setSelectJenjang] = useState([]);
    const [selectUji, setSelectUji] = useState([]);
    const [onDisable, setOnDisable] = useState(true);
    const [nilai, setNilai] = useState({
        competency: 0,
        jabatan: 0,
        endurance: 0
    });
    const [nilaiFitProper, setNilaiFitProper] = useState([]);
    const [onSubmit, setOnSubmit] = useState(false);
    const [infoProyeksi, setInfoProyeksi] = useState({
        grade: "",
        jabatan: "",
        jenjang: "",
        unit: ""
    })

    const postData = () => {
        const data = {
            proyeksi_jabatan_fit_proper: "test",
            proyeksi: dataDiri.proyeksi,
            jadwal: dataDiri.date,
            peserta: dataDiri.id,
            jenis_fit_proper: dataDiri.jenis,
            jenjang_jabatan_fit_proper: infoProyeksi.jenjang,
            pengujis: selectUji,
            nilai_fit_propers: nilaiFitProper,
            status: 0,
            status_edit: 1
        };

        axios
            .post(`http://localhost:1337/api/fit-propers`, { data })
            .then((res) => {
                console.log("success post");
                swal("Berhasil!", "berhasil menyimpan.", "success");
                setDataDiri({
                    nip: "",
                    nama: "",
                    jabatan: "",
                    grade: "",
                    id: "",
                    jenjang: "",
                    jenis: "",
                    proyeksi: "",
                    date: ""
                });
                setNilai({
                    competency: 0,
                    jabatan: 0,
                    endurance: 0
                });
                setInfoProyeksi({
                    grade: "",
                    jabatan: "",
                    jenjang: "",
                    unit: ""
                })
                setNilaiFitProper([]);
                setOnDisable(!onDisable);
            })
            .catch((err) => {
                console.log("fail", err);
                swal("Error!", "terdapat error", "error");
            });
    };

    const makeNilaiCompetencies = () => {
        const data = {};
        axios
            .post(`http://localhost:1337/api/nilai-key-competencies`, { data })
            .then((res) => {
                setNilai({ ...nilai, competency: res.data.data.id });
            })
            .catch((err) => {
                console.log("err in makeNilaiCompetencies");
            });
    };

    const makeNilaiJabatan = () => {
        const data = {};
        axios
            .post(`http://localhost:1337/api/nilai-proyeksi-jabatans`, { data })
            .then((res) => {
                setNilai({ ...nilai, jabatan: res.data.data.id });
            })
            .catch((err) => {
                console.log("err in makeNilaiJabatan");
            });
    };

    const makeNilaiPersonalEndurance = () => {
        const data = {};
        axios
            .post(`http://localhost:1337/api/nilai-personal-endurances`, { data })
            .then((res) => {
                setNilai({ ...nilai, endurance: res.data.data.id });
            })
            .catch((err) => {
                console.log("err in makeNilaiPersonalEndurance");
            });
    };

    const makeNilaiFitProper = () => {
        const data = {
            nilai_key_competency: nilai.competency,
            nilai_proyeksi_jabatan: nilai.jabatan,
            nilai_personal_endurance: nilai.endurance,
            penguji: selectUji[nilaiFitProper.length],
        };
        axios
            .post(`http://localhost:1337/api/nilai-fit-propers`, { data })
            .then((res) => {
                nilaiFitProper.push(res.data.data.id);
                setNilai({
                    competency: 0,
                    jabatan: 0,
                    endurance: 0,
                });
            })
            .catch((err) => { });
    };

    const getDataButton = () => {
        axios
            .get(
                `http://localhost:1337/api/pesertas?populate[pegawai][filters][nip][$eq]=${dataDiri.nip}&populate[pegawai][populate]=*&populate=fit_proper`
            )
            .then((res) => {
                console.log("success", res);
                let count = 0;
                let find = 0;

                while (count < res.data.data.length) {
                    if (res.data.data[count].attributes.pegawai.data != null) {
                        if (res.data.data[count].attributes.fit_proper.data === null) {
                            setDataDiri({
                                ...dataDiri,
                                nama: res.data.data[count].attributes.pegawai.data.attributes.nama_pegawai,
                                id: res.data.data[count].id,
                                jabatan: res.data.data[count].attributes.pegawai.data.attributes.jabatan.data.attributes.nama_jabatan,
                                grade: res.data.data[count].attributes.pegawai.data.attributes.grade.data.attributes.kode_grade,
                            });
                            swal("Berhasil!", "mendapatkan peserta", "success");
                            setOnDisable(!onDisable);
                            find = 1;
                        } else {
                            if (res.data.data[count].attributes.fit_proper.data.attributes.status > 0) {
                                if(res.data.data[count].attributes.fit_proper.data.attributes.status_edit){
                                    find = 1;
                                    swal("Warning!", "pegawai belum melakukan final", "warning");
                                    break;
                                }
                            } else {
                                setDataDiri({
                                    nip: "",
                                    nama: "",
                                    jabatan: "",
                                    grade: "",
                                    id: "",
                                    jenjang: "",
                                    proyeksi: "",
                                    date: "",
                                })
                                // setOnDisable(true);
                                // errorNotify("pegawai masih dalam masa ujian!");
                                swal("Warning!", "pegawai masih dalam masa ujian", "warning");
                                find = 1;
                                break;
                            }
                        }
                    }
                    count++;
                }
                if (find === 0) {
                    swal("Gagal!", "pegawai belum terdaftar sebagai peserta.", "error");
                }
            })
            .catch((err) => {
                swal("Gagal!", "terjadi error", "error");
            });
    };

    const getJenjangJabatan = () => {
        axios
            .get(`http://localhost:1337/api/jenjangs`)
            .then((res) => {
                // console.log(res.data.data);
                setSelectJenjang(res.data.data);
            })
            .catch((err) => {
                console.log("fail");
            });
    };

    const getPenguji = () => {
        axios
            .get(`http://localhost:1337/api/pengujis?populate=pegawai`)
            .then((res) => {
                let arr = [];
                res.data.data.map((uji) => {
                    arr = [
                        ...arr,
                        {
                            id: uji.id,
                            nama: uji.attributes.pegawai.data.attributes.nama_pegawai,
                        },
                    ];
                });
                setPenguji(arr);
            })
            .catch((err) => {
                console.log("fail");
            });
    };

    const makeNilaiAtributtes = () => {
        if (onSubmit) {
            console.log("entry", nilaiFitProper.length);
            if (nilaiFitProper.length < selectUji.length) {
                if (nilai.competency === 0) {
                    makeNilaiCompetencies();
                } else if (nilai.competency !== 0 && nilai.jabatan === 0) {
                    makeNilaiJabatan();
                } else if (nilai.jabatan !== 0 && nilai.endurance === 0) {
                    makeNilaiPersonalEndurance();
                } else if (nilai.endurance !== 0) {
                    makeNilaiFitProper();
                }
            } else {
                if (nilaiFitProper.length === selectUji.length) {
                    postData();
                }
                setOnSubmit(false);
                console.log("false");
            }
        }
    };
    const getProyeksi = () => {
        let arrProyeksi = [];
        let tempProyeksi = {};
        axios.get(`http://localhost:1337/api/proyeksis?populate=*`)
            .then((res) => {
                console.log("getProyeksi", res.data.data);
                res.data.data.map((P, index) => {
                    tempProyeksi = {
                        nama: P.attributes.jabatan.data.attributes.nama_jabatan,
                        id: P.id,
                        grade: P.attributes.grade.data.attributes.kode_grade,
                        jenjang: P.attributes.jenjang.data.attributes.nama_jenjang,
                        unit: P.attributes.unit.data.attributes.nama_unit
                    }
                    arrProyeksi.push(tempProyeksi);
                })
                console.log("arrProyeksi", arrProyeksi);
                setListProyeksi(arrProyeksi);
            })
    }

    useEffect(() => {
        // console.log("============================");
        // console.log("data diri: ", dataDiri);
        // console.log("penguji: ", selectUji);
        // console.log("nilai", nilai);
        // console.log("nilai list proyeksi", listProyeksi);
        makeNilaiAtributtes();

        if (selectJenjang.length === 0) {
            getJenjangJabatan();
        }
        if (penguji.length === 0) {
            getPenguji();
        }
        if (listProyeksi.length === 0) {
            getProyeksi();
        }
    });

    return (
        <>
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: "normal" }}>
                        PendaftaranFitProper
                    </h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                            <a href="#">Fit-Proper</a>
                        </li>
                        <li className="breadcrumb-item active">Pendaftaran</li>
                    </ol>
                </div>
                <div className="col-12">
                    <br></br>
                </div>
                <div className="col-12">
                    <div className="card">
                        <div class="card-header">
                            <h2 class="card-title">
                                Form Pendaftaran Fit-Proper
                            </h2>
                        </div>
                        <div className="card-body">
                            <p class="text-danger">
                                Masukan NIP terlebih dahulu!
                            </p>
                            {/* form */}
                            <div className="row">
                                <div className="col-6 mt-3">
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">NIP</label>
                                        <div class="col-sm-6">
                                            <input type="text" class="form-control" placeholder="NIP..." value={dataDiri.nip} onChange={(e) => setDataDiri({ ...dataDiri, nip: e.target.value })} onKeyPress={(e) => e.key === "Enter" ? getDataButton() : ""} />
                                        </div>
                                        <div class="col-sm-3">
                                            <input type="submit" class="btn btn-primary" value="Cari" onClick={getDataButton} />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">Nama</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="Nama..." value={dataDiri.nama.length !== 0 ? dataDiri.nama : ""} disabled />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">Jabatan</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="Jabatan..." value={dataDiri.jabatan} disabled />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">Grade</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="Grade..." value={dataDiri.grade} disabled />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">Jadwal</label>
                                        <div class="col-sm-8">
                                            <input class="form-control" type="datetime-local" onChange={(e) => setDataDiri({ ...dataDiri, date: e.target.value })} disabled={onDisable} />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">Jenis</label>
                                        <div class="col-sm-8">
                                            <select className="form-control" aria-label="Default select example" onChange={(e) => setDataDiri({ ...dataDiri, jenis: e.target.value })} disabled={onDisable} >
                                                <option>Select Jenis Fit Proper</option>
                                                <option value="1">Regular</option>
                                                <option value="2">Vcon</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 mt-3">
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">Proyeksi</label>
                                        <div class="col-sm-9">
                                            {/* <input type="text" class="form-control" placeholder="Proyeksi..." value={dataDiri.proyeksi.length === 0 ? "" : dataDiri.proyeksi} onChange={(e) => setDataDiri({ ...dataDiri, proyeksi: e.target.value })} disabled={onDisable} /> */}
                                            <select className="form-control" aria-label="Default select example"
                                                onChange={(e) => {
                                                    setDataDiri({ ...dataDiri, proyeksi: listProyeksi[e.target.value].id });
                                                    setInfoProyeksi({ ...infoProyeksi, grade: listProyeksi[e.target.value].grade, jabatan: listProyeksi[e.target.value].nama, jenjang: listProyeksi[e.target.value].jenjang, unit: listProyeksi[e.target.value].unit })
                                                }
                                                }
                                                disabled={onDisable}>
                                                <option>Select Proyeksi</option>
                                                {listProyeksi.map((sel, index) => (
                                                    <option value={index} data-index={index}>
                                                        {sel.nama}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    {/* Proyeksi */}
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-4 col-form-label">Grade Proyeksi</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="..." value={infoProyeksi.grade} disabled />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-4 col-form-label">Jabatan Proyeksi</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="..." value={infoProyeksi.jabatan} disabled />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-4 col-form-label">Jenjang Proyeksi</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="..." value={infoProyeksi.jenjang} disabled />
                                        </div>
                                    </div>
                                    <div class="row mb-3">
                                        <label class="form-label col-sm-4 col-form-label">Unit Proyeksi</label>
                                        <div class="col-sm-8">
                                            <input type="text" class="form-control" placeholder="..." value={infoProyeksi.unit} disabled />
                                        </div>
                                    </div>
                                    {/* akhir Proyeksi */}
                                    <hr></hr>

                                    {/* <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">Jenjang Jabatan</label>
                                        <div class="col-sm-9">
                                            <select className="form-control" aria-label="Default select example" onChange={(e) => setDataDiri({ ...dataDiri, jenjang: selectJenjang[e.target.value].attributes.nama_jenjang })} disabled={onDisable}>
                                                <option>Select Jenjang</option>
                                                {selectJenjang.map((sel, index) => (
                                                    <option value={index} data-index={index}>
                                                        {sel.attributes.nama_jenjang}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div> */}

                                    <div class="row mb-3">
                                        <label class="form-label col-sm-3 col-form-label">Penguji</label>
                                        <div class="col-sm-9">
                                            <Multiselect
                                                isObject={true}
                                                id="multiselect"
                                                displayValue="nama"
                                                disable={onDisable}
                                                onKeyPressFn={function noRefCheck() { }}
                                                onRemove={(e) => {
                                                    // setSelectUji(e.id);
                                                    let temp = [];
                                                    e.map((id, index) => {
                                                        temp.push(id.id);
                                                    })
                                                    setSelectUji(temp);
                                                }}
                                                onSearch={(e) => {
                                                    console.log("on search", e);
                                                }}
                                                onSelect={(e) => {
                                                    // setSelectUji(e.id);
                                                    let temp = []
                                                    e.map((id, index) => {
                                                        temp.push(id.id);
                                                    })
                                                    setSelectUji(temp);
                                                }}
                                                options={penguji}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-11" ></div>
                                <div className="col-1">
                                    <input type="button" value="Submit" className="btn btn-success" onClick={() => setOnSubmit(true)} disabled={onDisable} />
                                </div>
                            </div>
                            {/* ======= */}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
