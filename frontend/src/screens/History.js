import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReuseableTemplate from "../components/ReuseableTemplate";
import { IP, PORT } from "../CREDENTIALS";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const History = () => {

    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useContext(UserContext);
    

    const fetchTemplates = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(
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
			console.log(data);
		} catch (err) {
			console.log("error while fetching templates...!");
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

    useEffect(() => {
        fetchTemplates();
    }, [])

    return (
        <Container className="mt-2 mt-md-3 mt-lg-5 px-2 px-md-3 px-lg-5">
            <Row className="mb-4">
                <h5 className="p-3 text-primary font-weight-bold">قالب ها</h5>
                {templates.map((template, index) => (
                    <Col key={index} xs={6} md={3} className="mb-3">
                        <ReuseableTemplate template={template} />
                    </Col>
                ))}
                <Col xs={6} md={3} className="mb-3">
                    <Button variant="outline-primary border-2" className="w-50 h-100">
                        بیشتر
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default History;
