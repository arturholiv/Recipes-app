import React, { useState } from 'react';
import { Redirect } from 'react-router';
import validateInput from '../services/validateInput';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    setRedirect(true);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email-input">
        Email:
        <input
          id="email-input"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          placeholder="Insira seu Email"
          required
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
          id="password-input"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          type="password"
          placeholder="Insira sua Senha"
          required
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ !(validateInput(email, password)) }
      >
        Entrar
      </button>
      {redirect && <Redirect to="/comidas" /> }
    </form>
  );
}

export default Form;
