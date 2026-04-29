'use client';

import { useEffect, useRef } from 'react';
import { Authing } from '@authing/web';
import { authingConfig } from '@/lib/auth/config';

export default function LoginPage() {
  const qrcodeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!qrcodeContainerRef.current) return;

    // 初始化 Authing 微信扫码登录
    const authing = new Authing({
      appId: authingConfig.appId,
      domain: authingConfig.domain,
      redirectUri: authingConfig.redirectUri,
      scope: authingConfig.scope,
    });

    // 渲染微信扫码登录框
    authing.renderWxQrcode({
      container: qrcodeContainerRef.current,
      width: 300,
      height: 300,
      onSuccess: (userInfo) => {
        console.log('登录成功', userInfo);
        // 登录成功后会自动跳转到 redirectUri
      },
      onError: (error) => {
        console.error('登录失败', error);
      },
      onScanSuccess: () => {
        console.log('扫码成功，请在手机上确认');
      },
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="card w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">欢迎登录</h1>
          <p className="text-neutral-500">请使用微信扫码登录</p>
        </div>

        <div className="flex justify-center mb-6">
          <div 
            ref={qrcodeContainerRef}
            className="border-2 border-neutral-200 rounded-lg p-2 bg-white"
          />
        </div>

        <div className="text-center text-sm text-neutral-500">
          <p>扫码后请在手机上确认登录</p>
          <p className="mt-2 text-xs text-neutral-400">登录即表示您同意我们的服务条款和隐私政策</p>
        </div>
      </div>
    </div>
  );
}