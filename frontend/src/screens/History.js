import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ReuseableTemplate from "../components/ReuseableTemplate";

const History = () => {

    const [templates, setTemplates] = useState([]);
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
