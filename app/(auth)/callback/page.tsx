'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Authing } from '@authing/web';
import { authingConfig } from '@/lib/auth/config';
import axios from 'axios';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        if (!code) {
          throw new Error('无效的回调参数');
        }

        // 初始化 Authing 实例
        const authing = new Authing({
          appId: authingConfig.appId,
          domain: authingConfig.domain,
          redirectUri: authingConfig.redirectUri,
        });

        // 使用 code 换取用户信息
        const userInfo = await authing.getLoginState({ code });
        if (!userInfo) {
          throw new Error('获取用户信息失败');
        }

        // 同步用户信息到后端
        await axios.post('/api/auth/login', {
          authingId: userInfo.sub,
          openid: userInfo.openid,
          nickname: userInfo.nickname,
          avatar: userInfo.picture,
          email: userInfo.email,
          phone: userInfo.phone_number,
        });

        // 登录成功，跳转到 dashboard
        router.push('/dashboard');
      } catch (err: any) {
        console.error('登录回调处理失败', err);
        setError(err.message || '登录失败，请重试');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-700 mx-auto mb-4"></div>
          <p className="text-neutral-700">正在处理登录...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="card w-full max-w-md p-8 text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">登录失败</h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <p className="text-neutral-500 text-sm">3秒后跳转到登录页...</p>
        </div>
      </div>
    );
  }

  return null;
}