import { useEffect } from 'react';

export function useInfiniteScroll({ isFetching, hasMore, onLoadMore }) {
  useEffect(() => {
    const handleScroll = () => {
      const hasReachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300;

      if (hasReachedBottom && !isFetching && hasMore) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, hasMore, onLoadMore]);
}
