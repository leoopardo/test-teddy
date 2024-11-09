import * as React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TextField from '../inputs/TextField';

describe('TextField Component', () => {
    it('Should renders correctly with provided props', () => {
        const { getByText, getByTestId } = render(
            <TextField
                label="Test Label"
                name="testName"
                value="Test Value"
                onChange={() => {}}
                data-testid="text-field"
            />
        );

        expect(getByText('Test Label')).toBeTruthy();
        expect(getByTestId('text-field').props.value).toBe('Test Value');
    });

    it('Should calls onChange when text input changes', () => {
        const mockOnChange = jest.fn();
        const { getByTestId } = render(
            <TextField
                label="Test Label"
                name="testName"
                value=""
                onChange={mockOnChange}
                data-testid="text-field"
            />
        );

        const textField = getByTestId('text-field');
        fireEvent(textField, 'onChange', 'New Value');

        expect(mockOnChange).toHaveBeenCalledWith('New Value');
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('Should applies the correct Tailwind classes', () => {
        const { getByTestId } = render(
            <TextField
                label="Test Label"
                name="testName"
                value="Test Value"
                onChange={() => {}}
                data-testid="text-field"
            />
        );

        const textField = getByTestId('text-field');
        // Verify Tailwind classes in styles (can vary based on how NativeWind is applied)
        expect(textField.props.className).toContain('bg-white border border-gray-300 p-2 rounded-md w-full text-2xl h-12 focus:border-orange-400 focus:border-1 focus:border-solid transition-all');
    });
});