import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

export default function PenilaianFitProperById() {
    const [infoFitProper, setInfoFitProper] = useState([]);
    let { id } = useParams();
    const [statusNilai, setStatusNilai] = useState("false");
    const [countLoop, setCountLoop] = useState(0);


    const initial_data = [
        {
            enthuasiasthic: 0,
            creative: 0,
            building: 0,
            strategic: 0,
            customer: 0,
            driving: 0,
            visionary: 0,
            developing: 0,
            keandalan: 0,
            kecepatan: 0,
            manajemen: 0,
            konstribusi: 0,
            internal: 0,
            eksternal: 0,
        },
    ];

    const [datas, setDatas] = useState([]);

    function formatDate(string) {
        var options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(string).toLocaleDateString([], options);
    }

    const getDataforAdmin = () => {
        axios
            .get(
                `http://localhost:1337/api/fit-propers/${id}?populate=peserta.pegawai.jabatan&populate=nilai_fit_propers.penguji.pegawai&populate=nilai_fit_propers.nilai_key_competency&populate=nilai_fit_propers.nilai_proyeksi_jabatan&populate=nilai_fit_propers.nilai_personal_endurance&populate=proyeksi.jabatan&populate=proyeksi.grade&populate=proyeksi.unit&populate=proyeksi.jenjang`
            )
            .then((res) => {
                setInfoFitProper(res.data.data);
                if (statusNilai === "getNilaiBaru") { setStatusNilai("updateNilai") }
                // res.data.data.attributes.nilai_fit_propers.data.map((tempData, index) => {
                //     newObject.push(temp);
                //     temp.building = tempData.attributes.nilai_key_competency.data.attributes.building_business_partnership !== null ? tempData.attributes.nilai_key_competency.data.attributes.building_business_partnership : 0;
                //     temp.creative = tempData.attributes.nilai_key_competency.data.attributes.creative_innovative !== null ? tempData.attributes.nilai_key_competency.data.attributes.creative_innovative : 0;
                //     temp.customer = tempData.attributes.nilai_key_competency.data.attributes.customer_focus_oriented !== null ? tempData.attributes.nilai_key_competency.data.attributes.customer_focus_oriente : 0;
                //     temp.developing = tempData.attributes.nilai_key_competency.data.attributes.developing_other !== null ? tempData.attributes.nilai_key_competency.data.attributes.developing_other : 0;
                //     temp.driving = tempData.attributes.nilai_key_competency.data.attributes.driving_execution !== null ? tempData.attributes.nilai_key_competency.data.attributes.driving_execution : 0;
                //     temp.enthuasiasthic = tempData.attributes.nilai_key_competency.data.attributes.enthusiasthic_for_challenge !== null ? tempData.attributes.nilai_key_competency.data.attributes.enthusiasthic_for_challenge : 0;
                //     temp.strategic = tempData.attributes.nilai_key_competency.data.attributes.strategic_orientation !== null ? tempData.attributes.nilai_key_competency.data.attributes.strategic_orientation : 0;
                //     temp.visionary = tempData.attributes.nilai_key_competency.data.attributes.visionary_leadership !== null ? tempData.attributes.nilai_key_competency.data.attributes.visionary_leadership : 0;
                //     temp.eksternal = tempData.attributes.nilai_personal_endurance.data.attributes.eksternal_readiness !== null ? tempData.attributes.nilai_personal_endurance.data.attributes.eksternal_readiness : 0;
                //     temp.internal = tempData.attributes.nilai_personal_endurance.data.attributes.internal_readiness !== null ? tempData.attributes.nilai_personal_endurance.data.attributes.internal_readiness : 0;
                //     temp.keandalan = tempData.attributes.nilai_proyeksi_jabatan.data.attributes.keandalan_sistem !== null ? tempData.attributes.nilai_proyeksi_jabatan.data.attributes.keandalan_sistem : 0;
                //     temp.kecepatan = tempData.attributes.nilai_proyeksi_jabatan.data.attributes.kecepatan_recovery !== null ? tempData.attributes.nilai_proyeksi_jabatan.data.attributes.kecepatan_recovery : 0;
                //     temp.konstribusi = tempData.attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI !== null ? tempData.attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI : 0;
                //     temp.manajemen = tempData.attributes.nilai_proyeksi_jabatan.data.attributes.manajemen_aset !== null ? tempData.attributes.nilai_proyeksi_jabatan.data.attributes.manajemen_aset : 0;
                //     console.log("creative",temp.creative);

                //     console.log("newObject",newObject);
                // })
                // setDatas("hello anjing");
            })
            .catch((err) => {
                console.log("fail get Data For Admin");
            });
    };

    const updateNilaiCompetencyByIndex = (index, total) => {
        let id = infoFitProper.attributes.nilai_fit_propers.data[index].attributes.nilai_key_competency.data.id;
        const data = {
            total_nilai_key_competencies: total,
            enthusiasthic_for_challenge: datas[index].enthuasiasthic,
            creative_innovative: datas[index].creative,
            building_business_partnership: datas[index].building,
            strategic_orientation: datas[index].strategic,
            customer_focus_oriented: datas[index].customer,
            driving_execution: datas[index].driving,
            visionary_leadership: datas[index].visionary,
            developing_other: datas[index].developing
        }

        axios
            .put(`http://localhost:1337/api/nilai-key-competencies/${id}`, { data })
            .then((res) => {
                console.log("success update competencies");

            })
            .catch((err) => {
                console.log("fail", err);
            });
    }

    const updateNilaiJabatanByIndex = (index, total) => {
        let id = infoFitProper.attributes.nilai_fit_propers.data[index].attributes.nilai_proyeksi_jabatan.data.id;
        console.log("total jabatan", total);
        const data = {
            total_nilai_proyeksi_jabatan: total,
            keandalan_sistem: datas[index].keandalan,
            kecepatan_recovery: datas[index].kecepatan,
            manajemen_aset: datas[index].manajemen,
            kontribusi_KPI: datas[index].konstribusi
        }
        axios
            .put(`http://localhost:1337/api/nilai-proyeksi-jabatans/${id}`, { data })
            .then((res) => {
                console.log("success update jabatan");

            })
            .catch((err) => {
                console.log("fail", err);
            });
    }

    const updateNilaiEnduranceByIndex = (index, total) => {
        let id = infoFitProper.attributes.nilai_fit_propers.data[index].attributes.nilai_personal_endurance.data.id;
        console.log("total endurance", total);
        const data = {
            total_nilai_personal_endurance: total,
            internal_readiness: datas[index].internal,
            eksternal_readiness: datas[index].eksternal
        }
        axios
            .put(`http://localhost:1337/api/nilai-personal-endurances/${id}`, { data })
            .then((res) => {
                console.log("success update endurance");
                setStatusNilai("getNilaiBaru");
            })
            .catch((err) => {
                console.log("fail", err);
            });
    }

    const updateNilaiFitProper = (index, total) => {
        const data = {
            total_nilai_fit_proper: total
        }

        axios.put(`http://localhost:1337/api/nilai-fit-propers/${index}`, { data })
            .then((res) => {
                console.log("success update nilai fit proper");
            }).catch((err) => {

            })
    }

    const updateStatusFitProper = () => {
        let id = infoFitProper.id;
        let total = 0, totalTemp = 0;
        infoFitProper.attributes.nilai_fit_propers.data.map((nilai, index) => {
            totalTemp = 0;
            totalTemp = (nilai.attributes.nilai_key_competency.data.attributes.total_nilai_key_competencies
                + nilai.attributes.nilai_personal_endurance.data.attributes.total_nilai_personal_endurance
                + nilai.attributes.nilai_proyeksi_jabatan.data.attributes.total_nilai_proyeksi_jabatan) / 3;
            console.log("totalTemp" + index, totalTemp);
            updateNilaiFitProper(nilai.id, totalTemp);
            total = total + totalTemp;
        })
        total = total / countLoop;
        console.log("total adalah ", total);
        let data = {
            status: 1,
            total_penilaian_akhir_fit_proper: total
        }
        if (total < 70) {
            data.status = 2
        }
        console.log("total berapa ?", data);
        axios
            .put(`http://localhost:1337/api/fit-propers/${id}`, { data })
            .then((res) => {
                console.log("update status fit proper successs");
            })
            .catch((err) => {
                console.log("status fail update");
            })
        setStatusNilai("false");
    }

    const updateAll = (index, name) => {
        let total = (datas[index].enthuasiasthic + datas[index].creative + datas[index].building + datas[index].strategic + datas[index].customer + datas[index].driving + datas[index].visionary + datas[index].developing) / 8;
        console.log("total competency", total);
        updateNilaiCompetencyByIndex(index, total);
        total = (datas[index].keandalan + datas[index].kecepatan + datas[index].manajemen + datas[index].konstribusi) / 4;
        updateNilaiJabatanByIndex(index, total);
        total = (datas[index].eksternal + datas[index].internal) / 2;
        updateNilaiEnduranceByIndex(index, total);
        swal("Berhasil!", "Berhasil menyimpan pada " + name, "success");
    }

    const fillDatas = () => {
        if (countLoop < infoFitProper.attributes.nilai_fit_propers.data.length) {
            let temp =
            {
                enthuasiasthic: 0,
                creative: 0,
                building: 0,
                strategic: 0,
                customer: 0,
                driving: 0,
                visionary: 0,
                developing: 0,
                keandalan: 0,
                kecepatan: 0,
                manajemen: 0,
                konstribusi: 0,
                internal: 0,
                eksternal: 0,
            };
            temp.building = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.building_business_partnership !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.building_business_partnership : 0;
            temp.creative = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.creative_innovative !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.creative_innovative : 0;
            temp.customer = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.customer_focus_oriented !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.customer_focus_oriented : 0;
            temp.developing = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.developing_other !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.developing_other : 0;
            temp.driving = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.driving_execution !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.driving_execution : 0;
            temp.enthuasiasthic = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.enthusiasthic_for_challenge !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.enthusiasthic_for_challenge : 0;
            temp.strategic = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.strategic_orientation !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.strategic_orientation : 0;
            temp.visionary = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.visionary_leadership !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_key_competency.data.attributes.visionary_leadership : 0;
            temp.eksternal = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_personal_endurance.data.attributes.eksternal_readiness !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_personal_endurance.data.attributes.eksternal_readiness : 0;
            temp.internal = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_personal_endurance.data.attributes.internal_readiness !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_personal_endurance.data.attributes.internal_readiness : 0;
            temp.keandalan = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_proyeksi_jabatan.data.attributes.keandalan_sistem !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_proyeksi_jabatan.data.attributes.keandalan_sistem : 0;
            temp.kecepatan = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_proyeksi_jabatan.data.attributes.kecepatan_recovery !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_proyeksi_jabatan.data.attributes.kecepatan_recovery : 0;
            temp.konstribusi = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI : 0;
            temp.manajemen = infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_proyeksi_jabatan.data.attributes.manajemen_aset !== null ? infoFitProper.attributes.nilai_fit_propers.data[countLoop].attributes.nilai_proyeksi_jabatan.data.attributes.manajemen_aset : 0;
            // console.log("isi temp",temp);
            setDatas([...datas, temp]);
            setCountLoop(countLoop + 1);
        }
    }

    const changeDatasValue = (key, index, value) => {
        let newArr = [...datas];
        if (key === "enthusiasthic") {
            newArr[index].enthuasiasthic = parseInt(value);
        } else if (key === "creative") {
            newArr[index].creative = parseInt(value);
        } else if (key === "building") {
            newArr[index].building = parseInt(value);
        } else if (key === "strategic") {
            newArr[index].strategic = parseInt(value);
        } else if (key === "customer") {
            newArr[index].customer = parseInt(value);
        } else if (key === "driving") {
            newArr[index].driving = parseInt(value);
        } else if (key === "visionary") {
            newArr[index].visionary = parseInt(value);
        } else if (key === "developing") {
            newArr[index].developing = parseInt(value);
        } else if (key === "keandalan") {
            newArr[index].keandalan = parseInt(value);
        } else if (key === "kecepatan") {
            newArr[index].kecepatan = parseInt(value);
        } else if (key === "manajemen") {
            newArr[index].manajemen = parseInt(value);
        } else if (key === "kontribusi") {
            newArr[index].konstribusi = parseInt(value);
        } else if (key === "internal") {
            newArr[index].internal = parseInt(value);
        } else if (key === "eksternal") {
            newArr[index].eksternal = parseInt(value);
        }
        console.log("key", key);

        setDatas(newArr);
    }

    const changeStatusEdit = () => {
        const data = {
            status_edit: 0
        }
        axios.put(`http://localhost:1337/api/fit-propers/${id}`, { data })
            .then((res) => {
                console.log("berhasil change status edit!!");
                setStatusNilai("final");
            })
            .catch((err) => {
                console.log("gagal change status edit");
            });
        if(infoFitProper.attributes.total_penilaian_akhir_fit_proper<70){
            changeProyeksiPegawai();
        }
    }

    const changeProyeksiPegawai = ()=>{
        let idPegawai = infoFitProper.attributes.peserta.data.attributes.pegawai.data.id;
        const data ={
            grade : infoFitProper.attributes.proyeksi.data.attributes.grade.data.id,
            jenjang: infoFitProper.attributes.proyeksi.data.attributes.jenjang.data.id,
            unit: infoFitProper.attributes.proyeksi.data.attributes.unit.data.id,
            jabatan: infoFitProper.attributes.proyeksi.data.attributes.jabatan.data.id

        }
        axios.put(`http://localhost:1337/api/pegawais/${idPegawai}`,{data})
        .then((res)=>{
            console.log("success update pegawai",res.data)
        }).catch((err)=>{
            console.log("gagal update pegawai",err)
        })
    }

    const finalHandler = () => {
        getDataforAdmin();
        swal({
            title: "Kamu Yakin?",
            text: "jika menandai final, maka kamu tidak akan dapat mengedit nilai peserta ini lagi!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((res) => {
                if (res) {
                    changeStatusEdit();
                } else {
                    swal("kamu masih ingin mengedit nilai peserta ini :)");
                }
            });
    }

    useEffect(() => {
        console.log("isi status nilai", statusNilai);
        if (infoFitProper.length === 0) {
            getDataforAdmin();
        }
        if (infoFitProper.length !== 0) {
            if (datas.length !== infoFitProper.attributes.nilai_fit_propers.data.length) {
                fillDatas();
            }
        }
        if (statusNilai === "getNilaiBaru") {
            getDataforAdmin();
        } else if (statusNilai === "updateNilai") {
            updateStatusFitProper();
        }
        if (statusNilai === "final") {
            swal("Kamu Berhasil Menilai Peserta Ini!",{icon: "success"})
                .then((value) => {
                    window.history.back();
                });
        }
        // console.log("isi datas", datas);
        console.log("isi infofitproper", infoFitProper);
    });
    return (
        <>
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0" style={{ fontWeight: 'normal' }}>Penilaian Fit Proper By ID : {id}</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Fit-Proper</a></li>
                        <li className="breadcrumb-item"><a href="#">Penilaian</a></li>
                        <li className="breadcrumb-item active">Id</li>
                    </ol>
                </div>
                <div className='col-12'>
                    <br></br>
                </div>
                {infoFitProper.length !== 0 ? (
                    <div className='col-12'>
                        <div className="card">
                            <div className="card-header">
                                <div className='row'>
                                    <h5 className="col-10">Tabel Penilaian Fit & Proper</h5>
                                    <button className='col-2 btn bg-danger' onClick={() => finalHandler()}>Final</button>
                                </div>
                                <div>
                                    <p className='card-subtitle'>Nama &emsp;: {infoFitProper.attributes.peserta.data.attributes.pegawai.data.attributes.nama_pegawai} <br />
                                        NIP&emsp;&emsp;&nbsp;: {infoFitProper.attributes.peserta.data.attributes.pegawai.data.attributes.nip} </p>
                                </div>
                            </div>

                            <div className="card-body table-responsive p-0">
                                <table className="table table-striped table-bordered table-hover text-nowrap">
                                    <thead>
                                        <tr className='text-center'>
                                            <th className='align-middle' rowSpan={2}>No</th>
                                            <th className='align-middle' rowSpan={2}>Penguji</th>
                                            <th colSpan={8}>Nilai Key Competencies</th>
                                            <th colSpan={4}>Nilai Proyeksi Jabatan</th>
                                            <th colSpan={2}>Nilai Personal Endurance</th>
                                            <th className='align-middle' rowSpan={2}>Action</th>
                                        </tr>
                                        <tr>
                                            <th>Enthuasiasthic for challenge</th>
                                            <th>Creative innovative</th>
                                            <th>Building business patnership</th>
                                            <th>Strategic orientation</th>
                                            <th>Customer focus oriented</th>
                                            <th>Driving execution</th>
                                            <th>Visionary leadership</th>
                                            <th>Developing other</th>

                                            <th>Keandalan sistem</th>
                                            <th>Kecepatan recovery</th>
                                            <th>Manajemen aset</th>
                                            <th>Konstribusi KPI</th>

                                            <th>Internal readliness</th>
                                            <th>Eksternal readliness</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {infoFitProper.attributes.nilai_fit_propers.data.map(
                                            (res, index) => {
                                                return (
                                                    <>
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {
                                                                    res.attributes.penguji.data.attributes.pegawai.data.attributes.nama_pegawai
                                                                }
                                                            </td>

                                                            <th>
                                                                <input
                                                                    key={index}
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_key_competency.data.attributes.enthusiasthic_for_challenge !== null) ? res.attributes.nilai_key_competency.data.attributes.enthusiasthic_for_challenge : "0"}
                                                                    onChange={(e) => changeDatasValue("enthusiasthic", index, e.target.value)}
                                                                />
                                                            </th>

                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_key_competency.data.attributes.creative_innovative !== null) ? res.attributes.nilai_key_competency.data.attributes.creative_innovative : "0"}
                                                                    onChange={(e) => changeDatasValue("creative", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_key_competency.data.attributes.building_business_partnership !== null) ? res.attributes.nilai_key_competency.data.attributes.building_business_partnership : "0"}
                                                                    onChange={(e) => changeDatasValue("building", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_key_competency.data.attributes.strategic_orientation !== null) ? res.attributes.nilai_key_competency.data.attributes.strategic_orientation : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("strategic", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_key_competency.data.attributes.customer_focus_oriented !== null) ? res.attributes.nilai_key_competency.data.attributes.customer_focus_oriented : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("customer", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_key_competency.data.attributes.driving_execution !== null) ? res.attributes.nilai_key_competency.data.attributes.building_business_partnership : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("driving", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_key_competency.data.attributes.visionary_leadership !== null) ? res.attributes.nilai_key_competency.data.attributes.visionary_leadership : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("visionary", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_key_competency.data.attributes.developing_other !== null) ? res.attributes.nilai_key_competency.data.attributes.developing_other : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("developing", index, e.target.value)}
                                                                />
                                                            </th>

                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_proyeksi_jabatan.data.attributes.keandalan_sistem !== null) ? res.attributes.nilai_proyeksi_jabatan.data.attributes.keandalan_sistem : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("keandalan", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_proyeksi_jabatan.data.attributes.kecepatan_recovery !== null) ? res.attributes.nilai_proyeksi_jabatan.data.attributes.kecepatan_recovery : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("kecepatan", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_proyeksi_jabatan.data.attributes.manajemen_aset !== null) ? res.attributes.nilai_proyeksi_jabatan.data.attributes.manajemen_aset : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("manajemen", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI !== null) ? res.attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("kontribusi", index, e.target.value)}
                                                                />
                                                            </th>

                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_personal_endurance.data.attributes.internal_readiness !== null) ? res.attributes.nilai_personal_endurance.data.attributes.internal_readiness : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("internal", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <th>
                                                                <input
                                                                    type="number"
                                                                    min={0}
                                                                    max={100}
                                                                    placeholder={(res.attributes.nilai_personal_endurance.data.attributes.eksternal_readiness !== null) ? res.attributes.nilai_personal_endurance.data.attributes.eksternal_readiness : "0"}
                                                                    onChange={(e) =>
                                                                        changeDatasValue("eksternal", index, e.target.value)}
                                                                />
                                                            </th>
                                                            <td>
                                                                <a className="btn btn-success" onClick={() => updateAll(index, res.attributes.penguji.data.attributes.pegawai.data.attributes.nama_pegawai)}>Submit Nilai</a>
                                                            </td>
                                                        </tr>
                                                    </>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                ) : (
                    <h4>No data</h4>
                )}
            </div>
        </>
    )
}
