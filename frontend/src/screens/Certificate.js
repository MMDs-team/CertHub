import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import RightPanel from '../components/RightPanel';
import { Col, Row } from 'react-bootstrap';

const Certificate = () => {

    const { doc_id } = useParams();
    const [isEdit, setIsEdit] = useState(false);

    const [inp, setInp] = useState([]);


  return (
    <Row style={{height: 'calc(100vh - 10px)', margin: '0'}}  >
        <Col xs={12} md={isEdit?2:3}>
            <RightPanel isEdit={isEdit} setIsEdit={setIsEdit} inp={inp} setInp={setInp}/>
        </Col>
        <Col sx={12} md={isEdit?10:9} >
            <iframe
                src={`https://docs.google.com/document/d/${doc_id}/${isEdit?'edit':'preview'}`}
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </Col>
        
    </Row>
  )
}

export default Certificate