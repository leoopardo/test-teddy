import { useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../config/api';

export const useUpdateClient = (closeModal: () => void, id?: string) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const updateUser = async (body: {
        name?: string;
        salary?: string | number;
        companyValuation?: string | number;
    }) => {
        if (!id) return;
        setLoading(true);
        try {
            await api.patch(`/users/${id}`, {
                ...body,
                salary: +(body.salary || 0),
                companyValuation: +(body.companyValuation || 0)
            });
            closeModal();
            Alert.alert('Cliente atualizado com sucesso');
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, updateUser };
};
