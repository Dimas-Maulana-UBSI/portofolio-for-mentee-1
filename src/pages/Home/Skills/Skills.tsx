import React, {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SkillsItem } from './SkillsItem';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  Variants,
} from 'framer-motion';
import { useMedia } from 'react-use';
import clsx from 'clsx';
import { SkillsNavigation } from './SkillsNavigation';
import styles from './Skills.module.scss';
import { getFontSize } from '@/utils/style/getFontSize';

const skillsVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.2 },
  },
  outOfView: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

type SkillsProps = {
  children: React.ReactNode;
};

type SubComponents = {
  Item: typeof SkillsItem;
};

export const Skills: React.FC<SkillsProps> & SubComponents = ({ children }) => {
  const isLargeIsh = useMedia('(min-width: 768px)');

  const skillsPages = useMemo(
    () =>
      Children.toArray(children).reduce<React.ReactNode[][]>(
        (acc, item, index) => {
          const modulusTarget = isLargeIsh ? 6 : 3;
          if (index % modulusTarget === 0) {
            acc.push([item]);
          } else {
            acc[acc.length - 1].push(item);
          }
          return acc;
        },
        []
      ),
    [isLargeIsh, children]
  );

  const [page, setPage] = useState(0);

  const numPages = skillsPages.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const pageWidth = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const updatePageWidth = () => {
      const newWidth = container.getBoundingClientRect().width;
      pageWidth.set(newWidth);
    };

    updatePageWidth();

    const resizeObserver = new ResizeObserver(updatePageWidth);

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [pageWidth]);

  const offset = useMotionValue(0);

  const [paginationState, setPaginationState] = useState({
    isFirstPage: true,
    isLastPage: skillsPages.length === 1,
  });

  useMotionValueEvent(offset, 'change', (latest) => {
    const currentPage = Math.round(
      -latest / (pageWidth.get() + getFontSize(24))
    );
    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === numPages - 1;

    setPaginationState({ isFirstPage, isLastPage });
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;

    const currentOffset = offset.get();
    if (!paginationState.isFirstPage) {
      setIsAnimating(true);
      animate(offset, currentOffset + (pageWidth.get() + getFontSize(24)), {
        duration: 0.5,
        onComplete: () => {
          setIsAnimating(false);
          setPage((prev) => prev - 1);
        },
      });
    }
  }, [isAnimating, offset, paginationState.isFirstPage, pageWidth]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;

    const currentOffset = offset.get();
    if (!paginationState.isLastPage) {
      setIsAnimating(true);
      animate(offset, currentOffset - (pageWidth.get() + getFontSize(24)), {
        duration: 0.5,
        onComplete: () => {
          setIsAnimating(false);
          setPage((prev) => prev + 1);
        },
      });
    }
  }, [isAnimating, offset, paginationState.isLastPage, pageWidth]);

  // update the offset when the page width changes
  // so when the page width changes when the browser is resized when the offset is not at 0 (first page), it will adjust the offset to the new page width
  useMotionValueEvent(pageWidth, 'change', () => {
    offset.set(-(pageWidth.get() + getFontSize(24)) * page);
  });

  useEffect(() => {
    if (offset.get() === 0) return;

    // to desktop
    if (isLargeIsh) {
      setPage((prev) => Math.ceil((prev + 1) / 2) - 1);
      return;
    }

    // to mobile
    setPage((prev) => {
      if (Children.count(children) > page * 6 - 3) {
        return (prev + 1) * 2 - 1;
      }
      return (prev + 1) * 2 - 2;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLargeIsh]);

  return (
    <div className={styles.wrapper}>
      <motion.div className={styles.container} ref={containerRef}>
        <motion.div className={styles.skillsPages} style={{ x: offset }}>
          {skillsPages.map((skills, index) => (
            <motion.div
              key={`skills-page-${isLargeIsh}-${index}`}
              className={clsx(styles.skills, isLargeIsh && styles.large)}
              variants={skillsVariants}
              whileInView='inView'
              initial='outOfView'
              viewport={{ once: true, amount: 0.35 }}
              style={{ width: pageWidth }}
            >
              {skills}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <SkillsNavigation
        onLeftClick={handlePrev}
        onRightClick={handleNext}
        leftButtonDisabled={paginationState.isFirstPage}
        rightButtonDisabled={paginationState.isLastPage}
      />
    </div>
  );
};

Skills.Item = SkillsItem;
