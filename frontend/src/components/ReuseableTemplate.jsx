import React, { useContext, useEffect, useState } from 'react'
import { Card, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { TemplateContext } from '../context/TemplateContext';
import { UserContext } from '../context/UserContext';
import { IP, PORT } from '../CREDENTIALS';
import axios from 'axios';

const ReuseableTemplate = ({ template }) => {

    
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const { user } = useContext(UserContext);
	const { setTemplate } = useContext(TemplateContext);

    const templateReuse = async () => {
        try {
			setIsLoading(true);
            localStorage.setItem("template", JSON.stringify({template:template}));
			setTemplate(template);

			const doc = await axios.get(
				`http://${IP}:${PORT}/template/make_doc/${template.template_id}`,
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
	<Card className="bg-secondary text-dark text-center p-1" style={{height: '9rem'}}>
			<Card.Body onClick={() => templateReuse()} style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
					<Card.Title style={{ position: 'absolute', zIndex: '2'}} className='text-secondary'>{template.template_id}</Card.Title>
					{isLoading && <Spinner animation="border" variant="primary" className='me-1'/>}
					{!isLoading && template.image == null && <div style={{ height: '100%', position: 'absolute', bottom: '0', left: '0', backgroundColor: 'white', width: '100%' }} ></div>}
					{!isLoading && template.image != null && <Card.Img variant="top" src={`http://${IP}:${PORT}/images/templates/files/${template.template_id}.png`} alt="Template Image" style={{ height: '100%', position: 'absolute', bottom: '0', width: 'auto' }} />}
			</Card.Body>
	</Card>
)
}

export default ReuseableTemplate