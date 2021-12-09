import React from 'react';
import { useParams } from 'react-router';
import Header from '../components/Header';

import Footer from '../components/Footer';

function Comidas() {
  const { id } = useParams();
  return (
    <div>
      { !id && <Header />}
      { !id && <Footer />}
    </div>
  );
}

export default Comidas;
