import React from 'react';
import { useParams } from 'react-router';
import Meals from '../components/Meals';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  const { id } = useParams();
  return (
    <div>
      { !id && <Header />}
      <Meals />
      <h1>{id}</h1>
      { !id && <Footer />}
    </div>
  );
}

export default Comidas;
