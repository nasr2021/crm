

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL,
});

export async function getClients({
    search,
    page,
    limit,
    sort,
    order,
}: {
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: string;
}) {
    try {
        // Try to get data from the external API first
        return await api.get('/client', {
            params: {
                search,
                page,
                limit,
                sort,
                order,
            }
        });
    } catch (error) {
        console.log('Error fetching from external API, falling back to local API', error);
        // Fallback to the local API endpoint
        const localApi = axios.create({
            baseURL: window.location.origin
        });
        return await localApi.get('/api/clients', {
            params: {
                search,
                page,
                limit,
                sort,
                order,
            }
        });
    }
}