import React from 'react'
import { useParams } from 'react-router-dom';

const Certificate = () => {

    const { doc_id } = useParams();
    console.log(doc_id);
  return (
    <div style={{height: 'calc(100vh - 10px)'}}>
        <iframe
            src={`https://docs.google.com/document/d/${doc_id}/edit`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
        ></iframe>
        
    </div>
  )
}

export default Certificate