
import { Course, Exam, User, UserRole, Conversation, Message } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  firstName: 'Kofi',
  lastName: 'Mensah',
  username: 'kofimensah',
  role: UserRole.STUDENT,
  avatar: 'https://picsum.photos/seed/kofi/200'
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'WASSCE Core Mathematics Mastery',
    description: 'Comprehensive coverage of SHS Core Mathematics topics including Algebra, Trigonometry, and Statistics.',
    subject: 'Mathematics',
    level: 'SHS 3',
    teacherName: 'Dr. John Appiah',
    teacherAvatar: 'https://picsum.photos/seed/appiah/100',
    studentCount: 1250,
    moduleCount: 12,
    image: 'https://picsum.photos/seed/math/600/400',
    isPublic: true,
    progress: 45,
    modules: [
      {
        id: 'm1',
        title: 'Number Bases & Sets',
        lessons: [
          { id: 'l1', title: 'Introduction to Number Bases', duration: '15m', type: 'video', completed: true },
          { id: 'l2', title: 'Set Theory Basics', duration: '20m', type: 'video', completed: true },
          { id: 'l3', title: 'Quiz: Bases & Sets', duration: '10m', type: 'quiz', completed: true },
        ]
      },
      {
        id: 'm2',
        title: 'Algebraic Expressions',
        lessons: [
          { id: 'l4', title: 'Linear Equations', duration: '25m', type: 'video', completed: false },
          { id: 'l5', title: 'Quadratic Functions', duration: '30m', type: 'video', completed: false },
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'English Language: Essay Writing & Grammar',
    description: 'Master the art of creative writing and perfect your grammar for the WASSCE English examination.',
    subject: 'English',
    level: 'SHS 2',
    teacherName: 'Madam Sarah Boateng',
    teacherAvatar: 'https://picsum.photos/seed/sarah/100',
    studentCount: 980,
    moduleCount: 8,
    image: 'https://picsum.photos/seed/english/600/400',
    isPublic: true,
    progress: 10,
    modules: []
  },
  {
    id: 'c3',
    title: 'Integrated Science: Biology & Chemistry',
    description: 'Deep dive into essential scientific concepts required for the core science paper.',
    subject: 'Science',
    level: 'SHS 1',
    teacherName: 'Prof. Kwesi Pratt',
    teacherAvatar: 'https://picsum.photos/seed/kwesi/100',
    studentCount: 2100,
    moduleCount: 15,
    image: 'https://picsum.photos/seed/science/600/400',
    isPublic: true,
    modules: []
  }
];

export const MOCK_EXAMS: Exam[] = [
  {
    id: 'e1',
    title: 'WASSCE Core Mathematics 2023 Past Paper',
    subject: 'Mathematics',
    year: 2023,
    type: 'WASSCE',
    timeLimitMinutes: 120,
    questions: [
      {
        id: 'q1',
        text: 'Simplify the expression: (2x + 3)(x - 4)',
        options: ['2x² - 5x - 12', '2x² + 5x - 12', '2x² - 11x - 12', '2x² + 11x - 12'],
        correctAnswer: 0,
        explanation: 'Multiplying the terms: 2x*x - 2x*4 + 3*x - 3*4 = 2x² - 8x + 3x - 12 = 2x² - 5x - 12.'
      },
      {
        id: 'q2',
        text: 'If log₁₀(x) = 2, what is x?',
        options: ['2', '20', '100', '200'],
        correctAnswer: 2,
        explanation: 'The definition of logarithm: b^y = x. Here 10² = 100.'
      }
    ]
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: 'con1', withUser: 'Dr. John Appiah', lastMessage: 'Great work on the last quiz!', timestamp: '10:45 AM', unreadCount: 0, avatar: 'https://picsum.photos/seed/appiah/100' },
  { id: 'con2', withUser: 'Study Group SHS 3', lastMessage: 'Who has the notes for yesterday\'s physics class?', timestamp: 'Yesterday', unreadCount: 3, avatar: 'https://picsum.photos/seed/group/100' }
];

export const SUBJECTS = ['English', 'Mathematics', 'ICT', 'Government', 'Biology', 'Chemistry', 'Physics', 'Economics', 'Geography', 'History'];
export const LEVELS = ['SHS 1', 'SHS 2', 'SHS 3', 'Technical', 'Vocational', 'Remedial'];
