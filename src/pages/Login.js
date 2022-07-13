/* eslint-disable quote-props */
import React, { useState } from 'react';
import api from '../utils/axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsername = ({ target: { value } }) => setUsername(value);

  const handlePassword = ({ target: { value } }) => setPassword(value);

  const login = async (emailAndPasswordObject) => {
    try {
      const { data: { token } } = await api.post('/login', emailAndPasswordObject);
      setErrorMessage(token);
      console.log(token);
      localStorage.setItem('token', token);
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
  };

  return (
    <div>
      <label htmlFor="email">
        Digite seu email:
        <input id="email" type="email" onChange={handleUsername} value={username} />
      </label>

      <label htmlFor="senha">
        Digite sua senha:
        <input id="senha" type="password" onChange={handlePassword} value={password} />
      </label>

      <button type="button" onClick={() => login({ 'user': username, 'password': password })}>Login</button>

      {
        errorMessage && <p>{`${errorMessage}`}</p>
      }
    </div>
  );
}

export default Login;
