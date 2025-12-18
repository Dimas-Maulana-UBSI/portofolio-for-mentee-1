import React, {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CollectionItem } from './CollectionItem';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  Variants,
} from 'framer-motion';
import { useMedia } from 'react-use';
import clsx from 'clsx';
import { CollectionNavigation } from './CollectionNavigation';
import styles from './Collection.module.scss';
import { getFontSize } from '@/utils/style/getFontSize';

const collectionVariants: Variants = {
  inView: {
    transition: { staggerChildren: 0.2 },
  },
  outOfView: {
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
};

type CollectionProps = {
  children: React.ReactNode;
  columnGap?: {
    mobile: number;
    desktop: number;
  };
  rowGap?: {
    mobile: number;
    desktop: number;
  };
};

type SubComponents = {
  Item: typeof CollectionItem;
};

export const Collection: React.FC<CollectionProps> & SubComponents = ({
  children,
  columnGap = {
    mobile: 16,
    desktop: 24,
  },
  rowGap = {
    mobile: 16,
    desktop: 24,
  },
}) => {
  const isLargeIsh = useMedia('(min-width: 768px)');

  const collectionStyle = {
    columnGap: isLargeIsh
      ? columnGap.desktop / 16 + 'rem'
      : columnGap.mobile / 16 + 'rem',
    rowGap: isLargeIsh
      ? rowGap.desktop / 16 + 'rem'
      : rowGap.mobile / 16 + 'rem',
  };

  const collectionPages = useMemo(
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

  const numPages = collectionPages.length;
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
    isLastPage: collectionPages.length === 1,
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
        <motion.div className={styles.collectionPages} style={{ x: offset }}>
          {collectionPages.map((Collection, index) => (
            <motion.div
              key={`collection-page-${isLargeIsh}-${index}`}
              className={clsx(styles.collection, isLargeIsh && styles.large)}
              variants={collectionVariants}
              whileInView='inView'
              initial='outOfView'
              viewport={{ once: true, amount: 0.35 }}
              style={{ width: pageWidth, ...{ collectionStyle } }}
            >
              {Collection}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <CollectionNavigation
        onLeftClick={handlePrev}
        onRightClick={handleNext}
        leftButtonDisabled={paginationState.isFirstPage}
        rightButtonDisabled={paginationState.isLastPage}
      />
    </div>
  );
};

Collection.Item = CollectionItem;
