import React, { Component, Fragment } from "react";


export default class DropdownRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesa: 1
    };
  }

  handleChangeRole = (event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      rolesa: value
    });
    console.log("rolesa",this.state.rolesa);
    
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.rolesa !== this.state.rolesa){
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps,prevState,snapshot){
    console.groupEnd();
    if(prevState.rolesa !== this.state.rolesa){
      this.handleCounterChange();
    }
    
  }
  handleCounterChange = () =>{
    console.log("handleCounterChange",this.state.rolesa);
    this.props.onCounterChange(this.state.rolesa);
  }

  render() {
    return (
        <div className="drop-item">
          <form>
            <select  name="rolesa" id="roles" onChange={this.handleChangeRole}>
              <option value="1">Front-End</option>
              <option value="2">Back-End</option>
              <option value="3">Full-Stack</option>
            </select>
          </form>
        </div>
    );
  }
}

// import React from 'react';
// import {Dropdown} from 'react-bootstrap';

// const DropdownRole = () => {
//   const getFullStack = () =>{
//     Axios.get("http://localhost:1337/api/roles-mahasiswas/1?fields=tugas&populate=mahasiswas").then((response) =>{
//       console.log(response);
//     })
//   }

//   return (
//     <Dropdown >
//       <Dropdown.Toggle variant="info" id="dropdown-basic">
//         Dropdown Button
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item href="#/action-1">Full-Stack</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Back-End</Dropdown.Item>
//         <Dropdown.Item href="#/action-3">Front-End</Dropdown.Item>
//       </Dropdown.Menu>
//     </Dropdown>
//   )
// }

// export default DropdownRole;
