import IconBriefcase from '@/assets/svg/icon-briefcase.svg';
import IconDocument from '@/assets/svg/icon-document.svg';
import IconUsers from '@/assets/svg/icon-users.svg';

type Milestone = {
  Logo: React.FC<React.SVGProps<SVGElement>>;
  dateFrom: Date;
  dateTo: Date;
  title: string;
  subtitle: string;
  description: string;
};

function createDate(year: number, month: number): Date {
  return new Date(year, month - 1, 1);
}

export const milestones: Milestone[] = [
  {
    Logo: IconUsers,
    dateFrom: createDate(2022, 9),
    dateTo: createDate(2022, 12),
    title: 'Member',
    subtitle: 'Campus Organization',
    description:
      'Joined campus organization and participated in various events and activities. Gained foundational experience in teamwork, event coordination, and organizational communication.',
  },
  {
    Logo: IconDocument,
    dateFrom: createDate(2023, 1),
    dateTo: createDate(2023, 4),
    title: 'Media Staff Intern',
    subtitle: 'MPR RI',
    description:
      "Supported the media team at the People's Consultative Assembly of Indonesia. Assisted in content production, event documentation, video editing, and managing digital archives for official parliamentary activities.",
  },
  {
    Logo: IconDocument,
    dateFrom: createDate(2023, 5),
    dateTo: createDate(2023, 8),
    title: 'Media Relation',
    subtitle: 'Fraksi PAN DPR RI',
    description:
      'Managed media relations for the PAN faction in the Indonesian House of Representatives. Coordinated with journalists, drafted press releases, handled media inquiries, and maintained relationships with news outlets.',
  },
  {
    Logo: IconUsers,
    dateFrom: createDate(2023, 9),
    dateTo: createDate(2023, 12),
    title: 'Active Member',
    subtitle: 'Campus Organization',
    description:
      'Actively participated in campus organizational activities, developing leadership, teamwork, and communication skills.',
  },
  {
    Logo: IconDocument,
    dateFrom: createDate(2024, 1),
    dateTo: createDate(2024, 4),
    title: 'Project Manager Intern',
    subtitle: 'CGI Creative Lab',
    description:
      'Coordinated creative projects from concept to delivery. Managed timelines, facilitated communication between teams, and ensured project milestones were met on schedule.',
  },
  {
    Logo: IconBriefcase,
    dateFrom: createDate(2024, 5),
    dateTo: createDate(2024, 8),
    title: 'Web Developer',
    subtitle: 'Toko Jus Batavia',
    description:
      'Built a comprehensive web-based sales management system featuring complete CRUD operations. Designed relational database schema, integrated Midtrans payment gateway, and created responsive dashboard with real-time sales analytics and inventory monitoring.',
  },
  {
    Logo: IconBriefcase,
    dateFrom: createDate(2024, 6),
    dateTo: createDate(2024, 12),
    title: 'Web Developer',
    subtitle: 'Room Booking System Project',
    description:
      'Developed a full-stack web application for office room booking management with multi-user authentication system. Implemented comprehensive booking validation logic, integrated Midtrans payment gateway, and designed an intuitive interface with real-time availability checking.',
  },
  {
    Logo: IconBriefcase,
    dateFrom: createDate(2025, 10),
    dateTo: createDate(2025, 12),
    title: 'Frontend Developer',
    subtitle: 'Infinity Global Web Solutions',
    description:
      'Created modern and responsive web interfaces using cutting-edge frontend frameworks. Collaborated with design and backend teams to implement seamless user experiences.',
  },
];
