import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

function Add() {
  const [nip, setNip] = useState("");
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [grade, setGrade] = useState("");
  const [id, setId] = useState("");

  const getDataButton = () => {
    axios
      .get(
        `http://localhost:1337/api/pegawais?filters[nip][$eq]=${nip}&populate=*`
      )
      .then((res) => {
        // console.log("success", res.data.data.length );
        let count = 0;

        // while (count < res.data.data.length) {
        //   if (res.data.data[count].attributes.pegawai.data != null) {
        //     setNama(
        //       res.data.data[count].attributes.pegawai.data.attributes
        //         .nama_pegawai
        //     );
        //     console.log("res2", res.data.data[count]);
        //     setJabatan(
        //       res.data.data[count].attributes.pegawai.data.attributes.jabatan
        //         .data.attributes.nama_jabatan
        //     );
        //     setGrade(
        //       res.data.data[count].attributes.pegawai.data.attributes.grade.data
        //         .attributes.kode_grade
        //     );
        //     setId(res.data.data[count].id);
        //     console.log(res.data.data[0].id);
        //   }
        //   count++;
        // }
        console.log('cari data get', res.data.data[0]);
        setNama(
                res.data.data[0].attributes.nama_pegawai
              );
        setJabatan(
                res.data.data[0].attributes.jabatan.data.attributes.nama_jabatan
              );
        setGrade(
                res.data.data[0].attributes.grade.data.attributes.kode_grade
              );
        setId(res.data.data[0].id);
        successNotify();
      })
      .catch((err) => {
        console.log("fail");
      });
  };

  const postData = () => {
    const data = {
      pegawai: id
    };
    axios
      .post(`http://localhost:1337/api/pengujis`, { data })
      .then((res) => {
        console.log("success post", data);
        successNotify();
      })
      .catch((err) => {
        console.log("fail",err);
        errorNotify();
      });
  };

  const successNotify = () =>toast.success('berhasil!', {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              });

  const errorNotify = () =>toast.error('error', {
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
  });

  return (
    <div>
      <div className="container head">
        <div className="titleForm">Input Data Penguji</div>
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
        
        <Row className="justify-content-center">
          <Button type="submit" onClick={postData}>
            submit
          </Button>
        </Row>
        {/* </form> */}
      </div>
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

export default Add;