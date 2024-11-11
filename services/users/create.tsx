import { useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../config/api';

export const useCreateClient = (closeModal: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const createUser = async (body: {
        name?: string;
        salary?: string | number;
        companyValuation?: string | number;
    }) => {
        setLoading(true);
        try {
            await api.post('/users', {
                ...body,
                salary: +(body.salary || 0),
                companyValuation: +(body.companyValuation || 0)
            });
            closeModal();
            Alert.alert('Cliente criado com sucesso');
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, createUser };
};
