import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function Profile() {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setEmail(user.email);
  }, []);
  const history = useHistory();
  return (
    <section>
      <h1 data-testid="profile-email">{email}</h1>
      <button
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        onClick={ () => history.push('/receitas-favoritas') }
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
    </section>
  );
}

export default Profile;
