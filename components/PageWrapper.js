'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import PageLoader from './PageLoader';

export default function PageWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  const handleComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Show loader on every route change (not just first load)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return; // first load is already showing the loader
    }
    // Route changed — show loader again
    setLoading(true);
  }, [pathname]);

  return (
    <>
      {loading && <PageLoader key={pathname} onComplete={handleComplete} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  );
}
