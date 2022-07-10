import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../style/nav.module.css';

export default function Nav() {
  return (
    <div>
      <nav>
        <Link className='homePage' style={{ textDecoration: 'none' }} to='/'>
          MovieCity
        </Link>
        <Link to='/checkout' style={{ textDecoration: 'none' }}>
          Checkout
        </Link>
      </nav>
    </div>
  );
}
