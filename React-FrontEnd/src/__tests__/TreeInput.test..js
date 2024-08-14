import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TreeInput from '../pages/TreeInput';
import '@testing-library/jest-dom';

// Mock global fetch
global.fetch = jest.fn();

describe('TreeInput Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('processes numbers and displays the tree', async () => {
    // Mock successful fetch response for processing numbers
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ value: 1, left: null, right: null }) // Example response
    });

    render(<TreeInput />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/Enter a series of numbers/i), {
      target: { value: '1, 2, 3' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));

    // Assert fetch call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/trees/process', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: '1, 2, 3'
      });
    });

    // Assert that the current tree is displayed
    await waitFor(() => {
      expect(screen.getByText(/Current Tree/i)).toBeInTheDocument();
    });
  });

  test('fetches and displays previous trees', async () => {
    // Mock successful fetch response for previous trees
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ value: 1, left: null, right: null }] // Example response
    });

    render(<TreeInput />);

    // Simulate button click to fetch previous trees
    fireEvent.click(screen.getByText(/Show Previous/i));

    // Assert fetch call
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/trees/previous');
    });

    // Assert that the previous trees are displayed
    await waitFor(() => {
      expect(screen.getByText(/Previous Trees/i)).toBeInTheDocument();
    });
  });

  test('handles fetch errors during number processing', async () => {
    // Mock fetch rejection for error handling
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    render(<TreeInput />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText(/Enter a series of numbers/i), {
      target: { value: '1, 2, 3' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/Submit/i));

    // Assert that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to process numbers: Fetch failed/i)).toBeInTheDocument();
    });
  });

  test('handles fetch errors during fetching previous trees', async () => {
    // Mock fetch rejection for error handling
    fetch.mockRejectedValueOnce(new Error('Fetch failed'));

    render(<TreeInput />);

    // Simulate button click to fetch previous trees
    fireEvent.click(screen.getByText(/Show Previous/i));

    // Assert that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch previous trees: Fetch failed/i)).toBeInTheDocument();
    });
  });
});
