import React, { Component } from "react";
import axios from "axios";
import * as FcIcons from "react-icons/fc";
import { Alert } from "react-bootstrap";

export default class DelTeam extends Component {
  state = {
    mahasiswa: [],
    isAlert: false,
  };

  handleGetData() {
    axios
      .get(`http://localhost:1337/api/mahasiswas?populate=tugas`)
      .then((res) => {
        this.setState({
          mahasiswa: res.data.data,
        });
      });
  }
  componentDidMount() {
    console.log("componentdidmount");
    this.handleGetData();
  }

  handleDeleteData = (event) => {
    axios
      .delete(`http://localhost:1337/api/mahasiswas/${event}`)
      .then((res) => {
        console.log("hasil delete", res);
        this.setState(
          {
            mahasiswa: [],
          },
          () => {
            this.handleGetData();
          }
        );
      });
  };

  render() {
    return (
      <div>
        <Alert key={0} variant={"danger"} isOpen={this.state.isAlert}>
          This is a {"danger"} alert—check it out!
        </Alert>
        <table>
          <thead>
            <tr>
              <th>NIM</th>
              <th>Nama</th>
              <th>Umur</th>
              <th>Tugas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.mahasiswa.map((val) => {
              return (
                <tr key={val.id}>
                  {console.log("delteam", val.id)}
                  <td> {val.attributes.nim} </td>
                  <td>{val.attributes.nama} </td>
                  <td>{val.attributes.umur} </td>
                  <td>{val.attributes.tugas.data.attributes.nama} </td>
                  <td
                    onClick={(e) => {
                      this.handleDeleteData(val.id);
                    }}
                  >
                    <FcIcons.FcCancel />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
