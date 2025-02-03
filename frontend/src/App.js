import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './screens/Home';
import About from './screens/About';
import Auth from './screens/Auth';
import Profile from './screens/Profile';
import { UserContext } from './context/UserContext';
import Redirect from './components/Redirect';
import './App.css';
import CreateTemplate from './screens/CreateTemplate';
import Certificate from './screens/Certificate';

function App() {


    const { user } = useContext(UserContext);

    return (
        <Router>
            <Navbar /> 
            <div className='main-wrapper'>
                    {user ? (
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/templates" element={<About />} />
                            <Route path="/templates/new" element={<CreateTemplate />} />
                            <Route path="/templates/use/:doc_id" element={<Certificate />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/contact" element={<Auth />} />
                            <Route path="*" element={<Redirect />} />
                        </Routes>
                    ) : (
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/templates" element={<About />} />
                            <Route path="/templates/use:doc_id" element={<About />} />
                            <Route path="/profile/*" element={<Redirect to="/auth/register" />} />
                            <Route path="/auth/*" element={<Auth/>} />
                            <Route path="*" element={<Redirect />} />
                        </Routes>
                    )}
            </div>
        </Router>
    );
}

export default App;
