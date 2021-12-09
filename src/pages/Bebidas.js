import React from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer';

import Header from '../components/Header';

function Bebidas() {
  const { id } = useParams();
  return (
    <div>
      { !id && <Header />}
      { !id && <Footer />}
    </div>
  );
}

export default Bebidas;
