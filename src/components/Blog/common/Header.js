import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../img/papership2018.svg';

export const Header = () => (
<header>
  {<a href="/" className="logo-link"><img src={logo} width="70px" alt="" /> </a>}
  <nav>
    <ul>
    </ul>
  </nav>
</header>
);