import { useParams } from 'react-router-dom';
import RightPanel from '../components/RightPanel';
import { Col, Row, ProgressBar} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const Certificate = () => {

    const { doc_id } = useParams();
    const [isEdit, setIsEdit] = useState(false);
    const [inp, setInp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setLoading(false);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 30);
        }
        return () => clearInterval(timer);
    }, [loading]);


    return (
        <Row style={{height: 'calc(100vh - 10px)', margin: '0'}}  >
            <Col xs={12} md={isEdit?2:3}>
                <RightPanel isEdit={isEdit} setIsEdit={setIsEdit} inp={inp} setInp={setInp}/>
            </Col>
            <Col sx={12} md={isEdit?10:9} >
                {loading && <ProgressBar className='m-4' style={{height: '1rem '}} animated  now={progress} label={`${progress}%`} />}
                <iframe
                    src={`https://docs.google.com/document/d/${doc_id}/${isEdit?'edit':'preview'}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </Col>
        </Row>
    );
}

export default Certificate