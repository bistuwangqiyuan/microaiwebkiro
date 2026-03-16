import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'News — WeCalc Latest Updates & Industry Insights',
  description:
    'Stay up to date with WeCalc Technology — company news, industry insights, and technical deep dives. Learn about our latest developments in on-premises AI compute, including the Huawei Developer Conference, CCTV feature, and industry innovation awards.',
  alternates: { canonical: `${BASE_URL}/en/news` },
  openGraph: {
    title: 'News | WeCalc',
    description: 'WeCalc latest updates and industry insights',
    url: `${BASE_URL}/en/news`,
  },
};

const newsData = [
  {
    id: '1',
    title: 'WeCalc Team Presents Technical Report at Huawei Developer Conference',
    summary: 'The WeCalc core team was invited to the Huawei Developer Conference to showcase the latest advances in disaggregated storage-compute architecture and EBOF all-flash storage technology, drawing significant industry attention.',
    date: '2026-02-15',
    category: 'Company News',
    categoryKey: 'company',
    image: '/image/华为开发者大会作报告.png',
  },
  {
    id: '2',
    title: 'WeCalc Business Partnership Program Officially Launches',
    summary: 'WeCalc Technology announces the launch of its Business Partnership Program, providing partners with 100 free WeCalc units through a zero-franchise-fee model to drive nationwide AI compute accessibility.',
    date: '2026-02-01',
    category: 'Company News',
    categoryKey: 'company',
    image: '/image/团队动态1.png',
  },
  {
    id: '3',
    title: 'CCTV Features WeCalc Technology Innovation',
    summary: 'China Central Television produced a feature report on WeCalc Technology, spotlighting the innovative concept and technical breakthroughs of on-premises micro compute centers with data sovereignty.',
    date: '2026-01-25',
    category: 'Company News',
    categoryKey: 'company',
    image: '/image/中央电视台报道.png',
  },
  {
    id: '4',
    title: 'WeCalc-B Pilot Program and Financing Lease Option Released',
    summary: 'WeCalc Technology releases the WeCalc-B Basic pilot program and financing lease option. Enterprises can rapidly access 1P of local AI compute through pilot deployment or a RMB 2,000/month lease.',
    date: '2026-01-20',
    category: 'Company News',
    categoryKey: 'company',
    image: '/image/微算产品图10.png',
  },
  {
    id: '5',
    title: 'Global Micro Data Center Market Set for Explosive Growth in 2026',
    summary: 'According to Research Nester, the global micro data center market is projected to reach USD 185B by 2037, growing at 28.8% CAGR. Edge computing and data localization are the primary drivers.',
    date: '2026-01-15',
    category: 'Industry Insights',
    categoryKey: 'industry',
    image: '/image/算力中心图2.png',
  },
  {
    id: '6',
    title: 'WeCalc Technology Wins Industry Innovation Award',
    summary: 'WeCalc Technology earns a prestigious industry innovation award for its proprietary disaggregated storage-compute technology and EBOF all-flash storage, gaining wide recognition for its technical capabilities.',
    date: '2026-01-10',
    category: 'Company News',
    categoryKey: 'company',
    image: '/image/获奖图片19.png',
  },
  {
    id: '7',
    title: 'WeCalc EBOF All-Flash Storage Passes Huawei Benchmark Test',
    summary: 'In a same-cost benchmark test against RMB 1.2M Huawei equipment, WeCalc EBOF all-flash storage excelled: 72% faster data loading, 64% higher throughput, and 30%+ savings on 3-year total cost.',
    date: '2025-12-20',
    category: 'Technology',
    categoryKey: 'tech',
    image: '/image/微算产品图18.png',
  },
  {
    id: '8',
    title: 'WeCalc Successfully Deployed at BISTU',
    summary: 'WeCalc completed deployment at Beijing Information Science & Technology University in 72 hours, supporting 100+ concurrent teaching sessions, achieving 85% resource utilization, and boosting student award rates by 30%.',
    date: '2025-12-01',
    category: 'Company News',
    categoryKey: 'company',
    image: '/image/团队动态2.png',
  },
  {
    id: '9',
    title: 'Associate Professor Meng Kun Presents on Cutting-Edge Storage Technology',
    summary: 'WeCalc project lead Associate Professor Meng Kun presented a frontier report on storage system technology at an academic forum, sharing innovative applications of the NVMe-oF protocol in disaggregated storage-compute architecture.',
    date: '2025-11-20',
    category: 'Technology',
    categoryKey: 'tech',
    image: '/image/华为开发者大会讲座19.jpg',
  },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'company', label: 'Company News' },
  { key: 'industry', label: 'Industry Insights' },
  { key: 'tech', label: 'Technology' },
];

export default function NewsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">NEWS</p>
          <h1 className="section-title text-gray-900 mb-4">News & Insights</h1>
          <p className="section-subtitle">
            Stay current with WeCalc&apos;s latest developments and industry trends
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="flex flex-wrap items-center gap-2 mb-12">
            {categories.map((cat) => (
              <span
                key={cat.key}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors
                  ${cat.key === 'all'
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {cat.label}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <article
                key={news.id}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-400">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-3">{news.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
