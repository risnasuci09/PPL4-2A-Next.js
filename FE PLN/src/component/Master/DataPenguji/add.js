import React from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";
import "./index.css";

function index() {
  return (
    <div>
      <div className="container head">
        <div className="titleForm">Input Data Penguji</div>
      </div>
      <Card style={{ width: '100' }}>
      <Card.Body>
      <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="nip">NIP</label>
            </Col>
            <Col md={{ span: 7 }}>
              <input type="text" id="nip" name="nip" placeholder="NIP" />
            </Col>
            <Col>
              <Button variant="primary" className="btn">Submit</Button>
            </Col>
      </Row>
        
      </Card.Body>
    </Card>
    </div>
    
    
  )
}

export default index