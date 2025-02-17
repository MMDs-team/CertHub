import React, { useRef } from 'react'
import { Accordion, Badge } from 'react-bootstrap'

const AccordionItemWraper = ({ varCnt, removeItem, idx, changeInputHandler, len, item }) => {

    const inputRefs = useRef([]);
    const bodyRefs = useRef([]);

    const handleKeyDown = (e, index) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }
    };


    return (
        <Accordion.Item eventKey={idx} key={idx} dir='ltr' className='w-100'>
            <Accordion.Header >
                <Badge className='me-2' bg="danger" pill onClick={(e) => removeItem(e, idx)}>
                    <i className="fas fa-trash-alt bg-danger"></i>
                </Badge>
                اطلاعات ورودی {len - idx}
            </Accordion.Header>
            <Accordion.Body ref={(el) => (bodyRefs.current[idx] = el)}>
                {Array.from({ length: varCnt }).map((_, index) => (
                    <div className="form-floating mb-1" key={index} >
                        <input type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="..."
                            ref={(el) => (inputRefs.current[index] = el)}
                            onChange={(e) => changeInputHandler(e, idx, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)} 
                            value={item.vars[index]}
                            />
                        <label htmlFor="floatingInput" className=''>##{index+1}</label>
                    </div>
                ))}
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default AccordionItemWraper