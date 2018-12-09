import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../img/logo.svg';

export const Header = (props) => (
<header>
  {<Link to="/" className="logo-link"><img src={logo} width="70px" alt="" /> </Link>}
  <nav>
    <ul>
    </ul>
  </nav>
</header>
);