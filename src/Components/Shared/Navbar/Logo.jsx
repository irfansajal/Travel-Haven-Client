import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/Logo 2.jpg'

const Logo = () => {
    return (
      <Link to='/'>
       <img src={logo} alt=""  width='100' height='100'/>
      </Link>
    );
};

export default Logo;