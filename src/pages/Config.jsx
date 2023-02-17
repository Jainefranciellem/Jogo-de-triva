import React, { Component } from 'react';
import '../style/Config.css';
import imgLogo from '../style/img/logo trivia.svg';

export default class Config extends Component {
  render() {
    return (
      <div className="containerConfig">
        <img src={ imgLogo } alt="" />
        <div className="sectionConfig">
          <h2
            className="nameConfig"
            data-testid="settings-title"
          >
            Configurações
          </h2>
          <select className="options" name="" id="">
            <option value="Categorias">Categorias</option>
          </select>
          <select className="options" name="" id="">
            <option value="Dificuldade">Dificuldade</option>
          </select>
          <select className="options" name="" id="">
            <option value="Tipo">Tipo</option>
          </select>
          <button className="buttonConfig">JOGAR</button>
        </div>
      </div>
    );
  }
}
