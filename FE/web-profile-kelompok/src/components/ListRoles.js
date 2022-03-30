import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export default class ListRoles extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      roles: []
    }
  }

  componentDidMount() {
    axios
      .get(API_URL+"api/role-proyeks?populate=mahasiswas")
      .then(res => {
        const roles = res.data.data;
        this.setState({ roles });
      })
      .catch(error => {
        console.log("Error URL API...", error);
      })
  }

  render() {
    console.log("Role : ", this.state.roles);
    const { roles } = this.state
    const { changeRole, pilihRole } = this.props

    return (
      <Col md={2} mt="2">
        <h4><strong>Daftar Role</strong></h4>
        <hr />
        <ListGroup>
          {roles && roles.map((role) => (
            <ListGroup.Item 
              key={role.id} 
              onClick={() => changeRole(role.id)}
              className={pilihRole === role.id && "role-aktif"}
              style={{cursor: 'pointer'}}
            >
              <h5>{role.attributes.jenisRole}</h5>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    )
  }
}
