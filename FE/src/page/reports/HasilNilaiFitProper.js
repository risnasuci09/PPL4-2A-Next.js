
import React, { useEffect, useState } from 'react';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import axios from 'axios';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import "./reports.scss"

export default function HasilNilaiFitProper() {
  const [dataPeserta, setDataPeserta] = useState([]);
  const [first, setFirst] = useState(true);

  function formatDate(string) {
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(string).toLocaleDateString([], options);
  }

  const filterBulan = (value) => {
    console.log(value);
    axios
      .get(
        `http://localhost:1337/api/fit-propers?populate=peserta.pegawai&filters[jadwal][$gte]=${value}&filters[jadwal][$lte]=${newDate(value)}&populate=nilai_fit_propers.penguji.pegawai&populate=proyeksi.jabatan&populate=peserta.jabatan`
      )
      .then((res) => {
        console.log("success filter", res.data.data);

        setDataPeserta(res.data.data);
        //   successNotify();
      })
      .catch((err) => {
        console.log("fail");
        setDataPeserta([]);
        //   errorNotify();
      });
  }

  function getMonthNow() {
    var options = {
      year: "numeric",
      month: "long",
    };
    let date = new Date();
    if ((date.getMonth() + 1) > 9) {
      return date.getFullYear() + "-" + (date.getMonth() + 1);
    } else {
      return date.getFullYear() + "-0" + (date.getMonth() + 1);
    }

  }

  const getData = () => {
    let today = new Date();
    axios
      .get(
        `http://localhost:1337/api/fit-propers?populate=peserta.pegawai&filters[jadwal][$gte]=${newDate(today.getFullYear() + '-' + (today.getMonth()))}&filters[jadwal][$lte]=${newDate(today.getFullYear() + '-' + (today.getMonth() + 1))}&populate=nilai_fit_propers.penguji.pegawai&populate=proyeksi.jabatan&populate=peserta.jabatan`)
      .then((res) => {
        console.log("success get", res);
        setDataPeserta(res.data.data);
        //   successNotify();
      })
      .catch((err) => {
        console.log("fail");
        //   errorNotify();
      });
  };

  function newDate(value) {
    let date = new Date(value);
    let result;

    if ((date.getMonth() + 1) > 9) {
      if ((date.getMonth() + 1) === 12) {
        result = `${date.getFullYear() + 1}-01`;
      } else {
        result = `${date.getFullYear()}-${date.getMonth() + 2}`;
      }
    } else {
      result = `${date.getFullYear()}-0${date.getMonth() + 2}`;
    }
    return result;
  }

  useEffect(() => {
    console.log("data", dataPeserta);
    if (first) {
      getData();
      setFirst(false);
    }
    $(document).ready(function () {
      setTimeout(function () {
        $('.dttable').DataTable();
      }, 2000);
    });
  });
  return (
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="m-0" style={{ fontWeight: 'normal' }}>Hasil Nilai Fit & Proper</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <li className="breadcrumb-item"><a href="#">Reports</a></li>
          <li className="breadcrumb-item active">Hasil</li>
        </ol>
      </div>
      <div className="col-12">
        <br></br>
      </div>
      <div className='col-12'>
        <div class="card card-default color-palette-box">
          <div class="card-header">
            <h3 class="card-title">
              <i class="far fa-calendar mr-3"></i>
              Pick Month
            </h3>
          </div>
          <div class="card-body">
            <div className='col-4'>
              <input class="form-control" type="month" onChange={(e) => filterBulan(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <div className="dt-responsive table-responsive">
              <table className="table table-striped table-bordered nowrap dttable">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Jabatan</th>
                    <th>Proyeksi</th>
                    <th>Tanggal</th>
                    <th>Penguji</th>
                    <th>Total Nilai</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPeserta.length !== 0 ?
                    dataPeserta.map((res, index) => {
                      console.log("res" + index + "===>", res);
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{res.attributes.peserta.data.attributes.pegawai.data.attributes.nama_pegawai}</td>
                          <td>{res.attributes.peserta.data.attributes.pegawai.data.attributes.nip}</td>
                          <td>{res.attributes.peserta.data.attributes.jabatan.data.attributes.nama_jabatan}</td>
                          <td>{res.attributes.proyeksi.data.attributes.jabatan.data.attributes.nama_jabatan}</td>
                          <td>{formatDate(res.attributes.jadwal)}</td>
                          <td>
                            <DropdownButton title={<i class="fas fa-user-alt"></i>} className='drop'>
                              {res.attributes.nilai_fit_propers.data.map((temp, i) => {
                                return (
                                  <Dropdown.Item >{temp.attributes.penguji.data.attributes.pegawai.data.attributes.nama_pegawai} </Dropdown.Item>
                                );

                              })}
                            </DropdownButton>
                          </td>
                          <td>{res.attributes.total_penilaian_akhir_fit_proper}</td>
                          <td className='text-center'>
                            {res.attributes.status === 0 ?
                              <div className='btn bg-warning'>Belum Ujian</div> :
                              res.attributes.status === 1 ?
                                <div className='btn bg-success'>Lulus</div> :
                                <div className='btn bg-danger'>Gagal</div>
                            }
                          </td>
                        </tr>
                      );
                    }) :
                    <tr class="odd"><td valign="top" colspan="8" class="dataTables_empty">No data available in table</td></tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
