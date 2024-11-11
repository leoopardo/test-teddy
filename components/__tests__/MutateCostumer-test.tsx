import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { MutateCostumerDrawer } from '@/app/auth/_components/mutateCostumer';
import { useGetClient } from '@/services/users/getById';
import { useCreateClient } from '@/services/users/create';
import { useUpdateClient } from '@/services/users/update';

jest.mock('@/services/users/getById', () => ({
    useGetClient: jest.fn()
}));

jest.mock('@/services/users/create', () => ({
    useCreateClient: jest.fn(() => ({
        createUser: jest.fn(),
        loading: false,
        error: false
    }))
}));

jest.mock('@/services/users/update', () => ({
    useUpdateClient: jest.fn()
}));

describe('MutateCostumerDrawer Component', () => {
    it('Should renders correctly create modal with provided props', async () => {
        (useGetClient as jest.Mock).mockReturnValue({
            loading: false,
            data: null,
            error: false,
            fetchUsers: jest.fn()
        });

        const mockOnClose = jest.fn();
        const { getByText, getByTestId } = render(
            <MutateCostumerDrawer onClose={mockOnClose} visible={true} />
        );

        expect(getByText('Criar cliente')).toBeTruthy();
        expect(getByTestId('name-input')).toBeTruthy();
        expect(getByTestId('salary-input')).toBeTruthy();
        expect(getByTestId('company-valuation-input')).toBeTruthy();
    });

    it('Should renders correctly update modal with provided props', async () => {
        (useGetClient as jest.Mock).mockReturnValue({
            loading: false,
            data: {
                name: 'John Doe',
                salary: '50000',
                companyValuation: '1000000'
            },
            error: false,
            fetchUsers: jest.fn()
        });

        const mockOnClose = jest.fn();
        const { getByText, getByTestId } = render(
            <MutateCostumerDrawer
                onClose={mockOnClose}
                visible={true}
                userId="1"
            />
        );

        expect(getByText('Atualizar cliente')).toBeTruthy();
        expect(getByTestId('name-input').props.value).toBe('John Doe');
        expect(getByTestId('salary-input').props.value).toBe('50000');
        expect(getByTestId('company-valuation-input').props.value).toBe(
            '1000000'
        );
    });

    it('Should submit the form and call useCreateClient', async () => {
        (useGetClient as jest.Mock).mockReturnValue({
            loading: false,
            data: null,
            error: false,
            fetchUsers: jest.fn()
        });

        const mockCreateUser = jest.fn();
        (useCreateClient as jest.Mock).mockReturnValue({
            createUser: mockCreateUser,
            loading: false,
            error: false
        });

        const mockOnClose = jest.fn();
        const { getByTestId } = render(
            <MutateCostumerDrawer onClose={mockOnClose} visible={true} />
        );

        fireEvent.changeText(getByTestId('name-input'), 'Novo Cliente');
        fireEvent.changeText(getByTestId('salary-input'), '100000');
        fireEvent.changeText(getByTestId('company-valuation-input'), '5000000');

        fireEvent.press(getByTestId('login-button'));

        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalledWith({
                name: 'Novo Cliente',
                salary: '100000',
                companyValuation: '5000000'
            });
        });
    });

    it('Should submit the form and call useUpdateClient', async () => {
        (useGetClient as jest.Mock).mockReturnValue({
            loading: false,
            data: {
                name: 'John Doe',
                salary: '50000',
                companyValuation: '1000000'
            },
            error: false,
            fetchUsers: jest.fn()
        });

        const mockUpdateUser = jest.fn();
        (useUpdateClient as jest.Mock).mockReturnValue({
            updateUser: mockUpdateUser,
            loading: false,
            error: false
        });

        const mockOnClose = jest.fn();
        const { getByTestId } = render(
            <MutateCostumerDrawer
                onClose={mockOnClose}
                visible={true}
                userId="1"
            />
        );

        fireEvent.changeText(getByTestId('name-input'), 'Cliente Atualizado');
        fireEvent.changeText(getByTestId('salary-input'), '120000');
        fireEvent.changeText(getByTestId('company-valuation-input'), '2000000');

        fireEvent.press(getByTestId('login-button'));

        await waitFor(() => {
            expect(mockUpdateUser).toHaveBeenCalledWith({
                name: 'Cliente Atualizado',
                salary: '120000',
                companyValuation: '2000000'
            });
        });
    });
});
