import React from 'react';
import { useParams } from 'react-router';
import Footer from '../components/Footer';

function Comidas() {
  const { id } = useParams();
  return (
    <div>
      Comidas
      { !id && <Footer />}
    </div>
  );
}

export default Comidas;
