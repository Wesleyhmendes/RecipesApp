import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false); // Estado para controlar a validação do formulário

  const validateForm = () => {
    // Validação simples: e-mail válido e senha com mais ou 6 caracteres
    const isValid = /\S+@\S+\.\S+/.test(email) && password.length >= 6;
    setIsFormValid(isValid);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateForm();
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para lidar com o envio do formulário

    // Salve o email da pessoa usuária no localStorage
    localStorage.setItem('user', JSON.stringify({ email }));

    // Limpe os campos do formulário após a submissão
    setEmail('');
    setPassword('');

    // redirecionando
    navigate('/meals');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          placeholder="Email"
          value={ email }
          onChange={ handleEmailChange }
          data-testid="email-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={ password }
          onChange={ handlePasswordChange }
          data-testid="password-input"
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !isFormValid }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
