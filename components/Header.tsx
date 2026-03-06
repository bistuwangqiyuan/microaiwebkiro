'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '首页', href: '/' },
  { name: '产品中心', href: '/products' },
  { name: '核心技术', href: '/technology' },
  { name: '解决方案', href: '/solutions' },
  { name: '事业合伙人', href: '/partnership' },
  { name: '关于我们', href: '/about' },
  { name: '新闻资讯', href: '/news' },
  { name: '联系我们', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isHomePage = pathname === '/';
  const headerBg = scrolled || !isHomePage
    ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm'
    : 'bg-transparent';
  const textColor = scrolled || !isHomePage ? 'text-gray-800' : 'text-white';
  const logoColor = scrolled || !isHomePage ? 'text-brand-600' : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <nav className="section-container" aria-label="主导航">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="微算科技首页">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center 
                            shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow duration-300`}>
              <span className="text-white font-black text-sm">W</span>
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${logoColor}`}>
              微算科技
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  ${pathname === item.href
                    ? (scrolled || !isHomePage ? 'text-brand-600 bg-brand-50' : 'text-white bg-white/15')
                    : (scrolled || !isHomePage
                        ? 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10')
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${textColor}`}
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-xl">
          <div className="section-container py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors
                  ${pathname === item.href
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-gray-700 hover:text-brand-600 hover:bg-gray-50'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
