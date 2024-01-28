import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const formatCurrency = (amount) => {
  return parseFloat(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatCurrency2 = (amount) => {
  return parseFloat(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


describe('Component ResultBox', () => {
  it('should render proper info about conversion when PLN => USD', () => {
    const testCases = [
      { from: 'PLN', to: 'USD', amount: 83 },
      { from: 'PLN', to: 'USD', amount: 45 },
      { from: 'PLN', to: 'USD', amount: 418 },
      { from: 'PLN', to: 'USD', amount: 44 },
    ];

    for (const testObj of testCases) {
      const amount = (testObj.amount).toFixed(2);
      const from = testObj.from;
      const to = testObj.to;

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);

      const output = screen.getByTestId('output');

      // Skorzystaj z funkcji formatCurrency
      const result = formatCurrency(amount / 3.5);

      expect(output).toHaveTextContent(`${from} ${amount} = ${result}`);

      cleanup();
    }
  });

  it('should render proper info about conversion when USD => PLN', () => {
    const testCases = [
      { from: 'USD', to: 'PLN', amount: 445 },
      { from: 'USD', to: 'PLN', amount: 556 },
      { from: 'USD', to: 'PLN', amount: 24 },
      { from: 'USD', to: 'PLN', amount: 22 },
    ];

    for (const testObj of testCases) {
      const amount = (testObj.amount).toFixed(2);
      const from = testObj.from;
      const to = testObj.to;

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);

      const output = screen.getByTestId('output');

      // Skorzystaj z funkcji formatCurrency
      const result = formatCurrency2(amount * 3.5);

      expect(output).toHaveTextContent(`$${amount} = ${to} ${result}`);

      cleanup();
    }
  });

  it('should render proper info about conversion when PLN == PLN', () => {
    const testCases = [
      { from: 'PLN', to: 'PLN', amount: 7452 },
      { from: 'PLN', to: 'PLN', amount: 477 },
      { from: 'PLN', to: 'PLN', amount: 577 },
      { from: 'PLN', to: 'PLN', amount: 175 },
    ];

    for (const testObj of testCases) {
      const amount = (testObj.amount).toFixed(2);
      const from = testObj.from;
      const to = testObj.to;

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);

      const output = screen.getByTestId('output');

      // Skorzystaj z funkcji formatCurrency
      expect(output).toHaveTextContent(`${from} ${formatCurrency2(amount)} = ${to} ${formatCurrency2(amount)}`);

      cleanup();
    }
  });

  it('should render proper info about conversion when amount is negative', () => {
    const testCases = [
      { from: 'PLN', to: 'USD', amount: '-45.00' },
      { from: 'USD', to: 'PLN', amount: '-7.00' },
      { from: 'USD', to: 'PLN', amount: '-190.00' },
      { from: 'PLN', to: 'USD', amount: '-11.00' },
    ];

    for (const testObj of testCases) {
      const amount = testObj.amount;
      const from = testObj.from;
      const to = testObj.to;

      render(<ResultBox from={from} to={to} amount={Number(amount)} />);

      const negativeValue = screen.getByTestId('negativeValue');

      expect(negativeValue).toHaveTextContent(`Wrong value...`);

      cleanup();
    }
  });
});
