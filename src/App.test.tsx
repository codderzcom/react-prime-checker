import '@testing-library/jest-dom/vitest';
import {beforeEach, describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '@/App';
import {MemoryRouter} from "react-router";
import userEvent from '@testing-library/user-event';
import {useAuth} from "@/hooks/useAuth.ts";

const tester = {
  seed: async () => {
    const seedButton = await screen.findByRole('button', {name: 'Set Data'});
    expect(seedButton).toBeInTheDocument();

    await userEvent.click(seedButton);
  },

  login: async (username: string, password: string) => {
    const loginButton = await screen.findByRole('button', {name: 'Login'});
    expect(loginButton).toBeInTheDocument();

    const usernameInput = (await screen.findByTestId('username')).querySelector('input')!;
    await userEvent.type(usernameInput!, username);
    expect(usernameInput!).toHaveValue(username);

    const passwordInput = (await screen.findByTestId('password')).querySelector('input')!;
    await userEvent.type(passwordInput!, password);
    expect(passwordInput!).toHaveValue(password);

    await userEvent.click(loginButton);
  },

  checkNumber: async (number: number, message?: string) => {
    const checkButton = await screen.findByRole('button', {name: 'Check'});
    expect(checkButton).toBeInTheDocument();

    const numberInput = (await screen.findByTestId('number')).querySelector('input')!;
    await userEvent.type(numberInput!, '' + number);
    expect(numberInput!).toHaveValue(number);

    await userEvent.click(checkButton);

    if (message) {
      const resultText = await screen.findByTestId('result');
      expect(resultText).toHaveTextContent(message);
    }
  }
}

describe('App', () => {

  beforeEach(async () => {
    useAuth().logout();

    render(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>
    );
  })

  test('It works', async () => {
    await tester.seed();
    await tester.login('admin', 'admin');
    await tester.checkNumber(10, 'The number 10 is not prime');
    await tester.checkNumber(7, 'The number 7 is prime');
  });
});
