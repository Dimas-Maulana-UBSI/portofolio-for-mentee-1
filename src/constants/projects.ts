import todoListImgSrc from '@/assets/png/todo-list.png';
import ecommerceImgSrc from '@/assets/png/e-commerce.png';
import libraryImgSrc from '@/assets/png/library.png';
import socialMediaImgSrc from '@/assets/png/socialmedia.png';

type Project = {
  imageSrc: string;
  title: string;
  description: string;
  labels: string[];
  url: string;
};

export const projects: Project[] = [
  {
    imageSrc: todoListImgSrc,
    title: 'Todolist App',
    description:
      'A simple and efficient task management application to help you organize your daily activities and stay productive.',
    labels: ['React.js', 'Tailwind CSS', 'TypeScript'],
    url: 'https://dimas-todo-list-web.vercel.app/login',
  },
  {
    imageSrc: ecommerceImgSrc,
    title: 'E-commerce Web',
    description:
      'A modern e-commerce platform with a clean UI, featuring product listings, shopping cart, and a seamless checkout experience.',
    labels: ['Next.js', 'Tailwind CSS', 'TypeScript'],
    url: 'https://dimas-e-commerce-web.vercel.app/',
  },
  {
    imageSrc: libraryImgSrc,
    title: 'Library App',
    description:
      'A digital library application where users can browse, search, and manage a collection of books easily.',
    labels: ['React.js', 'Tailwind', 'TypeScript', 'Radix UI'],
    url: 'https://dimas-library-web.vercel.app/',
  },
  {
    imageSrc: socialMediaImgSrc,
    title: 'Social Media App',
    description:
      'A social networking platform that allows users to connect, share updates, and interact with others in real-time.',
    labels: ['React.js', 'TanStack Query', 'TypeScript', 'Tailwind CSS'],
    url: 'https://dimas-social-media-web.vercel.app/',
  },
];
