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
export const useGetClient = (id?: string) => {
    const [data, setData] = useState<user | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchUsers = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const response = await api.get(`/users/${id}`);
            const result = response.data;
            setData(result);
            console.log(result);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [id]);

    return { data, loading, error, fetchUsers };
};
