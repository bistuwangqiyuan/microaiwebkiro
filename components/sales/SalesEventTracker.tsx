'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackSalesEvent } from '@/lib/sales-client';

export default function SalesEventTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    void trackSalesEvent({
      path: pathname,
      eventName: 'page_view',
      eventPayload: {
        title: document.title,
        referrer: document.referrer || undefined,
      },
    });
  }, [pathname]);

  return null;
}
