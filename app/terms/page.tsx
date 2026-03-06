import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '服务条款',
  description: '微算科技服务条款',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">服务条款</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed text-sm">
          <p className="text-gray-400 text-xs">最后更新日期：2026年3月</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. 服务说明</h2>
            <p>
              微算科技（以下简称&ldquo;我们&rdquo;）通过本网站向用户提供微算产品信息展示、技术咨询、合伙人申请等服务。
              使用本网站即表示您同意遵守以下服务条款。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. 用户责任</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>您应提供真实、准确的个人信息</li>
              <li>您不得以任何方式干扰网站的正常运行</li>
              <li>您不得利用网站进行任何违法活动</li>
              <li>您应妥善保管账户信息，对账户下的行为负责</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. 知识产权</h2>
            <p>
              本网站的所有内容（包括但不限于文字、图片、标识、设计等）均为微算科技的知识产权，
              受中华人民共和国法律保护。未经书面授权，不得以任何形式复制、传播或使用。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. 免责声明</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>网站内容仅供参考，实际产品参数以最终合同为准</li>
              <li>我们不对因网络故障、系统维护等导致的服务中断承担责任</li>
              <li>产品价格和配置可能随时调整，以最新公布为准</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. 争议解决</h2>
            <p>
              因使用本网站产生的争议，双方应协商解决。协商不成的，任何一方可向微算科技所在地有管辖权的人民法院提起诉讼。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. 条款修改</h2>
            <p>
              我们保留随时修改本服务条款的权利。修改后的条款将在本页面发布，继续使用本网站即表示您接受修改后的条款。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. 联系方式</h2>
            <p>如对本服务条款有任何疑问，请联系：13426086861@139.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
