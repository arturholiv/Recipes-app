import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import DrinkInProgress from '../components/DrinkInProgress';
import { requestDrinkById } from '../services/TheCockTailDbApi';

function BebidasEmProgresso() {
  const [drinkInProgress, setDrinkInProgress] = useState(false);
  const ID = 11007;
  useEffect(() => {
    async function getApi() {
      const response = await requestDrinkById(ID);
      setDrinkInProgress(response);
      console.log(response);
    }
    getApi();
  }, []);
  // const { id } = useParams();
  return (
    <div>
      {/* <h1>{id}</h1> */}
      <DrinkInProgress drinkInProgress={ drinkInProgress } />
    </div>
  );
}

export default BebidasEmProgresso;
