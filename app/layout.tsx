import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | 微算科技 WeCalc',
    default: '微算科技 WeCalc — 数据不出域的微型算力中心',
  },
  description:
    '微算科技提供数据不出域的微型算力中心解决方案。基于自主知识产权的存算分离架构与EBOF全闪存储技术，为企业构建安全、高效、可扩展的本地AI算力平台。',
  keywords: [
    '微算',
    'WeCalc',
    '算力中心',
    '数据不出域',
    'AI算力',
    '存算分离',
    'EBOF',
    '边缘计算',
    '微型算力中心',
    '本地化算力',
  ],
  authors: [{ name: 'WeCalc Technology' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '微算科技 WeCalc',
    title: '微算科技 WeCalc — 数据不出域的微型算力中心',
    description:
      '微算科技提供数据不出域的微型算力中心解决方案，为企业构建安全、高效、可扩展的本地AI算力平台。',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] 
                     focus:px-4 focus:py-2 focus:bg-brand-600 focus:text-white focus:rounded-lg"
        >
          跳到主要内容
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
