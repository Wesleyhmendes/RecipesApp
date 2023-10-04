import { ChangeEvent, MouseEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserInfoType } from '../../type';
import UserInfoContext from '../../context/UserInfo/UserInfoContext';
import style from './style.module.css';
import logo from '../../assets/Icons/logo-branca.png';
import hideEye from '../../assets/Icons/hide-password.svg';
import showEye from '../../assets/Icons/hide-password-on.svg';

function Login() {
  const [hidePassword, setHidePassword] = useState(true);

  const INITIAL_STATE: UserInfoType = {
    email: '',
    password: '',
  };

  const navigate = useNavigate();

  const { updateUser } = useContext(UserInfoContext);

  const [user, setUserInfo] = useState<UserInfoType>(INITIAL_STATE);
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const validateFields = ({ email, password }: UserInfoType) => {
    const validateRegexEmail = /\S+@\S+\.\S+/;
    const isValid = validateRegexEmail.test(email) && password.length > 6;
    setIsDisable(!isValid);
  };

  const handleChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    const updateUserInfo = { ...user, [name]: value };
    setUserInfo(updateUserInfo);
    validateFields(updateUserInfo);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser(user);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    navigate('/meals');
  };

  const handleHidePassword = (event:
  MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    event.preventDefault();
    setHidePassword(!hidePassword);
  };

  return (
    <main className={ style.loginPageMain }>
      <div className={ style.loginPageMain2 }>
        <h2 className={ style.loginPageTitle }>Login</h2>
        <img className={ style.loginPageLogo } src={ logo } alt="logo" />
        <form className={ style.loginPageForm } onSubmit={ handleSubmit }>
          <input
            className={ style.loginPageEmailInput }
            name="email"
            type="email"
            placeholder="Email"
            value={ user.email }
            onChange={ handleChange }
            data-testid="email-input"
          />
          <input
            className={ style.loginPagePasswordInput }
            name="password"
            type={ hidePassword ? 'password' : 'text' }
            placeholder="Senha"
            value={ user.password }
            onChange={ handleChange }
            data-testid="password-input"
          />
          <button
            className={ style.loginPageHideButton }
            onClick={ (event) => handleHidePassword(event) }
          >
            <img
              className={ style.loginPageHideImage }
              src={ hidePassword ? hideEye : showEye }
              alt="hide password"
            />
          </button>
          <button
            className={ style.loginPageButtonInput }
            type="submit"
            data-testid="login-submit-btn"
            disabled={ isDisable }
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
