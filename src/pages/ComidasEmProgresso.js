import React from 'react';
import { useParams } from 'react-router';

function ComidasEmProgresso() {
  const { id } = useParams();
  return (
    <div>
      ComidasEmProgresso
      <h1>{id}</h1>
    </div>
  );
}

export default ComidasEmProgresso;
