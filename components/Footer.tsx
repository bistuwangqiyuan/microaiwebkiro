import Link from 'next/link';

const footerLinks = {
  products: {
    title: '产品中心',
    links: [
      { name: '微算-B 基础版', href: '/products#basic' },
      { name: '微算-P 专业版', href: '/products#professional' },
      { name: '微算-E 企业版', href: '/products#enterprise' },
      { name: '产品对比', href: '/products#compare' },
    ],
  },
  technology: {
    title: '核心技术',
    links: [
      { name: '存算分离架构', href: '/technology#separation' },
      { name: 'EBOF全闪存储', href: '/technology#ebof' },
      { name: '技术优势', href: '/technology#advantages' },
    ],
  },
  company: {
    title: '关于微算',
    links: [
      { name: '公司介绍', href: '/about' },
      { name: '解决方案', href: '/solutions' },
      { name: '新闻资讯', href: '/news' },
      { name: '事业合伙人', href: '/partnership' },
    ],
  },
  support: {
    title: '支持',
    links: [
      { name: '联系我们', href: '/contact' },
      { name: '隐私政策', href: '/privacy' },
      { name: '服务条款', href: '/terms' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300" role="contentinfo">
      <div className="section-container">
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-4 lg:mb-0">
              <Link href="/" className="flex items-center gap-2.5 group mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-black text-sm">W</span>
                </div>
                <span className="text-white text-lg font-bold">微算科技</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                数据不出域的微型算力中心。数据全部存放在您自己的设备中，更安全、更放心。
              </p>
              <div className="flex gap-3 mt-6">
                <span className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </span>
                <span className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
                  </svg>
                </span>
              </div>
            </div>

            {Object.values(footerLinks).map((section) => (
              <div key={section.title}>
                <h3 className="text-white text-sm font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} 微算科技 WeCalc Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              隐私政策
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              服务条款
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
