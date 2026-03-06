import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新闻资讯',
  description: '微算科技最新动态、行业资讯和技术分享。了解微算在数据不出域算力领域的最新进展。',
};

const newsData = [
  {
    id: '1',
    title: '微算团队亮相华为开发者大会并作技术报告',
    summary: '微算科技核心团队受邀参加华为开发者大会，展示存算分离架构与EBOF全闪存储技术的最新成果，获得业界高度关注。',
    date: '2026-02-15',
    category: '公司动态',
    categoryKey: 'company',
    image: '/image/华为开发者大会作报告.png',
  },
  {
    id: '2',
    title: '共享微算事业合伙人计划正式启动',
    summary: '微算科技宣布启动共享微算事业合伙人计划，通过零加盟费模式向合伙人免费提供100台微算设备，助力全国AI算力普惠化推广。',
    date: '2026-02-01',
    category: '公司动态',
    categoryKey: 'company',
    image: '/image/团队动态1.png',
  },
  {
    id: '3',
    title: '中央电视台专题报道微算科技创新成果',
    summary: '央视对微算科技进行专题报道，聚焦数据不出域的微型算力中心创新理念与技术突破，引发社会广泛关注。',
    date: '2026-01-25',
    category: '媒体报道',
    categoryKey: 'company',
    image: '/image/中央电视台报道.png',
  },
  {
    id: '4',
    title: '微算基础版试点与融资租赁方案发布',
    summary: '微算科技发布微算-B基础版试点与融资租赁方案，企业可通过试点部署或 2,000 元/月融资租赁方式快速获得 1P 本地 AI 算力。',
    date: '2026-01-20',
    category: '公司动态',
    categoryKey: 'company',
    image: '/image/微算产品图10.png',
  },
  {
    id: '5',
    title: '2026年全球微型数据中心市场迎来爆发式增长',
    summary: '据Research Nester最新报告，全球微型数据中心市场规模预计2037年将达1,850亿美元，年复合增长率28.8%。边缘计算和数据本地化需求是主要驱动力。',
    date: '2026-01-15',
    category: '行业资讯',
    categoryKey: 'industry',
    image: '/image/算力中心图2.png',
  },
  {
    id: '6',
    title: '微算科技荣获行业创新大奖',
    summary: '微算科技凭借自主知识产权的存算分离技术和EBOF全闪存储技术，荣获行业权威创新奖项，技术实力获得业界认可。',
    date: '2026-01-10',
    category: '公司动态',
    categoryKey: 'company',
    image: '/image/获奖图片19.png',
  },
  {
    id: '7',
    title: '微算EBOF全闪存储技术通过华为对标测试',
    summary: '在华为120万元同成本对标测试中，微算EBOF全闪存储技术表现优异：数据加载时间降低72%，吞吐量提升64%，三年总成本节省超30%。',
    date: '2025-12-20',
    category: '技术分享',
    categoryKey: 'tech',
    image: '/image/微算产品图18.png',
  },
  {
    id: '8',
    title: '微算在北京信息科技大学成功部署',
    summary: '微算在北京信息科技大学72小时完成部署，支持百人并发教学实训，资源利用率达85%，学生获奖率提升30%。',
    date: '2025-12-01',
    category: '公司动态',
    categoryKey: 'company',
    image: '/image/团队动态2.png',
  },
  {
    id: '9',
    title: '孟坤副教授在学术论坛发表存储技术前沿报告',
    summary: '微算科技项目负责人孟坤副教授在学术论坛上发表存储系统前沿技术报告，分享NVMe-oF协议在存算分离中的创新应用。',
    date: '2025-11-20',
    category: '技术分享',
    categoryKey: 'tech',
    image: '/image/华为开发者大会讲座19.jpg',
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
