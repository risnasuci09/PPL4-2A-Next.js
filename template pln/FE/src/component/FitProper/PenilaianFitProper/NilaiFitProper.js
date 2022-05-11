import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";
import { Table } from "react-bootstrap";
import "./penilaianfitproper.css";
import { useParams } from "react-router-dom";
import { Button } from "bootstrap";
import { type } from "@testing-library/user-event/dist/type";

function NilaiFitProper() {
  const [infoFitProper, setInfoFitProper] = useState([]);
  let { id } = useParams();
  const [bool,setBool] = useState(true);

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

  const [datas, setDatas] = useState(initial_data);

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
        `http://localhost:1337/api/fit-propers/${id}?populate=peserta.pegawai.jabatan&populate=nilai_fit_propers.penguji.pegawai&populate=nilai_fit_propers.nilai_key_competency&populate=nilai_fit_propers.nilai_proyeksi_jabatan&populate=nilai_fit_propers.nilai_personal_endurance`
      )
      .then((res) => {
        setInfoFitProper(res.data.data);
      })
      .catch((err) => {
        console.log("fail get Data For Admin");
      });
  };

  const updateNilaiCompetencyByIndex = (index) =>{
    let id = infoFitProper.attributes.nilai_fit_propers.data[index].attributes.nilai_key_competency.data.id;
    const data = {
      total_nilai_key_competencies: 0,
      enthusiasthic_for_challenge : datas[index].enthuasiasthic,
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

  const updateNilaiJabatanByIndex = (index) =>{
    let id = infoFitProper.attributes.nilai_fit_propers.data[index].attributes.nilai_proyeksi_jabatan.data.id;
    const data = {
      total_nilai_proyeksi_jabatan: 0,
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

  const updateNilaiEnduranceByIndex = (index) =>{
    let id = infoFitProper.attributes.nilai_fit_propers.data[index].attributes.nilai_personal_endurance.data.id;
    const data = {
      total_nilai_personal_endurance: 0,
      internal_readiness: datas[index].internal,
      eksternal_readiness: datas[index].eksternal
    }
    axios
      .put(`http://localhost:1337/api/nilai-personal-endurances/${id}`, { data })
      .then((res) => {
        console.log("success update endurance");
      })
      .catch((err) => {
        console.log("fail", err);
      });
  }

  const updateAll =(index)=>{
    updateNilaiCompetencyByIndex(index);
    updateNilaiJabatanByIndex(index);
    updateNilaiEnduranceByIndex(index);
  }

  useEffect(() => {
    if (infoFitProper.length === 0) {
      getDataforAdmin();
    }
    console.log("length datas",datas.length);
    if(infoFitProper.length !== 0){
      if(datas.length !== infoFitProper.attributes.nilai_fit_propers.data.length){
        setDatas([...datas,initial_data[0]]);
      }
      console.log("length infofitproper",infoFitProper.attributes.nilai_fit_propers.data.length);
    }
    console.log("isi datas",datas);
  });
  return (
    <div>
      {infoFitProper.length !== 0 ? (
        <div>
          <Table className="mb-5">
            <thead>
              <th>
                {
                  infoFitProper.attributes.peserta.data.attributes.pegawai.data
                    .attributes.nip
                }
                -
                {
                  infoFitProper.attributes.peserta.data.attributes.pegawai.data
                    .attributes.nama_pegawai
                }
              </th>
              <th>
                Jabatan Proyeksi:
                {infoFitProper.attributes.proyeksi_jabatan_fit_proper}
              </th>
              <th>{formatDate(infoFitProper.attributes.jadwal)}</th>
            </thead>
          </Table>
          <h4>Penilaian Fit-Proper</h4>
          <Table
            className="tabel-nilai"
            responsive
            bordered
            hover
            variant={"dark"}
          >
            <thead>
              <tr>
                <th rowSpan={2}>No</th>
                <th rowSpan={2}>Penguji</th>
                <th colSpan={8}>Nilai Key Competencies</th>
                <th colSpan={4}>Nilai Proyeksi Jabatan</th>
                <th colSpan={2}>Nilai Personal Endurance</th>
                <th rowSpan={2}>Action</th>
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
                    console.log("inside loop ",(res.attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI !== null)?res.attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI:"0");
                  return (
                    <>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          {
                            res.attributes.penguji.data.attributes.pegawai.data
                              .attributes.nama_pegawai
                          }
                        </td>

                        <th>
                          <input
                            key={index}
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_key_competency.data.attributes.enthusiasthic_for_challenge !== null)?res.attributes.nilai_key_competency.data.attributes.enthusiasthic_for_challenge:"0"}
                            onChange={(e)=>{
                              datas[index].enthuasiasthic = e.target.value;
                            }}
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_key_competency.data.attributes.creative_innovative !== null)?res.attributes.nilai_key_competency.data.attributes.creative_innovative:"0"}
                            onChange={(e) =>
                              datas[index].creative = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_key_competency.data.attributes.driving_execution= null)?res.attributes.nilai_key_competency.data.attributes.building_business_partnership:"0"}
                            onChange={(e) =>
                              datas[index].building = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_key_competency.data.attributes.strategic_orientation !== null)?res.attributes.nilai_key_competency.data.attributes.strategic_orientation:"0"}
                            onChange={(e) =>
                              datas[index].strategic = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_key_competency.data.attributes.customer_focus_oriented !== null)?res.attributes.nilai_key_competency.data.attributes.customer_focus_oriented:"0"}
                            onChange={(e) =>
                              datas[index].customer = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_key_competency.data.attributes.driving_execution= null)?res.attributes.nilai_key_competency.data.attributes.building_business_partnership:"0"}
                            onChange={(e) =>
                              datas[index].driving = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_key_competency.data.attributes.visionary_leadership !== null)?res.attributes.nilai_key_competency.data.attributes.visionary_leadership:"0"}
                            onChange={(e) =>
                              datas[index].visionary = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_key_competency.data.attributes.developing_other !== null)?res.attributes.nilai_key_competency.data.attributes.developing_other:"0"}
                            onChange={(e) =>
                              datas[index].developing = e.target.value
                            }
                          />
                        </th>

                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_proyeksi_jabatan.data.attributes.keandalan_sistem !== null)?res.attributes.nilai_proyeksi_jabatan.data.attributes.keandalan_sistem:"0"}
                            onChange={(e) =>
                              datas[index].keandalan = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_proyeksi_jabatan.data.attributes.kecepatan_recovery !== null)?res.attributes.nilai_proyeksi_jabatan.data.attributes.kecepatan_recovery:"0"}
                            onChange={(e) =>
                              datas[index].kecepatan = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_proyeksi_jabatan.data.attributes.manajemen_aset !== null)?res.attributes.nilai_proyeksi_jabatan.data.attributes.manajemen_aset:"0"}
                            onChange={(e) =>
                              datas[index].manajemen = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI !== null)?res.attributes.nilai_proyeksi_jabatan.data.attributes.kontribusi_KPI:"0"}
                            onChange={(e) =>
                              datas[index].konstribusi = e.target.value
                            }
                          />
                        </th>

                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_personal_endurance.data.attributes.internal_readiness !== null)?res.attributes.nilai_personal_endurance.data.attributes.internal_readiness:"0"}
                            onChange={(e) =>
                              datas[index].internal = e.target.value
                            }
                          />
                        </th>
                        <th>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            placeholder={(res.attributes.nilai_personal_endurance.data.attributes.eksternal_readiness !== null)?res.attributes.nilai_personal_endurance.data.attributes.eksternal_readiness:"0"}
                            onChange={(e) =>
                              datas[index].eksternal = e.target.value
                            }
                          />
                        </th>
                        <td>
                            <a className="btn btn-success" onClick={()=>updateAll(index)}>Submit Nilai</a>
                        </td>
                      </tr>
                    </>
                  );
                }
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <h1>gak masuk</h1>
      )}
    </div>
  );
}

export default NilaiFitProper;
