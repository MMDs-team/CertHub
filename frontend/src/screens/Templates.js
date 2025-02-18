import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Card, Placeholder } from 'react-bootstrap';
import { IP, PORT } from '../CREDENTIALS';
import UseableTemplate from '../components/UseableTemplate';

const Templates = () => {
    const templateTypes = ['دوره آموزشی', 'تقدیر نامه', 'همایش', 'مسابقه'];

    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTemplates = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(
				`http://${IP}:${PORT}/template`,
				{},
			);

			setTemplates(data);
			console.log(data);
		} catch (err) {
			console.log("error while fetching templates!");
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

    useEffect(() => {
        fetchTemplates();
    }, [])


    return (
        <Container className='mt-2 mt-md-3 mt-lg-5 px-2 px-md-3 px-lg-5'>
            <Row className="mb-4">
                <h5 className='p-3 text-primary' style={{fontWeight: '600'}}>قالب ها</h5>
                {(isLoading || templates.length === 0)? 
                    [...Array(12)].map((_, index) => (
                        <Col key={index} xs={6} md={3} className="mb-3">
                            <Placeholder as={Card} animation="wave" >
                                <Placeholder xs={12} bg='primary' style={{height: '7rem'}}/>
                            </Placeholder>
                        </Col>
                    ))
                    :
                    <>
                        {templates.map((template, index) => (
                            <Col key={index} xs={6} md={3} className="mb-3">
                                <UseableTemplate template={template}/>
                            </Col>
                        ))}
                        <Col xs={6} md={3} className="mb-3">
                            <Button variant="outline-primary border-2" className="w-50 h-100">بیشتر</Button>
                        </Col>
                    </>
                }
            </Row>
            <Row>
                <h5 className='p-3 text-dark' style={{fontWeight: '600'}}>انواع</h5>
                {templateTypes.map((type, index) => (
                    <Col key={index} xs={6} className="mb-3">
                        <Card className={`bg-dark text-light text-center`}>
                            <Card.Body>
                                <Card.Title>{type}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Templates;
