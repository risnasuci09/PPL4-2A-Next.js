import axios from "axios";
import React, { Component, Fragment } from "react";
import "./PostTeam.css";
// import { withAlert } from 'react-alert';

class PostTeam extends Component {
  state = {
    data: {
      nama: "",
      nim: "",
      umur: "",
      tugas: 1,
    }
  };

  handleFormChange = (event) => {
    console.log("handleFormChange", event.target);
    let dataNew = { ...this.state.data };
    dataNew[event.target.name] = event.target.value;
    this.setState(
      {
        data: dataNew,
      },
      () => {
        console.log("value data", this.state.data);
      }
    );
  };

  handleSubmit = () => {
    console.log("submit");
    this.postData();
  };

  handleDropdown = (event) => {
    console.log("handle dropdown", event.target.name);
    console.log("dropdown value", event.target.value);
  };

  postData = (event) => {
    // const alert = this.props.alert;
    event.preventDefault();
    const data = {
      nim: this.state.data["nim"],
      nama: this.state.data["nama"],
      umur: this.state.data["umur"],
      tugas: this.state.data["tugas"],
    };
    axios.post("http://localhost:1337/api/mahasiswas", { data }).then(
      (res) => {
        console.log("res post",res);
        // alert.show("hello world");
      },
      (err) => {
        console.log("err", err);
      }
    );
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.postData}>
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
              onChange={this.handleFormChange}
            />

            <label htmlFor="umur">Umur</label>
            <input
              type="text"
              name="umur"
              placeholder="add Umur"
              onChange={this.handleFormChange}
            />

            <label htmlFor="tugas">
              tugas :
              <select name="tugas" onChange={this.handleFormChange}>
                <option value="1">Front-End</option>
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

export default PostTeam;
