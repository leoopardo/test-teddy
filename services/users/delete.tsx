import { useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../config/api';

export const useDeleteClient = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const deleteUser = async (id: string) => {
        setLoading(true);
        try {
            await api.delete(`/users/${id}`);
            Alert.alert('Sucesso', 'Cliente deletado com sucesso');
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (id: string) => {
        Alert.alert(
            'Confirmar exclusão',
            'Tem certeza de que deseja deletar o cliente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: () => deleteUser(id)
                }
            ],
            { cancelable: true }
        );
    };

    return { loading, error, confirmDelete };
};
