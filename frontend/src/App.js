import React, { useContext, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import About from './screens/About';
import Auth from './screens/Auth';
import Profile from './screens/Profile';
import { UserContext } from './context/UserContext';
import Redirect from './components/Redirect';
import './App.css';
import { Row } from 'react-bootstrap';

function App() {


    const { user, setUser } = useContext(UserContext);
    const topRef = useRef(null);

    return (
        <Router>
            <Navbar /> 
            <div className='main-wrapper'>

                <Row ref={topRef} className='m-0' style={{ height: '3.5rem', backgroundColor: 'rgb(6, 57, 73)'}}></Row>
                    {!user ? (
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/templates" element={<About />} />
                            <Route path="/templates/use?" element={<About />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/contact" element={<Auth />} />
                            <Route path="*" element={<Redirect />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/templates" element={<About />} />
                            <Route path="/templates/use?" element={<About />} />
                            <Route path="/profile/*" element={<Redirect to="/auth/register" />} />
                            <Route path="/auth/*" element={<Auth />} />
                            <Route path="*" element={<Redirect />} />
                        </Routes>
                    )}
            </div>
        </Router>
    );
}

export default App;
