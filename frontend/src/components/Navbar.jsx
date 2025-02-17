import React from 'react';
import { Link } from 'react-router-dom';
import "./../static/styles/navbar.css";

const Navbar = () => {
  return (
    <div className='nav-wrap' style={{fontFamily: 'Vazir'}}>
      <ul>
        <li className='nav-list-item'>
          
          <Link to="/">
            <i className="fa fa-home"></i>
            <span>خانه</span>
          </Link>
        </li>
        <li className='nav-list-item'>
          <Link to="/templates/new">
            <i className="fa-regular fa-square-plus"></i>
            {/* <i className="fa-solid fa-pencil"></i> */}
            <span>ساخت قالب</span>
          </Link>
        </li>
        <li className='nav-list-item'>
          <Link to="/templates">
            <i className="fa-solid fa-layer-group"></i>
            <span>استفاده از قالب</span>
          </Link>
        </li>
        <li className='nav-list-item'>
          <Link to="/history">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <span>تاریخچه</span>
          </Link>
        </li>
        
        <li className='nav-list-item'>
          <Link to="/profile">
            <i className="fa-regular fa-user"></i>
            <span>پروفایل</span>
          </Link>
        </li>

      </ul>
      <ul>
        <li className='nav-list-item'>
          <Link to="/">
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>جست و جو</span>
          </Link>
        </li>
        <li className='nav-list-item'>
          <Link to="/profile">
            <i className="fa-regular fa-user"></i>
            <span>پروفایل</span>
          </Link>
        </li>
      </ul>

    </div>
  )
}

export default Navbar