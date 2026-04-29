'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  // 模拟登录状态，后续可以替换成真实的用户状态
  const isLoggedIn = true;
  const userTier = "FREE";

  const handleLogout = () => {
    // 后续实现退出登录逻辑
    router.push("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">
                <span className="text-amber-400">dannis</span>-authing
              </span>
            </Link>
            <div className="hidden md:flex items-center ml-10 space-x-8">
              <Link 
                href="/" 
                className={`text-sm font-medium transition-colors ${
                  pathname === "/" ? "text-amber-400" : "text-slate-300 hover:text-white"
                }`}
              >
                首页
              </Link>
              <Link 
                href="/pricing" 
                className={`text-sm font-medium transition-colors ${
                  pathname === "/pricing" ? "text-amber-400" : "text-slate-300 hover:text-white"
                }`}
              >
                定价
              </Link>
              <a 
                href="#" 
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                文档
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  登录
                </Link>
                <Link 
                  href="/pricing"
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  立即开始
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-400">
                  {userTier === "FREE" ? "免费版" : userTier === "STANDARD" ? "标准版" : "高级版"}
                </span>
              <Link 
                href="/free"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                控制台
                </Link>
                <Link 
                  href="/profile"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  个人中心
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  退出
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}