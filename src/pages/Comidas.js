import React from 'react';
import Meals from '../components/Meals';
import { useParams } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  const { id } = useParams();
  return (
    <div>
      { !id && <Header />}
        <Meals />
      { !id && <Footer />}
    </div>
  );
}

export default Comidas;
