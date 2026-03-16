import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us — Product Inquiry · Technical Support · Business Collaboration',
  description:
    'Contact WeCalc Technology: product inquiries, technical support, business collaboration, and partnership applications. Phone: 134-2608-6861, Email: 13426086861@139.com. Tell us your business scenario and our system will generate a tailored WeCalc recommendation.',
  alternates: { canonical: `${BASE_URL}/en/contact` },
  openGraph: {
    title: 'Contact Us | WeCalc',
    description: 'Product inquiries, technical support, business collaboration',
    url: `${BASE_URL}/en/contact`,
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
