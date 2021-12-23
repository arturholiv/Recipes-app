import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import DrinkInProgress from '../components/DrinkInProgress';
import { requestDrinkById } from '../services/TheCockTailDbApi';
import AppContext from '../context/AppContext';

function BebidasEmProgresso() {
  const [drinkInProgress, setDrinkInProgress] = useState(false);
  const { setCurrentDrinkId } = useContext(AppContext);
  const { id } = useParams();
  useEffect(() => {
    async function getApi() {
      const response = await requestDrinkById(id);
      setDrinkInProgress(response);
      setCurrentDrinkId(id);
    }
    getApi();
  }, [id, setCurrentDrinkId]);
  return (
    <div>
      <DrinkInProgress drinkInProgress={ drinkInProgress } />
    </div>
  );
}

export default BebidasEmProgresso;
