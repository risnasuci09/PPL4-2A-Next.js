import React, { Component, Fragment } from "react";
import DropdownRole from "../DropdownRole/DropdownRole";
import Mahasiswa from "./Mahasiswa";
import axios from "axios";
import "./Home.css";
import { Table } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mahasiswa: [],
      role: 1,
      didmount: false,
    };
  }
  getDataAPI = () => {
    axios
      .get(
        `http://localhost:1337/api/tugases/${this.state.role}?fields=nama&populate=mahasiswas`
      )
      .then((res) => {
        this.setState({
          mahasiswa: res.data.data.attributes.mahasiswas.data,
        });
      });
  };

  handleCounterChange = (newvalue) => {
    this.setState({
      role: newvalue,
    });
  };
  componentDidMount() {
    this.setState({
      didmount: true,
    });
    this.getDataAPI();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.role !== this.state.role) {
      return true;
    } else {
      if (this.state.didmount) {
        return true;
      }
      return false;
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.role !== this.state.role) {
      this.getDataAPI();
    }
  }
  render() {
    return (
      <div className="Home-css">
        <div className="dropdown">
          <DropdownRole
            onCounterChange={(value) => this.handleCounterChange(value)}
          />
        </div>
        {/* <Fragment> */}
        <form>
          <table >
            <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama</th>
                  <th>Umur</th>
                </tr>
            </thead>
          <tbody>
          {this.state.mahasiswa.map((maha) => {
            return (
              <Mahasiswa
                key={maha.id}
                nim={maha.attributes.nim}
                nama={maha.attributes.nama}
                umur={maha.attributes.umur}
              />
            );
          })}
          </tbody>
          </table>
          </form>
        {/* </Fragment> */}
      </div>
    );
  }
}

export default Home;
