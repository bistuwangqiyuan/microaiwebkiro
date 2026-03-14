import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: '联系我们 — 产品咨询·技术支持·商务合作',
  description:
    '联系微算科技：产品咨询、技术支持、商务合作、合伙人申请。电话：134-2608-6861，邮箱：13426086861@139.com。告诉我们您的业务场景，系统会先输出一版适合的微算建议摘要。',
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: '联系我们 | 微算科技',
    description: '产品咨询、技术支持、商务合作',
    url: `${BASE_URL}/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
