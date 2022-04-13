import React, { useEffect, useState } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [proyeksi, setProyeksi] = useState("");
  const [id, setId] = useState("");
  const [selectJenjang, setSelectJenjang] = useState([]);
  const [jenisFitProper,setJenisFitProper] = useState(1);
  // const [selectFitProper, setSelectFitProper] = useState([]);

  const postData = () => {
    const data = {
      proyeksi_jabatan_fit_proper: proyeksi,
      date: date,
      time: time,
      peserta: id,
      jenis_fit_proper: jenisFitProper,
      jenjang:jabatan
    };
    axios
      .post(`http://localhost:1337/api/fit-propers`, { data })
      .then((res) => {
        console.log("success post");
        successNotify();
      })
      .catch((err) => {
        console.log("fail");
        errorNotify();
      });
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

  const successNotify = () =>toast.success('🦄 Wow so easy!', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              });

  const errorNotify = () =>toast.error('🦄 Wow so easy!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });

  useEffect(() => {
    console.group("hasil useeffect");
    console.log(id);
    console.log(nip);
    console.log(jabatan);
    console.log(grade);
    console.log(date);
    console.log(proyeksi);
    // console.log("select", selectJenjang);
    console.groupEnd();
    if (selectJenjang.length == 0) {
      console.log("getjenjang");
      getJenjangJabatan();
    }
  });

  return (
    <div>
      <div className="container head">
        <div className="titleForm">Pendaftaran Peserta Fit & Proper</div>
      </div>
      <div className="container body">
        {/* <form onSubmit={postData}> */}
        <Row>
          <Col md={{ span: 2 }} className="d-flex justify-content-end">
            <label htmlFor="nip">NIP</label>
          </Col>
          <Col md={{ span: 7 }}>
            <input
              type="text"
              id="nip"
              name="nip"
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
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              onChange={(e) => setDate(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 2 }} className="d-flex justify-content-end">
            <label htmlFor="time">Time</label>
          </Col>
          <Col md={{ span: 7 }}>
            <input
              type="time"
              id="time"
              name="time"
              onChange={(e) => setTime(e.target.value + ":00")}
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
              placeholder="Jabatan Proyeksi"
              onChange={(e) => setProyeksi(e.target.value)}
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
              onChange={(e)=>setJabatan(e.target.value)}
            >
              <option>Select Jenjang</option>
              {selectJenjang.map((sel, index) => (
                <option value={sel.id} data-index={index}>{sel.attributes.nama_jenjang}</option>
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
              onChange={(e)=>setJenisFitProper(e.target.value)}
            >
              <option>Select Jenis Fit Proper</option>
              <option value="1">Regular</option>
              <option value="2">Vcon</option>
            </Form.Select>
          </Col>
        </Row>
        {/* <Row>
          <Col md={{ span: 2 }} className="d-flex justify-content-end">
            <label for="pilihurjab">Pilih Urjab</label>
          </Col>
          <Col md={{ span: 7 }}>
            <input
              type="text"
              id="pilihurjab"
              name="pilihurjab"
              placeholder="Uraian Jabatan"
            />
          </Col>
        </Row> */}

        {/* perlu perbaiki bagian dropdown */}
        {/* <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="jjabatan">Jenjang Jabatan</label>
            </Col>
            <Col md={{ span: 7 }}>
              <select id="jjabatan" name="jjabatan">
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="jenisfitproper">Jenis Fit & Proper</label>
            </Col>
            <Col md={{ span: 7 }}>
              <select id="jenisfitproper" name="jenisfitproper">
                <option value="australia">Australia</option>
                <option value="canada">Canada</option>
                <option value="usa">USA</option>
              </select>
            </Col>
          </Row>
           */}
        <br />
        <Row className="justify-content-center">
          <Button type="submit" onClick={postData}>
            submit
          </Button>
        </Row>
        {/* </form> */}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Index;
