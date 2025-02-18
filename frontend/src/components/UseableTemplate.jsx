import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { TemplateContext } from '../context/TemplateContext';
import { UserContext } from '../context/UserContext';
import { IP, PORT } from '../CREDENTIALS';
import { useNavigate } from 'react-router-dom';

const UseableTemplate = ({template}) => {

    
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const { user } = useContext(UserContext);
	const { setTemplate } = useContext(TemplateContext);

    const templateUse = async () => {
        try {
			setIsLoading(true);
			const { data } = await axios.post(
				`http://${IP}:${PORT}/template/create`,
				{pk:template.template_id},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

            localStorage.setItem("template", JSON.stringify({template:data}));
			setTemplate(data);
			// console.log(data);

			const doc = await axios.get(
				`http://${IP}:${PORT}/template/make_doc/${data.template_id}`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			console.log(doc.data);
			navigate(`/templates/use/${doc.data.doc_id}`);
		} catch (err) {
			console.log("error while creating template!");
			console.log(err);
		} finally {
			setIsLoading(false);
		}
    }

    return (
        <Card className="bg-secondary text-dark py-4 text-center">
            <Card.Body onClick={() => templateUse()} style={{display: 'flex', justifyContent: 'center'}}>
                <Card.Title>{template.template_id}</Card.Title>
                {isLoading && <Spinner animation="border" variant="primary" className='me-1'/>}
            </Card.Body>
        </Card>
    )
}

export default UseableTemplate