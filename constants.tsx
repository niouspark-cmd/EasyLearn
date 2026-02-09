
import { Course, Exam, User, UserRole, Conversation } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  firstName: 'Kofi',
  lastName: 'Mensah',
  username: 'kofimensah',
  role: UserRole.STUDENT,
  avatar: 'https://ui-avatars.com/api/?name=Kofi+Mensah&background=0D9488&color=fff'
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Phonics: Short Vowels',
    description: 'Master the short vowel sounds a, e, i, o, u.',
    subject: 'Reading',
    level: 'Level 1',
    teacherName: 'Adesua AI',
    teacherAvatar: '',
    studentCount: 120,
    moduleCount: 5,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
    isPublic: true,
    progress: 75,
    modules: [
      {
        id: 'm1',
        title: 'Short A',
        lessons: [
          { id: 'l1', title: 'The /æ/ Sound', duration: '5m', type: 'video', completed: true },
          { id: 'l2', title: 'Word Building: Cat, Mat, Sat', duration: '10m', type: 'quiz', completed: true },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Sight Words: High Frequency',
    description: 'Learn the most common words in English text.',
    subject: 'Reading',
    level: 'Level 2',
    teacherName: 'Adesua AI',
    teacherAvatar: '',
    studentCount: 95,
    moduleCount: 4,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80',
    isPublic: true,
    progress: 30,
    modules: []
  }
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'e1',
    title: 'Reading Check: Short Vowels',
    subject: 'Reading',
    year: 2026,
    type: 'INTERNAL',
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q1',
        text: 'Which word contains the short "a" sound?',
        options: ['Cat', 'Car', 'Cake', 'Call'],
        correctAnswer: 0,
        explanation: 'Cat uses the short /æ/ sound.'
      }
    ]
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [];

export const SUBJECTS = ['Phonics', 'Sight Words', 'Fluency', 'Comprehension'];
export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
