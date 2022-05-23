import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from 'react-icons/ai';
import { RiEditBoxLine } from 'react-icons/ri';
import "./index.css";
import axios from "axios";

export default function Index() {

  const [Data, setData] = useState([]);
  const [searchTerm, setSearchTerm]= useState('')

  const fetchData = () => {
      axios
       .get('http://localhost:1337/api/pesertas?populate=pegawai.jabatan&populate=pegawai.jenjang&populate=pegawai.grade')
       .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
  };

  useEffect(() => {
    if (Data.length == 0) {
      fetchData();
    }
   });

   return (
    <div className="container">
      <div className="Index">
          <input type ="text" placeholder="Cari NIP/Nama Peserta ..." onChange={(event)=>{
            setSearchTerm(event.target.value);
          }}/>
        </div>
        <br/>
        
      <div className="add">
        <a href="data-peserta/add"><button class="btn btn-primary btn-sm">Tambah Data Peserta</button></a>
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
          <th>Aksi</th>
        </tr>
      </thead>
        
      <tbody>
        
        {Data.filter((data)=>{
          if(searchTerm == ""){
            return data
          }else if(data.attributes.pegawai.data.attributes.nip.toLowerCase().includes(searchTerm.toLowerCase()) || data.attributes.pegawai.data.attributes.nama_pegawai.toLowerCase().includes(searchTerm.toLowerCase())){
            return data
          }
        }).map((data, key) => {
        console.log("test",data);
        return<>
          <tr key={key}>
          {/* <td>test</td> */}
          <td>{data.attributes.pegawai.data.attributes.nama_pegawai}</td>
          <td>{data.attributes.pegawai.data.attributes.nip}</td>
          <td>{data.attributes.pegawai.data.attributes.jabatan.data.attributes.nama_jabatan}</td>
            <td>{data.attributes.pegawai.data.attributes.grade.data.attributes.kode_grade}</td>
            <td>{data.attributes.pegawai.data.attributes.jenjang.data.attributes.nama_jenjang}</td>
          <td className="aksi">
                <AiOutlineDelete size="1.5em" fill="red" />
                <RiEditBoxLine size="1.5em" fill="blue" />
          </td>
    </tr>
    </>
})}
      </tbody>
        
      </table>
    </div>
  );
}

