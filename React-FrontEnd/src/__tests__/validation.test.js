import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TreeInput from '../pages/TreeInput'; // Adjust the import according to your file structure

// Mock global fetch
global.fetch = jest.fn();

describe('TreeInput Component Validation', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('displays error for invalid comma-separated list of numbers', async () => {
    render(<TreeInput />);

    // Enter invalid input
    fireEvent.change(screen.getByPlaceholderText(/Enter a series of numbers/i), {
      target: { value: '1, two, 3' }, // Invalid input
    });

    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid comma-separated list of numbers./i)).toBeInTheDocument();
    });
  });

  test('does not display error for valid comma-separated list of numbers', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 1, left: null, right: null }) // Example response
    });

    render(<TreeInput />);

    // Enter valid input
    fireEvent.change(screen.getByPlaceholderText(/Enter a series of numbers/i), {
      target: { value: '1, 2, 3' },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    // Wait for the data to be processed
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/trees/process', expect.any(Object));
    });
    
    // Wait for the error message to be removed
    await waitFor(() => {
      expect(screen.queryByText(/Please enter a valid comma-separated list of numbers./i)).not.toBeInTheDocument();
    });
  });
});
