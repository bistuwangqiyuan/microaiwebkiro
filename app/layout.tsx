import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import SalesEventTracker from '@/components/sales/SalesEventTracker';
import { BASE_URL, ORGANIZATION_JSONLD, WEBSITE_JSONLD } from '@/lib/seo';
import '../styles/globals.css';

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | 微算科技 WeCalc',
    default: '微算科技 WeCalc — 数据不出域的微型算力中心',
  },
  description:
    '微算科技提供数据不出域的微型算力中心解决方案。基于自主知识产权的存算分离架构与EBOF全闪存储技术，为企业构建安全、高效、可扩展的本地AI算力平台。融资租赁2,000元/月起。',
  keywords: [
    '微算科技',
    'WeCalc',
    '微型算力中心',
    '数据不出域',
    'AI算力',
    '存算分离架构',
    'EBOF全闪存储',
    '边缘计算',
    '本地化算力',
    '算力中心解决方案',
    'NVMe-oF',
    'RoCEv2',
    'GPU算力',
    '国产化算力',
    '华为昇腾',
    '华为鲲鹏',
    '融资租赁算力',
    '企业AI部署',
  ],
  authors: [{ name: 'WeCalc Technology', url: BASE_URL }],
  creator: '微算科技 WeCalc Technology',
  publisher: '微算科技 WeCalc Technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '微算科技 WeCalc',
    title: '微算科技 WeCalc — 数据不出域的微型算力中心',
    description:
      '微算科技提供数据不出域的微型算力中心解决方案，基于存算分离架构与EBOF全闪存储技术，为企业构建安全、高效、可扩展的本地AI算力平台。',
    url: BASE_URL,
    images: [
      {
        url: '/image/微算产品架构图40829.png',
        width: 1200,
        height: 630,
        alt: '微算科技 WeCalc — 数据不出域的微型算力中心',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '微算科技 WeCalc — 数据不出域的微型算力中心',
    description:
      '基于存算分离架构与EBOF全闪存储技术，为企业构建安全、高效、可扩展的本地AI算力平台。',
    images: ['/image/微算产品架构图40829.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'zh-CN': BASE_URL,
    },
  },
  category: 'technology',
  other: {
    'baidu-site-verification': 'codeva-placeholder',
    'applicable-device': 'pc,mobile',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSONLD) }}
        />
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
        <SalesEventTracker />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}
