import React, { Component } from "react";
import { Navbar,Container} from "react-bootstrap";
import logo from './logo.svg';

export default class NavbarComponent extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Daftar Anggota Next.JS
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    );
  }
}
