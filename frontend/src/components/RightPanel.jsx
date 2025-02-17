import React, { useContext, useEffect, useRef, useState } from 'react'
import { Accordion, Badge, Button, Col, Row } from 'react-bootstrap'
import { TemplateContext } from '../context/TemplateContext';
import axios from 'axios';
import { IP, PORT } from '../CREDENTIALS';
import { UserContext } from '../context/UserContext';
import AccordionItemWraper from './AccordionItemWraper';

const RightPanel = ({isEdit, setIsEdit, inp, setInp}) => {

    const [vars, setVars] = useState([]);
    const [varCnt, setVarCnt] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const { template, setTemplate } = useContext(TemplateContext);
    const { user } = useContext(UserContext);

    const getVarCount = async () => {
		try {
			setIsLoading(true);
			const { data } = await axios.get(
				`http://${IP}:${PORT}/template/count_fields/${template.template_id}`,
                {},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
            
            setVarCnt(data.blank_fields);

		} catch (err) {
			console.log("error while getting variable count!");
			console.log(err);
		} finally {
			setIsLoading(false);
		}
	};

    useEffect(() => {
        getVarCount();
    }, []);


    const saveTemplate = async () => {
        try {
            // setIsLoading(true);
            const { data } = await axios.get(
                `http://${IP}:${PORT}/template/download_doc/${template.template_id}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            getVarCount();

        } catch (err) {
            console.log("error while saving template!");
            console.log(err);
        } finally {
            // setIsLoading(false);
        }
    }

    const editHandler = async () => {
        if (isEdit) { // save it
            saveTemplate();
        }
        setIsEdit(!isEdit);
    }

    const changeInputHandler = (e, idx, index) => {
        let newList = inp;
        newList[idx].vars[index] = e.target.value;
        setInp(newList);
        console.log(`e${e.target}`);
        console.log(inp)
    }

    const addItem = () => {
        let newInp = {
            id: inp.length,
            vars: []
        };
        setInp([newInp, ...inp]);
    }

    const removeItem = (e, idx) => {
        e.stopPropagation();
        let newList = inp.filter((item, index) => index !== idx);
        setInp(newList);
    }


    return (
        <Row className='pt-3 px-2'>
            <Button variant='success'>
                 افزودن اکسل 
                &nbsp;<i className="fas fa-file-excel"></i>
            </Button>
            <Accordion style={{ padding: '0', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent: 'center'}}>
                <Button variant="outline-primary" className='my-2' style={{borderRadius:'50%'}} onClick={() => addItem()}>
                    <i className="fas fa-plus"></i>
                </Button>
                { Array.from(inp).map((item, idx) => (
                    <AccordionItemWraper 
                        varCnt={varCnt} 
                        removeItem={removeItem} 
                        changeInputHandler={changeInputHandler} 
                        key={idx} 
                        idx={idx}
                        len={inp.length}
                        item={item}
                    />
                ))}
            </Accordion>
            <Button onClick={() => editHandler()}>
                {isEdit?'ذخیره قالب':'ویرایش قالب'}
            </Button>
        </Row>
    )
}

export default RightPanel