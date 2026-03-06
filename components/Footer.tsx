import Link from 'next/link';
import Image from 'next/image';

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
    title: '联系支持',
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10">
            {/* Brand + Contact */}
            <div className="col-span-2 mb-4 lg:mb-0">
              <Link href="/" className="flex items-center gap-2.5 group mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white font-black text-sm">W</span>
                </div>
                <span className="text-white text-lg font-bold">微算科技</span>
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs mb-5">
                数据不出域的微型算力中心。数据全部存放在您自己的设备中，更安全、更放心。
              </p>

              <div className="space-y-2.5 mb-5">
                <a href="mailto:13426086861@139.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  13426086861@139.com
                </a>
                <a href="tel:13426086861" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  134-2608-6861
                </a>
              </div>

              {/* WeChat QR */}
              <div className="bg-white/5 rounded-xl p-3 inline-block">
                <p className="text-xs text-gray-400 mb-2 text-center">微信联系</p>
                <Image
                  src="/image/微信联系二维码.png"
                  alt="微算科技微信联系二维码"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
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

        {/* Partners */}
        <div className="border-t border-white/10 py-6">
          <p className="text-xs text-gray-500 mb-4 text-center">合作伙伴</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Image src="/image/华为logo.png" alt="华为" width={80} height={32} className="opacity-50 hover:opacity-80 transition-opacity h-8 w-auto" />
            <Image src="/image/华为鲲鹏logo.png" alt="华为鲲鹏" width={80} height={32} className="opacity-50 hover:opacity-80 transition-opacity h-8 w-auto" />
            <Image src="/image/北京大学logo.jpg" alt="北京信息科技大学" width={80} height={32} className="opacity-50 hover:opacity-80 transition-opacity h-8 w-auto" />
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
