import axios from "axios";
import React, { Component } from "react";

export default class AllTeam extends Component {
  state = {
    mahasiswa: [],
  };

  handleGetData() {
    axios
      .get(`http://localhost:1337/api/mahasiswas?populate=tugas`)
      .then((res) => {
        this.setState({
          mahasiswa: res.data.data,
        });
        // console.log("res 1",res.data.data.attributes);
        // console.log("res 2",res.data.data[0].attributes.nama);
      });
  }
  componentDidMount() {
    this.handleGetData();
  }

  testFunction = () => {
    
    const itemMaha = this.state.mahasiswa[0];
    this.state.mahasiswa.map((value)=>{
      console.group("mahasiswa");
      console.log("id",value.id);
      console.log("attributes",value.attributes);
      console.log("tugas",value.attributes.tugas.data.attributes.nama);
      console.groupEnd();
    })
    
  };
  render() {
    return <div>
      <table >
            <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th>Umur</th>
                  <th>Tugas</th>
                </tr>
            </thead>
          <tbody>
                {
                  this.state.mahasiswa.map((val)=>{
                    return <tr>
                      <td>{val.attributes.nim} </td>
                      <td>{val.attributes.nama} </td>
                      <td>{val.attributes.umur} </td>
                      <td>{val.attributes.tugas.data.attributes.nama} </td>
                    </tr>
                  })
                }
          </tbody>
      </table>
    </div>;
  }
}
