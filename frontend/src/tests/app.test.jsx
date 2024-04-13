import Header from "../components/Header"
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

test('Ceci est mon premier test', () => {
  render(
    <Router>
      <Header/>
    </Router>
  );
  const headerElement = screen.getByText('Akkor Hotel ltd');
    expect(headerElement).toBeInTheDocument();
})