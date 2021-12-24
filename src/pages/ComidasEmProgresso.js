import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { requestMealById } from '../services/TheMealDbApi';
import MealInProgress from '../components/MealInProgress';
import AppContext from '../context/AppContext';

// 52977

function ComidasEmProgresso() {
  const [mealInProgress, setMealInProgress] = useState(false);
  const { setCurrentMealId } = useContext(AppContext);
  const { id } = useParams();
  useEffect(() => {
    async function getApi() {
      const response = await requestMealById(id);
      setMealInProgress(response);
      setCurrentMealId(id);
    }
    getApi();
  }, [setCurrentMealId, id]);

  return (
    <div>
      <MealInProgress mealInProgress={ mealInProgress } />
    </div>
  );
}

export default ComidasEmProgresso;
