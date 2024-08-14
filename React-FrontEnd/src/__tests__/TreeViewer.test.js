import React from 'react';
import { render, screen } from '@testing-library/react';
import TreeViewer from '../components/TreeViewer'; // Adjust the import according to your file structure
import '@testing-library/jest-dom';

describe('TreeViewer Component', () => {
  test('correctly formats and displays the tree data', () => {
    const treeData = {
      number: 1,
      left: {
        number: 2,
        left: null,
        right: null
      },
      right: {
        number: 3,
        left: null,
        right: null
      }
    };

    render(<TreeViewer tree={treeData} />); // Render the component with the tree data

    const formattedTree = JSON.stringify(treeData, null, 2);

    const preElement = screen.getByTestId('pre'); // Find the pre element by its test ID
const normalizedContent = preElement.textContent.replace(/\s+/g, '');
const normalizedExpected = formattedTree.replace(/\s+/g, '');
expect(normalizedContent).toBe(normalizedExpected);
    });
  });