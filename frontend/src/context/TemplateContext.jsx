import React, { createContext, useState } from 'react';

const TemplateContext = createContext();

const TemplateProvider = ({ children }) => {

    const initialTemplate = JSON.parse(localStorage.getItem('template'))?.template || false;
    const [template, setTemplate] = useState(initialTemplate);

    return (
        <TemplateContext.Provider value={{ template, setTemplate }}>
            {children}
        </TemplateContext.Provider>
    );
};

export { TemplateContext, TemplateProvider };