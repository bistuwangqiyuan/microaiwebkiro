import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '隐私政策',
  description:
    '微算科技(WeCalc Technology)隐私政策。了解我们如何收集、使用和保护您的个人信息，符合GDPR及《个人信息保护法》等国际数据保护标准。',
  alternates: { canonical: `${BASE_URL}/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: '隐私政策 | 微算科技 WeCalc',
    description:
      '微算科技隐私政策。了解我们如何收集、使用和保护您的个人信息。',
    url: `${BASE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">隐私政策</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed text-sm">
          <p className="text-gray-400 text-xs">
            生效日期：2026年3月 · 最后更新日期：2026年3月
          </p>

          {/* 1. 引言与公司信息 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              1. 引言与公司信息
            </h2>
            <p>
              微算科技（以下简称&ldquo;微算&rdquo;、&ldquo;我们&rdquo;或&ldquo;我们的&rdquo;）是一家总部位于中国北京的科技公司，专注于微型算力中心及边缘计算解决方案。我们致力于保护您的隐私，并以公开透明的方式处理您的个人信息。
            </p>
            <p>
              本隐私政策说明当您访问我们的网站{' '}
              <a href={BASE_URL} className="text-brand-600 underline">
                {BASE_URL}
              </a>
              （以下简称&ldquo;本网站&rdquo;）、使用我们的产品和服务或以其他方式与我们互动时，我们如何收集、使用、披露和保护您的信息。请仔细阅读本政策。如果您不同意本隐私政策的条款，请勿访问本网站。
            </p>
            <p>
              根据《中华人民共和国个人信息保护法》（PIPL）及欧盟《通用数据保护条例》（GDPR），微算科技为个人信息处理者（数据控制者）。如有数据保护相关问题，请通过{' '}
              <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                13426086861@139.com
              </a>{' '}
              与我们联系。
            </p>
          </section>

          {/* 2. 我们收集的信息 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              2. 我们收集的信息
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.1 您主动提供的个人信息
            </h3>
            <p>我们可能收集您自愿提供的个人信息，包括：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>姓名、电子邮件地址、电话号码和公司名称</li>
              <li>职务和办公地址</li>
              <li>通过联系表单、合伙人申请或服务咨询提交的信息</li>
              <li>通信偏好和通讯记录</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.2 使用数据
            </h3>
            <p>当您访问本网站时，我们会自动收集以下信息：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>访问页面、页面停留时间和导航路径</li>
              <li>来源URL和退出页面</li>
              <li>点击数据和交互模式</li>
              <li>访问日期和时间</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.3 设备信息
            </h3>
            <p>我们可能收集您访问本网站时使用的设备信息：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>IP地址和大致地理位置</li>
              <li>浏览器类型和版本</li>
              <li>操作系统和平台</li>
              <li>屏幕分辨率和设备标识符</li>
              <li>语言和时区设置</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.4 Cookie和跟踪技术
            </h3>
            <p>
              我们使用Cookie、网络信标和类似跟踪技术来收集和存储信息。详细信息请参见第9条（Cookie政策）。
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              2.5 第三方数据
            </h3>
            <p>
              我们可能从第三方来源（包括商业合作伙伴、分析服务提供商和公开数据库）获取您的信息，以补充我们直接收集的信息。
            </p>
          </section>

          {/* 3. 信息使用方式 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              3. 信息使用方式
            </h2>
            <p>我们将收集的信息用于以下目的：</p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.1 服务交付
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>响应您的咨询和服务请求</li>
              <li>处理合伙人申请</li>
              <li>提供产品信息和技术支持</li>
              <li>协助融资租赁安排</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.2 沟通
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>发送管理信息、更新和安全警报</li>
              <li>回复评论、问题和请求</li>
              <li>提供客户支持</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.3 分析与改进
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>分析使用模式以改善网站和服务</li>
              <li>监控和分析趋势、流量和用户参与度</li>
              <li>开发新产品、服务和功能</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.4 法律合规
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>遵守适用的法律、法规和法律程序</li>
              <li>执行我们的条款和条件</li>
              <li>保护我们的权利、隐私、安全或财产</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              3.5 营销
            </h3>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>经您事先同意后发送推广材料</li>
              <li>个性化内容和广告</li>
              <li>衡量营销活动的效果</li>
            </ul>
            <p className="mt-3">
              您可以随时通过{' '}
              <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                13426086861@139.com
              </a>{' '}
              联系我们选择退出营销通讯。
            </p>
          </section>

          {/* 4. 处理的法律依据 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              4. 处理的法律依据
            </h2>
            <p>
              根据《中华人民共和国个人信息保护法》（PIPL）以及欧盟《通用数据保护条例》（GDPR），我们基于以下法律依据处理您的个人数据：
            </p>
            <ul className="list-disc pl-5 space-y-3 mt-3">
              <li>
                <strong>同意（GDPR第6(1)(a)条 / PIPL第13条）：</strong>您已就特定目的明确同意我们处理您的个人数据，例如订阅营销通讯。
              </li>
              <li>
                <strong>合同履行（GDPR第6(1)(b)条 / PIPL第13条）：</strong>处理是履行您作为当事方的合同所必需的，或是应您的请求在签订合同前采取措施所必需的。
              </li>
              <li>
                <strong>合法利益（GDPR第6(1)(f)条）：</strong>处理是我们或第三方的合法利益所必需的，前提是该利益不被您的权利所覆盖。我们的合法利益包括改善服务、防范欺诈和网络安全。
              </li>
              <li>
                <strong>法律义务（GDPR第6(1)(c)条 / PIPL第13条）：</strong>处理是履行我们所承担的法律义务所必需的。
              </li>
            </ul>
          </section>

          {/* 5. 信息共享与披露 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              5. 信息共享与披露
            </h2>
            <p>
              我们不会出售、出租或交易您的个人信息。我们可能在以下情况下共享您的信息：
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.1 服务提供商
            </h3>
            <p>
              我们可能与受信任的第三方服务提供商共享您的信息，这些服务提供商代表我们提供服务，包括主机托管、分析、电子邮件发送和客户支持。这些提供商受合同约束，仅按我们的指示使用您的数据，并遵守本隐私政策。
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.2 法律要求
            </h3>
            <p>
              如法律要求或我们善意认为有必要遵守法律义务、保护和捍卫我们的权利或财产、防范欺诈，或保护用户或公众的人身安全，我们可能会披露您的信息。
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.3 业务转让
            </h3>
            <p>
              在合并、收购、重组或资产出售的情况下，您的个人信息可能作为该交易的一部分被转移。我们将通知您有关个人信息所有权或控制权的任何变化。
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.4 经您同意
            </h3>
            <p>
              我们可能在向您披露目的后，经您明确同意，为任何其他目的共享您的个人信息。
            </p>
          </section>

          {/* 6. 国际数据传输 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              6. 国际数据传输
            </h2>
            <p>
              微算科技总部位于中国北京。如果您从中国境外访问本网站，请注意您的信息可能会被传输至中国境内的服务器并在中国境内存储和处理。
            </p>
            <p>
              根据《个人信息保护法》第三十八条至第四十三条，向中华人民共和国境外提供个人信息的，我们将采取以下保障措施：
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>通过国家网信部门组织的安全评估</li>
              <li>按照国家网信部门的规定经专业机构进行个人信息保护认证</li>
              <li>与境外接收方订立标准合同</li>
              <li>取得您的单独同意</li>
              <li>实施补充性技术和组织措施</li>
            </ul>
          </section>

          {/* 7. 数据保留 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              7. 数据保留
            </h2>
            <p>
              我们仅在实现收集目的所需的期限内保留您的个人信息，包括满足任何法律、会计或报告要求。
            </p>
            <p>我们确定保留期限所使用的标准包括：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>我们与您持续关系的存续期间</li>
              <li>我们是否承担相关法律义务</li>
              <li>鉴于我们的法律地位（如适用的诉讼时效、诉讼或监管调查），保留是否合理</li>
              <li>数据的性质和敏感程度</li>
            </ul>
            <p>
              联系表单提交和咨询记录通常保留三（3）年。分析数据可能以匿名或汇总形式无限期保留。
            </p>
          </section>

          {/* 8. 您的权利 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              8. 您的权利
            </h2>
            <p>
              根据《个人信息保护法》及适用的数据保护法律，您享有以下权利：
            </p>
            <ul className="list-disc pl-5 space-y-3 mt-3">
              <li>
                <strong>知情权与访问权：</strong>您有权了解并获取我们持有的您的个人数据副本。
              </li>
              <li>
                <strong>更正权：</strong>您有权要求更正任何不准确或不完整的个人数据。
              </li>
              <li>
                <strong>删除权：</strong>在符合法律规定条件下，您有权要求删除您的个人数据。
              </li>
              <li>
                <strong>限制处理权：</strong>在特定条件下，您有权要求我们限制对您个人数据的处理。
              </li>
              <li>
                <strong>数据可携带权：</strong>您有权以结构化、通用且机器可读的格式接收您的个人数据，并将其传输给其他处理者。
              </li>
              <li>
                <strong>异议权：</strong>您有权反对我们处理您的个人数据，包括用于直接营销目的的处理。
              </li>
              <li>
                <strong>自动化决策相关权利：</strong>您有权不受仅基于自动化处理（包括用户画像）做出的、对您产生法律效力的决定的约束。我们目前不进行自动化决策。
              </li>
              <li>
                <strong>撤回同意权：</strong>当处理基于您的同意时，您有权随时撤回您的同意，且不影响撤回前基于同意的处理的合法性。
              </li>
            </ul>
            <p className="mt-3">
              如需行使上述任何权利，请通过{' '}
              <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                13426086861@139.com
              </a>{' '}
              联系我们。我们将在三十（30）日内回复您的请求。您还有权向相关数据保护监管机构投诉。
            </p>
          </section>

          {/* 9. Cookie政策 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              9. Cookie政策
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              9.1 我们使用的Cookie类型
            </h3>
            <ul className="list-disc pl-5 space-y-3 mt-3">
              <li>
                <strong>严格必要Cookie：</strong>对本网站运行必不可少的Cookie。这些Cookie支持页面导航和安全区域访问等核心功能。
              </li>
              <li>
                <strong>性能与分析Cookie：</strong>帮助我们了解访客如何与本网站互动，通过匿名收集和报告信息。我们可能使用Google Analytics等工具。
              </li>
              <li>
                <strong>功能Cookie：</strong>允许本网站记住您的选择（如语言或地区），提供增强的个性化功能。
              </li>
              <li>
                <strong>营销Cookie：</strong>用于跨网站追踪访客以展示相关广告。这些Cookie可能由第三方广告合作伙伴设置。
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              9.2 管理Cookie
            </h3>
            <p>
              大多数网络浏览器允许您通过其设置控制Cookie。您可以设置浏览器拒绝Cookie、删除现有Cookie或在发送Cookie时发出警告。请注意，禁用Cookie可能影响本网站的功能。
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              9.3 第三方Cookie
            </h3>
            <p>
              本网站上的某些Cookie由出现在我们页面上的第三方服务设置。我们无法控制这些Cookie的使用，建议您参阅相关第三方的隐私政策了解更多信息。
            </p>
          </section>

          {/* 10. 儿童隐私保护 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              10. 儿童隐私保护
            </h2>
            <p>
              本网站及服务不面向十六（16）周岁以下的个人。我们不会故意收集16周岁以下儿童的个人信息。根据《个人信息保护法》第二十八条，未满十四周岁未成年人的个人信息属于敏感个人信息。如果我们发现无意中收集了16周岁以下儿童的个人数据，我们将采取合理措施及时删除该等信息。如果您认为我们收集了16周岁以下儿童的信息，请立即通过{' '}
              <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                13426086861@139.com
              </a>{' '}
              联系我们。
            </p>
          </section>

          {/* 11. 安全措施 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              11. 安全措施
            </h2>
            <p>
              我们采取适当的技术和组织安全措施，保护您的个人信息免遭未经授权的访问、篡改、披露或销毁。这些措施包括：
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>所有传输至本网站和从本网站传输的数据均采用HTTPS/TLS加密</li>
              <li>在技术可行的情况下对静态个人数据进行加密</li>
              <li>对处理个人数据的人员实施严格的访问控制和基于角色的权限管理</li>
              <li>定期进行安全审计和漏洞评估</li>
              <li>事件响应程序和数据泄露通知协议</li>
              <li>对员工进行数据保护和安全实践培训</li>
            </ul>
            <p>
              尽管我们努力使用商业上合理的方式保护您的个人数据，但互联网传输或电子存储方式无法保证100%的安全性。我们无法保证其绝对安全。
            </p>
          </section>

          {/* 12. 政策变更 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              12. 政策变更
            </h2>
            <p>
              我们可能不时更新本隐私政策，以反映我们的实践、技术、法律要求或其他因素的变化。当我们做出重大变更时，我们将：
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>在本页面发布更新后的政策并修改&ldquo;最后更新日期&rdquo;</li>
              <li>在本网站上提供显著通知（如横幅通知）</li>
              <li>在法律要求时，就变更获取您的同意</li>
            </ul>
            <p>
              我们建议您定期查看本隐私政策，以了解我们如何保护您的信息。
            </p>
          </section>

          {/* 13. 联系方式 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              13. 联系方式
            </h2>
            <p>
              如果您对本隐私政策或我们的数据保护实践有任何疑问、意见或请求，请联系我们的个人信息保护负责人：
            </p>
            <ul className="list-none pl-0 space-y-2 mt-3">
              <li><strong>公司：</strong>微算科技 WeCalc Technology</li>
              <li><strong>地址：</strong>中国北京</li>
              <li>
                <strong>邮箱：</strong>{' '}
                <a href="mailto:13426086861@139.com" className="text-brand-600 underline">
                  13426086861@139.com
                </a>
              </li>
              <li><strong>电话：</strong>+86-134-2608-6861</li>
            </ul>
            <p className="mt-3">
              我们承诺在三十（30）日内回复所有合法请求。如果您的请求特别复杂或您提出了多个请求，处理时间可能更长，但我们会及时通知您并告知进展。
            </p>
          </section>

          <div className="border-t border-gray-200 pt-6 mt-10">
            <p className="text-gray-400 text-xs">
              本隐私政策亦提供{' '}
              <Link href="/en/privacy" className="text-brand-600 underline">
                英文版（English）
              </Link>。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
