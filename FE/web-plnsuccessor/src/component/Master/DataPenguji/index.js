import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEditBoxLine } from 'react-icons/ri';
import "./index.css";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Index() {

  const [Data, setData] = useState([]);

  const fetchData = () => {
      axios
       .get('http://localhost:1337/api/pengujis?populate=pegawai.jabatan&populate=pegawai.jenjang&populate=pegawai.grade')
       .then((res) => {
        console.log(res);
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

  useEffect(() => {
    if (Data.length == 0) {
      fetchData();
    }
   });

   return (
    <div className="container">
      <div className="add">
        <a href="data-penguji/add"><button class="btn btn-primary btn-sm">Tambah Data Penguji</button></a>
          {/* <center><form>
            <label>Nama yang dicari :</label>
            <input type="text" name="cari"></input>
            <input class="btn btn-primary btn-sm" type="submit" value="Cari"></input>
          </form></center> */}
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
        {Data.map((data, index) => {
        console.log("test",data);
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

