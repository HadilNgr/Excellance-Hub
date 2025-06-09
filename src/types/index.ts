export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'admin';
}

export interface Student extends User {
  role: 'student';
}

export interface Admin extends User {
  role: 'admin';
  fullName: string;
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  display: 'general' | 'computer_science' | 'physics' | 'chemistry' | 'math';
  datetime: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
}

export interface WishlistItem {
  id: number;
  studentId: number;
  projectId: number;
  project: Project;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  color: string;
  icon: string;
}