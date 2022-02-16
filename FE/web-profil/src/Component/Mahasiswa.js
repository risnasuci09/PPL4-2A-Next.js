import React from "react";
import { Table } from "react-bootstrap";

const Mahasiswa = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.nim}</td>
        <td>{props.nama}</td>
        <td>{props.umur}</td>
      </tr>
    </tbody>
  );
};

export default Mahasiswa;
