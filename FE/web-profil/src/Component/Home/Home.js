import React, { Component, Fragment } from "react";
import DropdownRole from "../DropdownRole";
import Mahasiswa from "../Mahasiswa";
import axios from "axios";
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
        `http://localhost:1337/api/roles-mahasiswas/${this.state.role}?fields=tugas&populate=mahasiswas`
      )
      .then((res) => {
        this.setState({
          mahasiswa: res.data.data.attributes.mahasiswas.data,
        });
      });
    // fetch(`https://jsonplaceholder.typicode.com/users/${this.state.role}`)
    // .then(response =>response.json)
    // .then(json =>{
    //     this.setState({
    //         post:json
    //     })
    // })
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
      <div>
        <div>
          <DropdownRole
            onCounterChange={(value) => this.handleCounterChange(value)}
          />
        </div>
        <Fragment>
          <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Umur</th>
                </tr>
            </thead>
          
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
          </Table>
        </Fragment>
      </div>
    );
  }
}

export default Home;
