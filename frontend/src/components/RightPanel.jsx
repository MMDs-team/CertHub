import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Button, Col, Row, Spinner } from 'react-bootstrap'
import { TemplateContext } from '../context/TemplateContext';
import axios from 'axios';
import { IP, PORT } from '../CREDENTIALS';
import { UserContext } from '../context/UserContext';
import AccordionItemWraper from './AccordionItemWraper';

const RightPanel = ({ isEdit, setIsEdit, inp, setInp }) => {

    const [vars, setVars] = useState([]);
    const [varCnt, setVarCnt] = useState(0);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [isVarsLoading, setIsVarsLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const { template, setTemplate } = useContext(TemplateContext);
    const { user } = useContext(UserContext);

    const getVarCount = async () => {
        try {
            setIsVarsLoading(true);
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
            setIsVarsLoading(false);
        }
    };

    useEffect(() => {
        getVarCount();
    }, []);


    const saveTemplate = async () => {
        try {
            setIsSaveLoading(true);
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
            
            await getVarCount();
            return true;

        } catch (err) {
            console.log("error while saving template!");
            console.log(err);
            return false;
        } finally {
            setIsSaveLoading(false);
        }
    }

    const editHandler = async () => {

        if (isEdit) { // save it
            const status = await saveTemplate();
            if (status) setIsEdit(false);
        } else {
            setIsEdit(true);
        }
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

    const getCertificate = async () => {
        let dataInput = []
        inp.map(row => {
            dataInput.push(row['vars']);
        })

        let cols = []
        for (let i = 0; i < varCnt; i++) {
            cols.push(`##${i}`);
        }

        console.log(dataInput)
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                `http://${IP}:${PORT}/template/get_certs/${template.template_id}`,
                {
                    data: dataInput,
                    cols: cols,
                    matching: cols
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            await handleDownload()

        } catch (err) {
            console.log("error while saving template!");
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const handleDownload = async () => {
        const zipUrl = `http://${IP}:${PORT}/images/templates/files/${template.template_id}_certs.zip`;
        console.log(zipUrl)
        try {
            const response = await axios.get(zipUrl, {
                responseType: "blob", 
              });

            console.log(response)

            // Create a Blob URL
            const blob = new Blob([response.data], { type: "application/zip" });
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element and trigger the download
            const link = document.createElement("a");
            link.href = url;
            link.download = "sample.zip";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Cleanup the URL object
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    return (
        <Row className='pt-3 px-2'>
            <Button variant='success'>
                افزودن اکسل
                &nbsp;<i className="fas fa-file-excel"></i>
            </Button>

            <Button variant='warning' className='mt-2' onClick={() => editHandler()} disabled={isSaveLoading}>
                {isEdit ? 'ذخیره قالب' : 'ویرایش قالب'}
                {isSaveLoading && <Spinner animation='border' className='me-2' size='sm' />}
            </Button>

            <Accordion style={{ padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="outline-primary" className='my-2' style={{ borderRadius: '50%' }} onClick={() => addItem()}>
                    <i className="fas fa-plus"></i>
                </Button>
                {Array.from(inp).map((item, idx) => (
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
            <Button onClick={() => getCertificate()} disabled={isLoading}>
                دریافت گواهی
                {isLoading && <Spinner animation='border' className='me-2' size='sm' />}
            </Button>
        </Row>
    )
}

export default RightPanel