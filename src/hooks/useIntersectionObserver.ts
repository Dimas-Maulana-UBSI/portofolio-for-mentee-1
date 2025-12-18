import React, { useState, useEffect } from 'react';

type IntersectionObserverInit = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

export const useIntersectionObserver = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  options: IntersectionObserverInit = {}
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [ref, options]);

  return isInView;
};
