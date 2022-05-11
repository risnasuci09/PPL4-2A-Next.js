import  axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";

function Index() {
  const [counter, setCounter] = useState([1, 2, 3]);
  const [nilai, setNilai] = useState([{
    penguji : {
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
    }
  }]);
  const [loop, setLoop] = useState(true);

  const pushNewNilai = () =>{
    console.log("call");
    let penguji = {
      penguji : {
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
      }
    }
    setNilai([...nilai,penguji]);
  }

  useEffect(() => {
    console.log(nilai);
  });

  return (
    <div>
      <h1>Ini Penilaian Wawancara</h1>
      <Button variant="btn btn-warning" onClick={()=>pushNewNilai()} >Submit</Button>
    </div>
  );
}

export default Index;
