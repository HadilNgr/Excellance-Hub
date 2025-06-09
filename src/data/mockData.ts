import { Announcement, Project, Department } from '../types';

export const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'Welcome to New Academic Year 2024',
    content: 'We are excited to welcome all students to the new academic year. Please check your schedules and prepare for an amazing journey ahead.',
    display: 'general',
    datetime: '2024-01-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Final Year Project Registration Open',
    content: 'Final year students can now register for their projects. Please submit your preferences before the deadline.',
    display: 'computer_science',
    datetime: '2024-01-20T14:30:00Z',
  },
  {
    id: 3,
    title: 'Mathematics Workshop Series',
    content: 'Join our weekly mathematics workshop series every Friday at 3 PM in Room 201.',
    display: 'math',
    datetime: '2024-01-18T15:00:00Z',
  },
  {
    id: 4,
    title: 'Physics Lab Safety Guidelines',
    content: 'All physics students must complete the safety orientation before accessing laboratory facilities.',
    display: 'physics',
    datetime: '2024-01-22T09:00:00Z',
  },
  {
    id: 5,
    title: 'Chemistry Research Presentation',
    content: 'Dr. Smith will present the latest research findings on molecular dynamics this Thursday.',
    display: 'chemistry',
    datetime: '2024-01-25T16:00:00Z',
  },
];

export const mockProjects: Project[] = [
  {
    id: 1,
    title: 'AI-Powered Student Performance Analytics',
    description: 'Develop a machine learning system to analyze and predict student performance patterns using historical data.',
  },
  {
    id: 2,
    title: 'Smart Campus Navigation System',
    description: 'Create a mobile application that uses AR and GPS to help students navigate the campus efficiently.',
  },
  {
    id: 3,
    title: 'Blockchain-Based Certificate Verification',
    description: 'Design a secure system for issuing and verifying academic certificates using blockchain technology.',
  },
  {
    id: 4,
    title: 'IoT-Based Environmental Monitoring',
    description: 'Build an IoT system to monitor air quality, temperature, and humidity across campus buildings.',
  },
  {
    id: 5,
    title: 'Virtual Reality Learning Platform',
    description: 'Develop a VR application for immersive learning experiences in various subjects.',
  },
  {
    id: 6,
    title: 'Automated Library Management System',
    description: 'Create a comprehensive system for managing library resources with automated features.',
  },
];

export const departments: Department[] = [
  {
    id: 'computer_science',
    name: 'Computer Science',
    code: 'CS',
    color: 'from-blue-500 to-blue-600',
    icon: 'Monitor',
  },
  {
    id: 'math',
    name: 'Mathematics',
    code: 'MATH',
    color: 'from-green-500 to-green-600',
    icon: 'Calculator',
  },
  {
    id: 'physics',
    name: 'Physics',
    code: 'PHY',
    color: 'from-purple-500 to-purple-600',
    icon: 'Atom',
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    code: 'CHEM',
    color: 'from-orange-500 to-orange-600',
    icon: 'Flask',
  },
];