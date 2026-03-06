import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | WeCalc',
    default: 'WeCalc - 微算科技 | 数据不出域的微型算力中心'
  },
  description: '微算科技提供数据不出域的微型算力中心解决方案，包括基础版、专业版、企业版三种产品，采用存算分离架构和EBOF全闪存储技术。',
  keywords: ['微算', 'WeCalc', '算力中心', '数据本地化', 'AI算力', '存算分离', 'EBOF'],
  authors: [{ name: 'WeCalc Technology' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    siteName: 'WeCalc Official Website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
