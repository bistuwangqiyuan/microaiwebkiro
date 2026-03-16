import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '服务条款',
  description:
    '微算科技(WeCalc Technology)服务条款。了解使用微算科技产品和服务的相关条款与条件，包括知识产权、责任限制及争议解决等内容。',
  alternates: { canonical: `${BASE_URL}/terms` },
  robots: { index: true, follow: true },
  openGraph: {
    title: '服务条款 | 微算科技 WeCalc',
    description:
      '微算科技服务条款。了解使用微算科技产品和服务的相关条款与条件。',
    url: `${BASE_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">服务条款</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed text-sm">
          <p className="text-gray-400 text-xs">
            生效日期：2026年3月 · 最后更新日期：2026年3月
          </p>

          {/* 1. 条款接受 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              1. 条款接受
            </h2>
            <p>
              本服务条款（以下简称&ldquo;本条款&rdquo;）构成您（&ldquo;用户&rdquo;或&ldquo;您&rdquo;）与微算科技（以下简称&ldquo;微算&rdquo;、&ldquo;我们&rdquo;或&ldquo;我们的&rdquo;）之间具有法律约束力的协议。微算科技是一家总部位于中国北京的科技公司。
            </p>
            <p>
              访问或使用本网站{' '}
              <a href={BASE_URL} className="text-brand-600 underline">
                {BASE_URL}
              </a>
              （以下简称&ldquo;本网站&rdquo;）、购买我们的产品或使用我们的服务，即表示您确认已阅读、理解并同意受本条款及我们的{' '}
              <Link href="/privacy" className="text-brand-600 underline">
                隐私政策
              </Link>
              的约束，隐私政策在此并入本条款供参考。如果您不同意本条款，请勿访问或使用本网站或我们的服务。
            </p>
          </section>

          {/* 2. 服务说明 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              2. 服务说明
            </h2>
            <p>微算科技提供以下产品和服务：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>微型算力中心产品：</strong>软硬件一体化解决方案，包括微算-B基础版、微算-P专业版和微算-E企业版系列，用于构建本地AI算力基础设施
              </li>
              <li>
                <strong>网站和信息服务：</strong>在本网站上发布的产品信息、技术规格、案例研究和行业洞察
              </li>
              <li>
                <strong>咨询和技术支持：</strong>售前技术咨询、方案架构、部署协助和售后支持
              </li>
              <li>
                <strong>合伙人计划：</strong>区域分销、集成合伙人和转售商计划
              </li>
              <li>
                <strong>融资租赁：</strong>通过第三方金融机构合作提供的设备融资和租赁安排
              </li>
            </ul>
          </section>

          {/* 3. 用户账户与注册 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              3. 用户账户与注册
            </h2>
            <p>
              部分功能或服务可能需要您创建账户或提交注册信息。在此情况下，您同意：
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>提供真实、准确、最新且完整的信息</li>
              <li>维护并及时更新您的信息以保持其准确性和完整性</li>
              <li>保持账户凭据的保密性并限制对您账户的访问</li>
              <li>对您账户下发生的所有活动承担责任</li>
              <li>发现任何未经授权使用账户的情况立即通知我们</li>
            </ul>
            <p>
              如我们合理认为您提供的信息不准确或您违反了本条款，我们保留自行决定暂停或终止您账户的权利。
            </p>
          </section>

          {/* 4. 知识产权 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              4. 知识产权
            </h2>
            <p>
              本网站的所有内容、功能和特性——包括但不限于文字、图形、标识、图标、图像、音频片段、软件、数据汇编、页面布局、底层代码和设计——均为微算科技或其许可方的专有财产，受中华人民共和国法律和国际知识产权法律的保护，包括著作权法、商标法、专利法和商业秘密法。
            </p>
            <p>
              微算科技名称、标识及所有相关名称、标识、产品和服务名称、设计和标语均为微算科技的商标。未经微算科技事先书面许可，不得使用上述商标。
            </p>
            <p>
              本网站或本网站上任何内容的任何权利、所有权或利益均不转让给您，所有未明确授予的权利均由微算科技保留。
            </p>
          </section>

          {/* 5. 用户内容与行为规范 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              5. 用户内容与行为规范
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.1 合理使用
            </h3>
            <p>
              您仅可出于合法目的并依照本条款使用本网站。您通过本网站提交的任何信息均应真实且不具有误导性。
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              5.2 禁止行为
            </h3>
            <p>您同意不得：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>以任何违反适用法律法规的方式使用本网站</li>
              <li>冒充微算科技、微算科技员工、其他用户或任何其他个人或实体</li>
              <li>从事任何限制或阻碍他人使用或享用本网站的行为</li>
              <li>引入病毒、木马、蠕虫、逻辑炸弹或其他恶意或有技术危害性的材料</li>
              <li>试图未经授权访问、干扰、损坏或中断本网站的任何部分、服务器或数据库</li>
              <li>在未经我们事先书面同意的情况下使用任何机器人、爬虫或其他自动化手段访问本网站</li>
              <li>从本网站收集或获取任何个人身份信息</li>
              <li>利用本网站传送未经请求的广告或推广材料</li>
            </ul>
          </section>

          {/* 6. 产品信息与定价 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              6. 产品信息与定价
            </h2>
            <p>
              我们尽合理努力确保本网站上显示的产品信息和定价的准确性。但请注意：
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>产品规格、配置和图片仅供参考，可能与实际产品有所不同</li>
              <li>价格可能在不事先通知的情况下变更，并可能因配置、数量和合同条款而异</li>
              <li>所有最终产品规格和定价以签订的购买或服务协议为准</li>
              <li>我们保留随时更正定价或产品说明中错误的权利</li>
            </ul>
          </section>

          {/* 7. 融资租赁条款 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              7. 融资租赁条款
            </h2>
            <p>
              微算科技可通过与第三方金融机构的合作为其产品提供融资和租赁选择。以下一般条款适用：
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>所有融资和租赁安排均须经相关金融机构的信用审批</li>
              <li>具体条款、条件、利率和还款计划将在单独的融资或租赁协议中详细说明</li>
              <li>除非另有明确说明，微算科技仅作为促成方，不直接充当贷款人或出租人</li>
              <li>本网站上展示的促销融资条款（如最低月付款额）仅供参考，以最终协议为准</li>
              <li>提前终止、违约及其他特定条款将受签订的融资协议约束</li>
            </ul>
          </section>

          {/* 8. 合伙人计划条款 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              8. 合伙人计划条款
            </h2>
            <p>微算科技为符合条件的企业提供合伙人计划。一般条款包括：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>合伙人申请须经微算科技自行决定审核批准</li>
              <li>合伙人必须达到并维持微算科技确定的最低资质和业绩标准</li>
              <li>合伙人权益、佣金结构和区域安排将在单独的合伙人协议中详细说明</li>
              <li>微算科技保留随时修改、暂停或终止合伙人计划或任何合伙人参与的权利</li>
              <li>合伙人不得代表微算科技做出未经授权的声明或保证</li>
            </ul>
          </section>

          {/* 9. 隐私保护 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              9. 隐私保护
            </h2>
            <p>
              您对本网站和服务的使用同时受我们{' '}
              <Link href="/privacy" className="text-brand-600 underline">
                隐私政策
              </Link>
              的约束，该政策说明了我们如何收集、使用和保护您的个人信息。使用本网站即表示您同意隐私政策中描述的信息收集和使用方式。
            </p>
          </section>

          {/* 10. 免责声明与责任限制 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              10. 免责声明与责任限制
            </h2>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              10.1 &ldquo;按现状&rdquo;免责声明
            </h3>
            <p>
              本网站及其提供的所有内容、服务和信息均以&ldquo;按现状&rdquo;和&ldquo;可用性&rdquo;为基础提供，不附带任何形式的明示或暗示保证，包括但不限于对适销性、特定用途适用性和不侵权的暗示保证。微算科技不保证本网站将不间断运行、无错误或不含病毒或其他有害组件。
            </p>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
              10.2 责任限制
            </h3>
            <p>
              在适用法律允许的最大范围内，微算科技及其董事、管理人员、员工、代理人或关联公司在任何情况下均不对任何间接的、附带的、特殊的、后果性的或惩罚性的损害赔偿负责，包括但不限于利润损失、数据损失、使用损失、商誉损失或其他无形损失，无论该等损害赔偿基于保证、合同、侵权（包括过失）、法律或任何其他法律理论，也不论微算科技是否已被告知发生此类损害的可能性。
            </p>
            <p>
              在不允许排除或限制后果性或附带性损害赔偿责任的司法管辖区，我们的责任将在法律允许的最大范围内受到限制。
            </p>
          </section>

          {/* 11. 赔偿 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              11. 赔偿
            </h2>
            <p>
              您同意对微算科技及其管理人员、董事、员工、代理人、许可方和供应商进行辩护、赔偿并使其免受因您以违反或被指控违反本条款或任何适用法律法规的方式使用本网站或服务而产生或被指控产生的任何索赔、诉讼、要求、责任和和解（包括但不限于合理的法律和会计费用）的损害。
            </p>
          </section>

          {/* 12. 适用法律与争议解决 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              12. 适用法律与争议解决
            </h2>
            <p>
              本条款受中华人民共和国法律管辖并依其解释，不适用其法律冲突条款。
            </p>
            <p>
              因本条款引起的或与之相关的任何争议，双方应首先通过友好协商解决。如在三十（30）日内协商不成，任何一方可：
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>将争议提交至中国北京有管辖权的人民法院，该法院享有排他管辖权；或</li>
              <li>将争议提交至中国国际经济贸易仲裁委员会（CIETAC），按照其当时有效的仲裁规则在北京进行仲裁。仲裁裁决为终局裁决，对双方均具有约束力。</li>
            </ul>
          </section>

          {/* 13. 不可抗力 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              13. 不可抗力
            </h2>
            <p>
              因超出我们合理控制范围的情况导致的任何履约失败或延迟，微算科技不承担责任，包括但不限于自然灾害、政府行为、战争、恐怖主义、流行病、社会动乱、停电、互联网或电信故障、火灾、洪水或劳动争议。
            </p>
          </section>

          {/* 14. 可分割性 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              14. 可分割性
            </h2>
            <p>
              如果本条款的任何条款被有管辖权的法院或仲裁庭认定为无效、违法或不可执行，该条款应被消除或限制至最低限度，以使本条款的其余条款继续具有完全效力。
            </p>
          </section>

          {/* 15. 完整协议 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              15. 完整协议
            </h2>
            <p>
              本条款连同我们的隐私政策以及微算科技在本网站上发布的任何其他法律通知或协议，构成您与微算科技之间关于本网站的完整协议，取代所有先前和同期的书面和口头谅解、协议、陈述和保证。本条款中的任何内容不影响您与微算科技之间签订的任何单独的产品购买、服务、融资或合伙人协议的条款。
            </p>
          </section>

          {/* 16. 条款变更 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              16. 条款变更
            </h2>
            <p>
              我们保留自行决定随时修订和更新本条款的权利。所有变更在发布后立即生效，适用于此后对本网站的所有访问和使用。
            </p>
            <p>
              当我们对本条款进行重大变更时，我们将通过在本页面发布更新后的条款并修改&ldquo;最后更新日期&rdquo;来提供通知，并在适当时通过本网站提供额外通知。您在修订后的条款发布后继续使用本网站，即表示您接受并同意相关变更。
            </p>
          </section>

          {/* 17. 联系方式 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">
              17. 联系方式
            </h2>
            <p>如对本服务条款有任何疑问或意见，请联系我们：</p>
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
          </section>

          <div className="border-t border-gray-200 pt-6 mt-10">
            <p className="text-gray-400 text-xs">
              本服务条款亦提供{' '}
              <Link href="/en/terms" className="text-brand-600 underline">
                英文版（English）
              </Link>。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
