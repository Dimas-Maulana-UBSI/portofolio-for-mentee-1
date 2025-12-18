import React from 'react';
import { Collection } from '@/components/Collection';
import { testimonials } from '@/constants/testimonials';
import { TestimonialsItem } from './TestimonialsItem';

export const Testimonials: React.FC = () => {
  return (
    <div>
      <Collection>
        {testimonials.map((testimonial, index) => (
          <Collection.Item key={index}>
            <TestimonialsItem {...testimonial} />
          </Collection.Item>
        ))}
      </Collection>
    </div>
  );
};
