import "./index.css";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Add() {
//   const [nip, setNip] = useState("");

//   const postData = () => {
//     const data = {
//       //penguji: id
//     };
//     axios
//       .post(`http://localhost:1337/api/pengujis`, { data })
//       .then((res) => {
//         console.log("success post");
//         successNotify();
//       })
//       .catch((err) => {
//         console.log("fail",err);
//         errorNotify();
//       });
//   };

//   useEffect(() => {
//     //console.group("hasil useeffect");
//     //console.log(id);
//     // console.groupEnd();
//     // if (Data.length === 0) {
//     //   postData();
//     // }
//   });
  
//   const successNotify = () =>toast.success('berhasil!', {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     });

// const errorNotify = () =>toast.error('error', {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   });


  return (
    <div>
      <div className="container head">
        <div className="titleForm">Input Data Peserta</div>
      </div>
      <Card style={{ width: '100' }}>
      <Card.Body>
      <Row>
            <Col md={{ span: 2 }} className="d-flex justify-content-end">
              <label for="nip">NIP</label>
            </Col>
            <Col md={{ span: 7 }}>
            <input
              type="text"
              id="nip"
              name="nip"
              placeholder="NIP"
            //   onChange={(e) => setNip(e.target.value)}
            />
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

export default Add