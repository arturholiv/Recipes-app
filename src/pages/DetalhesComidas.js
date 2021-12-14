import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestMealById } from '../services/TheMealDbApi';

function DetalhesComidas() {
  const { id } = useParams();

  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getMealsDetails = async () => {
      const detailsResult = await requestMealById(id);
      setDetails(detailsResult);
      console.log(detailsResult);
      return details;
    };
    getMealsDetails();
  }, []);

  return (
    <div>
      <div>
        <h1>
          {id}
        </h1>
        <h1>to aq nas comidas</h1>
      </div>
      <div>
        {/* <img src="" alt=""> */}
      </div>
    </div>
  );
}

export default DetalhesComidas;
