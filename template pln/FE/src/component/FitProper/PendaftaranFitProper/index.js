import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Multiselect from "multiselect-react-dropdown";

function Index() {
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");
  const [proyeksi, setProyeksi] = useState("");
  const [id, setId] = useState("");
  const [jenisFitProper, setJenisFitProper] = useState(1);
  const [penguji, setPenguji] = useState([]);
  const [selectJenjang, setSelectJenjang] = useState([]);
  const [selectUji, setSelectUji] = useState([]);
  const [onDisable, setOnDisable] = useState(true);
  const [nilai, setNilai] = useState({
    competency: 0,
    jabatan: 0,
    endurance: 0,
  });
  const [nilaiFitProper, setNilaiFitProper] = useState([]);
  const [onSubmit, setOnSubmit] = useState(false);
  // const [selectFitProper, setSelectFitProper] = useState([]);

  const postData = () => {
    const data = {
      proyeksi_jabatan_fit_proper: proyeksi,
      jadwal: date,
      peserta: id,
      jenis_fit_proper: jenisFitProper,
      jenjang_jabatan_fit_proper: jabatan,
      pengujis: selectUji,
      nilai_fit_propers: nilaiFitProper,
      status: 0,
    };

    axios
      .post(`http://localhost:1337/api/fit-propers`, { data })
      .then((res) => {
        console.log("success post");
        successNotify();
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("fail", err);
        errorNotify();
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
      .catch((err) => {});
  };

  const getDataButton = () => {
    axios
      .get(
        `http://localhost:1337/api/pesertas?populate[pegawai][filters][nip][$eq]=${nip}&populate[pegawai][populate]=*`
      )
      .then((res) => {
        // console.log("success", res.data.data.length );
        let count = 0;

        while (count < res.data.data.length) {
          if (res.data.data[count].attributes.pegawai.data != null) {
            setNama(
              res.data.data[count].attributes.pegawai.data.attributes
                .nama_pegawai
            );
            console.log("res2", res.data.data[count]);
            setJabatan(
              res.data.data[count].attributes.pegawai.data.attributes.jabatan
                .data.attributes.nama_jabatan
            );
            setGrade(
              res.data.data[count].attributes.pegawai.data.attributes.grade.data
                .attributes.kode_grade
            );
            setId(res.data.data[count].id);
            setOnDisable(false);
          }
          count++;
        }
        successNotify();
      })
      .catch((err) => {
        console.log("fail");
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

  const successNotify = () =>
    toast.success("berhasil!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const errorNotify = () =>
    toast.error("error", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

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
          console.log("hai");
          postData();
        }
        setOnSubmit(false);
        console.log("false");
      }
    }
  };

  useEffect(() => {
    console.log("selecuji: ", selectUji[0]);
    makeNilaiAtributtes();

    if (selectJenjang.length === 0) {
      getJenjangJabatan();
    }
    if (penguji.length === 0) {
      getPenguji();
    }
  });

  return (
    <div>
      <Card>
        <Card.Header>
          <div className="titleForm">Pendaftaran Peserta Fit & Proper</div>
        </Card.Header>
        <Card.Body>
            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="nip">NIP</label>
              </Col>
              <Col md={{ span: 7 }}>
                <input
                  type="text"
                  id="nip"
                  name="nip"
                  value={nip}
                  placeholder="NIP"
                  onChange={(e) => setNip(e.target.value)}
                />
              </Col>
              <Col>
                <Button onClick={getDataButton}>Cek</Button>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="nama">Nama</label>
              </Col>
              <Col md={{ span: 7 }}>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  placeholder="Nama"
                  value={nama}
                  disabled
                />
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="jabatan">Jabatan</label>
              </Col>
              <Col md={{ span: 7 }}>
                <input
                  type="text"
                  id="jabatan"
                  name="jabatan"
                  placeholder="Jabatan"
                  value={jabatan}
                  disabled
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="grade">Grade</label>
              </Col>
              <Col md={{ span: 7 }}>
                <input
                  type="text"
                  id="grade"
                  name="grade"
                  placeholder="Grade"
                  value={grade}
                  disabled
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="date">Date</label>
              </Col>
              <Col md={{ span: 7 }}>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={onDisable}
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="proyeksi">Proyeksi</label>
              </Col>
              <Col md={{ span: 7 }}>
                <input
                  type="text"
                  id="proyeksi"
                  name="proyeksi"
                  value={proyeksi}
                  placeholder="Jabatan Proyeksi"
                  onChange={(e) => setProyeksi(e.target.value)}
                  disabled={onDisable}                  
                />
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="JJabatan">Jenjang Jabatan</label>
              </Col>
              <Col md={{ span: 7 }}>
                <Form.Select
                  id="jjabatan"
                  name="jjabatan"
                  aria-label="Default select example"
                  onChange={(e) => setJabatan(e.target.value)}
                  disabled={onDisable}
                >
                  <option>Select Jenjang</option>
                  {selectJenjang.map((sel, index) => (
                    <option value={sel.id} data-index={index}>
                      {sel.attributes.nama_jenjang}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="jenisfitproper">Jenis Fit & Proper</label>
              </Col>
              <Col md={{ span: 7 }}>
                <Form.Select
                  id="jenisfitproper"
                  name="jenisfitproper"
                  aria-label="Default select example"
                  onChange={(e) => setJenisFitProper(e.target.value)}
                  disabled={onDisable}
                >
                  <option>Select Jenis Fit Proper</option>
                  <option value="1">Regular</option>
                  <option value="2">Vcon</option>
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 2 }} className="d-flex justify-content-end">
                <label htmlFor="jenisfitproper">Pilih Penguji</label>
              </Col>
              <Col md={{ span: 7 }}>
                <Multiselect
                  isObject={true}
                  displayValue="nama"
                  onKeyPressFn={function noRefCheck() {}}
                  onRemove={(e) => {
                    setSelectUji(e);
                  }}
                  onSearch={(e) => {
                    console.log("on search", e);
                  }}
                  onSelect={(e) => {
                    setSelectUji(e);
                  }}
                  options={penguji}
                  disable={onDisable}
                />
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Button
                type="submit"
                onClick={() => setOnSubmit(true)}
                disabled={onDisable}
              >
                Submit
              </Button>
            </Row>
        </Card.Body>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Index;
