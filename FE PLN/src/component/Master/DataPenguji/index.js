import axios from 'axios';
import React, { Component } from "react";

// export default class DataPenguji extends React.Component {

//   state = {
//     penguji: [],
//   };

//   handleGetData() {
//     axios
//       .get(`http://localhost:1337/api/pengujis?populate=pegawais`)
//       .then((res) => {
//         this.setState({
//           penguji: res.data.data,
//         });
//         // console.log("res 1",res.data.data.attributes);
//         // console.log("res 2",res.data.data[0].attributes.nama_pegawai);
//       });
//   }

//   componentDidMount() {
//     this.handleGetData();
//   }

//   testFunction = () => {
    
//     const itemPenguji = this.state.penguji[0];
//     this.state.penguji.map((data)=>{
//       console.group("penguji");
//       console.log("id",data.id);
//       console.log("attributes",data.attributes);
//       console.log("nama_pegawai",data.attributes.pegawais.data.attributes.nama_pegawai);
//       console.log("nip",data.attributes.pegawais.data.attributes.nip);
//       // console.log("tugas",value.attributes.tugas.data.attributes.nama);
//       console.groupEnd();
//     })

//   };

//   render() {
//     return ( 
//     <div>
//       {/* <table>
//             <thead>
//                 <tr>
//                   <th>Nama</th> 
//                   <th>NIP</th>
//                 </tr>
//             </thead>
//           <tbody>
//                 {
//                   this.state.penguji.map((data)=>{
//                     return 
//                     <tr>
//                       <th>{data.attributes.pegawais.data.attributes.nama_pegawai}</th>
//                       <th>{data.attributes.pegawais.data.attributes.nip}</th>
//                     </tr>
//                   })
//                 }
//           </tbody>
//       </table> */}
//       hello
//     </div>
//     )
//   }
// }

function index() {
  return (
    <div>
        <h1>Ini Data Peserta</h1>
    </div>
  )
}

export default index