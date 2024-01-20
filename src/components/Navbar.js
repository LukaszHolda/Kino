import React from 'react';
import { Link } from 'react-router-dom'; // Załóżmy, że używamy react-router-dom

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Strona główna</Link>
      <Link to="/films">Filmy</Link>
      {/* Dodaj więcej linków według potrzeb */}
    </nav>
  );
};

export default Navbar;
