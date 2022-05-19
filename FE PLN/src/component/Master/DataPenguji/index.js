import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEditBoxLine } from 'react-icons/ri';
import { Form, Row, Col, Button } from "react-bootstrap";
import "./index.css";
import axios from "axios";

export default function Index() {

  const [Data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [tampil,setTampil] = useState([]);
  const [awal,setAwal] = useState(true);


  const fetchData = () => {
      axios
       .get('http://localhost:1337/api/pengujis?populate=pegawai.jabatan&populate=pegawai.jenjang&populate=pegawai.grade')
       .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
  };

  const deleteData = (id) => {    
    axios
      .delete(`http://localhost:1337/api/pengujis/${id}`)
      .then((res) => {
        console.log("success del");
        setData([]);
        //successNotify();
      })
      .catch((err) => {
        console.log("fail",err);
        //errorNotify();
      });
    console.log("id yang akan di delete",id);
  };

  const searchInput = e => {
    let temp =[];

    if(e.length != 0){
      Data.map((data,index)=>{
        //if e length = 0 set 
        if(e===data.attributes.pegawai.data.attributes.nip){
          console.log("test data masuk sesuai nip",data);
          temp.push(data);
          
        }
        console.log("isi temp",temp)
      });
      // // console.log("test",Data);
      setTampil(temp);
      console.log("search terjadi",Data);
    }else{
      setTampil(Data);
      console.log("tidak jadi search")
    }
  };

  useEffect(() => {
    if (Data.length === 0) {
      fetchData();
    }
    if(awal && Data.length !== 0 && tampil.length === 0){
      setTampil(Data);
    }
    console.log("isi tampil",tampil);
   });

   return (
    <div className="container">
      <div class="input-group">
        <a href="data-penguji/add"><button class="btn btn-primary btn-sm">Tambah Data Penguji</button></a>
        <input type="search" class="form-control rounded" placeholder="Search" 
        onChange={(e) => searchInput(e.target.value)} aria-label="Search" aria-describedby="search-addon" />
        <button type="button" class="btn btn-outline-primary">search</button>
      </div>
      
      <div className="utils">
        <p></p>
      </div>
       
      <table className="tabel">
      <thead>
       <tr>
          <th>Nama</th>
          <th>NIP</th>
          <th>Jabatan</th>
          <th>Grade</th>
          <th>Jenjang</th>
          <th>Hapus</th>
        </tr>
      </thead>
        
      <tbody>
        {tampil.map((data, index) => {
        {/* console.log("test",data); */}
        return<>
          <tr data-index={index}>
          {/* <td>test</td> */}
          <td>{data.attributes.pegawai.data.attributes.nama_pegawai}</td>
          <td>{data.attributes.pegawai.data.attributes.nip}</td>
          <td>{data.attributes.pegawai.data.attributes.jabatan.data.attributes.nama_jabatan}</td>
          <td>{data.attributes.pegawai.data.attributes.grade.data.attributes.kode_grade}</td>
          <td>{data.attributes.pegawai.data.attributes.jenjang.data.attributes.nama_jenjang}</td>
          <td className="aksi">
                {/* <AiOutlineDelete size="1.5em" fill="red" /> */}
                <Button type="submit" onClick={()=>deleteData(data.id)}>
                  Hapus
                </Button>
          </td>
    </tr>
    </>
})}
      </tbody>
        
      </table>
    </div>
  );
}

