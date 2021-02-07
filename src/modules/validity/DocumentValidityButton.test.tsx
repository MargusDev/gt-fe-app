import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import DocumentValidityButton from './DocumentValidityButton';
import { ValidityStatus } from './ValidityIndicator';

test('renders initial button', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Void} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/check validity/i);
  expect(validityButton).toBeInTheDocument();
});

test('renders pending button', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Pending} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/checking document/i);
  expect(validityButton).toBeInTheDocument();
});

test('renders invalid button', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Invalid} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/document invalid/i);
  expect(validityButton).toBeInTheDocument();
});

test('renders valid button', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Valid} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/document valid/i);
  expect(validityButton).toBeInTheDocument();
});

test('clicking initial button runs checks', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Void} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/check validity/i);
  fireEvent.click(validityButton);
  expect(checkValidity).toHaveBeenCalledTimes(1);
});

test('clicking pending button does not run checks', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Pending} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/checking document/i);
  fireEvent.click(validityButton);
  expect(checkValidity).not.toHaveBeenCalled();
});

test('clicking valid button runs checks', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Valid} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/document valid/i);
  fireEvent.click(validityButton);
  expect(checkValidity).toHaveBeenCalledTimes(1);
});

test('clicking invalid button runs checks', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Invalid} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/document invalid/i);
  fireEvent.click(validityButton);
  expect(checkValidity).toHaveBeenCalledTimes(1);
});

test('clicking error button runs checks', () => {
  const checkValidity = jest.fn();
  render(<DocumentValidityButton status={ValidityStatus.Error} runValidationChecks={checkValidity} />);
  const validityButton = screen.getByText(/validation error/i);
  fireEvent.click(validityButton);
  expect(checkValidity).toHaveBeenCalledTimes(1);
});
