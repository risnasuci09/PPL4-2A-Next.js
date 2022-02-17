import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Hasil, ListRoles, NavbarComponent } from './components';
import { API_URL } from './utils/constants';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      mahasiswas: [],
    }
  }

  componentDidMount() {
    axios
      .get(API_URL+"api/mahasiswas")
      .then(res => {
        const mahasiswas = res.data;
        this.setState({ mahasiswas });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    console.log(this.state.mahasiswas);
    return (
      <div className="App">
        <NavbarComponent/>
        <div className='mt-3'>
          <Container fluid>
            <Row>
              <ListRoles />
              <Col>
                <h4><strong>Daftar Mahasiswa</strong></h4>
                <hr />
                <Row>
                {mahasiswas && mahasiswas.map((mahasiswa) => (
                <h2>{mahasiswa.nama}</h2>
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