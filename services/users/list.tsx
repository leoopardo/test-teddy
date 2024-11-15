import { useEffect, useState } from 'react';
import { api } from '../config/api';

export interface User {
    id: number;
    name: string;
    salary: number;
    companyValuation: number;
    createdAt: string;
    updatedAt: string;
}

interface UserData {
    clients: User[];
    totalPages: number;
    currentPage: number;
}

export const useListUsers = (params: { page: number; limit: number }) => {
    const [data, setData] = useState<UserData | null>(null);
    const [cachedData, setCachedData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const fetchUsers = async () => {
        if (data) {
            setCachedData(data);
        }
        setLoading(true);
        try {
            const response = await api.get('/users', { params });
            const result = response.data;
            setData(result);
            setCachedData(null);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [params]);

    return { data: cachedData || data, loading, error, fetchUsers };
};
