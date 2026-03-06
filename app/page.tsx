import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: '微算科技官方网站 - 数据不出域的微型算力中心',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          WeCalc 微算科技
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          数据不出域的微型算力中心
        </p>
        <p className="text-lg text-gray-500">
          Website under construction...
        </p>
      </div>
    </div>
  );
}
