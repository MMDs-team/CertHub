import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Placeholder, Row } from "react-bootstrap";
import ReuseableTemplate from "../components/ReuseableTemplate";
import { IP, PORT } from "../CREDENTIALS";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export const HistoryContent = ({withHeder=false}) => {

    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(UserContext);
    

    const fetchTemplates = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.post(
				`http://${IP}:${PORT}/template/history?from=0&count=12`,
				{},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
			);

			setTemplates(data);
			// console.log(data);
		} catch (err) {
			console.log("error while fetching templates...!");
			// console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

    useEffect(() => {
        fetchTemplates();
    }, [])

    return (
        <>
            <Row>
                { withHeder && <h5 className="p-3 text-primary font-weight-bold">قالب ها</h5>}

                
                {(isLoading || templates.length === 0) ? 
                    [...Array(12)].map((_, index) => (
                        <Col key={index} xs={6} md={3} className="mb-3">
                            <Placeholder as={Card} animation="wave" >
                                <Placeholder xs={12} bg='primary' style={{height: '7rem'}}/>
                            </Placeholder>
                        </Col>
                    ))
                :
                    templates.map((template, index) => (
                        <Col key={index} xs={6} md={3} className="mb-3">
                            <ReuseableTemplate template={template} />
                        </Col>
                    ))}
            </Row>
            <Row className="mb-4">
                <Col xs={6} md={3} className="mb-3">
                    <Button variant="outline-primary border-2" className="w-50 h-100">
                        بیشتر
                    </Button>
                </Col>
            </Row>
        </>
    );
};


export const History = () => {
  return (
    
    <Container className="mt-2 mt-md-3 mt-lg-5 px-2 px-md-3 px-lg-5">
        <HistoryContent withHeder={true}/>
    </Container>
  )
}
