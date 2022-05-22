import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function PendaftaranWawancara() {
    const [dataDiri, setDataDiri] = useState({
        nip: "",
        nama: "",
        jabatan: "",
        grade: "",
        id: "",
        jenjang: "",
        proyeksi: "",
        date: "",
        idwawancara: ""
    });
    const [penguji, setPenguji] = useState([]);
    const [selectJenjang, setSelectJenjang] = useState([]);
    const [selectUji, setSelectUji] = useState([]);
    const [onDisable, setOnDisable] = useState(true);
    const [onSubmit, setOnSubmit] = useState(false);

    const getDataButton = () => {
        axios
            .get(
                `http://localhost:1337/api/pesertas?populate[pegawai][filters][nip][$eq]=${dataDiri.nip}&populate[pegawai][populate]=*&populate=wawancara`
            )
            .then((res) => {
                console.log("success", res);
                let count = 0;
                let find = 0;

                while (count < res.data.data.length) {
                    if (res.data.data[count].attributes.pegawai.data != null) {
                        if (res.data.data[count].attributes.wawancara.data === null) {
                            setDataDiri({
                                ...dataDiri,
                                nama: res.data.data[count].attributes.pegawai.data.attributes.nama_pegawai,
                                id: res.data.data[count].id,
                                jabatan: res.data.data[count].attributes.pegawai.data.attributes.jabatan.data.attributes.nama_jabatan,
                                grade: res.data.data[count].attributes.pegawai.data.attributes.grade.data.attributes.kode_grade,
                            });
                            swal("Berhasil!", "mendapatkan peserta", "success");
                            setOnDisable(false);
                            find = 1;
                        } else {
                            if (
                                res.data.data[count].attributes.wawancara.data.attributes
                                    .status > 0
                            ) {
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
                                    idwawancara: ""
                                })
                                swal("sedang masa ujian");
                                // errorNotify("pegawai masih dalam masa ujian!");
                                find = 1;
                                break;
                            }
                        }
                    }
                    count++;
                }
                if (find === 0) {
                    swal("pegawai belum terdaftar!");
                    // errorNotify("pegawai belum terdaftar sebagai peserta!");
                }
            })
            .catch((err) => {
                console.log("fail");
                swal("gagal mencari peserta")
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

    const makeNilaiWawancara = () => {
        const data = {
            total_nilai_wawancara: 0,
        };

        axios
            .post(`http://localhost:1337/api/nilai-wawancaras`, { data })
            .then((res) => {
                console.log("success post");
                setDataDiri({ ...dataDiri, idwawancara: res.data.data.id });
                swal("Berhasil membuat nilai wawancara");
            })
            .catch((err) => {
                console.log("fail", err);
                swal("Gagal membuat nilai wawancara!");
            });
    };

    const makeWawancara = () => {
        const data = {
            jadwal_wawancara: dataDiri.date,
            proyeksi_jabatan_wawancara: dataDiri.proyeksi,
            jenjang_jabatan_wawancara: dataDiri.jenjang,
            status: 0,
            peserta: dataDiri.id,
            nilai_wawancara: dataDiri.idwawancara,
            pengujis: selectUji
        };
        axios
            .post(`http://localhost:1337/api/wawancaras`, { data })
            .then((res) => {
                console.log("success post");
                swal("Berhasil!", "berhasil menyimpan.", "success");
                setOnDisable(!onDisable);
                setOnSubmit(!onSubmit);
                setDataDiri({
                    nip: "",
                    nama: "",
                    jabatan: "",
                    grade: "",
                    id: "",
                    jenjang: "",
                    proyeksi: "",
                    date: "",
                    idwawancara: ""
                });
            })
            .catch((err) => {
                console.log("fail", err);
                swal("Gagal!", "gagal menyimpan.", "error");
            });
    }

    const PostWawancara = () => {
        if (onSubmit) {
            if (dataDiri.idwawancara.length === 0) {
                makeNilaiWawancara();
            } else {
                makeWawancara();
            }
        }
    };
    useEffect(() => {
        console.log("============================");
        console.log("data diri: ", dataDiri);
        console.log("penguji: ", selectUji);
        // console.log("nilai", nilai);
        // console.log("nilai fit proper", nilaiFitProper);
        // makeNilaiAtributtes();
        PostWawancara();
        if (selectJenjang.length === 0) {
            getJenjangJabatan();
        }
        if (penguji.length === 0) {
            getPenguji();
        }
    });
    return (
        <div className="row mb-2">
            <div className="col-sm-6">
                <h1 className="m-0" style={{ fontWeight: 'normal' }}>PendaftaranWawancara</h1>
            </div>
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Wawancara</a></li>
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
                            </div>

                            <div className="col-6 mt-3">
                                <div class="row mb-3">
                                    <label class="form-label col-sm-3 col-form-label">Proyeksi</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Proyeksi..." value={dataDiri.proyeksi.length === 0 ? "" : dataDiri.proyeksi} onChange={(e) => setDataDiri({ ...dataDiri, proyeksi: e.target.value })} disabled={onDisable} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="form-label col-sm-3 col-form-label">Jadwal</label>
                                    <div class="col-sm-9">
                                        <input class="form-control" type="datetime-local" value={dataDiri.date.length === 0 ? "" : dataDiri.date} onChange={(e) => setDataDiri({ ...dataDiri, date: e.target.value })} disabled={onDisable} />
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <label class="form-label col-sm-3 col-form-label">Jenjang Jabatan</label>
                                    <div class="col-sm-9">
                                        <select className="form-control" aria-label="Default select example"  onChange={(e) => setDataDiri({ ...dataDiri, jenjang: selectJenjang[e.target.value].attributes.nama_jenjang })} disabled={onDisable} >
                                            <option>Select Jenjang</option>
                                            {selectJenjang.map((sel, index) => (
                                                <option value={index} data-index={index}>
                                                    {sel.attributes.nama_jenjang}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
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
                                <input type="button" value="Submit" className="btn btn-success" onClick={() => setOnSubmit(!onSubmit)} disabled={onDisable} />
                            </div>
                        </div>
                        {/* ======= */}
                    </div>
                </div>
            </div>
        </div>
    )
}
