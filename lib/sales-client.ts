'use client';

import { SALES_ENDPOINTS } from '@/lib/sales';

const VISITOR_ID_KEY = 'wecalc-visitor-id';

export function getVisitorId() {
  if (typeof window === 'undefined') {
    return 'server-render';
  }

  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) {
    return existing;
  }

  const nextId = `visitor-${crypto.randomUUID()}`;
  window.localStorage.setItem(VISITOR_ID_KEY, nextId);
  return nextId;
}

export function getUtmParams() {
  if (typeof window === 'undefined') {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
  };
}

export async function trackSalesEvent(params: {
  path: string;
  eventName: string;
  eventPayload?: Record<string, unknown>;
}) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    await fetch(SALES_ENDPOINTS.events, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        visitorId: getVisitorId(),
        path: params.path,
        eventName: params.eventName,
        eventPayload: params.eventPayload ?? {},
      }),
    });
  } catch {
    // Ignore analytics delivery failures to avoid breaking user flows.
  }
}
