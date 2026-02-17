import axios from 'axios';

// Define types for your data
export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface CreateGuestbookDto {
  name: string;
  message: string;
}

export interface UpdateGuestbookDto {
  name?: string;
  message?: string;
}

// Create axios instance
const api = axios.create({
  baseURL: '/api',  // This will route to your NestJS backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions with proper typing
export const getGuestbookEntries = async (): Promise<GuestbookEntry[]> => {
  const response = await api.get<GuestbookEntry[]>('/guestbook');
  return response.data;
};

export const getGuestbookEntry = async (id: string): Promise<GuestbookEntry> => {
  const response = await api.get<GuestbookEntry>(`/guestbook/${id}`);
  return response.data;
};

export const createGuestbookEntry = async (data: CreateGuestbookDto): Promise<GuestbookEntry> => {
  const response = await api.post<GuestbookEntry>('/guestbook', data);
  return response.data;
};

export const updateGuestbookEntry = async (id: string, data: UpdateGuestbookDto): Promise<GuestbookEntry> => {
  const response = await api.patch<GuestbookEntry>(`/guestbook/${id}`, data);
  return response.data;
};

export const deleteGuestbookEntry = async (id: string): Promise<void> => {
  await api.delete(`/guestbook/${id}`);
};