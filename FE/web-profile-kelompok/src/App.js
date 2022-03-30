import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Hasil, ListRoles, Mahasiswas, NavbarComponent } from './components';
import { API_URL } from './utils/constants';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      mahasiswas: [],
      pilihRole: 1
    }
  }

  componentDidMount() {
    axios
      .get(API_URL+"api/role-proyeks/"+this.state.pilihRole+"?populate[mahasiswas][populate]=role_proyek")
      .then(res => {
        console.log("Data1 : ", res);
        const mahasiswas = res.data.data.attributes.mahasiswas.data;
        this.setState({ mahasiswas });
      })
      .catch(error => {
        console.log("Error URL API...", error);
      })
  }

  changeRole = (value) => {
    this.setState({
      pilihRole: value,
      mahasiswas: []
    })

    axios
      .get(API_URL+"api/role-proyeks/"+value+"?populate[mahasiswas][populate]=role_proyek")
      .then(res => {
        console.log("Data1 : ", res);
        const mahasiswas = res.data.data.attributes.mahasiswas.data;
        this.setState({ mahasiswas });
      })
      .catch(error => {
        console.log("Error URL API...", error);
      })
  }

  render() {
    console.log("Data : ", this.state.mahasiswas);
    const { mahasiswas, pilihRole } = this.state

    return (
      <div className="App">
        <NavbarComponent/>
        <div className='mt-3'>
          <Container fluid>
            <Row>
              <ListRoles changeRole={this.changeRole} pilihRole={pilihRole}/>
              <Col>
                <h4><strong>Daftar Mahasiswa</strong></h4>
                <hr />
                <Row>
                  {mahasiswas && mahasiswas.map((mahasiswa) => (
                    <Mahasiswas
                      mahasiswa={mahasiswa}
                    />
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}