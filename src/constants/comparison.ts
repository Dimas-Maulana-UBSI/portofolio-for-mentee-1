import profileSrc from '@/assets/png/mini-profile.png';

type ComparisonCardProps = {
  type: 'primary' | 'secondary';
  profileSrc?: string;
  title: string;
  list: string[];
};

export const comparisonCardsData: ComparisonCardProps[] = [
  {
    type: 'primary',
    profileSrc,
    title: 'Working With Me',
    list: [
      'React Expert',
      'Precise Website Implementation',
      'TypeScript Proficiency',
      'Clean, Maintainable Code',
      'Responsive Website',
      'Performance Optimization',
      'UI Design Proficiency (Figma)',
    ],
  },
  {
    type: 'secondary',
    title: 'Industry Standard',
    list: [
      'Basic React Knowledge',
      'Inconsistent Design Translation',
      'Little TypeScript Knowledge',
      'Unstructured Code',
      'Inconsistent Responsiveness',
      'Slow and Heavy Websites',
      'No Design Skills',
    ],
  },
];
