import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./index.css";
// import MaterialTable from "material-table";

function index() {
  const students = [
    {
      id: 1,
      name: "Jack",
      email: "jack@gmail.com",
    },
    {
      id: 2,
      name: "Mary",
      email: "mary@gmail.com",
    },
    {
      id: 3,
      name: "John",
      email: "john@gmail.com",
    },
  ];
  const number = 1;

  return (
    <div className="container">
      <h1> Example of React Map Loop </h1>

      <table className="tabel">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th className="Email">Email</th>
        </tr>

        {students.map((student, index) => {
          console.log("test",index);
          return<>
            <tr data-index={index}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
            </tr>
            </>
        }
        )}
      </table>
    </div>
  );
}

export default index;
