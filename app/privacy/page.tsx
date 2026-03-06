import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策',
  description: '微算科技隐私政策',
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">隐私政策</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed text-sm">
          <p className="text-gray-400 text-xs">最后更新日期：2026年3月</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. 信息收集</h2>
            <p>我们在您使用微算科技网站时可能收集以下信息：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>您主动提供的个人信息（姓名、邮箱、电话、公司名称等）</li>
              <li>您的浏览行为数据（访问页面、停留时间等）</li>
              <li>设备信息（浏览器类型、操作系统、IP地址等）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. 信息使用</h2>
            <p>我们收集的信息将用于以下目的：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>响应您的咨询和服务请求</li>
              <li>改善网站功能和用户体验</li>
              <li>向您发送相关产品和服务信息（经您同意后）</li>
              <li>遵守法律法规要求</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. 信息保护</h2>
            <p>
              我们采取适当的技术和管理措施保护您的个人信息安全，防止未经授权的访问、使用或泄露。
              我们的网站使用HTTPS加密传输，确保数据在传输过程中的安全性。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">4. 信息共享</h2>
            <p>
              我们不会向第三方出售或出租您的个人信息。仅在以下情况下可能共享您的信息：
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>获得您的明确同意</li>
              <li>法律法规要求</li>
              <li>保护微算科技或公众的合法权益</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">5. Cookie使用</h2>
            <p>
              我们的网站可能使用Cookie和类似技术来提升用户体验。您可以通过浏览器设置管理Cookie偏好。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">6. 您的权利</h2>
            <p>您有权：</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>访问和获取您的个人信息副本</li>
              <li>更正不准确的个人信息</li>
              <li>删除您的个人信息</li>
              <li>撤回对信息处理的同意</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">7. 联系方式</h2>
            <p>如对本隐私政策有任何疑问，请通过以下方式联系我们：</p>
            <p className="mt-2">邮箱：contact@wecalc.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
