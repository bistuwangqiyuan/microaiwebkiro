import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <div className="text-8xl font-black text-gray-100 mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">页面未找到</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或返回首页。
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            返回首页
          </Link>
          <Link href="/contact" className="btn-outline">
            联系我们
          </Link>
        </div>
      </div>
    </div>
  );
}
