import axios from "axios";
import React, { Component, Fragment } from "react";
import "./PutTeam.css";

export default class PutTeam extends Component {
  state = {
    id: 0,
    dataPut: {
      nama: "",
      nim: "",
      umur: "",
      tugas: 1,
    },
  };
  handleFormChange = (event) => {
    console.log("handleFormChange", event.target);
    if (event.target.name !== "nim") {
      let dataNew = { ...this.state.dataPut };
      dataNew[event.target.name] = event.target.value;
      this.setState(
        {
          dataPut: dataNew
        },
        () => {
          console.log("value data", this.state.dataPut);
        }
      );
    } else {
      let dataNew = { ...this.state.dataPut };
      dataNew[event.target.name] = event.target.value;
      this.setState(
        {
          dataPut: dataNew,
        },
        () => {
          this.getData();
        }
      );
    }
  };

  handleSubmit = () => {
    console.log("submit");
    this.putData();
  };

  handleDropdown = (event) => {
    console.log("handle dropdown", event.target.name);
    console.log("dropdown value", event.target.value);
  };

  putData = (event) => {
    event.preventDefault();
    const data = {
      nim: this.state.dataPut["nim"],
      nama: this.state.dataPut["nama"],
      umur: this.state.dataPut["umur"],
      tugas: this.state.dataPut["tugas"],
    };
    axios.put(`http://localhost:1337/api/mahasiswas/${this.state.id}`, { data }).then(
      (res) => {
        console.log("value put", res);
      },
      (err) => {
        console.log("err", err);
      }
    );
  };

  getData = () => {
    axios
      .get(
        `http://localhost:1337/api/mahasiswas?filters[nim][$eq]=${this.state.dataPut["nim"]}&populate=tugas`
      )
      .then((res) => {
        console.log("panjang data : ", Object.keys(res.data.data).length);
        console.log("res", res.data.data);
        if (Object.keys(res.data.data).length !== 0) {
          let temp = { ...this.state.dataPut };
          temp.nama = res.data.data[0].attributes.nama;
          temp.nim = res.data.data[0].attributes.nim;
          temp.umur = res.data.data[0].attributes.umur;
          temp.tugas = res.data.data[0].attributes.tugas.data.id;
          this.setState({
            dataPut: temp,
            id:res.data.data[0].id
          },()=>{
            console.log("new data",this.state.dataPut);
          });
        }else{
          let temp = { ...this.state.dataPut };
          temp.nama = "";
          temp.umur = "";
          temp.tugas = "";
          this.setState({
            dataPut:temp
          })
        }
      });
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.putData}>
          <div className="form-add-team">
            <label htmlFor="nim">NIM</label>
            <input
              type="text"
              name="nim"
              placeholder="add NIM"
              onChange={this.handleFormChange}
            />

            <label htmlFor="nama">Nama</label>
            <input
              type="text"
              name="nama"
              placeholder="add Nama"
              value={this.state.dataPut.nama}
              onChange={this.handleFormChange}
            />

            <label htmlFor="umur">Umur</label>
            <input
              type="text"
              name="umur"
              placeholder="add Umur"
              value={this.state.dataPut.umur}
              onChange={this.handleFormChange}
            />

            <label htmlFor="tugas">
              tugas :
              <select value={this.state.dataPut.tugas} name="tugas" onChange={this.handleFormChange}>
                {console.log("tugas berapa?",this.state.dataPut.tugas)}
                <option value="1" >Front-End</option>
                <option value="2">Back-End</option>
                <option value="3">Full-Stack</option>
              </select>
            </label>

            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}
