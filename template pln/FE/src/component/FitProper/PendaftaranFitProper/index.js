import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import "./index.css";

function index() {
  return (
    <div>
      <div className="container head">
        <div className="titleForm">Pendaftaran Peserta Fit & Proper</div>
      </div>
      <div class="container body">
        <form action="/action_page.php">
          <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="nip">NIP</label>
            </Col>
            <Col md={{ span: 7 }}>
              <input type="text" id="nip" name="nip" placeholder="NIP" />
            </Col>
            <Col>
            <Button>Cek</Button>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="nama">Nama</label>
            </Col>
            <Col md={{ span: 7 }}>
              <input type="text" id="nama" name="nama" placeholder="Nama" disabled/>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="jabatan">Jabatan</label>
            </Col>
            <Col md={{ span: 7 }}>
              <input
                type="text"
                id="jabatan"
                name="jabatan"
                placeholder="Jabatan"
                disabled
              />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="grade">Grade</label>
            </Col>
            <Col md={{ span: 7 }}>
              <input type="text" id="grade" name="grade" placeholder="Grade" disabled/>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="date">Date</label>
            </Col>
            <Col md={{ span: 7 }}>
              <input type="date" id="date" name="date" placeholder="Date" />
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="proyeksi">Proyeksi</label>
            </Col>
            <Col md={{ span: 7 }}>
              <input
                type="text"
                id="proyeksi"
                name="proyeksi"
                placeholder="Jabatan Proyeksi"
              />
            </Col>
          </Row>

          {/* perlu perbaiki bagian dropdown */}
          <Row>
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
          <Row>
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
          </Row>
          <br />
          <Row className="justify-content-center">
            <input type="submit" value="Submit" />
          </Row>
        </form>
      </div>
    </div>
  );
}

export default index;
