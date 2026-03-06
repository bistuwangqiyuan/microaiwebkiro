import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们',
  description: '联系微算科技：产品咨询、技术支持、商务合作、合伙人申请。邮箱：13426086861@139.com',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
