import { formatter } from '@/utils/foratter';
import { fireEvent, render } from '@testing-library/react-native';
import * as React from 'react';
import { ClientCard } from '../card/clientCard';

describe('ClientCard Component', () => {
    it('Should renders correctly with provided props', () => {
        const salary = 100;
        const companyValuation = 1000;
        const mockOnClick = jest.fn();
        const { getByText, getByTestId } = render(
            <ClientCard
                data-testid="test-button"
                name="card-test"
                salary={salary}
                companyValuation={companyValuation}
            />
        );
        const clientCard = getByTestId('test-button');
        expect(
            getByText(`Salário: ${formatter.Currency(salary)}`)
        ).toBeTruthy();
        expect(
            getByText(`Empresa: ${formatter.Currency(companyValuation)}`)
        ).toBeTruthy();
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('Should actions be rendered correctly with onPress'),
        () => {
            const salary = 100;
            const companyValuation = 1000;
            const mockOnClick = jest.fn();
            const { getByText, getByTestId } = render(
                <ClientCard
                    data-testid="test-button"
                    name="card-test"
                    salary={salary}
                    companyValuation={companyValuation}
                    actions={[
                        {
                            name: 'teste',
                            icon: <></>,
                            onClick: mockOnClick
                        }
                    ]}
                />
            );
            const clientCard = getByTestId('test-button');
            const actionButton = getByTestId('action-teste');
            fireEvent(actionButton, 'onPress');
            expect(mockOnClick).toHaveBeenCalledTimes(1);
        };
});
