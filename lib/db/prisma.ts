import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// 用户相关操作
export const userDb = {
  // 根据Authing ID查找用户
  findByAuthingId: async (authingId: string) => {
    return prisma.user.findUnique({
      where: { authingId },
      include: { subscription: true },
    });
  },

  // 创建用户
  create: async (userData: {
    authingId: string;
    openid?: string;
    nickname?: string;
    avatar?: string;
    email?: string;
    phone?: string;
  }) => {
    return prisma.user.create({
      data: userData,
      include: { subscription: true },
    });
  },

  // 更新用户信息
  update: async (id: string, data: Partial<{
    nickname: string;
    avatar: string;
    email: string;
    phone: string;
    tier: 'FREE' | 'STANDARD' | 'PREMIUM';
  }>) => {
    return prisma.user.update({
      where: { id },
      data,
      include: { subscription: true },
    });
  },
};

// 订阅相关操作
export const subscriptionDb = {
  // 创建订阅
  create: async (data: {
    userId: string;
    plan: 'FREE' | 'STANDARD' | 'PREMIUM';
    status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'UNPAID';
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    paymentMethod?: string;
  }) => {
    return prisma.subscription.create({
      data,
    });
  },

  // 更新订阅状态
  updateStatus: async (userId: string, status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'UNPAID') => {
    return prisma.subscription.update({
      where: { userId },
      data: { status },
    });
  },
};