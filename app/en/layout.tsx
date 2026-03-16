import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/seo';

const EN_ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'WeCalc Technology',
  alternateName: '微算科技',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  description:
    'WeCalc provides on-premise micro computing center solutions. Built on proprietary disaggregated storage-compute architecture and EBOF all-flash storage technology for secure, efficient, and scalable local AI computing platforms.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Beijing',
    addressCountry: 'CN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86-134-2608-6861',
    email: '13426086861@139.com',
    contactType: 'sales',
    availableLanguage: ['Chinese', 'English'],
  },
  sameAs: [],
  knowsAbout: [
    'Micro Computing Centers',
    'Disaggregated Storage-Compute Architecture',
    'EBOF All-Flash Storage',
    'Edge Computing',
    'AI Computing',
    'On-Premise Data Sovereignty',
    'NVMe-oF',
    'RoCEv2',
  ],
};

const EN_WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'WeCalc Technology',
  alternateName: '微算科技',
  url: `${BASE_URL}/en`,
  description:
    'WeCalc Technology — On-Premise Micro Computing Center Solutions',
  publisher: {
    '@type': 'Organization',
    name: 'WeCalc Technology',
  },
  inLanguage: 'en',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/en/products?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const metadata: Metadata = {
  title: {
    template: '%s | WeCalc Technology',
    default: 'WeCalc Technology — On-Premise Micro Computing Centers',
  },
  description:
    'WeCalc provides on-premise micro computing center solutions. Data never leaves your premises. Built on proprietary disaggregated storage-compute architecture and EBOF all-flash storage technology.',
  keywords: [
    'WeCalc Technology',
    'micro computing center',
    'on-premise computing',
    'data sovereignty',
    'AI computing',
    'disaggregated storage-compute',
    'EBOF all-flash storage',
    'edge computing',
    'local AI platform',
    'NVMe-oF',
    'RoCEv2',
    'GPU computing',
    'Huawei Ascend',
    'Huawei Kunpeng',
    'computing center solutions',
  ],
  authors: [{ name: 'WeCalc Technology', url: BASE_URL }],
  creator: 'WeCalc Technology',
  publisher: 'WeCalc Technology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'WeCalc Technology',
    title: 'WeCalc Technology — On-Premise Micro Computing Centers',
    description:
      'WeCalc provides on-premise micro computing center solutions built on disaggregated storage-compute architecture and EBOF all-flash storage technology for secure, efficient, and scalable local AI computing.',
    url: `${BASE_URL}/en`,
    images: [
      {
        url: '/image/微算产品架构图40829.png',
        width: 1200,
        height: 630,
        alt: 'WeCalc Technology — On-Premise Micro Computing Centers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeCalc Technology — On-Premise Micro Computing Centers',
    description:
      'Built on disaggregated storage-compute architecture and EBOF all-flash storage for secure, efficient, and scalable local AI computing.',
    images: ['/image/微算产品架构图40829.png'],
  },
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      en: `${BASE_URL}/en`,
      'zh-CN': BASE_URL,
    },
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EN_ORGANIZATION_JSONLD),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(EN_WEBSITE_JSONLD),
        }}
      />
      {children}
    </>
  );
}
