import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '新闻资讯',
  description: '微算科技最新动态、行业资讯和技术分享。了解微算在数据不出域算力领域的最新进展。',
};

const newsData = [
  {
    id: '1',
    title: '微算与华为算力中心完成48小时快速部署验证',
    summary: '微算设备在华为算力中心完成快速部署验证，数据互通效率提升30%，模型加载时间缩短72%，展现了微算产品在大型企业场景中的卓越表现。',
    date: '2026-02-15',
    category: '公司动态',
    categoryKey: 'company',
  },
  {
    id: '2',
    title: '共享微算事业合伙人计划正式启动',
    summary: '微算科技宣布启动共享微算事业合伙人计划，通过零加盟费模式向合伙人免费提供100台微算设备，助力全国AI算力普惠化推广。',
    date: '2026-02-01',
    category: '公司动态',
    categoryKey: 'company',
  },
  {
    id: '3',
    title: '微算基础版试点期免费赠送计划发布',
    summary: '微算科技正式发布基础版免费赠送计划，企业可零成本获得价值百万元的微算-B基础版设备，体验数据不出域的本地AI算力服务。',
    date: '2026-01-20',
    category: '公司动态',
    categoryKey: 'company',
  },
  {
    id: '4',
    title: '2026年全球微型数据中心市场迎来爆发式增长',
    summary: '据Research Nester最新报告，全球微型数据中心市场规模预计2037年将达1,850亿美元，年复合增长率28.8%。边缘计算和数据本地化需求是主要驱动力。',
    date: '2026-01-15',
    category: '行业资讯',
    categoryKey: 'industry',
  },
  {
    id: '5',
    title: '存算分离技术成为算力行业共识性趋势',
    summary: '字节跳动通过NVMe-oF技术管理10万个GPU，实现94%存储利用率、85PB存储汇聚。存算分离正成为下一代算力基础设施的标准架构。',
    date: '2026-01-10',
    category: '行业资讯',
    categoryKey: 'industry',
  },
  {
    id: '6',
    title: '微算EBOF全闪存储技术通过华为对标测试',
    summary: '在华为120万元同成本对标测试中，微算EBOF全闪存储技术表现优异：数据加载时间降低72%，吞吐量提升64%，三年总成本节省超30%。',
    date: '2025-12-20',
    category: '技术分享',
    categoryKey: 'tech',
  },
  {
    id: '7',
    title: '推理算力占比首次超越训练算力',
    summary: '2026年推理算力占比将首次超过训练算力达66%。DeepSeek等高效开源模型的普及大幅降低AI应用门槛，边缘端推理需求爆发式增长。',
    date: '2025-12-15',
    category: '行业资讯',
    categoryKey: 'industry',
  },
  {
    id: '8',
    title: '微算在北京信息科技大学成功部署',
    summary: '微算在北京信息科技大学72小时完成部署，支持百人并发教学实训，资源利用率达85%，学生获奖率提升30%。',
    date: '2025-12-01',
    category: '公司动态',
    categoryKey: 'company',
  },
  {
    id: '9',
    title: 'NVMe-oF协议在存算分离中的技术解析',
    summary: '深入解析NVMe-oF协议如何实现计算与存储的物理解耦，以及RoCEv2高速互联如何消除传统TCP/IP架构的拥塞瓶颈。',
    date: '2025-11-20',
    category: '技术分享',
    categoryKey: 'tech',
  },
];

const categories = [
  { key: 'all', label: '全部' },
  { key: 'company', label: '公司动态' },
  { key: 'industry', label: '行业资讯' },
  { key: 'tech', label: '技术分享' },
];

export default function NewsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">NEWS</p>
          <h1 className="section-title text-gray-900 mb-4">新闻资讯</h1>
          <p className="section-subtitle">
            了解微算科技最新动态和行业前沿资讯
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          {/* Filters */}
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

          {/* News Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <article
                key={news.id}
                className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="h-48 bg-gradient-to-br from-brand-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <span className="text-5xl relative z-10">
                    {news.categoryKey === 'company' ? '🏢' : news.categoryKey === 'industry' ? '📊' : '⚡'}
                  </span>
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
