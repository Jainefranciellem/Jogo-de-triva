import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { updateEmail, updateUsername } from '../redux/actions';
import requestToken from './requestApi/requestToken';
import svgLogo from '../style/img/logo trivia.svg';
import '../style/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    userName: '',
    isValid: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validationLogin());
  };

  validationLogin = () => {
    const maxLengthPass = 6;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const { email, userName } = this.state;
    const validation = !(emailRegex.test(email) && userName.length >= maxLengthPass);

    this.setState({
      isValid: validation,
    });
  };

  refresh = () => {
    const { history } = this.props;
    history.push('/Config');
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email, userName } = this.state;
    const tokenAPI = await requestToken();
    localStorage.setItem('token', tokenAPI);
    const emailGravatar = md5(email).toString();
    dispatch(updateEmail(emailGravatar));
    dispatch(updateUsername(userName));
    history.push('/Game');
  };

  render() {
    const { isValid } = this.state;
    return (
      <div className="container">
        <img src={ svgLogo } alt="" />
        <form className="divLogin">
          <input
            className="input"
            data-testid="input-gravatar-email"
            type="email"
            name="email"
            placeholder="Qual é seu e-mail do gravata?"
            onChange={ this.handleChange }
          />
          <input
            className="input"
            data-testid="input-player-name"
            type="text"
            name="userName"
            placeholder="Qual é seu nome?"
            onChange={ this.handleChange }
          />
          <button
            className="buttonLogin"
            data-testid="btn-play"
            type="submit"
            disabled={ isValid }
            onClick={ this.handleClick }
          >
            JOGAR
          </button>
          <button
            className="buttonLogin"
            data-testid="btn-settings"
            type="button"
            onClick={ this.refresh }
          >
            CONFIGURAÇÕES
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
