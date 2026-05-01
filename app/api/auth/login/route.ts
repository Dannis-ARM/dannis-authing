import { NextResponse } from 'next/server';
import { userDb, subscriptionDb } from '@/lib/db/prisma';

export async function POST(request: Request) {
  try {
    const { authingId, openid, nickname, avatar, email, phone } = await request.json();

    if (!authingId) {
      return NextResponse.json({ error: '缺少用户ID' }, { status: 400 });
    }

    // 查找用户是否已存在
    let user = await userDb.findByAuthingId(authingId);

    if (!user) {
      // 新用户，创建默认免费订阅
      user = await userDb.create({
        authingId,
        openid,
        nickname,
        avatar,
        email,
        phone,
      });

      // 创建默认免费订阅
      const now = new Date();
      const oneYearLater = new Date(now);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

      await subscriptionDb.create({
        userId: user.id,
        plan: 'FREE',
        status: 'ACTIVE',
        currentPeriodStart: now,
        currentPeriodEnd: oneYearLater,
      });
    } else {
      // 更新用户信息
      user = await userDb.update(user.id, {
        nickname: nickname || user.nickname,
        avatar: avatar || user.avatar,
        email: email || user.email,
        phone: phone || user.phone,
      });
    }

    // TODO: 这里可以设置 session 或者 JWT token

    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        nickname: user.nickname,
        avatar: user.avatar,
        tier: user.tier,
      }
    });
  } catch (error: any) {
    console.error('登录处理失败', error);
    return NextResponse.json({ error: error.message || '登录失败' }, { status: 500 });
  }
}