import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

function Index() {
  const getData=()=>{
    axios
    .get(`http://localhost:1337/api/fit-propers?fields=date`)
    .then((res) => {
      console.log("success get",res);
    //   successNotify();
    })
    .catch((err) => {
      console.log("fail");
    //   errorNotify();
    });
  }

  useEffect(()=>{
      getData();
  }
  );

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th colSpan={7}>Jadwal Fit Proper</th>
          </tr>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>NIP</th>
            <th>Jabatan</th>
            <th>Proyeksi</th>
            <th>Tanggal</th>
            <th>Penguji</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Index;
