'use client';

import { useEffect } from 'react';

export default function EnLangSetter() {
  useEffect(() => {
    document.documentElement.lang = 'en';
    return () => {
      document.documentElement.lang = 'zh-CN';
    };
  }, []);

  return null;
}
