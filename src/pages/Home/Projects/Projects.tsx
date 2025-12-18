import React from 'react';
import { Collection } from '../../../components/Collection';
import { projects } from '@/constants/projects';
import { ProjectsItem } from './ProjectsItem';

export const Projects: React.FC = () => {
  return (
    <div>
      <Collection>
        {projects.map((project, index) => (
          <Collection.Item key={index}>
            <ProjectsItem {...project} />
          </Collection.Item>
        ))}
      </Collection>
    </div>
  );
};
