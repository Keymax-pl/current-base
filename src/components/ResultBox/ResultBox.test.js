import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

  describe('Component ResultBox', () => {
    it('should render proper info about conversion when PLN => USD', () => {

        const testCases = [
            { from: 'PLN', to: 'USD', amount: 583 },
            { from: 'PLN', to: 'USD', amount: 45 },
            { from: 'PLN', to: 'USD', amount: 25408 },
            { from: 'PLN', to: 'USD', amount: 144 },
        ];

        for(const testObj of testCases) {

            const amount = (testObj.amount).toFixed(2);
            const from = testObj.from;
            const to = testObj.to;
      
            render(<ResultBox from={from} to={to} amount={Number(amount)} />);
      
            const output = screen.getByTestId('output');
      
            const result = (amount/ 3.5).toFixed(2);

            expect(output).toHaveTextContent(`${from} ${amount} = $${result}`);

            cleanup();
          }

      });

      it('should render proper info about conversion when USD => PLN', () => {

        const testCases = [
            { from: 'USD', to: 'PLN', amount: 475 },
            { from: 'USD', to: 'PLN', amount: 56 },
            { from: 'USD', to: 'PLN', amount: 24 },
            { from: 'USD', to: 'PLN', amount: 82 },
        ];

        for (const testObj of testCases) {

            const amount = (testObj.amount).toFixed(2);
            const from = testObj.from;
            const to = testObj.to;
      
            render(<ResultBox from={from} to={to} amount={Number(amount)} />);
      
            const output = screen.getByTestId('output');
            const result = (amount*3.5).toFixed(2);
      
            expect(output).toHaveTextContent(`$${amount} = ${to} ${result}`);
      
            cleanup();
          }
      });
      it('should render proper info about conversion when PLN == PLN', () => {

        const testCases = [
            { from: 'PLN', to: 'PLN', amount: 457 },
            { from: 'PLN', to: 'PLN', amount: 554 },
            { from: 'PLN', to: 'PLN', amount: 5 },
            { from: 'PLN', to: 'PLN', amount: 15 },
        ];
    
        for (const testObj of testCases) {
    
          const amount = (testObj.amount).toFixed(2);
          const from = testObj.from;
          const to = testObj.to;
    
          render(<ResultBox from={from} to={to} amount={Number(amount)} />);
    
          const output = screen.getByTestId('output');
    
          expect(output).toHaveTextContent(`${from} ${amount} = ${to} ${amount}`);
    
          cleanup();
        }
    });

    it('should render proper info about conversion when amount is negative', () => {

      const testCases = [
  
        { from: 'PLN', to: 'USD', amount: '-45.00'},
        { from: 'USD', to: 'PLN', amount: '-7.00'},
        { from: 'USD', to: 'PLN', amount: '-190.00'},
        { from: 'PLN', to: 'USD', amount: '-11.00'},  
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