import React from "react";
import { Table } from "react-bootstrap";

const Mahasiswa = (props) => {
  return (
      <tr>
        <td>{props.nim}</td>
        <td>{props.nama}</td>
        <td>{props.umur}</td>
      </tr>
  );
};

export default Mahasiswa;
