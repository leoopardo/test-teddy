import { useEffect, useState } from 'react';
import { api } from '../config/api';

interface user {
    id: number;
    name: string;
    salary: number;
    companyValuation: number;
    createdAt: string;
    updatedAt: string;
}
export const useListUsers = (params: {page: number, limit: number}) => {
    const [data, setData] = useState<{
        clients: user[];
        totalPages: number;
        currentPage: number;
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/users', {params});
            const result = response.data;
            setData(result);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [params]);

    return { data, loading, error };
};
