'use client';

import { useEffect, useState } from "react";
import { authingConfig } from "@/lib/auth/config";

export default function LoginPage() {
  const [isRedirecting, setIsRedirecting] = useState(true);

  useEffect(() => {
    // 检查是否已经登录，如果有token直接跳转到控制台
    const token = localStorage.getItem('access_token');
    if (token) {
      window.location.href = '/free';
      return;
    }

    // 使用replace跳转，不会在历史记录中留下/login页面的痕迹
    // 这样用户从Authing登录页点击回退，直接回到上一个页面，不会回到/login页
    const timer = setTimeout(() => {
      const authUrl = new URL(`https://${authingConfig.domain}/oidc/auth`);
      authUrl.searchParams.set('client_id', authingConfig.appId);
      authUrl.searchParams.set('redirect_uri', authingConfig.redirectUri);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', authingConfig.scope);
      authUrl.searchParams.set('provider', 'wechat:mobile');
      authUrl.searchParams.set('state', Math.random().toString(36).substring(2));
      
      // 用replace替换当前历史记录，避免回退卡登录页问题
      window.location.replace(authUrl.toString());
      setIsRedirecting(false);
    }, 800); // 缩短跳转时间，提升体验

    return () => clearTimeout(timer);
  }, []);

  const handleManualRedirect = () => {
    const authUrl = new URL(`https://${authingConfig.domain}/oidc/auth`);
    authUrl.searchParams.set('client_id', authingConfig.appId);
    authUrl.searchParams.set('redirect_uri', authingConfig.redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', authingConfig.scope);
    authUrl.searchParams.set('provider', 'wechat:mobile');
    authUrl.searchParams.set('state', Math.random().toString(36).substring(2));
    
    window.location.href = authUrl.toString();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="card w-full max-w-md p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">正在跳转到登录页...</h1>
        <p className="text-slate-600 mb-6">请稍候，即将打开微信扫码登录</p>
        <p className="text-sm text-slate-500 mb-4">如果没有自动跳转，请点击下方按钮</p>
        <button 
          onClick={handleManualRedirect}
          className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          手动跳转登录
        </button>
      </div>
    </div>
  );
}
