import React, { useEffect, useState } from "react";
import { Col, Dropdown, DropdownButton, Form, Row, Table } from "react-bootstrap";
import axios from "axios";
import "./penilaianfitproper.css";
import { Button } from "bootstrap";
import * as FcIcons from "react-icons/fc";

function DaftarFitProper() {
    const [first, setFirst] = useState(true);
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
      console.log(value);
      axios
        .get(
          `http://localhost:1337/api/fit-propers?populate=peserta.pegawai.jabatan&filters[jadwal][$gte]=${value}&filters[jadwal][$lte]=${newDate(value)}&populate=nilai_fit_propers.penguji.pegawai`
        )
        .then((res) => {
          console.log("success filter", res.data.data[0].attributes.nilai_fit_propers.data);
          
          setData(res.data.data);
          //   successNotify();
        })
        .catch((err) => {
          console.log("fail");
          setData([]);
          //   errorNotify();
        });
    }

    function getMonthNow(){
      var options = {
        year: "numeric",
        month: "long",
      };
      let date = new Date();
      if((date.getMonth()+1)>9){
        return date.getFullYear() + "-" + (date.getMonth()+1) ;
      }else{
        return date.getFullYear() + "-0" + (date.getMonth()+1) ;
      }
      
    }
  
    const getData = () => {
      let today = new Date();
      axios
        .get(
          `http://localhost:1337/api/fit-propers?populate=peserta.pegawai.jabatan&filters[jadwal][$gte]=${newDate(today.getFullYear()+'-'+(today.getMonth()))}&filters[jadwal][$lte]=${newDate(today.getFullYear()+'-'+(today.getMonth()+1))}&populate=nilai_fit_propers.penguji.pegawai`
        )
        .then((res) => {
          console.log("success get", res);
          setData(res.data.data);
          //   successNotify();
        })
        .catch((err) => {
          console.log("fail");
          //   errorNotify();
        });
    };

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
  
    useEffect(() => {
      console.log(getMonthNow());
      if (first) {
        getData();
        setFirst(false);
      }
    });
  
    return (
      <div>
        <Row className="row-filter">
          <Col md={{ span: 3 }}><Form.Label >Pilih Bulan Tahun</Form.Label> </Col>
          <Col md={{ span: 3 }}><Form.Control type="month" value={getMonthNow()} onChange={(e)=>filterBulan(e.target.value)} /></Col>
        </Row>
        
        <Table className="table-jadwal" striped bordered hover responsive>
          <thead>
            <tr className="table-title">
              <th colSpan={8}>Jadwal Fit Proper</th>
            </tr>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>NIP</th>
              <th>Jabatan</th>
              <th>Proyeksi</th>
              <th>Tanggal</th>
              <th>Penguji</th>
              <th>Penilaian</th>
            </tr>
          </thead>
          <tbody>
            {data.map((res, index) => {
              // 

              console.log("test", res.attributes.nilai_fit_propers.data);
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
                      <DropdownButton title={<FcIcons.FcManager/>} className="drop">
                        {res.attributes.nilai_fit_propers.data.map((uji, index) => {
                          // console.log("hello", uji);
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
                    <td>
                        <a className="btn btn-warning" href={"penilaian-fit-proper/"+res.id}><FcIcons.FcSurvey/></a>
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

export default DaftarFitProper