import React, { useContext, useEffect, useState } from "react";
import {
	Container,
	Modal,
	Button,
	ButtonGroup,
	Row,
	Col,
	Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IP, PORT } from "../CREDENTIALS";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { TemplateContext } from "../context/TemplateContext";


const CreateTemplate = () => {
	// const [isPublic, setIsPublic] = useState(false);
	const [isEmpty, setIsEmpty] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const { user } = useContext(UserContext);
	const { setTemplate } = useContext(TemplateContext);

	const cancelHandler = () => {
		navigate("/");
	};
	const createHandler = async () => {
		try {
			setIsLoading(true);
			const requestBody = isEmpty ? {} : { file: "dummyFileContent" };
			const { data } = await axios.post(
				`http://${IP}:${PORT}/template/create/`,
				requestBody,
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
	};

	return (
		<div>
			<Container style={{height: '100vh', margin: 'auto auto'}}>
				<div
					className="modal show"
					style={{ display: "flex", position: "initial", alignItems: 'center' }}
				>
					<Modal.Dialog>
						<Modal.Header className='bg-dark text-white'>
							<Modal.Title>ساخت قالب جدید</Modal.Title>
						</Modal.Header>

						<Modal.Body  style={{backgroundColor: '#f0f2ff'}} className="border-bottom border-secondary">
							<Row className="g-2 px-5">
								<Col
									sm={6}
									className={`border p-3 pt-sm-5 text-center bg-white ${isEmpty && "border-primary"
										}`}
									onClick={() => setIsEmpty(true)}
								>
									قالب خالی
								</Col>
								<Col
									sm={6}
									className={`border p-3 bg-white ${!isEmpty && "border-primary"}`}
									onClick={() => setIsEmpty(false)}
								>
									{
										<div className="d-flex justify-content-between flex-column">
											<label htmlFor="formFile" className="form-label mt-4 text-center">
												افزودن فایل Word
											</label>
											<input className="form-control" type="file" id="formFile" />
										</div>
									}
								</Col>
							</Row>
						</Modal.Body>

						<Modal.Footer style={{backgroundColor: '#f0f2ff'}}>
							<Button variant="outline-primary" onClick={cancelHandler}>
								لغو
							</Button>
							<Button
								variant="primary"
								onClick={createHandler}
								disabled={isLoading}
							>
								ساخت
								{isLoading && 
									<>
										&nbsp;
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
									/>
									</>
								}
							</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</div>
			</Container>
		</div>
	);
};

export default CreateTemplate;
