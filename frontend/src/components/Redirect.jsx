import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = ({to='/'}) => {

    const navigate = useNavigate();

    useEffect(() => {
        navigate(to);
        console.log(`navigated to ${to}`);
    }, []);

  return (
    <div>Redirect</div>
  )
}

export default Redirect