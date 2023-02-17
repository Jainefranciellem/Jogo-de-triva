import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../style/Header.css';
import star from '../style/img/Vector.svg';

class Header extends Component {
  render() {
    const { userName, score, email } = this.props;
    return (
      <div className="containerHeader">
        <header className="header">
          <div
            data-testid="header-player-name"
            className="nameProfile"
          >
            <img
              className="Img"
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${email}` }
              alt=""
            />
            <p>{userName}</p>
          </div>
          <span
            className="score"
            data-testid="header-score"
          >
            <img src={ star } alt="star" />
            Pontos:
            {' '}
            { score }
          </span>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userName: state.player.userName,
  score: state.player.score,
  email: state.player.email,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  userName: PropTypes.any,
}.isRequired;
