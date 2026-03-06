import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '解决方案',
  description: '微算科技行业解决方案：覆盖金融、医疗、教育、制造、政务等行业，提供数据不出域的本地化AI算力支持。',
};

const solutions = [
  {
    industry: '金融行业',
    icon: '🏦',
    description: '满足金融数据本地化存储合规要求，支持风控模型实时推理、反欺诈检测、智能投顾等AI应用。',
    benefits: ['数据不出域，满足监管合规', '毫秒级风控推理响应', '敏感数据零泄露风险', '降低40%算力基础设施成本'],
    cases: '银行、证券、保险等金融机构',
  },
  {
    industry: '医疗健康',
    icon: '🏥',
    description: '医疗影像AI辅助诊断、病理分析、药物研发等场景，患者数据全程本地化处理。',
    benefits: ['患者隐私数据不出院', 'CT/MRI影像AI辅助诊断', '药物分子模拟计算', '远程诊疗边缘算力'],
    cases: '三甲医院、医学影像中心、制药企业',
  },
  {
    industry: '教育科研',
    icon: '🎓',
    description: '高校AI教学实训平台、科研计算平台，支持百人并发使用，开箱即用快速部署。',
    benefits: ['百人并发教学实训', '48小时快速部署', '学生获奖率提升30%', '85%资源利用率'],
    cases: '北京信息科技大学等高校',
  },
  {
    industry: '智能制造',
    icon: '🏭',
    description: '工业质检、预测性维护、数字孪生等场景，边缘侧实时推理确保生产线不中断。',
    benefits: ['产线边缘实时推理', '毫秒级质检响应', '预测性维护降低停机', '生产数据不出工厂'],
    cases: '汽车制造、电子制造、精密加工',
  },
  {
    industry: '政务服务',
    icon: '🏛️',
    description: '政务数据本地化处理，智慧城市边缘计算，满足政府数据安全等级保护要求。',
    benefits: ['满足等保三级要求', '政务数据不出政务云', '智慧城市边缘节点', '多部门数据安全共享'],
    cases: '各级政府机关、智慧城市项目',
  },
  {
    industry: '自动驾驶',
    icon: '🚗',
    description: '自动驾驶模型训练、路测数据处理、V2X边缘计算，大规模数据的本地化高速处理。',
    benefits: ['路测数据本地快速处理', '大规模模型训练支持', 'V2X低延迟边缘计算', '数据主权合规保障'],
    cases: '自动驾驶企业、车企研发中心',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container text-center">
          <p className="text-sm font-semibold text-brand-600 tracking-widest uppercase mb-3">SOLUTIONS</p>
          <h1 className="section-title text-gray-900 mb-4">行业解决方案</h1>
          <p className="section-subtitle">
            微算为各行业提供数据不出域的本地化AI算力支持
            <br className="hidden sm:block" />
            精准匹配不同场景的算力需求
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution) => (
              <div
                key={solution.industry}
                className="group rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                <div className="text-4xl mb-5">{solution.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.industry}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{solution.description}</p>

                <ul className="space-y-2.5 mb-6">
                  {solution.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400">典型客户</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{solution.cases}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-950 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">定制您的行业解决方案</h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            每个行业都有独特的算力需求，我们的解决方案团队将为您量身定制
          </p>
          <Link href="/contact" className="btn-primary text-base px-10 py-4">获取方案咨询</Link>
        </div>
      </section>
    </>
  );
}
