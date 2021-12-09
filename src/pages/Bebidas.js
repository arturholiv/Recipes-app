import React from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer';

function Bebidas() {
  const { id } = useParams();
  return (
    <div>
      Bebidas
      { !id && <Footer />}
    </div>
  );
}

export default Bebidas;
