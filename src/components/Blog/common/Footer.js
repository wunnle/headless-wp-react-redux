import React from 'react';
import { Link } from 'react-router-dom';
import logomark from '../../../img/logomark.svg';
import twitterLogo from '../../../img/twitter.svg'
import dribbbleLogo from '../../../img/dribble.svg'
import githubLogo from '../../../img/github.svg'


export const Footer = (props) => (
<footer>
  <div className="container">
  {<Link to="/" className="logo-link"><img src={logomark} width="70px" alt="" /> </Link>}
  <nav>
    <ul>
      <li>
        <a target='_blank' href="https://twitter.com/wunnle">
          <img src={twitterLogo} alt="wunnle on twitter"/>
        </a>
        <a target='_blank' href="https://dribbble.com/wunnle">
          <img src={dribbbleLogo} alt="wunnle on dribbble"/>
        </a>
        <a target='_blank' href="https://github.com/wunnle">
          <img src={githubLogo} alt="wunnle on github"/>
        </a>
      </li>
    </ul>
  </nav>
  </div>
</footer>
);