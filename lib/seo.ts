import type { ProductCatalogItem } from './product-catalog';

export const BASE_URL = 'https://main--microaiwebkiro.netlify.app';

export const ORGANIZATION_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '微算科技',
  alternateName: 'WeCalc Technology',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  description:
    '微算科技提供数据不出域的微型算力中心解决方案。基于自主知识产权的存算分离架构与EBOF全闪存储技术，为企业构建安全、高效、可扩展的本地AI算力平台。',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '北京市',
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
    '微型算力中心',
    '存算分离架构',
    'EBOF全闪存储',
    '边缘计算',
    'AI算力',
    '数据不出域',
    'NVMe-oF',
    'RoCEv2',
  ],
};

export const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '微算科技 WeCalc',
  alternateName: 'WeCalc Technology',
  url: BASE_URL,
  description:
    '微算科技官方网站 - 数据不出域的微型算力中心解决方案',
  publisher: {
    '@type': 'Organization',
    name: '微算科技',
  },
  inLanguage: 'zh-CN',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/products?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export function generateProductJsonLd(product: ProductCatalogItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.fullName,
    description: product.longDescription,
    brand: {
      '@type': 'Brand',
      name: '微算科技 WeCalc',
    },
    manufacturer: {
      '@type': 'Organization',
      name: '微算科技',
    },
    category: '微型算力中心',
    image: `${BASE_URL}${product.image}`,
    url: `${BASE_URL}${product.href}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CNY',
      price: product.id === 'basic' ? '98000' : undefined,
      priceSpecification: product.id !== 'basic'
        ? { '@type': 'PriceSpecification', description: product.price }
        : undefined,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: '微算科技',
      },
    },
    additionalProperty: product.specs.map((spec) => ({
      '@type': 'PropertyValue',
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQJsonLd(
  faqs: { question: string; answer: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export const HOME_FAQS = [
  {
    question: '什么是微型算力中心？',
    answer:
      '微型算力中心是微算科技推出的软硬件一体化本地AI算力解决方案，集计算、存储、管控功能于一体。数据全部存放在用户自有设备中，无需上传云端，从根本上保障数据主权和安全。',
  },
  {
    question: '微算科技的存算分离架构有什么优势？',
    answer:
      '微算科技的存算分离架构基于NVMe-oF协议实现计算与存储物理彻底解耦，通过RoCEv2高速互联消除TCP/IP拥塞瓶颈，交互延迟≤100μs，集群带宽≥100Gbps。相比传统方案，数据加载时间降低72%，吞吐量提升64%。',
  },
  {
    question: '微算产品有哪些版本？',
    answer:
      '微算提供三个版本：微算-B 基础版（9.8万元起，1P算力入门），微算-P 专业版（200-500万元，12 PFLOPS生产级主力机型），微算-E 企业版（500万元以上，50+ PFLOPS旗舰级定制方案）。支持融资租赁模式，最低2,000元/月即可启动。',
  },
  {
    question: '数据不出域是什么意思？',
    answer:
      '数据不出域指系统部署在客户单位内部，所有数据全部存放在自有设备中，无需上传至公有云或第三方服务器。这从根本上保障了数据主权，实现零泄露风险、合规无忧。',
  },
  {
    question: '微算产品的部署周期是多久？',
    answer:
      '微算产品出厂即完成软硬件集成，提供交钥匙交付服务。基础版和专业版典型部署周期为48-72小时，企业版根据规模和行业场景定制交付周期。',
  },
  {
    question: '微算科技支持哪些硬件平台？',
    answer:
      '微算已获华为昇腾与鲲鹏双认证，并适配国内90%以上GPU。支持CPU、GPU、SSD等多类型硬件灵活搭载，兼容英伟达、寒武纪等主流算力平台。',
  },
];
