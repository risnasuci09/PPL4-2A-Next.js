import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import "./index.css";

function index() {
  return (
    <div>
      <Card className="Card">
        <Card.Header>
          <Card.Title>Pendaftaran Peserta Fit & Proper</Card.Title>
        </Card.Header>
        <Card.Body>
          {/*========================================== Form ==========================================*/}
          <form class="form-inline">
            
            <div>
              <label for="nip">NIP :</label>

              <input
                type="text"
                id="nip"
                placeholder="NIP"
                name="nip"
              />
            </div>

            <div>
              <label for="Nama">Nama :</label>

              <input
                type="text"
                id="Nama"
                placeholder="Nama"
                name="Nama"
              />
            </div>

            <div>
              <label for="Jabatan">Jabatan :</label>

              <input
                type="text"
                id="Jabatan"
                placeholder="Jabatan"
                name="Jabatan"
              />
            </div>

            <div>
              <label for="Grade">Grade :</label>

              <input
                type="text"
                id="Grade"
                placeholder="Grade"
                name="Grade"
              />
            </div>

            {/* <br></br>
            <div className="Row">
              <div className="Col">
                <label for="email">Email:</label>
              </div>
              <div className="Col">
                <input type="email" id="email" placeholder="Enter email" name="email"/>
              </div>
            </div> */}
            <button type="submit">Submit</button>
          </form>
          {/*========================================== Akhir Form ==========================================*/}
        </Card.Body>
      </Card>
    </div>
  );
}

export default index;
