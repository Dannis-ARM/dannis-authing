'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

// 路径映射到中文名称
const pathNames: Record<string, string> = {
  '': '首页',
  'pricing': '定价',
  'login': '登录',
  'callback': '登录处理',
  'free': '免费版控制台',
  'standard': '标准版控制台',
  'premium': '高级版控制台',
  'profile': '个人中心',
  'subscription': '订阅管理',
  'features': '功能介绍',
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  // 生成面包屑路径
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = pathNames[segment] || segment;
    return { href, name };
  });

  // 如果是首页，不需要显示面包屑
  if (pathname === '/') return null;

  return (
    <div className="bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center text-sm text-slate-500">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            首页
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              <svg className="w-4 h-4 mx-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-700 font-medium">{crumb.name}</span>
              ) : (
                <Link href={crumb.href} className="hover:text-amber-600 transition-colors">
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}