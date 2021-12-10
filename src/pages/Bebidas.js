import React from 'react';
import { useParams } from 'react-router';
import Drinks from '../components/Drinks';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Bebidas() {
  const { id } = useParams();
  return (
    <div>
      { !id && <Header />}
      <Drinks />
      { !id && <Footer />}
    </div>
  );
}

export default Bebidas;
