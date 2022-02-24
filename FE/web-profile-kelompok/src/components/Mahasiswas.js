import React from 'react'
import { Card, Col } from 'react-bootstrap';

const Mahasiswas = ({mahasiswa}) => {
  return (
    <div>
        <Col md={3} xs={6} className="mb-4">
            <Card className="shadow">
                <Card.Img 
                    variant="top" 
                    src={
                        "assets/images/" + 
                        mahasiswa.attributes.role_proyek.data.attributes.jenisRole + 
                        "/" +
                        mahasiswa.attributes.nama +
                        ".jpg"
                    } 
                />
                <Card.Body>
                    <Card.Title>{mahasiswa.attributes.nama}</Card.Title>
                    <Card.Text>
                        NIM: {mahasiswa.attributes.nim}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    </div>
  )
}

export default Mahasiswas