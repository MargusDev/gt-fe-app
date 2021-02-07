import React, { useContext } from 'react';
import { CheckDocumentsContext } from '../../providers/CheckDocumentsProvider';
import './Header.css';

const Header = () => {
  const { checkAllDocuments } = useContext(CheckDocumentsContext);

  return (
    <nav className='Header--container'>
      <button onClick={checkAllDocuments}>Initiate all validation checks</button>
    </nav>
  );
};

export default Header;
