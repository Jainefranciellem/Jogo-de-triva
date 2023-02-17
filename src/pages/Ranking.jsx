import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import imgLogo from '../style/img/logo trivia.svg';
import '../style/Ranking.css';
import star from '../style/img/Vector.svg';

class Ranking extends Component {
  state = {
    infoRaking: JSON.parse(localStorage.getItem('players')),
  };

  render() {
    const { infoRaking } = this.state;
    const { history } = this.props;
    return (
      <div className="containerRanking">
        <img src={ imgLogo } className="logoRanking" alt="" />
        <div className="sectionRanking">
          <h1 className="nameRanking" data-testid="ranking-title">
            Ranking
          </h1>
          <div className="ranking">
            {infoRaking.map((player, index) => (
              <section className="sectionUser" key={ index }>
                <div className="divUser">
                  <img className="Img" src={ `https://www.gravatar.com/avatar/${player.email}` } alt="gravatar" />
                  <p data-testid={ `player-name-${index}` }>
                    {player.userName}
                  </p>
                </div>
                <div className="divPoints">
                  <p data-testid={ `player-score-${index}` }>
                    <img src={ star } alt="star" />
                    {player.score}
                    {' '}
                    pontos
                  </p>
                </div>
              </section>
            ))}
          </div>
          <button
            className="buttonRanking"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            <h3>Play Again</h3>
          </button>
        </div>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Ranking);
