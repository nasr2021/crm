import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const api= axios.create({
  baseURL: process.env.REACT_APP_API_URL || process.env.NEXT_PUBLIC_API_URL,
});

export function useClientMutation() {
  return useMutation({
    mutationFn: (data: any) => createClient(data),

  });
}

export function useClientDetailMutation() {
  return useMutation({
    mutationFn: (data: any) => getClient(data),
  
  });
}
export function useClientUpdateMutation() {
  return useMutation({
    mutationFn: (data: any) => updateClient(data),
   
  });
}
export function useClientDeleteMutation() {
  return useMutation({
    mutationFn: (data: any) => deleteClient(data),      
   
  });
}
export const deleteClient = async (id: string) => {
  try {
    await api.delete(`/client/${id}`);
  } catch (error) {
    console.log('Error deleting client', error);
  }
}
export const getClient = async (id: string) => {
  try {
    return await api.get(`/client/${id}`);
  } catch (error) {
    console.log('Error fetching client', error);
  }
}
export const createClient = async (data: any) => {
  try {
      console.log("data",data)
    const res = await api.post(`/client`, data);
    console.log("res",res)

  } catch (error) {
    console.log('Error creating client', error);
  }
}
export const updateClient = async (data: any) => {
  try {
    return await api.put(`/client/${data.id}`, data);
  } catch (error) {
    console.log('Error updating client', error);
  }
}



