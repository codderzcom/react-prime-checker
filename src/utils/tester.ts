import {fireEvent, screen, waitFor, within} from "@testing-library/react";
import {expect} from "vitest";
import userEvent from "@testing-library/user-event";

export const tester = {
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

  checkNumber: async (number: number) => {
    const checkButton = await screen.findByRole('button', {name: 'Check'});
    expect(checkButton).toBeInTheDocument();

    const numberInput = (await screen.findByTestId('number')).querySelector('input')!;
    await userEvent.type(numberInput!, '' + number);
    expect(numberInput!).toHaveValue(number);

    await userEvent.click(checkButton);

    return this;
  },

  verifyCheckResult: async (message: string) => {
    const resultText = await screen.findByTestId('result');
    expect(resultText).toHaveTextContent(message);
  },

  filterTable: async (from?: string, to?: string) => {
    const filterButton = await screen.findByRole('button', {name: 'Apply'});
    expect(filterButton).toBeInTheDocument();

    if (from) {
      const fromInput = await screen.findByLabelText('From Date', {selector: 'input'});
      fireEvent.change(fromInput, {target: {value: from}});
    }
    if (to) {
      const toInput = await screen.findByLabelText('To Date', {selector: 'input'});
      fireEvent.change(toInput, {target: {value: to}});
    }

    if (from || to) {
      await userEvent.click(filterButton);
    }
  },

  verifyTableCount: async (count: number) => {
    const listContainer = await screen.findByTestId('result-table');
    const listItems = within(listContainer).getAllByRole('listitem');
    expect(listItems).toHaveLength(count);
  },

  wait: async (ms: number = 1000) => {
    await new Promise(resolve => setTimeout(resolve, ms));
  }
}