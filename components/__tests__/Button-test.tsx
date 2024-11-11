import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import Button from '../buttons/Button';

describe('Button Component', () => {
    it('Should renders correctly with provided props', () => {
        const mockOnClick = jest.fn();
        const { getByText, getByTestId } = render(
            <Button data-testid="test-button" onClick={mockOnClick}>
                Test button
            </Button>
        );
        const button = getByTestId('test-button');
        expect(getByText('Test button')).toBeTruthy();
        fireEvent(button, 'onClick');

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('Should be disabled when disabled prop is true', () => {
        const mockOnClick = jest.fn();
        const { getByTestId } = render(
            <Button data-testid="test-button" onClick={mockOnClick} disabled>
                Test button
            </Button>
        );
        const button = getByTestId('test-button');
 
        fireEvent(button, 'onClick');

        expect(mockOnClick).toHaveBeenCalledTimes(0);
    });

    it('Should be disabled when loading prop is true', () => {
        const mockOnClick = jest.fn();
        const { getByTestId } = render(
            <Button data-testid="test-button" onClick={mockOnClick} loading>
                Test button
            </Button>
        );
        const button = getByTestId('test-button');
 
        fireEvent(button, 'onClick');

        expect(mockOnClick).toHaveBeenCalledTimes(0);
    });
});
