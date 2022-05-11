import React, { useEffect, useState } from "react";
import { Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import "./jadwal.css";

function Index() {
  const [first, setFirst] = useState(0);
  const [data, setData] = useState([]);

  function formatDate(string) {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(string).toLocaleDateString([], options);
  }

  const filterBulan = (value) =>{
    axios
      .get(
        `http://localhost:1337/api/fit-propers?populate=peserta.pegawai.jabatan&filters[jadwal][$gte]=${value}&filters[jadwal][$lte]=${newDate(value)}&populate=nilai_fit_propers.penguji.pegawai`
      )
      .then((res) => {
        // console.log("success filter", res.data.data.length);
        
        setData(res.data.data);
        //   successNotify();
      })
      .catch((err) => {
        console.log("fail");
        //   errorNotify();
      });
  }

  function newDate(value){
    let date = new Date(value);
    let result;

    if((date.getMonth()+1)>9){
      if((date.getMonth()+1)===12){
        result = `${date.getFullYear()+1}-01`;
      }else{
        result = `${date.getFullYear()}-${date.getMonth()+2}`;
      }
    }else{
      result = `${date.getFullYear()}-0${date.getMonth()+2}`;
    }
    return result;
  }

  const getData = () => {
    let today = new Date();
    console.log();
    axios
      .get(
        `http://localhost:1337/api/fit-propers?populate=peserta.pegawai.jabatan&filters[jadwal][$gte]=${newDate(today.getFullYear()+'-'+(today.getMonth()))}&filters[jadwal][$lte]=${newDate(today.getFullYear()+'-'+(today.getMonth()+1))}&populate=nilai_fit_propers.penguji.pegawai`
      )
      .then((res) => {
        // console.log("success get", res);
        setData(res.data.data);
        //   successNotify();
      })
      .catch((err) => {
        console.log("fail");
        //   errorNotify();
      });
  };

  useEffect(() => {
    // console.log(filterMonth);
    if (first === 0) {
      getData();
      setFirst(1);
    }
  });

  return (
    <div>
      <Row className="row-filter">
        <Col md={{ span: 3 }}><Form.Label >Pilih Bulan Tahun</Form.Label> </Col>
        {/* <Col ><input className="filter mb-3" type="month" min="2019-01" onChange={(e)=>setFilterMonth(e.target.value)}/></Col> */}
        <Col md={{ span: 3 }}><Form.Control type="month" onChange={(e)=>filterBulan(e.target.value)} /></Col>
      </Row>
      
      <Table className="table-jadwal" striped bordered hover responsive>
        <thead>
          <tr className="table-title">
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
          {data.map((res, index) => {
            console.log("test", res);
            return (
              <>
                <tr data-index={index} key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {
                      res.attributes.peserta.data.attributes.pegawai.data
                      .attributes.nama_pegawai
                    }
                  </td>
                  <td>
                    {
                      res.attributes.peserta.data.attributes.pegawai.data
                      .attributes.nip
                    }
                  </td>
                  <td>
                    {
                      res.attributes.peserta.data.attributes.pegawai.data
                        .attributes.jabatan.data.attributes.nama_jabatan
                    }
                  </td>
                  <td>{res.attributes.proyeksi_jabatan_fit_proper}</td>
                  <td>{formatDate(res.attributes.jadwal)}</td>
                  <td>
                    <DropdownButton title="penguji" className="drop">
                      {res.attributes.nilai_fit_propers.data.map((uji, index) => {
                        return (
                          <>
                            <Dropdown.Item key={index} aria-readonly>
                              {
                                uji.attributes.penguji.data.attributes.pegawai.data.attributes
                                .nama_pegawai
                              }
                            </Dropdown.Item>
                          </>
                        );
                      })}
                    </DropdownButton>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Index;
