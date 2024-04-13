import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Modal Component', () => {
  it('renders the modal button with the correct text', () => {
    const text = 'Reserver';
    const { getByText } = render(
    <Router>
      <Modal text={text} />
    </Router>);
    const modalButton = getByText(text);
    expect(modalButton).toBeInTheDocument();
  });

  it('hides the modal content when button is clicked again', () => {
    const text = 'Reserver';
    const { getByText, queryByText } = render(
    <Router>
      <Modal text={text} />
  </Router>);
    const modalButton = getByText(text);
    fireEvent.click(modalButton);
    fireEvent.click(modalButton);
    const modalContent = queryByText('Modal Content'); // Replace 'Modal Content' with your actual modal content text
    expect(modalContent).toBeNull();
  });
});