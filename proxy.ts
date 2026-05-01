import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 不需要认证的公共路径
const publicPaths = ['/', '/login', '/callback', '/pricing', '/features', '/api/webhook'];

// 各用户等级可访问的路径前缀
const tierPathMap: Record<string, string[]> = {
  FREE: ['/dashboard/free'],
  STANDARD: ['/dashboard/free', '/dashboard/standard'],
  PREMIUM: ['/dashboard/free', '/dashboard/standard', '/dashboard/premium'],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 公共路径直接放行
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // TODO: 这里需要从 session 或者 cookie 中获取用户认证信息和等级
  // 暂时模拟用户信息，实际开发需要替换成真实验证逻辑
  const isAuthenticated = true; // 模拟已登录
  const userTier = 'FREE'; // 模拟用户等级

  if (!isAuthenticated) {
    // 未登录跳转到登录页
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 检查用户是否有权限访问当前路径
  const allowedPaths = tierPathMap[userTier] || [];
  const hasPermission = allowedPaths.some(path => pathname.startsWith(path));

  if (!hasPermission) {
    // 无权限跳转到定价页，提示升级
    return NextResponse.redirect(new URL('/pricing?upgrade=true', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};