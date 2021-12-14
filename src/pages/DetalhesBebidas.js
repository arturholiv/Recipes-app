import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestDrinkById } from '../services/TheCockTailDbApi';

function DetalhesBebidas() {
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getDrinksDetails = async () => {
      const detailsResult = await requestDrinkById(id);
      setDetails(detailsResult);
      return details;
    };
    getDrinksDetails();
  }, []);

  return (
    <div>
      <h1>
        {' '}
        este eh o id
        {' '}
        {id}
      </h1>
      <h1>to aq nas Bebidas</h1>
    </div>
  );
}

export default DetalhesBebidas;
