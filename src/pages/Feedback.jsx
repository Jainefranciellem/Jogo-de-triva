import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../style/Feedback.css';
import imgLogo from '../style/img/logo trivia.svg';

class Feedback extends Component {
  componentDidMount() {
    const { player } = this.props;
    const players = JSON.parse(localStorage.getItem('players')) || [];
    players.push(player);
    players.sort((a, b) => b.score - a.score);
    localStorage.setItem('players', JSON.stringify(players));
  }

  render() {
    const { history, player } = this.props;
    const rightAswers = 3;
    return (
      <section>
        <div className="feedbackHeader">
          <Header />
        </div>
        <div className="containerFeedback" data-testid="feedback-text">
          <img src={ imgLogo } className="imageLogo" alt="logo" />
          <section className="feedbackSection">
            <img
              className="imgFeedback"
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${player.email}` }
              alt=""
            />
            <div className="feedbacks">
              {player.assertions >= rightAswers
                ? 'Well Done!'
                : 'Could be better...'}
            </div>
            <div className="points" data-testid="feedback-total-question">
              Você acertou
              {' '}
              {player.assertions}
              {' '}
              questões!
            </div>
            <div className="hits" data-testid="feedback-total-score">
              Um total de
              {' '}
              {player.score}
              {' '}
              pontos
            </div>
          </section>
          <div>
            <button
              className="buttonsFeedback"
              data-testid="btn-play-again"
              onClick={ () => history.push('/') }
            >
              <h3>Play Again</h3>
            </button>
            <button
              className="buttonsFeedback"
              data-testid="btn-ranking"
              onClick={ () => history.push('/Ranking') }
            >
              <h3>Ranking</h3>
            </button>
          </div>
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    assertions: PropTypes.number,
    email: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
