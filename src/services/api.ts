import axios from 'axios';
import { Announcement, Project, WishlistItem } from '../types';

const API_BASE_URL = 'http://localhost/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Announcements API
export const announcementsApi = {
  getAll: (display?: string) => {
    const params = display ? { display } : {};
    return api.get<Announcement[]>('/announcements', { params });
  },
  
  create: (announcement: Omit<Announcement, 'id'>) => {
    return api.post<{ status: string; announcement: Announcement }>('/announcements', announcement);
  },
  
  update: (id: number, announcement: Partial<Announcement>) => {
    return api.put<{ status: string; announcement: Announcement }>(`/announcements/${id}/update`, announcement);
  },
  
  delete: (id: number) => {
    return api.delete<{ status: string; message: string }>(`/announcements/${id}/delete`);
  },
};

// Projects API
export const projectsApi = {
  getAll: () => {
    return api.get<Project[]>('/projects');
  },
  
  create: (project: Omit<Project, 'id'>) => {
    return api.post<{ status: string; project: Project }>('/projects', project);
  },
};

// Wishlist API
export const wishlistApi = {
  getByStudent: (studentId: number) => {
    return api.get<WishlistItem[]>(`/wishlist/${studentId}`);
  },
  
  add: (studentId: number, projectId: number) => {
    return api.post<{ status: string; wishlist: WishlistItem }>('/wishlist', {
      student_id: studentId,
      project_id: projectId,
    });
  },
  
  remove: (studentId: number, projectId: number) => {
    return api.delete<{ status: string; message: string }>('/wishlist', {
      data: {
        student_id: studentId,
        project_id: projectId,
      },
    });
  },
  
  getAll: () => {
    return api.get<WishlistItem[]>('/wishlists');
  },
};

export default api;