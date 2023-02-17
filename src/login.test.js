import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './tests/helpers/renderWithRouterAndRedux';
import reducers from './redux/reducers';
import Login from './pages/Login';
import App from './App';
import requestToken from './pages/requestApi/requestToken';
import requestApi from './pages/requestApi/requestApi';

describe('Teste o componente <Login.js />', () => {
  it('reducers pagina de Login vazio', () => {
    const state = reducers(undefined, {});
    expect(state).toEqual({ player: { email: '', userName: '' } });
  });

  it('reducers pagina de Login com dados', () => {
    const state = reducers(
      { player: { email: '', userName: '' } },
      { type: 'UPDATE_EMAIL', email: 'user@email.com' },
    );
    expect(state).toEqual({ player: { email: 'user@email.com', userName: '' } });
  });

  it('Teste o input do email e usuario da pagina de Login ', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    expect(inputEmail).toBeInTheDocument();

    const inputName = screen.getByTestId(/input-player-name/i);
    expect(inputName).toBeInTheDocument();

    const btnPlay = screen.getByTestId(/btn-play/i);
    expect(btnPlay).toBeInTheDocument();

    const btnConfig = screen.getByTestId(/btn-settings/i);
    expect(btnConfig).toBeInTheDocument();
  });

  it('Teste email valida ao colocar @ e .com e o input de nome', () => {
    const email = 'alguem@email.com';
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    fireEvent.change(inputEmail, { target: { value: email } });
    expect(inputEmail).toHaveValue(email);

    const inputName = screen.getByTestId(/input-player-name/i);
    fireEvent.change(inputName, { target: { value: 'Abcdef' } });
    expect(inputName).toHaveValue('Abcdef');
  });

  it('Teste os botões Play e Configurações', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const botaoPlay = screen.getByTestId(/btn-play/i);
    userEvent.click(botaoPlay);
    act(() => history.push('/Game'));

    const btnSettings = screen.getByTestId(/btn-settings/i);
    userEvent.click(btnSettings);
    act(() => history.push('/Config'));
  });

  it('teste se requestApi é uma função', () => {
    expect(typeof requestApi).toBe('function');
  });

  it('teste se requestToken é uma função', () => {
    expect(typeof requestToken).toBe('function');
  });

  it('testa a requisção para a API', async () => {
    const mockedObject = [{ // cria um objeto com as informações que queremos que sejam retornadas pelo mock.
      response_code: 0,
      response_message: 'Token Generated Successfully!',
      token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
    }];
    const { history } = renderWithRouterAndRedux(<App />); // Renderiza a aplicação

    jest.spyOn(global, 'fetch'); // cria o mock para o global.fetch, primeiro a jest.spyOn e depois a função mockResolvedValue duas vezes, pois a função fetch retorna primeiro um objeto que possui um método `.json`
    global.fetch = jest.fn().mockResolvedValue({ //  e o método `.json` retorna o resultado da API.
      json: jest.fn().mockResolvedValue(mockedObject),
    });

    const inputEmail = screen.getByTestId(/input-gravatar-email/i);
    const inputName = screen.getByTestId(/input-player-name/i);
    const btnPlay = screen.getByTestId(/btn-play/i);

    userEvent.type(inputEmail, 'userName@email.com');
    expect(btnPlay).toBeDefined();
    userEvent.type(inputName, 'userName');
    expect(btnPlay).toBeEnabled();
    userEvent.click(btnPlay);
    await waitFor(() => {
      erxpect(history.location.pathname).toBe('/Game');
    });
  });
});
